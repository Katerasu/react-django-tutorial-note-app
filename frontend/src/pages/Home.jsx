import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api("/api/notes/");

      const data = await res.data;

      setNotes(data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);

      if (res.status === 204) alert("Note deleted!");
      else alert("Failed to deleted note!");

      getNotes();
    } catch (error) {
      alert(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", {
        content,
        title,
      });

      if (res.status === 201) alert("Note created!");
      else alert("Failed to create note!");

      getNotes();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="">
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2>Create a Note</h2>

      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <button type="submit" className="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
