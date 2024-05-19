export class Cursor {
  constructor() {
    this.position = 0;
  }

  moveLeft() {
    if (this.position > 0) {
      this.position--;
    }
  }

  moveRight(contentLength) {
    if (this.position < contentLength) {
      this.position++;
    }
  }

  setPosition(newPosition, contentLength) {
    this.position = Math.min(newPosition, contentLength);
  }

  getPosition() {
    return this.position;
  }
}
