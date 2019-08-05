const newDisplayed = (displayed, mines, rows, columns, index, flagged) => {
  const [ row, column ] = index;
  let result =  copy(displayed);
  let queue = [[row, column]];
  let visited = {}

  set(result, [row, column], true);

  while (queue.length > 0) {
    const currentTile = queue.shift();

    set(result, currentTile, true);
    if (!get(mines, currentTile) && peripheralCount(mines, currentTile) === 0){
      const neighbors = getNeighbors(currentTile, rows, columns,
        mines, flagged, visited);

      neighbors.forEach(neighbor => {
        set(visited, neighbor, true);
        queue.push(neighbor);
      });
    }
  }
  return result;
}

const copy = object => {
  return Object.keys(object).reduce((acc, i) => {
    acc[i] = Object.keys(object[i]).reduce((acc2, j) => {
      acc2[j] = object[i][j]
      return acc2
    }, {})
    return acc
  }, {})
}

const get = (object, [i, j]) =>  Boolean(object[i] && object[i][j]);

const set = (object, [i, j], value) => {
  if (object[i] === undefined) object[i] = {}
  object[i][j] = value
}

const mineAt = (mines, array) => get(mines, array);

const flagAt = (flagged, array) => get(flagged, array);

const getNeighbors = (index, rows, columns, mines, flagged, visited) => {
  const [ row, column ] = index;
  const neighbors = [
    [row - 1, column],
    [row + 1, column],
    [row, column + 1],
    [row, column - 1],
    [row + 1, column + 1],
    [row + 1, column - 1],
    [row - 1, column + 1],
    [row - 1, column - 1]
  ]

  return neighbors.filter(([i, j]) => {
    if (i < 0) return false;
    if (j < 0) return false;
    if (i > rows - 1) return false;
    if (j > columns - 1) return false;
    if (mineAt(mines, [i, j])) return false;
    if (flagAt(flagged, [i, j])) return false;
    if (get(visited, [i, j])) return false;
    return true;
  })
}

const peripheralCount = (mines, [i, j]) => {
  let count = 0;

  if (mines[i - 1] && mines[i - 1][j]) count++
  if (mines[i + 1] && mines[i + 1][j]) count++
  if (mines[i] && mines[i][j - 1]) count++
  if (mines[i] && mines[i][j + 1]) count++
  if (mines[i - 1] && mines[i - 1][j - 1]) count++
  if (mines[i - 1] && mines[i - 1][j + 1]) count++
  if (mines[i + 1] && mines[i + 1][j - 1]) count++
  if (mines[i + 1] && mines[i + 1][j + 1]) count++

  return count;
}


export default newDisplayed;
