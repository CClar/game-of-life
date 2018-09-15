import React, { Component } from 'react';
import Container from './Container'

class Main extends Component {
  // Contains the description and the container that holds the actual game
  render() {
    return (
      <div className="Main">
        <div className="Description">  
          <h1>Conway's Game of Life</h1>
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
          The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.
          <br /><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>
          </p>
          <h2>Rules</h2>
          <ol>
            <li>Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
          </ol>
          <h2>Extra Info</h2>
          <ul>
            <li>Live cells are the colored cells, dead cells are blank.</li>
            <li>You can choose the board size by indicating the number of rows and columns.</li>
            <li>The color changes by moving the RGB HEX values 30 values every generation.</li>
            <li>The "Next It" button forwards the generations by 1.</li>
            <li>You can click on the board to add your own cells, though you might want to stop the generations before doing so.</li>
            <li>Some patterns, 2x2 or 1x3, will lead to infinite loops, as long as other cells do not interfere.</li>
            <li>The app is not optimized, be careful when increasing over 100x100cells.</li>
          </ul>
        </div>
        <Container />
      </div>
    );
  }
}

export default Main;
