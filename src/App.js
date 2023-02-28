// src/App.js

import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"; // <== IMPORT

import { useCallback } from "react";

import Navbar from "./components/Navbar";     // <== IMPORT
import HomePage from "./pages/HomePage";     // <== IMPORT
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage.js";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import { useEffect, useState } from "react";

import { BaseUrl } from "./services/BaseUrl";

import axios from "axios";


function App() {
  
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('')
  
  let token = localStorage.getItem("authToken");

  let getToken = () => {
    return localStorage.getItem("authToken")
  }
  
  

  const getAllProjects = () => {
    axios
      .get(`${BaseUrl}/projects`)
      .then((response) => {
        console.log("RESPONSE", response.data)
        setProjects(response.data)})
      .catch((error) => console.log(error));
  };


  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );

  return (
    <div className="App">
      
     {/* Below: ADD <Navbar>, <Routes> & <Route> */}
      <Navbar />

      <Routes> 

        <Route path="/" element={ <HomePage /> } />

        <Route element={<LoggedIn />}>
          <Route path="/projects" element={ <ProjectListPage projects={projects} setProjects={setProjects} getAllProjects={getAllProjects} message={message} setMessage={setMessage}/> } />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage projects={projects} setProjects={setProjects} getAllProjects={getAllProjects} />} />
          <Route path="/projects/edit/:projectId" element={ <EditProjectPage projects={projects} setProjects={setProjects} getAllProjects={getAllProjects} setMessage={setMessage} /> } />
        </Route>    

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
        </Route> 


      </Routes>
      
    </div>
  );
}

export default App;
