import React from 'react';
import Board  from './Board';
import {calculateWinner, getPosition} from './Helper';


class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        positions: []       
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0,  this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      const positions = this.state.positions.slice();
  
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : '0';
      this.setState(
        {
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length,
          positions: positions.concat(getPosition(i))
        });
    }
  
    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0,            
        })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winnerData = calculateWinner(current.squares);
  
      let status;
      if (winnerData) {
        status = 'Winner: ' + winnerData.winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      const moves = history.map((step, move) => {
        const desc = move ? 
          `Go to move # (${this.state.positions[move-1].x} , ${this.state.positions[move-1].y})` :
          'Go to game start';
  
        return (
            <li key={move} className={this.state.stepNumber === move ? 'active' : ''}>
                <button onClick={()=>this.jumpTo(move)}>{desc}</button>
            </li>
        )
      })  
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winnerLine={!winnerData ? null : winnerData.line}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;