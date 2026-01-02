import { useState } from "react";
import { getAllTasks } from "../data/task";
import { Tasks2 } from "./Tasks2";

export const TaskList = () => {
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
        return tasks.filter(task => task.place === "basic"|| task.place==="atHome");
      case "travel":
        return tasks.filter(task =>task.place==="basic"|| task.place === "traveling");
          case "hospitality":
        return tasks.filter(task => task.place === "basic"|| task.place==="atHome"|| task.place==="hospitality");
      default:
        return tasks;
    }
  }
//   const timeScore=(time)=>{
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

  return (
    <div className="centered-list">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <Tasks2
            key={task.id}
            tas={task}
            onToggle={() => toggleDone(task.id)}
          />

        ))}
      </ul>
          <h3>      סך הזמן של משימות שלא בוצעו: {tasks.filter(task => task.status === "pending")
          .reduce((total, task) => (total + task.time), 0)} דקות</h3>

    </div>
    
  );
};
