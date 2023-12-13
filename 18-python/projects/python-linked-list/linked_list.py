"""
============================================================================
Implementation Exercise: Singly Linked List
============================================================================

-------
Phase 1:
-------
1. Node and LinkedList initialization
2. Getting a node by its position
3. Adding a node to the list's tail
4. Adding a node to list's head
5. Removing the head node
6. Removing the tail node
7. Returning the list length

-------
Phase 2:
-------

1. Check whether the list contains_value a value
2. Inserting a node value into the list at a specific position
3. Updating a list node's value at a specific position
4. Removing a node value from the list at a specific position
5. Format the list as a string whenever `print()` is invoked
"""
p = print
# Phase 1

# Linked List Node class here
class Node:
  # TODO: Set the `_value` `_next` node instance variables
  def __init__(self, value):
    self._value = value
    self._next = None

  def __repr__(self):    
    next = None
    if self._next: next = self._next._value
    return f"{{_value: {str(self._value)}, _next: {str(next)}}}"
    # (double curly in format is string curly)

# Singly Linked List class here
class LinkedList:
  #  the `_head` node, `_tail` node, and list `_length` instance variables
  def __init__(self):
    self._head = None
    self._tail = None
    self._length = 0

  #  the get_node method here
  def get_node(self, position):
    node = self._head
    for p in range(1, position + 1): # this skips if pos = 0 and do all other pos
      node = node._next
    return node
    
  # the add_to_tail method here
  def add_to_tail(self, value):
    #creating new node:
    new_node = Node(value)
    # setting to LL:
    if self._head is None:
      self._head = self._tail = new_node
    else:
      self._tail._next = self._tail = new_node

    self._length += 1  
    return self

  # the add_to_head method here
  def add_to_head(self, value):
    #creating new node:
    new_node = Node(value)
    # setting to LL:
    if self._head is None:
      self._head = self._tail = new_node
    else:
      new_node._next = self._head
      self._head = new_node

    self._length += 1  
    return self    

  #  the remove_head method here
  def remove_head(self):
    if self._head is None: return None

    removed = self._head
    self._head = self._head._next
    self._length -=1
    if self._length == 0: self._tail = None

    return removed

  #  the remove_tail method here
  def remove_tail(self):
    if self._head is None: return
    if self._head is self._tail:
      removed = self._head
      self._head = self._tail = None
      self._length = 0
      return removed

    current_node = self._head    
    while current_node.next:
      new_tail = current_node
      current_node = current_node.next
    
    # when found:
    self._tail = new_tail
    new_tail._next = None
    length -= 1
    return current_node # removed one    

  #  the __len__ method here
  def __len__(self):
    return self._length

# Phase 2

  # the contains_value method here
  def contains_value(self, target):
    if not self._head: return False

    current_node = self._head
    for p in range(0, self._length):
      if current_node._value == target: return True
      current_node = current_node._next
    return False
    

  # the insert_value method here
  def insert_value(self, position, value):    
    if position == 0: return self.add_to_head(value)
    if position == self._length: return self.add_to_tail(value)
    if position < 0 or position > self._length: return False
    new_node = Node(value)
    previous_node = self.get_node(position - 1)    
    node_to_move = previous_node._next
    previous_node._next = new_node
    new_node._next = node_to_move
    self._length += 1
    return True

  # the update_value method here
  def update_value(self, position, value):
    node_to_update = self.get_node(position)
    if node_to_update:
      node_to_update._value = value
      return True
    else:
      return False

  # TODO: Implement the remove_node method here
  def remove_node(self, position):
    if position == 0: return self.remove_head()
    if position == self._length: return self.add_to_tail()
    if position < 0 or position > self._length: return None
   
    previous_node = self.get_node(position - 1)    
    node_to_remove = previous_node._next
    previous_node._next = node_to_remove._next    
    self._length -= 1
    return node_to_remove


  # the __str__ method here
  def __str__(self):
    if not self._head: return 'Empty List'

    string = ''
    current_node = self._head
    for p in range(0, self._length):
      string +=  str(current_node._value)
      if p < self._length - 1:
        string += ', '
      current_node = current_node._next
    return string  
    

p("# Phase 1 Manual Testing:")

p('# 1. Test Node and LinkedList initialization')
node = Node('hello')
print(node)                                     # <__main__.Node object at ...>
print(node._value)                              # hello
linked_list = LinkedList()
print(linked_list)                              # <__main__.LinkedList object at ...>

p('# 2. Test getting a node by its position')
print(linked_list.get_node(0))                # None

p("# 3. Test adding a node to the list's tail")
linked_list.add_to_tail('new tail node')
print(linked_list.get_node(0))                # <__main__.Node object at ...>
print(linked_list.get_node(0)._value)         # `new tail node`

p("# 4. Test adding a node to list's head")
linked_list.add_to_head('new head node')
print(linked_list.get_node(0))                # <__main__.Node object at ...>
print(linked_list.get_node(0)._value)         # `new head node`

p('# 5. Test removing the head node')
linked_list.remove_head()
print(linked_list.get_node(0)._value)         # `new tail node` because `new head node` has been removed
print(linked_list.get_node(1))                # `None` because `new head node` has been removed

p('# 6. Test removing the tail node')
print(linked_list.get_node(0)._value)         # `new tail node`
linked_list.remove_tail()
print(linked_list.get_node(0))                # None

p('# 7. Test returning the list length')
print(len(linked_list))                                 # 2

p("# Phase 2 Manual Testing")

p('# 1. Test whether the list contains_value a value')
linked_list = LinkedList()
linked_list.add_to_head('new head node')
print(linked_list.contains_value('new head node'))      # True
print(linked_list.contains_value('App Academy node'))   # False

p('# 2. Test inserting a node value into the list at a specific position')
linked_list.insert_value(0, 'hello0!')
print(linked_list.get_node(0)._value)                   # `hello!`
linked_list.insert_value(0, 'hello1!')
print(linked_list.get_node(0)._value)                   # `hello!`
linked_list.insert_value(0, 'hello2!')
print(linked_list.get_node(0)._value)                   # `hello!`
linked_list.insert_value(2, 'hello22!')
print(linked_list.get_node(2)._value)                   # `hello!`



p("# 3. Test updating a list node's value at a specific position")
linked_list.update_value(0, 'goodbye!')
print(linked_list.get_node(0)._value)                   # `goodbye!`

p('# 4. Test removing a node value from the list at a specific position')
print(linked_list.get_node(1)._value)                   # `new head node`
linked_list.remove_node(1)
print(linked_list.get_node(1))                          # None

p('# 5. Format the list as a string whenever `print()` is invoked')
new_linked_list = LinkedList()
print(new_linked_list)                  # Empty List
new_linked_list.add_to_tail('puppies')
print(new_linked_list)                  # puppies
new_linked_list.add_to_tail('kittens')
print(new_linked_list)                  # puppies, kittens
