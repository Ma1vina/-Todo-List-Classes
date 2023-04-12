import React from "react";
import "./header.style.css";
import doneLogo from "../../image/done.png";
import flame from "../../image/flame.png";
import archLogo from "../../image/arch.png";
import stick from "../../image/stick.svg";
import { NavLink } from "react-router-dom";
import { Theme } from "../Theme/Theme";

class Header extends React.Component {
  render() {
    return (
      <div className="menu-style">
        <Theme />
        <div className="style-header">
          <header>
            <h1>TODO LIST</h1>
          </header>
        </div>
        <div className="menu-box">
          <div className="new-task-box">
            <img className="logo-new" src={stick}></img>
            <div className="text-menu">Ваши задачи:</div>
          </div>
          <div className="link-box">
            <div className="style-link-list">
              <img className="logo-active" src={flame}></img>
              <NavLink to="/">Активные</NavLink>
            </div>
            <div className="style-link-list">
              <img className="logo-done" src={doneLogo}></img>
              <NavLink to="/done"> Выполненные</NavLink>
            </div>
            <div className="style-link-list">
              <img className="logo-arch" src={archLogo}></img>
              <NavLink to="/archive">Архив</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
