import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('https://task-manager-backend-cuia.onrender.com'); // Adjust if your server URL is different

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch initial tasks from the server
    const fetchTasks = async () => {
      const response = await fetch('https://task-manager-backend-cuia.onrender.com');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();

    // Listen for real-time updates from the server
    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => {
        const existingTask = prevTasks.find(task => task._id === updatedTask._id);
        if (existingTask) {
          // If the task exists, update it
          return prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task);
        } else {
          // If the task doesn't exist, add it to the list
          return [...prevTasks, updatedTask];
        }
      });
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
