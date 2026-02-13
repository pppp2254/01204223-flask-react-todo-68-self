import { useState } from 'react'

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => toggleDone?.(todo.id)}>Toggle</button>
      <button onClick={() => deleteTodo?.(todo.id)}>❌</button>

      {todo.comments && todo.comments.length > 0 ? (
        <ul>
          {todo.comments.map(comment => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </ul>
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
  );
}

export default TodoItem; // ตรวจสอบบรรทัดนี้ให้ดีครับ!