from tree import Node

class KnightPathFinder:
    def __init__(self, xy):
        self.xy = xy
        self._root = Node(xy)
        self._considered_positions = set([xy])
    
    def get_valid_moves(self, pos): # returns valid new positions, not moves
        valid = set()
        move_opts = [(1, 2), (1,-2), (-1, 2), (-1, -2),
                     (2, 1), (2, -1), (-2, 1), (-2, -1)]
        
        for move in move_opts:
            (x0, y0) = pos
            x1 = x0 + move[0]
            y1 = y0 + move[1]
            if 0 <= x1 <= 7 and 0 <= y1 <= 7:
                valid.add((x1, y1))
        return valid

    def new_move_positions(self, pos):        
        valid = self.get_valid_moves(pos) 
        new =  valid - self._considered_positions
        # print('valid:', valid, 'self: ', self._considered_positions, 'new: ', new, 'NEXT-child: ')
        self._considered_positions.update(new) # adding only new valid pos
        return new

    def build_move_tree(self): # bread first recursive is not good, because it is stack-type, and here we need que-type.               
        queue = [self._root] # creting queue of nodes 
        while queue:
            cur_node = queue.pop(0) # taking/removing first node to process            
            cur_pos = cur_node.value
            children_positions = self.new_move_positions(cur_pos) #  making children positions
            for child_pos in children_positions: 
                child_node = Node(child_pos)  # creating child node
                cur_node.add_child(child_node)  #  double direction connect to current/parent
                queue.append(child_node)  # put in queue
        

    def find_path(self, end_position): # weird name, searches end_pos node
        root_node = self._root        
        end_node = root_node.depth_search(end_position)
        return self.trace_to_root(end_node)
    
    def trace_to_root(self, end_node):
        trace_from_parent = [end_node.value]        
        root_node = self._root        
        cur_node = end_node
        while cur_node is not root_node:
            parent = cur_node.parent
            trace_from_parent.insert(0, parent.value)
            cur_node = parent
        return trace_from_parent


# finder = KnightPathFinder((0, 0))
# print (finder.new_move_positions((0, 0)))
# finder = KnightPathFinder((0, 0))
# finder.build_move_tree()
# print(finder._root.children[0].value, finder._root.children[1].value)
finder = KnightPathFinder((0, 0))
finder.build_move_tree()
print(finder.find_path((2, 1))) # => [(0, 0), (2, 1)]
print(finder.find_path((3, 3))) # => [(0, 0), (2, 1), (3, 3)]
print(finder.find_path((6, 2))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (6, 2)]
print(finder.find_path((7, 6))) # => [(0, 0), (1, 2), (2, 4), (4, 3), (5, 5), (7, 6)]