import React from 'react';
import '../Task.css';

export default function AddTask() {
  return (
    <div>
      <h2>Add Task</h2>
      <form action="/task">
        <label>Title:</label>
        <input type="text" id="title" name="title" placeholder="Enter the title of the task" required />
        <label>Description:</label>
        <textarea id="description" name="description" placeholder="Enter the description of the task" required></textarea>
        <label>Status:</label>
        <select id="status" name="status">
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="not-started">Not Started</option>
        </select>
        <label>Due Date:</label>
        <input type="date" id="due-date" name="due-date" required />
        <input type="submit" value="Add Task" />
    
      </form>
    </div>
  );
}
