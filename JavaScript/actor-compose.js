'use strict';

class Actor {
  #queue = [];
  #processing = false;
  #state = null;

  constructor(Entity, ...args) {
    this.#state = new Entity(...args);
  }

  async send(message) {
    this.#queue.push(message);
    await this.#process();
  }

  async #process() {
    if (this.#processing) return;
    this.#processing = true;
    while (this.#queue.length) {
      const msg = this.#queue.shift();
      if (this.#state[msg.method]) {
        const args = msg.args || [];
        const res = this.#state[msg.method](...args);
        msg.callback(res);
      }
    }
    this.#processing = false;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  clone() {
    return new Actor(Point, this.x, this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

// Usage

const main = async () => {
  const p1 = new Actor(Point, 10, 20);
  await p1.send({ method: 'toString', callback: (res) => {
    console.log(res);
  } });
  await p1.send({ method: 'clone', callback: async (c1) => {
    await c1.send({ method: 'move', args: [-5, 10], callback: async () => {
      await c1.send({ method: 'toString', callback: (res) => {
        console.log(res);
      } });
    } });
  } });
};

main();
