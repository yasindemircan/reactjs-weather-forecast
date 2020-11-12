import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  state = {
    value: "",
    width: window.innerWidth,
  };
  handleResize = (e) => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }
  parentFunction = (data_from_child) => {
    this.setState({ value: data_from_child });
  };

  DesktopSideBar() {
    return (
      <div className="App-sidebar-out">
        <div className="App-sidebar-inside">
          <Sidebar valueFromParent={this.state.value} />
        </div>
      </div>
    );
  }
  render() {
    const { width } = this.state;
    return (
      <div className="AppC">
        {width <= 500 ? "" : this.DesktopSideBar()}
        <div className="App-main-out">
          <div className="App-main-inside">
            <div className="App-navbar">
              <Navbar functionCallFromParent={this.parentFunction.bind(this)} />
            </div>
            {width <= 500 && this.state.value !== null
              ? this.DesktopSideBar()
              : ""}
            <Main />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
