import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subcribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };
  const taskDeleted = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => taskDeleted(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
