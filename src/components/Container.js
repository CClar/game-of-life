import React, { Component } from 'react';
import Cell from './Cell'


class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      x: 50,
      y: 50,
      count: 0,
      color: 1
    }
    this.timer = null;
    this.delay = 500;
  }
  componentDidMount() {
    this.setData();
    this.startGame();
  }
  setData = (x = this.state.x, y = this.state.y) => {
    const data = this.getData(x, y);
    this.setState({ data: data });
  }
  getData = (x, y) => {
    // generates a random array or cells
    const width = x;
    const height = y;
    let randomArray = [];
    for (let x = 0; x < width; x++) {
      randomArray[x] = [];
      for (let y = 0; y < height; y++) {
        const randomBool = Math.random() >= 0.5;
        randomArray[x][y] = randomBool;
      }
    }
    return randomArray;
  }
  liveNeighbours = (x, y) => {
    // returns number of live neighbours
    let testArray =
      [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1], [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
      ];
    let count = 0;
    testArray.forEach(([x, y]) => {
      try {
        const alive = this.state.data[x][y];
        if (alive) count++;
      } catch (e) { /* known typeerror*/ }
    })
    return count;
  }
  gameOfLife = (n, alive) => {
    if (alive) {
      //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      if (n < 2) return false;
      // Any live cell with two or three live neighbours lives on to the next generation.
      else if (n === 2 || n === 3) return true;
      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      else if (n > 3) return false;
    } else {
      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (n === 3) return true;
    }
    // else return default state
    return alive;
  }
  nextIteration = () => {
    const currentIt = this.state.data;
    const nextIt = currentIt.map((x, i) => {
      return x.map((y, j) => {
        const n = this.liveNeighbours(i, j);
        const alive = currentIt[i][j];
        const cell = this.gameOfLife(n, alive);
        return cell;
      })
    });
    this.setState({ count: this.state.count + 2 })
    return nextIt;
  }
  handleNextIt = () => {
    const nextIt = this.nextIteration();
    const nextColor = this.handleColor();
    this.setState({
      data: nextIt,
      color: nextColor
    });
  }
  handleColor = () => {
    let color;
    this.state.color < 360 ? color = this.state.color + 30 : color = 0;
    return color;
  }
  handleClick = (x, y) => {
    const currentData = this.state.data;
    let newData = currentData;
    newData[x][y] = !newData[x][y];
    this.setState({ data: newData });
  }
  startGame = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.handleNextIt, this.delay)
  }
  stopGame = () => {
    clearInterval(this.timer);
  }
  handleClear = () => {
    const data = this.state.data;
    const newData = data.map((v) => {
      return v.map((cell) => {
        return false;
      });
    });
    this.setState({ data: newData });
  }
  handleX = (e) => {
    const x = e.target.value;
    if (x > 0) {
      this.setState({ x: x },
        () => {
          this.setData();
        });
    };
  }
  handleY = (e) => {
    const y = e.target.value;
    if (y > 0) {
      this.setState({ y: y },
        () => {
          this.setData();
        });
    }
  }
  render() {
    return (
      <div className="Container">
        <div className="GameOfLife">
          {this.state.data.map((x, i) => {
            return <div key={i}>
              {x.map((y, j) => {
                return <Cell color={this.state.color} handleClick={this.handleClick} key={j} alive={y} x={i} y={j} />
              })}</div>
          })}
        </div>
        <div className="Buttons">
          <button onClick={this.startGame}>Start</button>
          <button onClick={this.stopGame}>Stop</button>
          <button onClick={this.handleNextIt}>Next It</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        <div className="WxH">
          <label>Width in Cells
          <input defaultValue={this.state.x} id="x" onChange={this.handleX} placeholder="width" type="text" />
          </label>
          <label>Height in Cells
          <input defaultValue={this.state.y} id="y" onChange={this.handleY} placeholder="height" type="text" />
          </label>
        </div>
        <div className="Labels">
          <label>Generations Passed
            <input readOnly value={this.state.count} />
          </label>
        </div>
      </div>
    );
  }
}

export default Container;
