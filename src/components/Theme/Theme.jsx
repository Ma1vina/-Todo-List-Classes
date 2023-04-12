import React from "react";
import "./theme-style.css";
import { ThemeContext } from "../Context/ThemeContext";

export class Theme extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { theme, toggleTheme } = this.context;
    // console.log(toggleTheme);
    return (
      <div className="theme-switcher">
        <label>
          <input
            type="checkbox"
            checked={this.context.theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider round" />
        </label>
        <span className="switch-text">
          {this.context.theme === "light" ? "🌞День" : "🌙Ночь"}
        </span>
      </div>
    );
  }
}
