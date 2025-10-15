import { useState } from 'react';
import './App.css';
import DateTime from './Todo/DateTime'
function App() {
  const [TodoList, SetTodoList] = useState([]);

  const handleerror = (e) => {
    e.preventDefault();
    const tname = e.target.toname.value.trim();

    if (!tname) {
      alert("Please enter a task name");
      return;
    }

    if (!TodoList.includes(tname)) {
      SetTodoList([...TodoList, tname]);
      e.target.toname.value = ""; // clear input after adding
    } else {
      alert("This item already exists");
    }
  };

  const list = TodoList.map((value, index) => (
    <Todo
      value={value}
      key={index}
      indexNumber={index}
      TodoList={TodoList}
      SetTodoList={SetTodoList}
    />
  ));

  return (
    <div className="App">
      <DateTime />
      <h1>ToDo List App</h1>
      <form onSubmit={handleerror}>
        <input type="text" name="toname" />
        <button>Add Task</button>
      </form>

      <div className="outerdiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function Todo({ value, indexNumber, TodoList, SetTodoList }) {
  const [status, setStatus] = useState(false);

  const deleterow = (e) => {
    e.stopPropagation(); // prevent click from toggling status
    const finalData = TodoList.filter((v, i) => i !== indexNumber);
    SetTodoList(finalData);
  };

  const checkstatus = () => {
    setStatus(!status);
  };

  return (
    <li className={status ? "completedodo" : ""} onClick={checkstatus}>
      {indexNumber + 1}. {value}{" "}
      <span style={{ color: "red", cursor: "pointer" }} onClick={deleterow}>
        &times;
      </span>
    </li>
  );
}
