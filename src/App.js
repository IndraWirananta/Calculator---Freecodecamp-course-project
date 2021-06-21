import React, { Component } from "react";
import "./App.css";
import Button from "./Button.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastInput: "",
      display: "",
      calculation: "",
    };
    this.addToInput = this.addToInput.bind(this);
    this.clear = this.clear.bind(this);
    this.delete = this.delete.bind(this);
    this.getResult = this.getResult.bind(this);
  }
  addToInput(val) {
    this.setState({
      lastInput: val,
    });
    if (
      this.state.calculation == "" &&
      (val == "%" || val == "/" || val == "x")
    ) {
      console.log("Nope");
    } else if (
      isNaN(this.state.calculation) &&
      this.state.calculation != "." &&
      val == "."
    ) {
      this.setState({
        display: this.state.display + "0.",
        calculation: this.state.calculation + "0.",
      });
    } else if (this.state.lastInput == "%" && !isNaN(val)) {
      this.setState({
        display: this.state.display + "x" + val,
        calculation: this.state.calculation + "x" + val,
      });
    } else if (
      isNaN(this.state.lastInput) &&
      this.state.lastInput != "" &&
      this.state.lastInput != "%" &&
      isNaN(val)
    ) {
      this.setState({
        calculation:
          this.state.calculation.slice(0, this.state.calculation.length - 1) +
          val,
      });

      if (this.state.calculation.length <= 20) {
        this.setState({
          display:
            this.state.calculation.slice(0, this.state.calculation.length - 1) +
            val,
        });
      } else {
        this.setState({
          display:
            this.state.calculation.slice(
              this.state.calculation.length - 20,
              this.state.calculation.length - 1
            ) + val,
        });
      }
    } else {
      this.setState({
        calculation: this.state.calculation + val,
      });
      if (this.state.calculation.length <= 20) {
        this.setState({
          display:
            this.state.calculation.slice(0, this.state.calculation.length) +
            val,
        });
      } else {
        this.setState({
          display:
            this.state.calculation.slice(
              this.state.calculation.length - 20,
              this.state.calculation.length
            ) + val,
        });
      }
    }
    console.log(this.state.calculation, this.state.display);
  }
  clear() {
    this.setState({
      lastInput: "",
      display: "",
      calculation: "",
    });
  }
  delete() {
    this.setState({
      calculation: this.state.calculation.slice(
        0,
        this.state.calculation.length - 1
      ),
    });
    if (this.state.calculation.length <= 20) {
      this.setState({
        display: this.state.calculation.slice(
          0,
          this.state.calculation.length - 1
        ),
      });
    } else {
      this.setState({
        display: this.state.calculation.slice(
          this.state.calculation.length - 20,
          this.state.calculation.length - 1
        ),
      });
    }
    this.setState({
      lastInput: this.state.calculation[this.state.calculation.length - 2],
    });
    console.log(this.state.calculation, this.state.display);
  }
  getResult() {
    let result = this.state.calculation.match(/(\-?x?\+?\/?[123.4567890%]+)/g);
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      if (result[i][result[i].length - 1] == "%") {
        let operator = "";
        if (result[i][0] == "/" || result[i][0] == "x") {
          operator = result[i][0];
          result[i] = result[i].slice(1);
        }

        result[i] =
          parseFloat(result[i].slice(0, [result[i].length - 1])) / 100;
        result[i] = operator + result[i];
      }
      if (result[i][0] == "+" || result[i][0] == "-" || !isNaN(result[i][0])) {
        result[i] = parseFloat(result[i]);
      }
    }
    console.log(result);
    function count(array) {
      let i = 0;
      while (typeof array[i] != "string" && array[i] != null) {
        i++;
      }
      if (array[i] == null) {
        return array;
      }
      console.log(array[i]);

      if (String(array[i])[0] == "x") {
        array[i - 1] = array[i - 1] * parseFloat(array[i].slice(1));

        array.splice(i, 1);
      } else if (String(array[i])[0] == "/") {
        array[i - 1] = array[i - 1] / parseFloat(array[i].slice(1));
        array.splice(i, 1);
      }
      console.log(array);
      return count(array);
    }
    result = count(result);
    result = result.reduce((a, b) => a + b, 0);
    this.setState({
      display: String(result),
      calculation: String(result),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="display-wrapper">
            <div className="display">{this.state.display}</div>
          </div>
          <div className="row" id="top_operator">
            <Button id="clear_button" handleClick={this.clear}>
              C
            </Button>
            <Button handleClick={this.delete}>DEL</Button>
            <Button handleClick={this.addToInput}>%</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>x</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.getResult}>=</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
