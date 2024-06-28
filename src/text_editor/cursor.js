//input /n = right
//up/down = up/down
//input char = right
//delete char = left
//left/right = left/right

//newline = get gap buffer text, loop through it, save line in object in Cursor class

export class Cursor {
  constructor() {
    this.ln = 0;
    this.col = 0;
    this.lineContent = {};
  }

  right() {
    // new char ; arrow right ;
    this.col++;
  }

  left() {
    // delete char ; arrow left ; prev char is newline
    if (this.col > 0) this.col--;
    else {
      if (this.ln > 0) {
        delete this.lineContent[this.ln];
        this.col = 0;
      }
    }
  }

  up() {
    if (this.ln > 0) {
      this.ln--;
      const prevCol = this.col;
      this.col = Math.min(this.lineContent[this.ln].length, prevCol);
    } else return;
  }

  down() {
    if (this.lineContent[this.ln + 1]) {
      this.ln++;
      const prevCol = this.col;
      this.col = Math.min(this.lineContent[this.ln].length, prevCol);
    }
  }
}
