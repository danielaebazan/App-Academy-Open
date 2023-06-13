// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file
// Do not change this
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {

    constructor(root = null) {
        this.root = root;
    }

    insert(val, currentNode = this.root) {
        let newNode = new TreeNode(val);

        if (this.root === null) {           //if tree is empty
            this.root = new TreeNode(val);
            return;
        }

        if (val < currentNode.val) {          // if val is less than currentNode
            if (currentNode.left === null) {
                currentNode.left = new TreeNode(val)
            } else {
                this.insert(val, currentNode.left);
            }
            return;
        }

        if (currentNode.right === null) {         // else insert to the right
            currentNode.right = new TreeNode(val)
        } else {
            this.insert(val, currentNode.right);
        };

    }

    search(val, currentNode = this.root) {
        if (currentNode === null) return false;
        if (currentNode.val === val) return true;

        if (val < currentNode.val) {
            return this.search(val, currentNode.left)
        };

        if (val > currentNode.val) {
            return this.search(val, currentNode.right)
        }
    };


    preOrderTraversal(currentNode = this.root) {
        console.log(currentNode.val);

        if (currentNode.left) {
            this.preOrderTraversal(currentNode.left)
        };

        if (currentNode.right) {
            this.preOrderTraversal(currentNode.right)
        }
    }


    inOrderTraversal(currentNode = this.root) {
        if (currentNode === null) {
            return;
        }

        if (currentNode.left) {
            this.inOrderTraversal(currentNode.left)
        }
        console.log(currentNode.val);

        if (currentNode.right) {
            this.inOrderTraversal(currentNode.right);
        }
    }


    postOrderTraversal(currentNode = this.root) {
        if (currentNode === null) {
            return;
        }

        if (currentNode.left) {
            this.postOrderTraversal(currentNode.left)
        };

        if (currentNode.right) {
            this.postOrderTraversal(currentNode.right)
        }

        console.log(currentNode.val);
    }

    // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
        let queue = [this.root];
        let branch;

        while (queue.length) {
            branch = queue.shift();
            console.log(branch.val);

            if (branch.left) queue.push(branch.left);
            if (branch.right) queue.push(branch.right)
        }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
        let stack = [this.root];
        let branch;

        while (stack.length) {
            branch = stack.pop();
            console.log(branch.val);

            if (branch.left) stack.push(branch.left);
            if (branch.right) stack.push(branch.right)
        }
    }
}

module.exports = { BinarySearchTree, TreeNode };

