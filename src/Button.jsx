import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    return (
      <div
        className={`button ${
          !isNaN(this.props.children) ||
          this.props.children == "." ||
          this.props.children == "="
            ? ""
            : "operator"
        } ${this.props.children == "C" ? "clear" : ""}`}
        onClick={() => this.props.handleClick(this.props.children)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
