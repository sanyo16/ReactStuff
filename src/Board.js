import React from 'react';

function Square(props) {
    return (
      <button className={"square " + props.highlight} onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
  
    renderSquare(i) {
      return <Square 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          highlight={this.props.winnerLine && this.props.winnerLine.includes(i) ? 'highlight' : ''}
        />;
    }

    createBoard = () => {
      let board = []
      for (let i = 0; i < 3; i++) {
        let squares = []        
        for (let j = 0; j < 3; j++) {
          squares.push(this.renderSquare(3*i+j))
        }
        board.push(<div className="board-row">{squares}</div>);
      }
      return board;
    }
  
    render() {   
      return (
        <div>                        
          {this.createBoard()}
        </div>
      );
    }
  }

  export default Board;