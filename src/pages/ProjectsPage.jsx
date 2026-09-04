import React from "react";
import { ProjectsShowcase } from "../components/projects/ProjectsShowcase";

export function ProjectsPage({ projects, onAddProject }) {
  return (
    <div className="space-y-6">
      <ProjectsShowcase projects={projects} onAddProject={onAddProject} />
    </div>
  );
}

export default ProjectsPage;
