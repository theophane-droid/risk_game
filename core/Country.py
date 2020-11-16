from utils.get_countries import get_all_countries


class Country:
    def __init__(self, data):
        self.name = data['name']
        self.occuped_by = data['occuped_by']
        self.nb = data['nb']

    def __str__(self):
        return 'name: {}, occuped_by: {}, nb: {}'.format(self.name, self.occuped_by, self.nb)

    def encode(self):
        return {
            'name': self.name,
            'occuped_by' : self.occuped_by,
            'nb' : self.nb
        }

def generate_all_contries():
    names = get_all_countries() 
    countries = []  
    for name in names:
        data = {'name': name, 'occuped_by':None, 'nb':0}
        countries.append(Country(data))
    return countries

if __name__ == "__main__":
    for el in generate_all_contries():
        print(el)