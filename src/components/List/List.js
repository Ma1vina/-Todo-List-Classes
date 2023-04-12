import React from "react";
import "./list.style.css";
import deleteLogo from "../../image/m.png";
import archiveLogo from "../../image/arch.png";
import doneLogo from "../../image/done.png";
import logo from "../../image/flags.svg";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: this.props.todoItems,
      arr2: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.todoItems.length !== state.arr.length) {
      return {
        arr: props.todoItems,
      };
    }
  }

  componentDidUpdate(prevState) {
    if (prevState === this.state) return;
  }

  filterTodo = (e) => {
    if (e.target.value == "") {
      this.setState({ ...this.state, arr2: [...this.props.todoItems] });
      window.location.reload();
    } else {
      let res = this.state.arr.filter(({ title }) =>
        title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.setState({ ...this.state, arr2: [...res] });
    }
  };

  render() {
    let value;
    if (this.state.arr2.length < 1) {
      value = this.state.arr;
    } else {
      value = this.state.arr2;
    }
    this.componentDidUpdate();
    return (
      <div>
        <input
          type="text"
          className="search-style"
          placeholder=" ⌕ Поиск"
          onChange={this.filterTodo}
        ></input>
        <div className="right-box">
          {value.map((item, i) => {
            return (
              <div key={i} className="mini-box-todo">
                <img className="logo-flag" src={logo}></img>
                <div className="text-content-container">
                  <div
                    contentEditable="true"
                    data-text="..🖉"
                    suppressContentEditableWarning={true}
                    className="textarea1"
                    name="title"
                    id={item.idTitle}
                    onBlur={this.props.onEditValue}
                  >
                    {item.title}
                  </div>
                  <br />

                  <div
                    contentEditable="true"
                    data-text="..🖉"
                    suppressContentEditableWarning={true}
                    className="textarea"
                    name="descrips"
                    id={item.idDesc}
                    onBlur={this.props.onEditValue}
                  >
                    {item.descrip}
                  </div>
                </div>
                <br />
                <div className="box-icons">
                  <img
                    onClick={this.props.inDone.bind(this, i)}
                    src={doneLogo}
                    alt="Something went wrong"
                    className="style-icons-done"
                    title="Выполнить"
                  ></img>
                  <img
                    onClick={this.props.inArch.bind(this, i)}
                    src={archiveLogo}
                    alt="Something went wrong"
                    className="style-icons-arch"
                    title="В архив"
                  ></img>
                  <img
                    onClick={this.props.deleteTodo.bind(this, item.idTitle)}
                    src={deleteLogo}
                    alt="Something went wrong"
                    title="Удалить"
                    className="style-icons"
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default List;
