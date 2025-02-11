"use client";
import { useState } from "react";
interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string;
}
const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [category, setCategory] = useState<string>("Personal");
  const [filter, setFilter] = useState<string>("All");
  const [dueDate, setDueDate] = useState<string>("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          category,
          completed: false,
          dueDate: dueDate || "No Due Date",
        },
      ]);
      setNewTask("");
      setDueDate("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 via-slate-500 to-emerald-600 flex justify-center items-center">
    <div className="w-full max-w-xl bg-[#FFF8E1] rounded-3xl shadow-xl p-7 m-5">
      <h1 className="text-5xl font-serif font-extrabold text-yellow-600 text-center mb-5">
        To Do 
      </h1>
      {/* write task here like search bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring focus:ring-teal-300 transition bg-white"
        />
        {/* option for w p o  */}
         <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-4 border border-gray-300 rounded-xl bg-gray-100 focus:ring focus:ring-teal-300 transition"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option> 
        </select>
        {/* calender */}
        <input
        placeholder="date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-4 border border-gray-300 rounded-xl bg-white focus:ring focus:ring-teal-300 transition"
        />
        {/* add task button */}
        <button
          onClick={addTask}
          className="bg-orange-500 text-white px-6 py-4 rounded-xl hover:bg-orange-600 transition"
        >
          Add
        </button>
      </div>
      
      <div className="flex justify-between mb-8">
      {/* all button */}
        <button
          onClick={() => setFilter("All")}
          className={`px-6 py-3 rounded-xl transition ${
            filter === "All"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-teal-500 hover:text-white"
          }`}
        >
          All
        </button>
        {/* complete button */}
        <button
          onClick={() => setFilter("Completed")}
          className={`px-6 py-3 rounded-xl transition ${
            filter === "Completed"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-teal-500 hover:text-white"
          }`}
        >
          Completed
        </button>
        {/* pending button */}
        <button
          onClick={() => setFilter("Pending")}
          className={`px-6 py-3 rounded-xl transition ${
            filter === "Pending"
              ? "bg-teal-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-teal-500 hover:text-white"
          }`}
        >
          Pending
        </button>
      </div>
      {/* yehan written task ataa h  */}
      <ul className="space-y-6">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            {/* checkbox */}
            <div className="flex items-center gap-4">
              <input
              placeholder="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-6 w-6 rounded text-teal-500 border-gray-300 focus:ring focus:ring-teal-300"
              />
            {/* all pending complete ke leye h */}
              <div>
                <span
                  className={`text-xl font-medium ${
                    task.completed
                      ? "line-through text-gray-600"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
                {/* mai text ke bad ka text some text in lighter way */}
                <div className="text-sm text-gray-300">
                  {task.category} | Due: {task.dueDate}
                </div>
              </div>
            </div>                                    
            {/* add ke leye */}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-orange-500 hover:text-orange-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default Home;
