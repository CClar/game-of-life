import React, { Component } from 'react';

class Cell extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.x, this.props.y);
  }
  render() {
    return (
      <div
        id={this.props.alive ? "alive" : "dead"}
        className="Cell"
        onClick={this.handleClick}
        style={this.props.alive ?
          { backgroundColor: `hsl(${this.props.color}, 60%, 50%)` } :
          { backgroundColor: "white" }}
      />
    );
  }
}

export default Cell;
