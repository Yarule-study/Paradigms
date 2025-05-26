'use strict';

const point = (ax, ay) => {
  let x = ax;
  let y = ay;
  const move = (dx, dy) => {
    x += dx;
    y += dy;
  };
  const clone = () => point(x, y);
  const toString = () => `(${x}, ${y})`;
  return { move, clone, toString };
};

const line = (a, b) => {
  let p1 = a.clone();
  let p2 = b.clone();
  const move = (dx, dy) => {
    p1.move(dx, dy);
    p2.move(dx, dy);
  };
  const clone = () => line(p1, p2);
  const toString = () => `[${p1}, ${p2}]`;
  return { move, clone, toString };
};

// Usage

const p1 = point(10, 20);
const p2 = point(30, 40);
const l1 = line(p1, p2);
const l2 = l1.clone();
l2.move(-50, 50);
console.log(l1.toString());
console.log(l2.toString());
