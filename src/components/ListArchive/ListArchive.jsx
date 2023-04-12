import { Component } from "react";
import deleteLogo from "../../image/m.png";
import doneLogo from "../../image/done.png";
import "../List/list.style.css";
import logo from "../../image/flags.svg";
import flame from "../../image/flame.png";

export class ListArchive extends Component {
  constructor(props) {
    super(props);
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    this.localTodosArch = localTodosArch;
    this.state = {
      todoArchive: [],
    };
  }

  forceUpdateState = (e) => {
    const archieve = JSON.parse(localStorage.getItem("arch"));
    let index = e.currentTarget.id;
    console.log(archieve[index]);
    archieve.splice(index, 1);
    console.log(archieve);
    localStorage.setItem("arch", JSON.stringify(archieve));
    window.location.reload();
  };

  componentDidUpdate(prevState) {
    const archieve = JSON.parse(localStorage.getItem("arch"));
    localStorage.setItem("arch", JSON.stringify(archieve));
    if (prevState === this.state) return;
  }

  postInActiveList(e) {
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    if (localTodosArch.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosArch.splice(index, 1);
      localStorage.setItem("arch", JSON.stringify(localTodosArch));
      const localTodosState = JSON.parse(localStorage.getItem("state"));
      if (localTodosState !== null) {
        const newlocalTodosState = [...localTodosState, { ...res[0] }];
        localStorage.setItem("state", JSON.stringify(newlocalTodosState));
        window.location.reload();
      } else {
        const newlocalTodosState = [{ ...res[0] }];
        localStorage.setItem("state", JSON.stringify(newlocalTodosState));
        window.location.reload();
      }
    }
  }

  postInDoneList(e) {
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    if (localTodosArch.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosArch.splice(index, 1);
      localStorage.setItem("arch", JSON.stringify(localTodosArch));
      const localTodosDone = JSON.parse(localStorage.getItem("done"));
      if (localTodosDone !== null) {
        const newLocalTodosDone = [...localTodosDone, { ...res[0] }];
        localStorage.setItem("done", JSON.stringify(newLocalTodosDone));
        window.location.reload();
      } else {
        const newLocalTodosDone = [{ ...res[0] }];
        localStorage.setItem("done", JSON.stringify(newLocalTodosDone));
        window.location.reload();
      }
    }
  }

  filterTodo = (e) => {
    if (e.target.value !== "") {
      let localTodosArch = JSON.parse(localStorage.getItem("arch"));
      let res = localTodosArch.filter(({ title }) =>
        title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      localStorage.setItem("searchArch", JSON.stringify(res));
      this.setState({ ...this.state, todoArchive: [...res] });
    } else {
      localStorage.setItem("searchArch", JSON.stringify([]));
      window.location.reload();
    }
  };

  render() {
    let localTodosArch = JSON.parse(localStorage.getItem("arch"));
    let l = JSON.parse(localStorage.getItem("searchArch"));
    let val;
    if (l && l.length > 0) {
      val = l;
    } else if (localTodosArch !== null) {
      val = localTodosArch;
    }
    return (
      <div>
        {" "}
        <input
          type="text"
          className="search-style-list"
          placeholder=" ⌕ Поиск"
          onChange={this.filterTodo}
        ></input>
        <div className="right-box">
          {val &&
            val.map((item, i) => {
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
                      className="logo-active"
                      title="Сделать активным"
                      src={flame}
                      id={i}
                      onClick={this.postInActiveList}
                    ></img>
                    <img
                      id={i}
                      onClick={this.postInDoneList}
                      src={doneLogo}
                      title="В выполненные"
                      className="style-icons-done"
                    ></img>
                    <img
                      id={i}
                      onClick={this.forceUpdateState}
                      src={deleteLogo}
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
