class Node:
    def __init__(self, value):
        self._value = value
        self._parent = None
        self._children = []
    
    @property
    def value(self):
        return self._value
    
    @property
    def children(self):
        return self._children
    
    def add_child(self, node):
        # print ('self._children', self._children, 'node', node)
        # print('node not in self._children:', node not in self._children)
        if node not in self._children:
            self._children.append(node)
            if not node.parent is self: 
                node.parent = self # setting, but avoid recursion
    
    def add_children(self, children):
        for child in children:
            self.add_child(child)        
            

    def remove_child(self, node):
        if node in self._children: 
            self._children.remove(node)
            node.parent = None
        # else: print('Nothing to remove')

    @property
    def parent(self):
        return self._parent
    
    @parent.setter
    def parent(self, node):
        if self._parent is node: return # do nothing avoid recursive recall
        if self._parent: #  remove the child from the existing parent (if one exists)
            self._parent.remove_child(self)
        self._parent = node # setting parent. If parrent not None then add self to this parent as child
        if self._parent: self._parent.add_child(self) #  input parent node is not None before adding the child node to the parent.
    
    def depth_search(self, value):
        # visited = set()
        # visited.add(self)
        # stack = [self]
        # while (len(stack) > 0):
        #     current = stack.pop()
        #     # print(current.value)
        #     if current.value == value: return current # found
            
        #     children = current.children
        #     for child in children:
        #         if not child in visited:
        #             visited.add(child)
        #             stack.append(child)
        # return None # not found value
        ## iterative search above works, but not passing some weird Mock test.

        # Recursive:
        if self.value == value:
            return self

        if self.children:
            for child in self.children:
                result = child.depth_search(value)
                if result:
                    return result
        return None # if not found
    
    def breadth_search(self, value):
        if self._value == value:
            return self
        if not self.children:
            return None
        
        for child in self.children: # scan 1 level childs if exist for value
            if child._value == value:
                return child
        for child in self.children: # for all 1 level childrens check if they had value inside
            child_result = child.breadth_search(value)
            if child_result:        # if yes , use their result
                return child_result


        return None # not found

# node1 = Node("root1")
# node2 = Node("root2")
# node3 = Node("root3")

# node3.parent = node1
# node3.parent = node2

# print(node1.children)
# print(node2.children)
    

# parent = Node('parent')
# child = Node('child')

# parent._children.append(child)
# child._parent = parent

# print(child._parent.value)
# print(parent._children[0].value)

# parent.remove_child(child)
# print(child._parent)
# print(parent._children)


# child1 = Node('child1')
# parent = Node('parent')
# child2 = Node('child2')

# child1.parent = parent
# print('1child1.children', child1.children)
# child2.parent = parent
# print('2child1.children', child1.children)


# child1.add_child(child2)
# print('3child1.children[0].value', child1.children[0].value)
# print('4child1.children', child1.children)