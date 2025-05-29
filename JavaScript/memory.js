'use strict';

const createPoint = (x, y) => {
  const buffer = new SharedArrayBuffer(8);
  const view = new Int32Array(buffer);
  view[0] = x;
  view[1] = y;
  return {
    move: (dx, dy) => {
      Atomics.add(view, 0, dx);
      Atomics.add(view, 1, dy);
    },
    clone: () => {
      const x = Atomics.load(view, 0);
      const y = Atomics.load(view, 1);
      return createPoint(x, y);
    },
    toString: () => {
      const x = Atomics.load(view, 0);
      const y = Atomics.load(view, 1);
      return `(${x}, ${y})`;
    },
  };
};

// Usage

const p1 = createPoint(10, 20);
console.log(p1.toString());
const c1 = p1.clone(p1);
c1.move(-5, 10);
console.log(c1.toString());
