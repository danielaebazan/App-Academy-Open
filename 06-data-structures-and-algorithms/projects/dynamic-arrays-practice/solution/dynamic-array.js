class DynamicArray {

  constructor(defaultSize=4) {
    this.data = new Array(defaultSize)
    this.capacity = defaultSize;
    this.length = 0;
  }

  read(index) {
    return this.data[index];
  }

  unshift(val) {
    if (this.length === this.capacity) {
      this.capacity *= 2;
      const newData = new Array(this.capacity);

      // Copy existing elements to the right by one position
      for (let i = 0; i < this.length; i++) {
        newData[i + 1] = this.data[i];
      }

      this.data = newData;
    } else {
      // Shift existing elements to the right by one position
      for (let i = this.length - 1; i >= 0; i--) {
        this.data[i + 1] = this.data[i];
      }
    }

    this.data[0] = val; // Set the new value at index 0
    this.length++; // Increment the length
  }

};

module.exports = DynamicArray;
