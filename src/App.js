import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import SubmitItem from "./pages/SubmitItem";
import Signup from "./pages/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute component={Dashboard} path="/" exact />
          <Route component={LoginPage} path="/login" />
          <PrivateRoute component={SubmitItem} path="/submit-item" />
          <Route component={Signup} path ="/register"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
