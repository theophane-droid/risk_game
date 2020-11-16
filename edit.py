import json

from core.Game import Game
from core.Team import Team
from argparse import ArgumentParser
from app_config import STATE_STORAGE

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('action', help="possible values: reload")
    args = parser.parse_args()
    with open(STATE_STORAGE, 'r') as f:
        content = f.read()
    data = json.loads(content)
    if(args.action == 'reload'):
        data = {key: data[key] for key in data if key!='initialized'}
        with open(STATE_STORAGE, 'w') as f:
            f.write(json.dumps(data))