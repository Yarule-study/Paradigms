def create_point(point, x, y):
    point['x'] = x
    point['y'] = y

def clone(src, dest):
    dest['x'] = src['x']
    dest['y'] = src['y']

def move(point, dx, dy):
    point['x'] += dx
    point['y'] += dy

def to_string(point, buffer):
    buffer['value'] = f"({point['x']}, {point['y']})"

# Usage
p1 = {}
create_point(p1, 10, 20)

result = {}
to_string(p1, result)
print(result['value'])

c1 = {}
clone(p1, c1)
move(c1, -5, 10)
to_string(c1, result)
print(result['value'])