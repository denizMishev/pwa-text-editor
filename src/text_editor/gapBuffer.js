export class GapBuffer {
  constructor(initialCapacity = 10) {
    this.buffer = new Array(initialCapacity);
    this.gapStart = 0;
    this.size = 0;
    this.gapEnd = initialCapacity - 1;
    this.newLinesPositions = {};
    this.lines = {};
    this.ln = 1;
    this.col = 0;
  }

  insert(character) {
    if (this.gapStart > this.gapEnd) {
      this.expandGap();
    }
    this.buffer[this.gapStart] = character;
    this.gapStart++;
    this.size++;
    //cursor logic
    if (this.lines[this.ln] === undefined) {
      // case for first character ever
      //avoid += due to type coercion
      this.lines[this.ln] = 1;
      this.col++;
    } else if (this.lines[this.ln] !== undefined && character !== "\n") {
      // case for if there is already a line created for our current position and the caret is not positioned on the new line index
      this.lines[this.ln]++;
      this.col++;
    }
    if (character === "\n") {
      this.newLinesPositions[this.ln] = this.col;
      this.ln++;
      this.lines[this.ln] = 0;
      this.col = 0;
    }
  }

  delete() {
    if (this.gapStart > 0) {
      this.gapStart--;
      this.size--;
      //cursor logic
      if (this.col > 0) {
        // prevchar is not newline
        this.col--;
        this.lines[this.ln]--;
      } else {
        // prevchar is new line or caret is at start
        if (this.ln > 1) {
          if (this.lines[this.ln] > 1) {
            this.lines[this.ln - 1] += this.lines[this.ln];
            delete this.lines[this.ln];
            this.ln--;
            this.col = this.lines[this.ln];
          } else {
            delete this.lines[this.ln];
            this.ln--;
            this.col = this.lines[this.ln];
          }
        }
      }
    }
  }

  left() {
    // check if left is not on the previous line
    if (this.gapStart > 0) {
      this.gapEnd--;
      this.gapStart--;
      this.buffer[this.gapEnd + 1] = this.buffer[this.gapStart];
      // cursor logic
      if (this.col > 0) {
        // standard case, if there are more characters to the left;
        this.col--;
      } else {
        // case if the caret is at the start of a new line and has to move left
        if (this.ln > 1) {
          // case if there is a previous line the caret can move to
          this.ln--;
          this.col = this.lines[this.ln];
        }
      }
    }
  }

  right() {
    if (this.gapEnd < this.buffer.length - 1) {
      this.buffer[this.gapStart] = this.buffer[this.gapEnd + 1];
      this.gapStart++;
      this.gapEnd++;
    }
    // cursor logic
    if (this.col < this.lines[this.ln]) {
      // standard case, in which the caret can move right as there are more characters to its right
      this.col++;
    } else {
      // case if the caret is at the end of the current line
      if (this.lines[this.ln + 1] !== undefined) {
        this.ln++;
        this.col = 0;
      }
    }
  }

  expandGap() {
    let newSize = this.buffer.length * 2;
    let newBuffer = new Array(newSize);
    for (let i = 0; i < this.gapStart; i++) {
      newBuffer[i] = this.buffer[i];
    }
    for (let i = this.gapEnd + 1; i < this.buffer.length; i++) {
      newBuffer[i + newSize - this.buffer.length] = this.buffer[i];
    }
    this.gapEnd += newSize - this.buffer.length;
    this.buffer = newBuffer;
  }

  getContent() {
    let result = "";
    for (let i = 0; i < this.gapStart; i++) {
      result += this.buffer[i];
    }
    for (let i = this.gapEnd + 1; i < this.buffer.length; i++) {
      result += this.buffer[i];
    }
    return result;
  }
}
