from flask import Flask, request, render_template, make_response, flash, redirect
import json

from utils.login import *
from app_config import SECRET_KEY, STATE_STORAGE
from utils.pion_coordinate import generate_coordinate, update_coordinate_by_team, list_to_dict

app = Flask(__name__)
app.secret_key = SECRET_KEY


@app.route('/', methods=['get', 'post'])
def login():
    if request.method == 'GET':
        try:
            team = request.cookies.get('team')
            team = get_team(team)
            return render_template('game.html', game=Game(STATE_STORAGE), team=team, logged=True)
        except Exception as e:
            return render_template('login.html')
    if request.method=='POST':
        try:
            values = dict(request.values)
            name, password = values['name'], values['pass']
            team = check_login(name, password)
            response = make_response(render_template('game.html', game=Game(STATE_STORAGE), team=team, logged=True))
            response.set_cookie('team',encrypt(team.name))
            return response
        except Exception as e:
            raise e
            flash('Mauvais nom/mot de passe')
            return render_template('login.html')


@app.route('/board', methods=['GET'])
def board():
    if not is_logged(request):
        return redirect('/')
    game = Game(STATE_STORAGE)
    team = request.cookies.get('team')
    team = get_team(team)
    return render_template('board.html', coords=generate_coordinate(game), team=team, game=game)


@app.route('/get_coords', methods=['get'])
def get_board_coords():
    if not is_logged(request):
        return redirect('/')
    game = Game(STATE_STORAGE)
    return json.dumps(generate_coordinate(game))


@app.route('/validate_repart/<team_name>', methods=['post'])
def validate_repart(team_name):
    values = request.get_json()
    game = Game(STATE_STORAGE)
    update_coordinate_by_team(game, values, team_name)
    return values


@app.route('/compute/<ter1>/<team1>/<nb1>/<ter2>/<team2>/<nb2>')
def compute(ter1, nb1, team1, ter2, nb2, team2):
    if not is_logged(request):
        return redirect('/')
    game = Game(STATE_STORAGE)
    countries = list_to_dict(game.countries)
    c1, c2 = countries[ter1], countries[ter2]
    teams = list_to_dict(game.teams)
    t1, t2 = teams[team1], teams[team2]
    c1.occuped_by = t1.id
    c2.occuped_by = t2.id
    c1.nb = int(nb1)
    c2.nb = int(nb2)
    print('c1', c1)
    print('c2', c2)
    game.store(STATE_STORAGE)
    return '', 200


@app.route('/attack/<team1>/<team2>/<territory1>/<territory2>', methods=['get'])
def attack(team1, team2, territory1, territory2):
    if not is_logged(request):
        return redirect('/')
    game = Game(STATE_STORAGE)
    teams = list_to_dict(game.teams)
    team1, team2 = teams[team1], teams[team2]
    countries = list_to_dict(game.countries)
    territory1, territory2 = countries[territory1], countries[territory2]
    return render_template('attack.html', team1=team1, team2=team2, ter1=territory1, ter2=territory2)


if __name__ == "__main__":
    app.run(port=5000)