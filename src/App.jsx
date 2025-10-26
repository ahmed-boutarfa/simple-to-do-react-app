import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!input.trim()) {
      alert("Enter Task !!")
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  }

  function toggleDone(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((t) => !t.done));
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Simple To-Do App</h2>

          <form onSubmit={addTask} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <button
                className={`btn btn-sm me-1 ${
                  filter === "all" ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`btn btn-sm me-1 ${
                  filter === "active" ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`btn btn-sm ${
                  filter === "completed"
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <small className="text-muted">
              {tasks.filter((t) => !t.done).length} remaining
            </small>
          </div>

          <ul className="list-group mb-3">
            {filteredTasks.length === 0 && (
              <li className="list-group-item text-center text-muted">
                No tasks yet
              </li>
            )}

            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                      color: task.done ? "#888" : "#000",
                    }}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setTasks([])}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
