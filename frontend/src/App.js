import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import SubmitItem from "./pages/SubmitItem";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute component={Dashboard} path="/" exact />
          <Route component={LoginPage} path="/login" />
          <Route component={SubmitItem} path="/submit-item" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
