from app_config import SECRET_KEY, STATE_STORAGE
from utils.login import encrypt, decrypt
from utils.pion_coordinate import generate_coordinate
from core.Game import Game


g = Game(STATE_STORAGE)