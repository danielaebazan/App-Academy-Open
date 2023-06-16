/* 1.
    Mirror image trees
Google asks in its interview process for you to draw an algorithm on a board that would return true 
if a binary tree is a mirror image of another binary tree.
*/

// Binary tree: Nodes at most 2 children
//Mirror image: Swapping the left and right children of each node, positions of the left and rigth value are interchanged
//Breadth-first traversal will visit each node in a particular level before moving down to the next level.

//the input is 2 binary trees, te first one to check if its a mirror of the second one
//the output is true or false

// if its only 1 node and the nodes are the same is mirrored
// if its only 2 nodes and the nodes are  swapped is mirrored

//Traverse the binary tree and put the values on an array it has to be done per levels, compare the 2 arrays to se if they are reversed. 

/*
Given two trees, return true if they are mirror of each other
    -Base case : Both empty 
    -If only one is empty
    -Both non-empty, compare them recursively Note that in recursive calls, we
    -pass left of one tree and right of other tree

*/


function areMirror(root1, root2) {

    if (root1 == null && root2 == null)
        return true;
  
    if (root1 == null || root2 == null)
        return false;

 
    return root1.value === root2.value && areMirror(root1.left, root2.right) && areMirror(root1.right, root2.left);
}

/* Test for is Mirror 
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};

let root1 = new Node('A');
root1.left = new Node('B');
root1.right = new Node('C');

let root2 = new Node('A');
root2.left = new Node('C');
root2.right = new Node('B');

console.log(areMirror(root1, root2));
*/

/* 2.
Show an algorithm that will reverse a singly-linked list, that is, a list that is made of nodes between which 
there is a unidirectional association.

We’ll start at the top with the head node to reverse the list then recursively traverse down the call stack 
until we reach the last node. When we reach the last node, we can then traverse back up the call stack reversing 
the list by adjusting each node’s next pointer along the way. Once we’re back at the top since we kept a reference 
to the last node (the new head) we can just return it giving us a completely reversed list.

*/

const SinglyLinkedListNode = {
    data: null,
    next: null
}

function recursivelyReverseList(head) {
    // base case
    if (head === null || head.next === null) {
        return head;
    }
    let reversedHead = recursivelyReverseList(head.next);
    head.next.next = head;
    head.next = null;
    return reversedHead;
}

/* 3.
derive an algorithm that will inspect an array of of numbers that contains the values between 0 and 
the length of the list, inclusive, and find the missing value. For example, you may be given an array that of 
length 6 that contains [0, 2, 3, 4, 5, 6]
*/

let insArray = function (arr) {
    let result = []

    for (let i = 0; result.length < 1; i++) {
        if (arr[i] !== i) {
            result.push(i)
        }
    }
    return result.join()
}

let array = [0, 2, 3, 4, 5, 6]
console.log(insArray(array));

/* 4.
Design a stack that, in addition to the push and pop functions, has a function min that returns the minimum 
element in the stack without removing it. All three functions push, pop, and min should operate in O(1) time.
*/

/* 5.
write the tests cases for testing a ballpoint pen. What would you consider to be good tests for the pen? 
Try to be as exhaustive as possible.

-Verify if the pen is with a cap or without a cap.
-Verify the color of the ink on the pen.
-Check the odor of the pen’s ink on writing over a surface.
-Verify the surfaces over which the pen is able to write smoothly apart from paper e.g. cardboard, rubber surface, etc.
-
*/

/* 6.
Specify the classes that it would take to write software to manage a paid parking lot. It should know where 
cars are parked, be able to identify the cars, know where the keys are hanging, how many cars are in the lot, 
what time the cars come and go, and how much it costs someone when they leave the parking lot based on the 
following schedule:

TIME	RATE PER HOUR
8pm - 6am	$3
6am - noon	$10
noon - 6pm	$8
6pm - 8pm	$6

https://www.freecodecamp.org/news/parking-lot-challenge-solved-in-javascript/
*/

class ParkingLot {
    slots = [];

    constructor(parkingSize) {
        this.slots = new Array(parkingSize).fill(null);
    }

    park(carId) {
        console.log(`Parking car: ${carId}`);
        if (this.slots.every((slot) => slot !== null)) {
            return false;
        }

        for (let i = 0; i <= this.slots.length; i++) {
            const slot = this.slots[i];

            if (slot === null) {
                this.slots[i] = carId;
                return true;
            }
        }
    }

    remove(carId) {
        console.log(`Leaving car: ${carId}`);
        if (this.slots.every((slot) => slot !== carId)) {
            return false;
        }

        for (let i = 0; i <= this.slots.length; i++) {
            const slot = this.slots[i];

            if (slot === carId) {
                this.slots[i] = null;
                return true;
            }
        }
    }

    getSlots() {
        console.log(`Parking slots: ${this.slots}`);
        return this.slots;
    }

    getSize() {
        console.log(`Parking size is: ${this.slots.length}`);
        return this.slots.length;
    }

    getAvailable() {
        const availableSlots = this.slots.filter((s) => s === null).length;
        console.log(`Available parking slots: ${availableSlots}`);
        return availableSlots;
    }

    isFull() {
        return this.getAvailable() === 0;
    }
}







