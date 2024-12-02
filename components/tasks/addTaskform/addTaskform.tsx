  // corresponds to add task component -> refer to figma file
  "use client";
  import { useState } from "react";
  import {getAllTasks, addTask, getTask, deleteTask, updateTask} from "../../../app/api/tasks/TaskContext";

  interface AddTaskFormProps {
    onAddTask: (task: {
      id: string;
      text: string;
      assignee: string;
      dueDate: string;
      points: number;
    }) => void;
  }



  export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
    const [newTask, setNewTask] = useState("");
    const [newAssignee, setNewAssignee] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [points, setPoints] = useState(0);   //


    const roomID = "bOfA98OEsUdA1ZDkGz8d";
    const [taskID, setTaskID] = useState("");
  
    const pushTask = async(roomID: string, name: string, points: number, assignee: string, status: string, date: Date) => {
      const taskId = await addTask(roomID, name, points, assignee, status, date);
      console.log("taskID", taskId);
      setTaskID(taskId);
      return taskId;
  
    
   }


  


   

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const taskId = await pushTask(roomID, newTask, points, newAssignee || "Unassigned",'inprogress', new Date(dueDate));
      console.log(taskId)
      if (newTask.trim()) {
        onAddTask({
          id: String(taskId),
          text: newTask,
          assignee: newAssignee || "Unassigned",
          dueDate: dueDate,
          points: points,
      
        });
       
        setNewTask("");
        setNewAssignee("");
        setDueDate("");
        setPoints(0);
      }
      if (isNaN(points) || points < 0) {
        console.log("Points must be a valid non-negative number!");
        return;
      }
      
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold">Add New Task</h3>
        <div>
          <label className="block text-sm mb-1">Task Title</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Title"
            className="border p-2 rounded w-full"
            required />
        </div>
        <div>
          <label className="block text-sm mb-1">Task Assignee</label>
          <select
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            className="border p-2 rounded w-full"
            required>
            <option value="">Select Assignee</option>
            <option value="Assignee1">Assignee 1</option>
            <option value="Assignee2">Assignee 2</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
            required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.valueAsNumber || 0)}
            className="border p-2 rounded w-full"
            required />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    );
  }
