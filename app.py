from flask import Flask, request, render_template, make_response, flash, redirect
import json

from utils.login import *
from app_config import SECRET_KEY, STATE_STORAGE
from utils.pion_coordinate import generate_coordinate

app = Flask(__name__)
app.secret_key = SECRET_KEY


@app.route('/', methods=['get','post'])
def login():
    if request.method=='GET':
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

if __name__ == "__main__":
    app.run(port=5002)