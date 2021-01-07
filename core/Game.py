import json
from json import JSONEncoder
from random import choice, shuffle
from datetime import datetime, timedelta
from copy import deepcopy


from core.Team import Team
from core.Country import Country, generate_all_contries
from app_config import START_WITH, MAX_PLAY_TIME

class Game(JSONEncoder):
    def __init__(self, filename):
        self.filename = filename
        self.teams = []
        content = ''
        with open(filename, 'r') as f:
            content = f.read()
        data = json.loads(content)
        for t in data['teams']:
            self.teams.append(Team(t))
        if 'initialized' in data:
            self.day = data['day']
            self.countries = [Country(c) for c in data['countries']]
            self.order = data['order']
            self.first_playing = data['first_playing']
            self.current_frame = data['current_frame']
            self.end_frame = data['end_frame']
            self.num_player = data['num_player']
            
            self.update()
            
        else:
            for t in self.teams:
                t.repartition_made = False
            self.day = 1
            self.countries = generate_all_contries()
            self.create_new()
            self.order=[team.name for team in self.teams]
            shuffle(self.order)
            self.num_player = 0
            self.first_playing = datetime.timestamp(datetime.now())
            self.current_frame = self.first_playing 
            end = datetime.now() + timedelta(hours=MAX_PLAY_TIME)
            self.end_frame = end.timestamp()
            self.store(self.filename)
    def encode(self):
        return {
            'teams': [t.encode() for t in self.teams],
            'day' : self.day,
            'countries' : [c.encode() for c in self.countries],
            'initialized': True,
            'num_player': self.num_player,
            'order': self.order,
            'first_playing': self.first_playing,
            'current_frame': self.current_frame,
            'end_frame' : self.end_frame
        }

    def update(self):
        while (datetime.now() > datetime.fromtimestamp(self.end_frame)):
            self.current_frame = self.end_frame
            end = datetime.fromtimestamp(self.end_frame) + timedelta(hours=MAX_PLAY_TIME)
            self.end_frame = end.timestamp()
            self.teams[num_player].repartition_made = False
            self.num_player+=1
            while self.num_player>=len(self.teams):
                self.day+=1
                self.num_player%=len(self.teams) 

    def store(self, filename):
        content = self.encode()
        with open(filename, 'w') as f:
            f.write(json.dumps(content))

    def create_new(self):
        #init team's positions
        countries = list(self.countries)
        while len(countries):
            for team in self.teams:
                country = choice(countries)
                countries.remove(country)
                country.occuped_by = team.id
                country.nb = 10
        #init team soldiers number
        for team in self.teams:
            team.nb_soldats_rsv = START_WITH

    def calc_hop(self, team):
        i = 0
        while i<len(self.teams) and self.order[(self.num_player+i)%len(self.teams)]!=team.name:
            i += 1
        if i>=len(self.teams):
            raise Exception('not found')
        return i

    def can_play(self, team):
        return team.name == self.order[self.num_player]

    def get_remaining_time(self, team):
        hop = self.calc_hop(team)
        hours = 0
        if hop!=0:
            hours = (hop-1) * MAX_PLAY_TIME
        diff = datetime.fromtimestamp(self.end_frame) - datetime.now()
        hours += int(diff.days*24 + diff.seconds//3600)
        minutes = (diff.seconds//60)%60
        return [hours, minutes]

if __name__ == "__main__":
    g = Game('teams.json')
    for t in g.teams:
        print(t)
    print(g.countries)
    g.store('teams.json')