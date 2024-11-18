import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "./features/userForm/UserForm";

// TODO subscribers list

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="w-full max-w-lg p-4">
        <UserForm />
      </div>
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
    </div>
  );
}

export default App;
