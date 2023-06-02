// Basic implementation of Nodes and Linked List for you to use

class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(head = null) {
        this.head = head;
    }

    addToTail(val) {
        let newNode = new SinglyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            return this.head;
        }

        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }

        curr.next = newNode;
        return this.head;
    }

    listLength() {
        // Returns the length of the list
        if (this.head === null) return 0;
        let length = 1;
        let currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
            length++;
        }
        return length;
        // Implement in O(n) and in O(1) time complexity
    }

    sumOfNodes() {
        // Returns the sum of the values of all the nodes
        if (this.head === null) return 0;
        let sum = this.head.value;
        let currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
            sum += currentNode.value;
        }
        return sum;
        // Write your hypothesis on the time complexity of this method here O(n)
    }

    averageValue() {
        // Returns the average value of all the nodes
        if (this.head === null) return 0;
        let sum = this.head.value;
        let length = 1;
        let currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
            sum += currentNode.value;
            length++;
        }
        return sum / length;
        // Write your hypothesis on the time complexity of this method here O(n)
    }

    findNthNode(n) {
        // Returns the node at the nth index from the head
        if (this.head === null) return 0;
        let length = 1;
        let currentNode = this.head;
        while (length <= n) {
            currentNode = currentNode.next;
            length++;
        }
        console.log(currentNode.value)
        return currentNode;
        // Write your hypothesis on the time complexity of this method here O(n)
    }

    findMid() {
        // Returns the middle node
        const length = this.listLength();
        const mid = length % 2 === 0 ? (length / 2) - 1 : Math.floor(length / 2);

        return this.findNthNode(mid);
        // Implement this as a singly linked list then as a doubly linked list
            // How do the implementation for singly and doubly vary if at all?

        // Write your hypothesis on the time complexity of this method here O(n)
    }

    reverse() {
        // Returns a new reversed version of the linked list
        const result = new SinglyLinkedList();
        const length = this.listLength();

        for (let i = length - 1, currentNode; i >= 0; i--) {
            currentNode = this.findNthNode(i);
            result.addToTail(currentNode.value);
        }

        return result;
        // Write your hypothesis on the time complexity of this method here O(n2)
    }

    reverseInPlace() {
        // Reverses the linked list in-place
        let revList = this.reverse();

        this.head = null // make empty
        this.length = 0
        // copy     

        let currR = revList.head
        let curr = this.addToTail(currR.value)
        while (currR.next) {
            currR = currR.next;
            curr = this.addToTail(currR.value);
        }
        // Write your hypothesis on the time complexity of this method here O(n2)
    }
}

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
    }

    addToTail(val) {
        let newNode = new DoublyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this.head;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        return this.head;
    }

    findMid() {
        // Returns the middle node
        let length = 0;
        let currentNode = this.head;

        while (currentNode) {
            length++;
            currentNode = currentNode.next;
        }

        const mid = length % 2 === 0 ? (length / 2) - 1 : Math.floor(length / 2);
        currentNode = this.head;

        for (let i = 1; i <= mid; i++) {
            currentNode = currentNode.next;
        }

        return currentNode;
        // Implement this as a singly linked list then as a doubly linked list
            // How do the implementation for singly and doubly vary if at all?

        // Write your hypothesis on the time complexity of this method here O(n)
    }

    reverse() {
        // Returns a new reversed version of the linked list
        const result = new DoublyLinkedList();

        let current = this.tail;

        while (current) {
            result.addToTail(current.value)
            current = current.prev;
        }

        return result;
        // Write your hypothesis on the time complexity of this method here O(n)
    }

    reverseInPlace() {
        // Reverses the linked list in-place
        let length = 0;
        let lastNode = this.tail

        while (lastNode) {
            this.addToTail(lastNode.value);
            lastNode = lastNode.prev;
            length++;
        }

        let firstNode = this.head;

        for (let i = 0; i < length; i++) {
            const next = firstNode.next;
            firstNode.prev = null;
            firstNode.next = null;
            this.head = next;
            firstNode = next;
        }

        this.head.prev = null;
        // Write your hypothesis on the time complexity of this method here O(n)
    }
}

module.exports = {
    SinglyLinkedNode,
    SinglyLinkedList,
    DoublyLinkedNode,
    DoublyLinkedList
}
