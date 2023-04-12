import { Component } from "react";
import { ListDone } from "../ListDone/ListDone";

export class Done extends Component {
  constructor(props) {
    super(props);
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    this.localTodosDone = localTodosDone;
  }

  onEditValue(e) {
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    if (localTodosDone.length > 0) {
      localTodosDone.filter((el, i) => {
        if (e.currentTarget.id === el.idTitle) {
          el.title = e.target.innerText;
          localStorage.setItem("done", JSON.stringify(localTodosDone));
        }
        if (e.currentTarget.id === el.idDesc) {
          el.descrip = e.target.innerText;
          localStorage.setItem("done", JSON.stringify(localTodosDone));
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.localTodosDone && this.localTodosDone.length > 0 ? (
          <ListDone
            onEditValue={this.onEditValue}
            localTodosDone={this.localTodosDone}
          />
        ) : (
          <div className="msg-body-list">Список пуст!</div>
        )}
      </div>
    );
  }
}
