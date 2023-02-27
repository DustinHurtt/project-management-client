// src/pages/ProjectListPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { BaseUrl } from "../services/BaseUrl";
import AddProject from "../components/AddProject";

const API_URL = BaseUrl;


function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/projects`)
      .then((response) => {
        console.log("RESPONSE", response.data)
        setProjects(response.data)})
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );

  
  return (
    <div className="ProjectListPage">

        <AddProject projects={projects} setProjects={setProjects} />
      
        {projects.map((project) => {
          return (
            <div className="ProjectCard card" key={project._id} >
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}

export default ProjectListPage;
