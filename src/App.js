import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

// You need to debug React in the browser because changes are happening in the browser

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares()); // squares is updated here, has its new value
  const [player, setPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(`...`);

  // until the new render has occurred, the squares reported in onClickCallback is the same squares set up by the previous render
  const onClickCallback = (id) => {
    const updatedSquares = generateSquares();

    if (winner !== '...') return; // Don't continue updating after winner is declared
    
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (updatedSquares[row][col].id === id && squares[row][col].value === '') {
        updatedSquares[row][col].value = player;
        // console.log(updatedSquares)
        setPlayer(player === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        }
        else {
          updatedSquares[row][col].value = squares[row][col].value
        }
      }
    }

    setSquares(updatedSquares);
    // console.log(squares)
    checkForWinner(updatedSquares);
  }

  // Could also checkForWinner right before rendering

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = (squares) => {

    // console.log(squares)
    const flattenedArray = [].concat(...squares).flat();
    // console.log(flattenedArray)

    if (flattenedArray[0].value === flattenedArray[1].value && flattenedArray[1].value === flattenedArray[2].value && flattenedArray[0].value !== '') {
      setWinner(flattenedArray[0].value);
    }
    else if (flattenedArray[3].value === flattenedArray[4].value && flattenedArray[4].value === flattenedArray[5].value && flattenedArray[3].value !== '') {
      setWinner(flattenedArray[3].value);
    }
    else if (flattenedArray[6].value === flattenedArray[7].value && flattenedArray[7].value === flattenedArray[8].value && flattenedArray[6].value !== '') {
      setWinner(flattenedArray[6].value);
    }
    else if (flattenedArray[0].value === flattenedArray[3].value && flattenedArray[3].value === flattenedArray[6].value && flattenedArray[0].value !== '') {
      setWinner(flattenedArray[0].value);
    }
    // Center Column
    else if (flattenedArray[1].value === flattenedArray[4].value && flattenedArray[4].value === flattenedArray[7].value && flattenedArray[1].value !== '') {
      setWinner(flattenedArray[1].value);
    }
    // Right Column
    else if (flattenedArray[2].value === flattenedArray[5].value && flattenedArray[5].value === flattenedArray[8].value && flattenedArray[2].value !== '') {
      setWinner(flattenedArray[2].value);
    }
    else if (flattenedArray[0].value === flattenedArray[4].value && flattenedArray[4].value === flattenedArray[8].value && flattenedArray[0].value !== '') {
      setWinner(flattenedArray[0].value);
    }
    else if (flattenedArray[2].value === flattenedArray[4].value && flattenedArray[4].value === flattenedArray[6].value && flattenedArray[2].value !== '') {
      setWinner(flattenedArray[2].value);
    }
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.

    // Also: cease responding to clicks when winnner declared.
    // Q: How do you tie in tictactoe?? I only know about draws and wins??

    // winning combinations: 
    // - three across (row) => [row][0], [row][1], [row][2]
    // - three up and down (col) => [col][0], [col][1], [col][2]
    // - two diagonal options => [0][0], [1][1], [2][2] && [0][2], [1][1], [2][0]
    
    // for(let i = 0; i < squares.length; i ++){
    //     // check for a winning row
    //     if (squares[i][0].value !== '' && squares[i][0].value === squares[i][1].value && squares[i][1].value === squares[i][2].value){
    //       setWinner(squares[i][0].value);
    //       break;
    //     } 
    //     // check for a winning column
    //     else if (squares[0][i].value !== '' && squares[0][i].value === squares[1][i].value && squares[1][i].value === squares[2][i].value){
    //       setWinner(squares[0][i].value); 
    //       break;
    //     } 
    //     // check for diagonals  
    //     else if (squares[0][0].value !== '' && squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[2][2].value){
    //       setWinner(squares[0][0].value); 
    //       break;
    //     } 
    //     else if (squares[0][2].value !== '' && squares[0][2].value === squares[1][1].value && squares[1][1].value === squares[2][0].value){
    //       setWinner(squares[0][2].value);
    //       break;
    //     }     
    // }
  }

  const resetGame = () => {
    // Complete in Wave 4
    setPlayer(PLAYER_1);
    setSquares(generateSquares());
    setWinner(`...`);
  }
  // squares is updated here. You could also call checkForWinner here with squares directly
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* <h2>Current Player: {player} </h2> */}
        <h2>Winner is {winner} </h2>
        <button onClick={() => {resetGame()}}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/> 
        {/* prop name that is being passed down to board={the function that is defined above bc this is JS within JSX} */}
        {/* Beginning of the chain reaction where we hand the updateSquare method in as a prop to Board */}
      </main>
    </div>
  );
}

export default App;
