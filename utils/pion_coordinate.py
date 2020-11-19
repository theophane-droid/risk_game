from app_config import TERRITORIES, ORIGINAL_COORDINATES, STATE_STORAGE

def get_team_by_id(id, game):
    for team in game.teams:
        if team.id == id:
            return team
    raise Exception('not found ' + id)

def get_coords_by_name(country_name):
    original_width = 1200
    original_height = 711
    actual_width = 1200
    actual_heigth = 640
    id = TERRITORIES.index(country_name)
    mean_x = (ORIGINAL_COORDINATES[id][0]+ORIGINAL_COORDINATES[id][2])/2
    mean_x = mean_x / original_width * actual_width
    mean_y = (ORIGINAL_COORDINATES[id][1]+ORIGINAL_COORDINATES[id][3])/2
    mean_y = mean_y / original_height * actual_heigth
    return [mean_x, mean_y]

def generate_coordinate(game):
    result = {team.pion:[] for team in game.teams}
    for country in game.countries:
        result[get_team_by_id(country.occuped_by, game).pion].append(get_coords_by_name(country.name) +\
             [country.nb] + [country.name] + [get_team_by_id(country.occuped_by, game).name] )
    return result

def list_to_dict(liste):
    ret = {el.name : el for el in liste}
    return ret
def update_coordinate_by_team(game, data, team_name):
    countries = list_to_dict(game.countries)
    for country_name in data:
        countries[country_name].nb = data[country_name]
    teams = list_to_dict(game.teams)
    teams[team_name].repartition_made = True
    game.store(STATE_STORAGE)
