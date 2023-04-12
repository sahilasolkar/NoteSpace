import "./App.css";
import SignUp from "./component/SignUp";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import UserDetails from "./component/UserDetails";
import PrivateRoute from "./component/PrivateRoute";
import ForgotPassword from "./component/ForgotPassword";
import { useAuth } from "./context/AuthContext";
import NewNote from "./component/NewNote";
import NewTask from "./component/NewTask";
import NewProject from "./component/NewProject";
import Projects from "./component/Projects";

//dribble-design-link-for-reference-https://dribbble.com/shots/19721906-Note-taking-app-dashboard-design/attachments/14834313?mode=media

function App() {
  // const {currentUser} = useAuth()
  // console.log(currentUser.email)

  // console.log('running in app')

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" Component={PrivateRoute}>
              <Route path="/" Component={Dashboard} />
              <Route path="/user-details" Component={UserDetails} />
              <Route path="/new-note" Component={NewNote} />
              <Route path="/new-task" Component={NewTask} />
              <Route path="/new-project" Component={NewProject} />
              <Route path="/project/:id" Component={Projects} />
            </Route>
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
