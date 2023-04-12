import React from "react";
import List from "../List/List";
import "./todos.style.css";
import { v4 as uuidv4 } from "uuid";
import NewTodo from "../NewTodo/NewTodo";
import msgLogo from "../../image/animal.png";
import { TodoContext } from "../Context/TodoContext";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      todoArchive: [],
      todoDone: [],
      newTodo: {
        title: "",
        descrip: "",
        idTitle: this.id(),
        idDesc: this.id(),
      },
    };

    this.addTodo = this.addTodo.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.myRefBtn = React.createRef();
    this.myRefError = React.createRef();
    this.inArch = this.inArch.bind(this);
    this.inDone = this.inDone.bind(this);

    const lsTodoItems = JSON.parse(localStorage.getItem("state"));
    if (lsTodoItems !== null) {
      let res = [...this.state.todoItems, ...lsTodoItems];
      const result = res.reduce((acc, elem, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (elem.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, elem];
      }, []);
      this.state.todoItems = result;
    }
  }

  componentDidMount() {
    const localTodos = JSON.parse(localStorage.getItem("state"));
    if (localTodos !== null) {
      this.setState({
        ...this.state,
        todoItems: [...localTodos],
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState === this.state) return;
    localStorage.setItem("state", JSON.stringify(this.state.todoItems));
  }

  updateValue = (event) => {
    const nodeMsgErr = this.myRefError.current;
    nodeMsgErr.innerText = "";
    if (event.currentTarget.id === this.state.newTodo.idTitle) {
      const inpTitle = event.target.innerText;
      if (inpTitle.length < 2) {
        const nodeBtn = this.myRefBtn.current;
        const nodeMsgErr = this.myRefError.current;
        nodeBtn.disabled = true;
        nodeMsgErr.innerText = "Заголовок должен быть не менее 2 символов!";
      } else {
        this.myRefBtn.current.disabled = false;
        this.myRefError.current.innerText = "";
      }
      this.setState({
        ...this.state,
        newTodo: { ...this.state.newTodo, title: inpTitle },
      });
    }
    if (event.currentTarget.id === this.state.newTodo.idDesc) {
      const inpDescrip = event.target.innerText;
      this.setState({
        ...this.state,
        newTodo: { ...this.state.newTodo, descrip: inpDescrip },
      });
    }
  };

  id() {
    return uuidv4();
  }

  addTodo() {
    if (this.state.newTodo.title === "") {
      const nodeMsgErr = this.myRefError.current;
      nodeMsgErr.innerText = "Заголовок не может быть пустым!";
    } else {
      this.setState({
        ...this.state,
        todoItems: [...this.state.todoItems, this.state.newTodo],
        newTodo: {
          ...this.state.newTodo,
          descrip: "",
          title: "",
          idTitle: this.id(),
          idDesc: this.id(),
        },
      });
    }
  }

  onDeleteHandler = (idq) => {
    let deleteTodo = this.state.todoItems;
    deleteTodo.forEach(function (el, i) {
      if (el.idTitle == idq) {
        deleteTodo.splice(i, 1);
      }
    });
    this.setState({
      ...this.state,
      todoItems: [...deleteTodo],
    });
  };

  onEditValue = (e) => {
    this.state.todoItems.filter((el, i) => {
      if (e.currentTarget.id === el.idTitle) {
        let copy = el;
        copy.title = e.target.innerText;
        let state = { ...this.state, todoItems: [...this.state.todoItems] };
        state.todoItems[i] = { ...copy };
        this.setState({ state });
      }
      if (e.currentTarget.id === el.idDesc) {
        let copy = el;
        copy.descrip = e.target.innerText;
        let state = { ...this.state, todoItems: [...this.state.todoItems] };
        state.todoItems[i] = { ...copy };
        this.setState({ state });
      }
    });
  };

  inArch(i) {
    const newArchieveState = this.state.todoItems;
    let arrayOfOneTask = newArchieveState.splice(i, 1);
    this.state.todoArchive = [
      ...this.state.todoArchive,
      { ...arrayOfOneTask[0] },
    ];
    this.state.todoItems = [...newArchieveState];
    const localTodosArch = JSON.parse(localStorage.getItem("arch"));
    if (localTodosArch !== null) {
      let copyLocalTodosArch = localTodosArch;
      let res = [...copyLocalTodosArch, ...this.state.todoArchive];
      const result = res.reduce((acc, elem, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (elem.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, elem];
      }, []);
      localStorage.setItem("arch", JSON.stringify(result));
      this.setState({ ...this.state });
    } else {
      localStorage.setItem("arch", JSON.stringify(this.state.todoArchive));
      this.setState({ ...this.state });
    }
  }

  inDone(i) {
    const newDoneState = this.state.todoItems;
    let arrayOfOneTask = newDoneState.splice(i, 1);
    this.state.todoDone = [...this.state.todoDone, { ...arrayOfOneTask[0] }];
    this.state.todoItems = [...newDoneState];
    const localTodosDone = JSON.parse(localStorage.getItem("done"));
    if (localTodosDone !== null) {
      let copyLocalTodosDone = localTodosDone;
      let res = [...copyLocalTodosDone, ...this.state.todoDone];
      const result = res.reduce((acc, elem, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (elem.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, elem];
      }, []);
      localStorage.setItem("done", JSON.stringify(result));
      this.setState({ ...this.state });
    } else {
      localStorage.setItem("done", JSON.stringify(this.state.todoDone));
      this.setState({ ...this.state });
    }
  }

  render = () => {
    return (
      <div>
        <div className="box-menu">
          <NewTodo
            state={this.state}
            updateValue={this.updateValue}
            myRefError={this.myRefError}
            myRefBtn={this.myRefBtn}
            addTodo={this.addTodo}
          />
          {this.state.todoItems.length > 0 ? (
            <List
              onEditValue={this.onEditValue}
              todoItems={this.state.todoItems}
              deleteTodo={this.onDeleteHandler}
              inArch={this.inArch}
              inDone={this.inDone}
            />
          ) : (
            <div className="msg-body-list">
              Список пуст!
              <p style={{ marginLeft: "8px" }}>Добавьте новое задание!</p>
              <img className="msg-logo-style" src={msgLogo}></img>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default Todos;
