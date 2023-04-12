import { Component } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}
