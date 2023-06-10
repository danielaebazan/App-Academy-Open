class KeyValuePair {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets; 
    this.count = 0;
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    let index = this.hashMod(key);

    let existing = this.data[index];
    while (existing && existing.key != key) {
      existing = existing.next;
    }

    if (existing) {
      existing.value = value
    } else {
      this.data[index] = new KeyValuePair(key, value, this.data[index]);
      this.count++;
    }

  }


  read(key) {
    let next = this.data[this.hashMod(key)];

    while (next) {
      if (next.key === key) {
        return next.value
      }
      next = next.next;
    }
    return undefined;
  }


  resize() {
    let data = [...this.data];
    let count = this.count;

    this.capacity = this.capacity * 2 ;
    this.data = new Array(this.capacity).fill(null);
    for (let i = 0; i < data.length; i++) {
      let next = data[i];
      while (next) {
        this.insert(next.key, next.value);
        next = next.next;
      }
      this.count = count;
    }
  }


  delete(key) {
    let index = this.hashMod(key);
    let node = this.data[index];
    let prev;

    if (!this.read(key)) {
      return "Key not found";
    }
    while (node != null && !(key === node.key)) {
      prev = node;
      node = node.next;
    }

    if (prev) {
      prev.next = node.next;
    } else {
      this.data[index] = node.next
    }
    this.count--;
  }
};


module.exports = HashTable;