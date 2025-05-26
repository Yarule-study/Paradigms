'use strict';

const point = (x, y) => {
  const self = { x, y };
  const move = (dx, dy) => {
    self.x += dx;
    self.y += dy;
  };
  const clone = () => point(self.x, self.y);
  const toString = () => `(${self.x}, ${self.y})`;
  return { move, clone, toString };
};

// Usage

const p1 = point(10, 20);
console.log(p1.toString());
const c1 = p1.clone();
c1.move(-5, 10);
console.log(c1.toString());
