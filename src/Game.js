import React from 'react';
import Board  from './Board';
import {calculateWinner, getPosition} from './Helper';


class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          position:  {x : 0, y : 0},
          isSelected: false 
        }],
        xIsNext: true,
        stepNumber: 0
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0,  this.state.stepNumber + 1);
      history.map(function(hist) { hist.isSelected = false; return hist});

      const current = history[history.length - 1];   
      const squares = current.squares.slice();
  
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : '0';
      this.setState(
        {
          history: history.concat([{
            squares: squares,
            position: getPosition(current.squares, squares)
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length
        });
    }
  
    jumpTo(move) {
        const history = this.state.history.slice(0, this.state.history.length);
        history.map(function(hist) { hist.isSelected = false; return hist});
        history[move].isSelected = true;

        this.setState({
            history: history,
            stepNumber: move,
            xIsNext: (move % 2) === 0,            
        })
    }
  
    sortMoves() {
      const history = this.state.history.slice(0,  this.state.history.length);
      this.setState(
        {         
          history: history.reverse()
        }
      );
    }

    render() {
      const history = this.state.history;
      const selectedMove = history.filter(hist => hist.isSelected === true);
      const current = selectedMove.length > 0 ? selectedMove[0] : history[this.state.stepNumber];
      const winnerData = calculateWinner(current.squares);
  
      let status;
      if (winnerData) {
        status = 'Winner: ' + winnerData.winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      const moves = history.map((step, move) => {
        const desc = `Go to move # (${history[move].position.x}, ${history[move].position.y})`
  
        return (
            <li key={move} className={this.state.history[move].isSelected ? 'active' : ''}>
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
            <div>{status}</div>
            <button onClick={()=> this.sortMoves()}>Sort moves</button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;