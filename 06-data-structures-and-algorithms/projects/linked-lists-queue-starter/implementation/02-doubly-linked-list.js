// Node class is implemented for you, no need to look for bugs here!
class DoublyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addToHead(val) { 
        // There are bugs in this method! Fix them!!!
        // Write your hypothesis on the time complexity of this method here O(1)

        // Add node of val to head of linked list
        let newNode = new DoublyLinkedNode(val);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.length++;
    };

    addToTail(val) {
        // Add node of val to tail of linked list
        const newNode = new DoublyLinkedNode(val);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;

        // Write your hypothesis on the time complexity of this method here O(1)
    }

    removeFromHead() {
        // Remove node at head
        if (this.head === null) {
            return undefined; // Empty list, nothing to remove
        }

        const removedValue = this.head.value;
        this.length--;

        if (this.head === this.tail) {
            // Only one node in the list
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        return removedValue;

        // Write your hypothesis on the time complexity of this method here O(1)
    }

    removeFromTail() {
        // Remove node at tail
            if (this.tail === null) {
                return undefined; // Empty list, nothing to remove
            }

            const removedValue = this.tail.value;
            this.length--;

            if (this.head === this.tail) {
                // Only one node in the list
                this.head = null;
                this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }

            return removedValue;

        // Write your hypothesis on the time complexity of this method here O(1)
    }

    peekAtHead() {
        // Return value of head node
        if (this.head === null) {
            return undefined
        } else { 
            return this.head.value; 
        };
        // Write your hypothesis on the time complexity of this method here O(1)
    }

    peekAtTail() {
        // Return value of tail node
        if (this.tail === null) {
            return undefined
        } else {
            return this.tail.value; 
        };
        // Write your hypothesis on the time complexity of this method here O(1)
    }
}

module.exports = {
    DoublyLinkedList,
    DoublyLinkedNode
}
