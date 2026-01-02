import { useState } from "react";
import { getAllTasks } from "../data/task";
import { Tasks } from "./Tasks";
import { nanoid } from 'nanoid';


export const EditTask = () => {
    const [tasks, setTasks] = useState(
        getAllTasks())
    
    //delete
    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };
    //update
    const updateTask = (id, field, value) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        ));
    };
    const watchToEdit = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, isEditing: !t.isEditing } : t
        ));
    };
    //add
    const addTask = (place) => {
        const newTask = {
            id: nanoid(),
            title: "",
            time: 0,
            place,
            status: "pending",
            isEditing: true
        };
        setTasks([...tasks, newTask]);
    };



    const groupedTasks = tasks.reduce((groups, task) => {
        if (!groups[task.place]) groups[task.place] = [];
        groups[task.place].push(task);
        return groups;
    }, {});
    const placeNames = {
  basic: "רשימת משימות בסיסית 📋",
  atHome: "רשימת משימות בבית 🏠",
  traveling: "רשימת משימות כשנוסעים 🚗",
  hospitality: "רשימת משימות כשמארחים 💐"
};


    return (
        <div className="centered-list">
            <h2>משימות לשבת 🕯️🕯️</h2>
      {Object.entries(groupedTasks).map(([place, tasksByPlace]) => (
  <div key={place}>
<h3>{placeNames[place]}</h3>

    <ul className="task-list">
      {tasksByPlace.map(task => (
        <Tasks
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
          watchToEdit={watchToEdit}
        />
      ))}
    </ul>
    <br /><button onClick={() => addTask(place)}> ➕ משימה חדשה</button><br /><br />
  </div>
))}


          
        </div>
    )
    
}

