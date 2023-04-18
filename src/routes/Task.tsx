import React from 'react';
import '../Task.css'

export default function Task() {
	return <div>
        <h1> Task-List</h1>
        <div className="button-group">
        <a href="/addtask" className="button">Add-Task</a>
        <a href="/login" className="button">Logout</a>
        </div>

       

    <table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Task 1</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>In Progress</td>
            <td>2023-04-20</td>
            <td><a href="/edit" className="button1">Edit</a></td>
            <td><a href="/delete" className="button1">Delete</a></td>
        </tr>
        <tr>
            <td>Task 2</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>Completed</td>
            <td>2023-04-22</td>
            <td><a href="/edit" className="button1">Edit</a></td>
            <td><a href="/delete" className="button1">Delete</a></td>
        </tr>
    </tbody>
</table>
</div>;
}
