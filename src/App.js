import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "./features/UserForm";

// TODO subscribers list
// TODO disable submit button if one field is empty
// TODO empty field after submit
// TODO set validation for city
// TODO separate counter in a proper component
// TODO generate a doc
// TODO replace alert by red sentence

function App() {
  let [count, setCount] = useState(0);

  const clickOnMe = () => {
    setCount(count + 1);
  };

  return (
    <div className="">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={clickOnMe}>Click me</button>
        <span data-testid="count">{count}</span>

        <UserForm />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
          theme="colored"
        />
      </header>
    </div>
  );
}

export default App;
