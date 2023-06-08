const LinkedList = require('./linked-list.js');
const DoublyLinkedList = require('./doubly-linked-list.js');

/*
Construct a timing test to verify the time complexities of `addToHead` and
`addToTail` for both singly and doubly linked lists.
*/

// Helper function to generate a random value
function generateRandomValue() {
    return Math.floor(Math.random() * 100);
}

// Timing test for Singly Linked List addToHead and addToTail
function testSinglyLinkedList() {
    const linkedList = new LinkedList();
    const iterations = 1000000;

    console.log('Timing test for Singly Linked List');

    // Measure execution time for addToHead
    console.time('addToHead');
    for (let i = 0; i < iterations; i++) {
        const value = generateRandomValue();
        linkedList.addToHead(value);
    }
    console.timeEnd('addToHead');

    // Measure execution time for addToTail
    console.time('addToTail');
    for (let i = 0; i < iterations; i++) {
        const value = generateRandomValue();
        linkedList.addToTail(value);
    }
    console.timeEnd('addToTail');
}

// Timing test for Doubly Linked List addToHead and addToTail
function testDoublyLinkedList() {
    const doublyLinkedList = new DoublyLinkedList();
    const iterations = 1000000;

    console.log('Timing test for Doubly Linked List');

    // Measure execution time for addToHead
    console.time('addToHead');
    for (let i = 0; i < iterations; i++) {
        const value = generateRandomValue();
        doublyLinkedList.addToHead(value);
    }
    console.timeEnd('addToHead');

    // Measure execution time for addToTail
    console.time('addToTail');
    for (let i = 0; i < iterations; i++) {
        const value = generateRandomValue();
        doublyLinkedList.addToTail(value);
    }
    console.timeEnd('addToTail');
}

// Run the timing tests
testSinglyLinkedList();
testDoublyLinkedList();

/*
General result - adding to head or tail of doubly linked list
and adding to head of linked list are relatively inexpensive operations
but for any volume, adding to the tail of a singly linked list
is prohibitve.
*/
