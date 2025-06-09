'use strict';

function Point(x, y) {
  const value = Object.freeze({ x, y });
  const self = Object.create(null);
  self.map = (fn) => fn(self);
  self.chain = (fn) => fn(self);
  self.move = (dx, dy) => new Point(x + dx, y + dy);
  self.clone = () => new Point(x, y);
  self.toString = (fn) => fn(`(${x}, ${y})`);
  return self;
}

Point.of = (x, y) => new Point(x, y);

function PointTransform(fn) {
  return { ap: (point) => point.map(fn) };
}

// Usage

const p1 = Point.of(10, 20);
p1.toString(console.log);
const c0 = p1.map((p) => p.clone());
const t1 = new PointTransform((p) => p.move(-5, 10));
const c1 = t1.ap(c0);
c1.toString(console.log);
