function getNeighbors(row, col, graph) {
  let neighbors = []

  // Check top 
  if (row > 0 && graph[row - 1][col])
    neighbors.push([row - 1, col]);
  // Check bottom
  if (row < graph.length - 1 && graph[row + 1][col])
    neighbors.push([row + 1, col]);
  // Check left
  if (col > 0 && graph[row][col - 1])
    neighbors.push([row, col - 1]);
  // Check right
  if (col < graph[0].length - 1 && graph[row][col + 1])
    neighbors.push([row, col + 1])

  // Return neighbors
  return neighbors;
}


function islandSize(row, col, graph) {

  // Create a visited set to store visited nodes
  let visited = new Set();

  // Create a stack, put the starting node in the stack
  let stack = [[row, col]];

  // Put the stringified starting node in visited
  visited.add(`${row}, ${col}`)

  // Initialize size to 0
  let size = 0;
  // While the stack is not empty,
  while (stack.length > 0) { 
    // Pop the first node
    let node = stack.pop();
    // DO THE THING (increment size by 1)
    size++;
    // Then push all the UNVISITED neighbors on top of the stack
    let [row, col] = node;
    let neighbors = getNeighbors(row, col, graph);
    for (let neighbor of neighbors) {
      let [row, col] = neighbor;
    // HINT: This is what your helper function `getNeighbors` is for
    // HINT: Remember, you're storing your visited nodes as strings!
    if (!visited.has(`${row}, ${col}`)) {
      stack.push(neighbor);

      // and mark them as visited
      visited.add(`${row}, ${col}`)
       }
    }
  }
  // return size
  return size;
}

module.exports = [getNeighbors, islandSize];