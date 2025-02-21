// src/components/TaskCard.jsx
import React from 'react';
import './TaskCard.css'; // Import the corresponding CSS
import TaskForm from './TaskForm';

const TaskCard = ({ task }) => {
    const { title, dueDate, priority, status } = task;

    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p><strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> {priority}</p>
            <p><strong>Status:</strong> {status}</p>
            <p>{task.task}</p>
        </div>
    );
};

export default TaskCard;
