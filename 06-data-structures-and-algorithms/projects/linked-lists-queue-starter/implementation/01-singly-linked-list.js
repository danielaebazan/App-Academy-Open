// Node class is implemented for you, no need to look for bugs here!
class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addToHead(val) { 
        // Add node of val to head of linked list
        const newNode = new SinglyLinkedNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;

        return this;
        // Write your hypothesis on the time complexity of this method here: O(1)
        
    }

    addToTail(val) {
        // There are bugs in this method! Fix them!!!
        // Write your hypothesis on the time complexity of this method here O(n)

        // Add node of val to tail of linked list
        const newNode = new SinglyLinkedNode(val);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
        }
        current.next = newNode;
        }
        this.length++;

        return this;
    }

    removeFromHead() {
        // Remove node at head
        if (this.head === null) {
            return undefined
        }
        const removedNode = this.head;
        this.head = this.head.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
        }

        return removedNode;
        // Write your hypothesis on the time complexity of this method here O(1)
    }
        
    removeFromTail() {
        // Remove node at tail
        if (this.head === null) {
            return undefined
        }
        let removedNode;
        if (this.head.next === null) {
            removedNode = this.head;
            this.head = null;
        } else {
            let current = this.head;
            while (current.next.next !== null) {
                current = current.next
            }
            removedNode = current.next;
            current.next = null;
        }
        this.length--;

        return removedNode;

        // Write your hypothesis on the time complexity of this method here O(n)
    };

    peekAtHead() {
        // Return value of head node
        if (this.head === null) {
            return
        } else {
            return this.head.value;
        };
        // Write your hypothesis on the time complexity of this method here O(1)
    }

    print() {
        // Do not print anything when there are no nodes
        if (this.head === null) {
            return;
        }

        let current = this.head;
        let output = "";

        while (current.next !== null) {
            output += current.value + " -> ";
            current = current.next;
        }

        output += current.value + " -> NULL";
        console.log(output);
    }
        // Write your hypothesis on the time complexity of this method here O(n)

}

module.exports = {
    SinglyLinkedList,
    SinglyLinkedNode
}
