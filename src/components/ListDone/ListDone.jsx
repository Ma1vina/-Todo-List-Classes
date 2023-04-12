import { Component } from "react";
import deleteLogo from "../../image/m.png";
import archiveLogo from "../../image/arch.png";
import flame from "../../image/flame.png";
import "../List/list.style.css";
import logo from "../../image/flags.svg";

export class ListDone extends Component {
  constructor(props) {
    super(props);
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    this.localTodosDone = localTodosDone;
    this.state = {
      todoDone: [],
    };
  }

  forceUpdateState = (e) => {
    const done = JSON.parse(localStorage.getItem("done"));
    let index = e.currentTarget.id;
    done.splice(index, 1);
    localStorage.setItem("done", JSON.stringify(done));
    window.location.reload();
  };

  componentDidUpdate(prevState) {
    const done = JSON.parse(localStorage.getItem("done"));
    localStorage.setItem("done", JSON.stringify(done));
    if (prevState === this.state) return;
  }

  postInActiveList(e) {
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    if (localTodosDone.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosDone.splice(index, 1);
      localStorage.setItem("done", JSON.stringify(localTodosDone));
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

  postInArchiveList(e) {
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    if (localTodosDone.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosDone.splice(index, 1);
      localStorage.setItem("done", JSON.stringify(localTodosDone));
      const localTodosArchive = JSON.parse(localStorage.getItem("arch"));
      if (localTodosArchive !== null) {
        const newlocalTodosState = [...localTodosArchive, { ...res[0] }];
        localStorage.setItem("arch", JSON.stringify(newlocalTodosState));
        window.location.reload();
      } else {
        const newlocalTodosState = [{ ...res[0] }];
        localStorage.setItem("arch", JSON.stringify(newlocalTodosState));
        window.location.reload();
      }
    }
  }

  filterTodo = (e) => {
    if (e.target.value !== "") {
      let localTodosDone = JSON.parse(localStorage.getItem("done"));
      let res = localTodosDone.filter(({ title }) =>
        title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      localStorage.setItem("searchDone", JSON.stringify(res));
      this.setState({ ...this.state, todoDone: [...res] });
    } else {
      localStorage.setItem("searchDone", JSON.stringify([]));
      window.location.reload();
    }
  };

  render() {
    let localTodosDone = JSON.parse(localStorage.getItem("done"));
    let l = JSON.parse(localStorage.getItem("searchDone"));
    let val;
    if (l && l.length > 0) {
      val = l;
    } else if (localTodosDone !== null) {
      val = localTodosDone;
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
                      onClick={this.postInArchiveList}
                      src={archiveLogo}
                      alt="Something went wrong"
                      className="style-icons-arch"
                      title="В архив"
                    ></img>
                    <img
                      id={i}
                      onClick={this.forceUpdateState}
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
