const { SinglyLinkedNode } = require("./01-singly-linked-list");

class Queue {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(val) {
        // Add node to end of queue (linked list)
        const newNode = new SinglyLinkedNode(val);

        if (this.head === null) {
            // Empty queue
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++; // Update the length of the queue

        return this.length; // Return the size of the queue
        // Write your hypothesis on the time complexity of this method here O(1)
    }

    dequeue() {
        // Remove node from front of queue (linked list)
        if (this.head === null) {
            // Empty queue
            return null;
        }

        const removedNodeValue = this.head.value;

        if (this.head === this.tail) {
            // Only one node in the queue
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }

        this.length--; // Decrement the length of the queue
        if (this.length === 0) {
            // Empty queue after removal
            this.tail = null;
        }

        return removedNodeValue;
        // Write your hypothesis on the time complexity of this method here O(1)
    }

}

module.exports = {
    Queue,
    SinglyLinkedNode
}
