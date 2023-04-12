import React from "react";
import "../List/list.style.css";

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="left-box">
        <div className="newtodo-style">
          Заголовок:
          <div
            contentEditable="true"
            data-text="🖉"
            suppressContentEditableWarning={true}
            className="textarea"
            name="title"
            id={this.props.state.newTodo.idTitle}
            onBlur={this.props.updateValue}
          >
            {this.props.state.newTodo.title}
          </div>
          <div className="style-warning-msg" ref={this.props.myRefError}></div>
          <br />
          Описание:
          <div
            contentEditable="true"
            data-text="🖉"
            suppressContentEditableWarning={true}
            className="textarea"
            name="descrip"
            id={this.props.state.newTodo.idDesc}
            onBlur={this.props.updateValue}
          >
            {this.props.state.newTodo.descrip}
          </div>
          <button
            className="btn-style"
            ref={this.props.myRefBtn}
            disabled={false}
            onClick={this.props.addTodo}
          >
            Создать
          </button>
        </div>
      </div>
    );
  }
}

export default NewTodo;
