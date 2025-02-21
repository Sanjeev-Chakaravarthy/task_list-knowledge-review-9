import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !dueDate) {
            alert("Title and Due Date are required!");
            return;
        }

        const newTask = {
            title,
            dueDate,
            priority,
            status
        };

        setIsLoading(true); // Set loading to true when submitting

        try {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                fetchTasks();
                setTitle("");
                setDueDate("");
                setPriority("Medium");
                setStatus("To Do");
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false); // Reset loading state after submission
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading} // Disable input while loading
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                disabled={isLoading} // Disable input while loading
            />
            <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                disabled={isLoading} // Disable select while loading
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                disabled={isLoading} // Disable select while loading
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Task"} {/* Change button text based on loading state */}
            </button>
        </form>
    );
};

export default TaskForm;