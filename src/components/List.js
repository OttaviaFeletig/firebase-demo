import React, { useState, useEffect } from "react";

const List = () => {
  // const students = ["Andi", "Stephan", "Lukas", "Anan", "Annika"]

  const [students, setStudents] = useState([
    "Andi",
    "Stephan",
    "Lukas",
    "Anan",
    "Annika",
  ]);
  const [input, setInput] = useState("");

  const [data, setData] = useState(["hello again"]);

  const updateDataState = () => {
    setData([...data, "hello again"]);
  };
  useEffect(() => {
    updateDataState();
  }, [students, input]);
  const onChangeInput = (event) => {
    // console.log("event", event.target.value);
    setInput(event.target.value);
  };

  const addStudent = () => {
    console.log(input);
    setStudents([...students, input]);
  };
  return (
    <div>
      {data.map((oneItem) => {
        return <p>{oneItem}</p>;
      })}
      {students.map((student) => {
        return (
          <React.Fragment key={student}>
            {/* <p>hello</p> */}
            <p>{student}</p>
          </React.Fragment>
        );
      })}
      <input type="text" value={input} onChange={onChangeInput} />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
};

export default List;
