import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EventCard from "../Components/EventCard/EventCard";

function AllEventsPage() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}events/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  function compare(a, b) {
    if (a.date_created < b.date_created) {
      return 1;
    }
    if (a.date_created > b.date_created) {
      return -1;
    }
    return 0;
  }

  const latestProjects = projectList.sort(compare);

  return (
    <div id="all-events">
      <div id="event-header">
        <h1>EVENTS PAGE</h1>
      </div>
      {latestProjects.map((project, key) => {
        return <EventCard key={key} projectData={project} />;
      })}
    </div>
  );
}

export default AllEventsPage;