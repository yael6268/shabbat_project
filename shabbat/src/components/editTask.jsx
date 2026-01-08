import { useState } from "react";
import { Link } from 'react-router-dom';
import { getAllTasks } from "../data/task";
import { Tasks } from "./Tasks";
import { nanoid } from 'nanoid';

export const EditTask = () => {
    const [tasks, setTasks] = useState(getAllTasks());

    // מחיקת משימה
    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // עדכון משימה שלמה
    const updateTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    };

    // ביטול עריכה
    const cancelEdit = (task) => {
        if (task.isNew) {
            // אם המשימה חדשה, נמחקת
            deleteTask(task.id);
        } else {
            // אחרת מחזירים את הערכים המקוריים
            setTasks(tasks.map(t => t.id === task.id ? { ...task.original } : t));
        }
    };

    // הוספת משימה חדשה
    const addTask = (place) => {
        const newTask = {
            id: nanoid(),
            title: "",
            time: 0,
            place,
            status: "pending",
            isEditing: true,
            isNew: true,
            original: null
        };
        setTasks([...tasks, newTask]);
    };

    // קיבוץ לפי מקום
    const groupedTasks = tasks.reduce((groups, task) => {
        if (!groups[task.place]) groups[task.place] = [];
        groups[task.place].push(task);
        return groups;
    }, {});

    const placeNames = {
        basic: "רשימת משימות בסיסית 📋",
        atHome: "רשימת משימות בבית 🏠",
        traveling: "רשימת משימות כשמתארחים 🚗",
        hospitality: "רשימת משימות כשמארחים 💐"
    };

    return (
        <div className="centered-list">
            <h2>משימות לשבת 🕯️🕯️</h2>
            {Object.entries(groupedTasks).map(([place, tasksByPlace]) => (
                <div key={place} className="group-box">
                    <h3>{placeNames[place]}</h3>
                    <ul className="task-list">
                        {tasksByPlace.map(task => (
                            <Tasks
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                cancelEdit={cancelEdit}
                            />
                        ))}
                    </ul>
                    <div className="group-actions">
                        <button onClick={() => addTask(place)}>➕ משימה חדשה</button>
                    </div>
                </div>
            ))}
            <div style={{ marginTop: 8 }}>
                <Link to="/edit-tasks" style={{ textDecoration: 'none', color: 'var(--royal)', fontWeight: 600 }}>
                    לרשימת משימות
                </Link>
            </div>
        </div>
    );
};
