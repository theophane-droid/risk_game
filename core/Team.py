class Team:
    def __init__(self, data):
        self.id = data['id']
        self.pion = data['pion']
        self.name = data['name']
        self.password = data['password']
        self.prefix = data['prefix']
        self.nb_soldats_rsv = data['nb_soldats_rsv'] if 'nb_soldats_rsv' in data else 0
        self.last_playing_time = data['last_playing_time'] if 'last_playing_time' in data else None
        self.repartition_made = data['repartition_made'] if 'repartition_made' in data else False
    
    def __str__(self):
        return 'color: {}; nb_soldats_rsv: {}'.format(self.color, self.nb_soldats_rsv)

    def encode(self):
        return {
            'id': self.id,
            'pion': self.pion,
            'name': self.name,
            'prefix': self.prefix,
            'password': self.password,
            'nb_soldats_rsv' : self.nb_soldats_rsv,
            'last_playing_time' : self.last_playing_time,
            'repartition_made': self.repartition_made
        }