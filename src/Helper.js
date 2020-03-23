function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {line: lines[i], winner: squares[a]};
      }
    }
    return null;
  }

  function getPosition(i) {
    return {x: Math.floor(i / 3) + 1 , y: i % 3 + 1}
  }

  export {calculateWinner, getPosition};