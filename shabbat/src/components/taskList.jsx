import { useState } from "react";
import { Link } from 'react-router-dom';
import { getAllTasks } from "../data/task";
import { Tasks2 } from "./Tasks2";

export const TaskList = ({ selectPlace }) => {
  const [tasks, setTasks] = useState(getAllTasks());

  const toggleDone = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  };

  const getPlaceTasks = (place) => {
    switch (place) {
      case "atHome":
        return tasks.filter(task => task.place === "basic" || task.place === "atHome");
      case "travel":
        return tasks.filter(task => task.place === "basic" || task.place === "traveling");
      case "hospitality":
        return tasks.filter(task => task.place === "basic" || task.place === "atHome" || task.place === "hospitality");
      default:
        return tasks;
    }
  };

  const tasksToShow = selectPlace ? getPlaceTasks(selectPlace) : tasks;
  const totalPending = tasksToShow.filter(task => task.status === "pending")
    .reduce((total, task) => total + task.time, 0);
  const hours = Math.floor(totalPending / 60);
  const minutes = totalPending % 60;
  const timeText = hours === 0 ? `${minutes} דקות` : minutes === 0 ? `${hours} שעות` : `${hours}:${minutes} `;

  return (
    <div className="centered-list">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasksToShow.map(task => (
          <Tasks2
            key={task.id}
            task={task}
            onToggle={() => toggleDone(task.id)}
          />
        ))}
      </ul>
      <h3>
        סך הזמן של משימות שלא בוצעו: {timeText}
      </h3>
            <div style={{ marginTop: 8 }}>
        <Link to="/task-list" style={{ textDecoration: 'none', color: 'var(--royal)', fontWeight: 600 }}>עריכת משימות</Link>

      </div>
    </div>
  );
};
