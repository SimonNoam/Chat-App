import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameBoard from '../components/GameBored';

const socket = io('http://localhost:3000');

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    socket.on('gameState', (board) => {
      setSquares(board);
    });

    socket.on('players', (players) => {
      setPlayers(players);
      setTurn(0);
    });
  }, []);

  function handleClick(index) {
    if (players[turn] === socket.id && squares[index] === null) {
      const newSquares = [...squares];
      newSquares[index] = turn === 0 ? 'X' : 'O';
      setSquares(newSquares);

      socket.emit('move', index);
      setTurn((turn + 1) % 2);
    }
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {players.length < 2 ? (
        <div>Waiting for another player...</div>
      ) : (
        <div>
          <div className="status">
            {squares.includes(null) ? (
              <div>Player {turn + 1}'s turn</div>
            ) : (
              <div>Game over!</div>
            )}
          </div>
          <GameBoard squares={squares} onClick={handleClick} />
        </div>
      )}
    </div>
  );
}

export default Game;