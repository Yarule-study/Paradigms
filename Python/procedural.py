def create_point(x, y):
    return {'x': x, 'y': y}

def clone(point):
    x = point['x']
    y = point['y']
    return create_point(x, y)

def move(point, dx, dy):
    point['x'] += dx
    point['y'] += dy

def to_string(point):
    x = point['x']
    y = point['y']
    return "({0}, {1})".format(x, y)

# Usage

p1 = create_point(10, 20)
print(to_string(p1))
c1 = clone(p1)
move(c1, -5, 10)
print(to_string(c1))
