const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (root) {
  if (root === null) {
    return null;
  }

  while (root.left !== null) {
    root = root.left;
  }

  return root.val;
}

function findMaxBST(root) {
  if (root === null) {
    return null;
  }

  while (root.right !== null) {
    root = root.right;
  }

  return root.val;
}

function findMinBT (root) {
  if (root === null) {
    return Infinity;
  };

  let min = root.val;
  let leftMin = findMinBT(root.left);
  let rightMin = findMinBT(root.right);
    
    min = Math.min(min, leftMin, rightMin);

    return min;
  
}

function findMaxBT (root) {
  if (root === null) {
    return -Infinity;
  };

  let max = root.val;
  let leftMax = findMaxBT(root.left);
  let rightMax = findMaxBT(root.right);

  max = Math.max(max, leftMax, rightMax);

  return max;
}

function getHeight (root) {
  if (root === null) {
    return -1;
  }

  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);

  return Math.max(leftHeight, rightHeight) + 1;

}

function balancedTree(rootNode) {
  if (rootNode == null) return true;

  let left = getHeight(rootNode.left);
  let right = getHeight(rootNode.right);

  return Math.abs(left - right) <= 1 &&
    balancedTree(rootNode.left) == true &&
    balancedTree(rootNode.right) == true;
}

function countNodes (root) {
  if (root === null) {
    return 0;
  }

  let leftCount = countNodes(root.left);
  let rightCount = countNodes(root.right);

  return leftCount + rightCount + 1;
}

function getParentNode(rootNode, target) {
  
  if (rootNode === null) return undefined

 
  if (rootNode.val === target) return null;

  
  if (rootNode.left && rootNode.left.val === target ||
    rootNode.right && rootNode.right.val === target) return rootNode;

 
  return getParentNode(rootNode.left, target) ||
    getParentNode(rootNode.right, target);
}

function inOrderPredecessor(rootNode, target) {
  if (rootNode == null) return null;

  if (target <= rootNode.val) {
    return inOrderPredecessor(rootNode.left, target);
  }

  return inOrderPredecessor(rootNode.right, target) || rootNode.val;
}

// deleteNodeBST

// Do a traversal to find the node. Keep track of the parent

  // Undefined if the target cannot be found

  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child
function deleteNodeBST(rootNode, target) {

  function findNode(rootNode, target) {
    let found = null;

    // start stack with just rootNode
    let stack = [rootNode];

    while (stack.length > 0) {
      // check the top of the stack
      let top = stack.pop();
      if (top.val === target) {
        found = top;
      }

      // push right onto stack
      if (top.right) { stack.push(top.right); }

      // push left onto stack
      if (top.left) { stack.push(top.left); }
    }

    return found;
  }

  let node = findNode(rootNode, target);
  if (!node) return undefined;

  // Set target based on parent
  let parent = getParentNode(rootNode, target);

  let children = 0;
  if (node.left) { children++; }
  if (node.right) { children++; }

  // Case 0: Zero children and no parent:
  //   return null
  if (!children && !parent) return null;

  // Case 1: Zero children:
  //   set the parent that points to it to null
  if (!children) {
    if (parent.val > node.val) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }

  // Case 2: Two children:
  //   set the value to its in-order predecessor, then delete the predecessor
  if (children === 2) {

    const predecessor = inOrderPredecessor(rootNode, target);
    node.val = predecessor;

    const parentOfPredecessor = getParentNode(node.left, node.val);

    if (!parentOfPredecessor) node.left = null;
    if (parentOfPredecessor) parentOfPredecessor.right = null;

  }

  // Case 3: One child:
  //   Make the parent point to the child
  if (children === 1) {
    let child = null;

    if (node.left) child = node.left;
    else child = node.right;

    if (parent.val > node.val) parent.left = child;
    else parent.right = child;
  }

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}