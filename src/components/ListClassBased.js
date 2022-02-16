import React, { Component } from "react";

export default class ListClassBased extends Component {
  constructor(props) {
    super(props);
    this.state = { students: ["hello"], input: "" };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  onChangeInput(event) {
    console.log(`event.target.value`, event.target.value);
    this.setState({ input: event.target.value });
  }
  addStudent() {
    this.setState({ students: [...this.state.students, this.state.input] });
  }
  render() {
    return (
      <div>
        {this.state.students.map((student) => {
          return <p>{student}</p>;
        })}

        <input
          type="text"
          value={this.state.input}
          onChange={this.onChangeInput}
        />
        <button onClick={this.addStudent}>Add Student</button>
      </div>
    );
  }
}
