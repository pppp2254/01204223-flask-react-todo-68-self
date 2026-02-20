import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './TodoItem.jsx'
import { useAuth } from './context/AuthContext.jsx'

function TodoList({ apiUrl }) {
  const TODOLIST_API_URL = apiUrl;
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const { username, accessToken, logout } = useAuth();

  useEffect(() => {
    fetchTodoList();
  }, [username]);

  async function fetchTodoList() {
    try {
      const response = await fetch(TODOLIST_API_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTodoList(data);
      } else {
        setTodoList([]);
      }
    } catch (err) {
      setTodoList([]);
    }
  }

  async function toggleDone(id) {
    const toggle_api_url = `${TODOLIST_API_URL}${id}/toggle/`;
    try {
      const response = await fetch(toggle_api_url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json' // Good practice to include
        }
      });
      
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodoList(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      } else {
        // If you see this in console, the backend rejected the request
        console.error("Toggle failed with status:", response.status);
      }
    } catch (error) {
      console.error("Network error during toggle:", error);
    }
  }

  async function deleteTodo(id) {
    const delete_api_url = `${TODOLIST_API_URL}${id}/`;
    try {
      const response = await fetch(delete_api_url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        setTodoList(prev => prev.filter(todo => todo.id !== id));
      } else {
        // This matches the 500 error you are seeing in the screenshot
        console.error("Delete failed with status:", response.status);
      }
    } catch (error) {
      console.error("Network error during delete:", error);
    }
  }
  async function addNewTodo() {
    try {
      const response = await fetch(TODOLIST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ 'title': newTitle }),
      });
      if (response.ok) {
        const newTodo = await response.json();
        setTodoList([...todoList, newTodo]);
        setNewTitle("");
      }
    } catch (error) { console.error(error); }
  }
  async function addNewComment(todoId, newComment) { 
  try {
    const url = `${TODOLIST_API_URL}${todoId}/comments/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` 
      },
      body: JSON.stringify({ 'message': newComment }), 
    });
    if (response.ok) {
      await fetchTodoList(); 
    }
  } catch (error) { 
    console.error("Error adding comment:", error); 
  }
}

  return (
    <div>
      {username && (
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <span>Logged in as: <strong>{username}</strong></span> | 
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ marginLeft: '10px' }}>Logout</a>
        </div>
      )}

      <h1>Todo List</h1>

      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addNewTodo}>Add</button>

      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          addNewComment={addNewComment} 
        />
      ))}
      
      <br />
      <a href="/about">About</a>
    </div>
  );
}

export default TodoList;