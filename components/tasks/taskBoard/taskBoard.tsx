// "use client";

// import { useEffect, useState, useCallback } from "react";
// import AddTaskForm from "../addTaskform/addTaskform";
// import { Timestamp } from "firebase/firestore";
// import TaskOverview from "../taskOverview/taskOverview";
// import { Task } from "../types";

// import {
//   getAllTasks,
//   deleteTask,
//   updateTask,
// } from "../../../app/api/tasks/TaskContext";

// const removeTask = async (roomID: string, taskID: string) => {
//   await deleteTask(roomID, taskID);
// };

// const changeTask = async (
//   roomID: string,
//   taskID: string,
//   name: string,
//   points: number,
//   assignee: string,
//   status: string,
//   due_date: string
// ) => {
//   await updateTask(
//     roomID,
//     taskID,
//     name,
//     points,
//     assignee,
//     status,
//     new Date(due_date)
//   );
// };

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true); // set true when first render
//   const [error, setError] = useState<string | null>(null); // error tracking
//   const roomID = "bOfA98OEsUdA1ZDkGz8d";

//   // Hook for todos when rerenders are called when props are changed
//   const fetchTasks = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       // Non-expired session storage common for standard browsers
//       const cachedTasks = window.localStorage.getItem(`tasks_${roomID}`);

//       if (cachedTasks) {
//         const parsedCachedTasks = JSON.parse(cachedTasks);
//         setTasks(parsedCachedTasks);
//       }

//       const task_data = await getAllTasks(roomID);

//       const new_tasks: Task[] = task_data.map((taskItem) => {
//         const today = new Date();
//         const dueDateObj = taskItem["due_date"].toDate();
//         const isUpcoming = dueDateObj > today;

//         return {
//           id: taskItem["task_ID"],
//           text: taskItem["name"],
//           assignee: taskItem["assignee"],
//           assigner: "Creator",
//           done: taskItem["status"] === "done",
//           doneReason: "",
//           dueDate: dueDateObj.toLocaleDateString(),
//           points: taskItem["points"],
//           isUpcoming,
//         };
//       });

//       // Refetch
//       setTasks(new_tasks);
//       // Convert back the object to string
//       localStorage.setItem(`tasks_${roomID}`, JSON.stringify(new_tasks));
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       setError("Failed to fetch tasks");
//       setIsLoading(false);
//     }
//   }, [roomID]);

//   useEffect(() => {
//     // Fetch tasks on component mount
//     fetchTasks();
//     // Listener to check interval per 5 minutes
//     const intervalId = setInterval(fetchTasks, 5 * 60 * 1000);
//     return () => clearInterval(intervalId);
//   }, [fetchTasks]);

//   const addTask = async (task: {
//     id: string;
//     text: string;
//     assignee: string;
//     dueDate: string;
//     points: number;
//   }) => {
//     const today = new Date();
//     const dueDateObj = new Date(task.dueDate);
//     const isUpcoming = dueDateObj > today;

//     const newTask = {
//       id: task.id,
//       text: task.text,
//       assignee: task.assignee,
//       assigner: "Creator",
//       done: false,
//       doneReason: "",
//       dueDate: task.dueDate,
//       points: task.points,
//       isUpcoming,
//     };

//     const updatedTasks = [...tasks, newTask];
//     setTasks(updatedTasks);
//     localStorage.setItem(`tasks_${roomID}`, JSON.stringify(updatedTasks));
//   };

//   const toggleTask = async (id: string) => {
//     const updatedTasks = tasks.map((task) => {
//       if (task.id === id) {
//         const newDoneStatus = !task.done;

//         changeTask(
//           roomID,
//           id,
//           task.text,
//           task.points,
//           task.assignee,
//           newDoneStatus ? "done" : "in progress",
//           task.dueDate
//         );

//         return { ...task, done: newDoneStatus };
//       }
//       return task;
//     });

//     setTasks(updatedTasks);
//     localStorage.setItem(`tasks_${roomID}`, JSON.stringify(updatedTasks));
//   };

//   const deleteTask = async (id: string) => {
//     await removeTask(roomID, id);
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//     localStorage.setItem(`tasks_${roomID}`, JSON.stringify(updatedTasks));
//   };

//   const updateTaskHandler = async (id: string, updatedTask: Partial<Task>) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id
//         ? {
//             ...task,
//             ...updatedTask,
//             isUpcoming: updatedTask.dueDate
//               ? new Date(updatedTask.dueDate) > new Date()
//               : task.isUpcoming,
//           }
//         : task
//     );

//     const taskToUpdate = updatedTasks.find((task) => task.id === id);
//     if (taskToUpdate) {
//       await changeTask(
//         roomID,
//         id,
//         updatedTask.text || taskToUpdate.text,
//         updatedTask.points !== undefined
//           ? updatedTask.points
//           : taskToUpdate.points,
//         updatedTask.assignee || taskToUpdate.assignee,
//         taskToUpdate.done ? "done" : "in progress",
//         updatedTask.dueDate || taskToUpdate.dueDate
//       );
//     }

//     setTasks(updatedTasks);
//     localStorage.setItem(`tasks_${roomID}`, JSON.stringify(updatedTasks));
//   };

//   // Render loading or error states
//   if (isLoading) return <div>Loading tasks...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
//       <div className="grid grid-cols-2 gap-6">
//         <TaskOverview
//           tasks={tasks}
//           onToggle={toggleTask}
//           onDelete={deleteTask}
//           onUpdate={updateTaskHandler}
//         />
//         <AddTaskForm onAddTask={addTask} />
//       </div>
//     </div>
//   );
// };

// export default TaskBoard;
