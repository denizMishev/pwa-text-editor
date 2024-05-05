export class GapBuffer {
    constructor(initialCapacity = 10) { 
        this.buffer = new Array(initialCapacity);
        this.gapStart = 0;
        this.gapEnd = initialCapacity - 1;
        this.size = 0;
    }

    insert(character) {
        if (this.gapStart > this.gapEnd) {
            this.expandGap();
        }
        this.buffer[this.gapStart] = character;
        this.gapStart++;
        this.size++;
    }

    delete() {
        if (this.gapStart > 0) {
            this.gapStart--;
            this.size--;
        }
    }

    left() {
        if (this.gapStart > 0) {
            this.buffer[this.gapEnd + 1] = this.buffer[this.gapStart - 1];
            this.gapStart--;
            this.gapEnd++;
        }
    }

    right() {
        if (this.gapEnd < this.buffer.length - 1) {
            this.buffer[this.gapStart] = this.buffer[this.gapEnd + 1];
            this.gapStart++;
            this.gapEnd++;
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
        let result = '';
        for (let i = 0; i < this.gapStart; i++) {
            result += this.buffer[i];
        }
        for (let i = this.gapEnd + 1; i < this.buffer.length; i++) {
            result += this.buffer[i];
        }
        return result;
    }
}