import { Component } from "react";
import { ListArchive } from "../ListArchive/ListArchive";

export class Archive extends Component {
  constructor(props) {
    super(props);
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    this.localTodosArch = localTodosArch;
  }

  onEditValue(e) {
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    if (localTodosArch.length > 0) {
      localTodosArch.filter((el, i) => {
        if (e.currentTarget.id === el.idTitle) {
          el.title = e.target.innerText;
          localStorage.setItem("arch", JSON.stringify(localTodosArch));
        }
        if (e.currentTarget.id === el.idDesc) {
          el.descrip = e.target.innerText;
          localStorage.setItem("arch", JSON.stringify(localTodosArch));
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.localTodosArch && this.localTodosArch.length > 0 ? (
          <ListArchive
            onEditValue={this.onEditValue}
            localTodosArch={this.localTodosArch}
          />
        ) : (
          <div className="msg-body-list">Список пуст!</div>
        )}
      </div>
    );
  }
}
