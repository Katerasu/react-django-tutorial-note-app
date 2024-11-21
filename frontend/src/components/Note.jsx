import '../styles/Note.css';

const Note = ({ note, onDelete }) => {
  const date = new Date(note.created_at);
  const formattedDate = `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-GB")}`;

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button
        className="delete-button"
        onClick={() => onDelete(note.id)}
      >Delete Note</button>
    </div>
  );
};

export default Note;
