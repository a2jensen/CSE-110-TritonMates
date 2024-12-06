"use client";

import TaskCard from "../taskCard/taskCard";
import { Task } from "../types";

interface TaskOverviewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
}

export default function TaskOverview({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
}: TaskOverviewProps) {
  // Separate tasks into today's and upcoming
  const todayTasks = tasks.filter((task) => !task.isUpcoming);
  const upcomingTasks = tasks.filter((task) => task.isUpcoming);

  return (
    <div className="bg-sky-100 rounded-lg p-6">
      <h3 className="text-xl font-bold text-[#006EFF] mb-6">Task Board</h3>

      {/* Today's Tasks Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-[#000000] mb-4">Today</h4>
        {todayTasks.length > 0 ? (
          <ul className="space-y-4">
            {todayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No tasks for today</p>
        )}
      </div>

      {/* Upcoming Tasks Section */}
      <div>
        <h4 className="text-md font-medium text-[#000000] mb-4">Upcoming</h4>
        {upcomingTasks.length > 0 ? (
          <ul className="space-y-4">
            {upcomingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No upcoming tasks</p>
        )}
      </div>
    </div>
  );
}
