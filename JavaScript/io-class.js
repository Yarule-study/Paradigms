'use strict';

class IO {
  constructor(effect) {
    this.effect = effect;
  }

  static of(value) {
    return new IO(() => value);
  }

  map(fn) {
    return new IO(() => fn(this.effect()));
  }

  chain(fn) {
    return new IO(() => fn(this.effect()).run());
  }

  run() {
    return this.effect();
  }
}

class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  static of(x, y) {
    return new Point(x, y);
  }

  map(fn) {
    const { x, y } = fn(this.#x, this.#y);
    return Point.of(x, y);
  }

  chain(fn) {
    return fn(this.#x, this.#y);
  }
}

class PointTransform {
  constructor(fn) {
    this.fn = fn;
  }

  ap(point) {
    return point.map(this.fn);
  }
}

const move = (dx, dy) => (x, y) => ({ x: x + dx, y: y + dy });
const clone = (x, y) => ({ x, y });
const toString = (x, y) => IO.of(`(${x}, ${y})`);

// Usage

const p1 = Point.of(10, 20);

const sequence1 = p1.chain(toString).map((s) => {
  console.log(s);
  return s;
});
sequence1.run();

const c0 = p1.map(clone);
const t1 = new PointTransform(move(-5, 10));
const c1 = t1.ap(c0);

const sequence2 = c1.chain(toString).map((s) => {
  console.log(s);
  return s;
});
sequence2.run();
