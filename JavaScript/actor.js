'use strict';

class Point {
  #x;
  #y;
  #queue = [];
  #processing = false;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  #move(x, y) {
    this.#x += x;
    this.#y += y;
  }

  #clone() {
    return new Point(this.#x, this.#y);
  }

  #toString() {
    return `(${this.#x}, ${this.#y})`;
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
      if (msg.method === 'move') msg.callback(this.#move(msg.x, msg.y));
      if (msg.method === 'clone') msg.callback(this.#clone());
      if (msg.method === 'toString') msg.callback(this.#toString());
    }
    this.#processing = false;
  }
}

// Usage

const main = async () => {
  const p1 = new Point(10, 20);
  await p1.send({ method: 'toString', callback: (res) => {
    console.log(res);
  } });
  await p1.send({ method: 'clone', callback: async (c1) => {
    await c1.send({ method: 'move', x: -5, y: 10, callback: async () => {
      await c1.send({ method: 'toString', callback: (res) => {
        console.log(res);
      } });
    } });
  } });
};

main();
