from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from base64 import *
BLOCK_SIZE = 32

from core.Game import Game
from app_config import SECRET_KEY, STATE_STORAGE



def encrypt(data):
    data = pad(data.encode('utf-8'), BLOCK_SIZE)
    cipher = AES.new(SECRET_KEY, AES.MODE_ECB)
    ciphertext = cipher.encrypt(data)
    return b64encode(ciphertext)

def decrypt(cyphertext):
    cyphertext = b64decode(cyphertext)
    cipher = AES.new(SECRET_KEY, AES.MODE_ECB)
    data= cipher.decrypt(cyphertext).decode('utf-8')
    data2 = ''
    for c in data:
        if(ord(c) not in[25,26,27,28]):
            data2+=c
    return data2


def get_team(cookie):
    game = Game(STATE_STORAGE)
    team_name = decrypt(cookie)

    for team in game.teams:
        if team.name == team_name:
            return team
    raise Exception('team not found')

def check_login(name, password):
    game = Game(STATE_STORAGE)
    for team in game.teams:
        if team.name==name and team.password==password:
            return team
    raise Exception('Invalid login/password')

def is_logged(request):
    try:
        team = request.cookies.get('team')
        return get_team(team)
    except Exception as e:
        return False

if __name__ == "__main__":
    print(get_all_countries())