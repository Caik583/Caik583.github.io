import React , {Component, Fragment}from "react";
import TodoItem from "./TodoItem";

// 定义一个组件
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      inputValue: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: "",
    });
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  // handItemClick(index){
  //   // console.log(index);
  //   const list = [...this.state.list]
  //   list.splice(index,1)
  //   this.setState({
  //     list: list
  //   })
  // }

  // 父组件通过属性的形式向子组件传递参数
  // 子组件通过props接受父组件传递过来的参数

  handleDelete(index) {
    // console.log(index);
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list: list,
    });
  }

  getTodoItems() {
    // console.log(this.state.inputValue);
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          delete={this.handleDelete}
          key={index}
          content={item}
          index={index}
        />
      );
    });
  }

  render() {
    // jsx 语法
    return (
      <Fragment>
        {/* <div> */}
        <div>
          {/* hello world!
          {1 + 2} */}
          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button
            className="red-btn"
            style={{ color: "#ccc" }}
            onClick={this.handleBtnClick}
          >
            add
          </button>
        </div>
        <ul>
          {this.getTodoItems()}
          {/* {
             this.state.list.map((item, index) => {
              return (
                <TodoItem
                  delete={this.handleDelete}
                  key={index}
                  content={item}
                  index={index}
                />
              );
            })
          } */}
        </ul>
        {/* </div> */}
      </Fragment>
    );
  }
}

export default TodoList;
