import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "./views/userForm/UserForm";
import UsersList from "./views/usersList/UsersList";
import LoginForm from "./views/auth/LoginForm";
import ProtectedRoute from './guards/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <div className="w-full max-w-lg p-4">
          <Routes>
            <Route path="/integration-continue-exo-react" element={<UserForm />} />
            <Route path="/integration-continue-exo-react/login" element={<LoginForm />} />
            <Route path="/integration-continue-exo-react/users" element={<UsersList />} />
            <Route
                path="/integration-continue-exo-react/users"
                element={
                  <ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>
                }
            />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;