const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    const hashValue = sha256(key);
    const hashInteger = parseInt(hashValue.substr(0, 8), 16);
    return hashInteger;
  }

  hashMod(key) {
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    const bucketIndex = this.hashMod(key);

    if (this.data[bucketIndex] === null) {
      this.data[bucketIndex] = new KeyValuePair(key, value);
      this.count++
    } else {
      throw new Error(`hash collision or same key/value pair already exists!`);
    }
  }

  insertWithHashCollisions(key, value) {
    const bucketIndex = this.hashMod(key);

    if( this.data[bucketIndex] === null) {
      this.data[bucketIndex] = new KeyValuePair (key, value);
      this.count++
    } else {
      const newNode = new KeyValuePair (key, value);
      newNode.next = this.data[bucketIndex];
      this.data[bucketIndex] = newNode;
      this.count++
    }
  }

  insert(key, value) {
    let index = this.hashMod(key)
    let existingRecord = this.data[index];
    while (existingRecord) {
      if (existingRecord.key === key && existingRecord.value !== value) {
        existingRecord.value = value;
        return;
      }
      existingRecord = existingRecord.next;
    }
    this.insertWithHashCollisions(key, value);
  }

}


module.exports = HashTable;