import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, todos, addTodo, setTodos, logout } = useContext(AuthContext);
  const [todoText, setTodoText] = useState('');
  const [subTaskText, setSubTaskText] = useState('');
  const [subTaskTexts, setSubTaskTexts] = useState({});

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      const todo = {
        id: Math.random().toString(),
        text: todoText,
        subTasks: [],
      };
      addTodo(todo);
      setTodoText('');
    }
  };

  const handleAddSubTask = (todoId) => {
    if (subTaskTexts[todoId]?.trim() !== '') {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subTasks: [
              ...todo.subTasks,
              { id: Math.random().toString(), text: subTaskTexts[todoId] },
            ],
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setSubTaskTexts({ ...subTaskTexts, [todoId]: '' });
    }
  };

  const handleSubTaskTextChange = (todoId, text) => {
    setSubTaskTexts({ ...subTaskTexts, [todoId]: text });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Page</h2>
      {user ? (
        <div>
          <h2 className="welcome-message">Welcome, {user.username}!</h2>
          <div className="add-todo-section">
            <h3>Add New Todo</h3>
            <input
              type="text"
              className="todo-input"
              placeholder="What needs to be done"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button className="add-todo-button" onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
          <div className="todos-section">
            <h3>Todos</h3>
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <p>{todo.text}</p>
                <div className="subtask-section">
                  <input
                    type="text"
                    className="subtask-input"
                    placeholder="Enter sub-task text"
                    value={subTaskTexts[todo.id] || ''}
                    onChange={(e) => handleSubTaskTextChange(todo.id, e.target.value)}
                  />
                  <button
                    className="add-subtask-button"
                    onClick={() => handleAddSubTask(todo.id)}
                  >
                    Add Sub-task
                  </button>
                </div>
                <ul className="subtask-list">
                  {todo.subTasks.map((subTask) => (
                    <li key={subTask.id}>{subTask.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-message">
          <p>Please login to view the dashboard.</p>
          <Link to="/">Go to Login</Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
