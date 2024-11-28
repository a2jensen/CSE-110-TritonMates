// corresponds to tasks component on the dashboard page
"use client";

import TaskCard from "../taskCard/taskCard";
import { Task } from "../types";
import {getAllTasks } from "../../../app/api/tasks/TaskContext";
import { useState } from "react";



interface TaskOverviewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}




const roomID = "bOfA98OEsUdA1ZDkGz8d";
export default function TaskOverview({
  tasks,
  onToggle,
  onDelete,
}: TaskOverviewProps) {

  
  const todayTasks = tasks.filter((tasks) => !tasks.isUpcoming);
  const upcomingTasks = tasks.filter((tasks) => tasks.isUpcoming);
 
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-700">Task Board</h3>

      {/* Today's Tasks */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Today</h4>
        <ul className="space-y-2">
         
          
          {todayTasks.map((task) => (
            
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>

      {/* Upcoming Tasks */}
      <div>
        <h4 className="text-sm font-medium mb-2">Upcoming</h4>
        <ul className="space-y-2">
          {upcomingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
