import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Todos from "../Todos/Todos";
import { Archive } from "../Archive/Archive";
import { Done } from "../Done/Done";
import { ThemeContext } from "../Context/ThemeContext";
import "./App.css";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }

  componentDidMount() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme !== null) {
      this.setState({
        theme: currentTheme,
      });
    } else {
      this.setState({
        ...this.state,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState === this.state) return;
    document.body.dataset.theme = this.state.theme;
  }

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
    const currentThemeLS = this.state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentThemeLS);
  };

  render() {
    return (
      <div className="App">
        <ThemeContext.Provider
          value={{
            theme: this.state.theme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/archive" element={<Archive />} />
              <Route path="/done" element={<Done />} />
              <Route index element={<Todos />} />
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </div>
    );
  }
}
