import { useState } from 'react'
import './App.css'

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");

  const commentCount = todo.comments ? todo.comments.length : 0;

  return (
    <li>
      <span className={todo.done ? "done" : ""}>{todo.title}</span>
      <button onClick={() => toggleDone?.(todo.id)}>Toggle</button>
      <button onClick={() => deleteTodo?.(todo.id)}>❌</button>

      {commentCount > 0 ? (
        <>
          <br /><b>Comments ({commentCount}):</b>
          <ul>
            {todo.comments.map(comment => (
              <li key={comment.id}>{comment.message}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No comments</p>
      )}

      <div className="new-comment-forms">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => {
          addNewComment?.(todo.id, newComment);
          setNewComment("");
        }}>
          Add Comment
        </button>
      </div>
    </li>
  )
}

export default TodoItem