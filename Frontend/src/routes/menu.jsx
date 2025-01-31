import { useEffect, useState } from "react";
import { get_messages, get_notes } from "../api/endpoints";
import { useAuth } from "../context/useAuth";

const Menu = () => {
  const [notes, setNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await get_notes();
      setNotes(notes);
    };
    fetchNotes();

    const fetchMessages = async () => {
      const messages = await get_messages();
      setMessages(messages);
    };
    fetchMessages();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex flex-col items-start p-4">
      <h1 className="text-4xl pb-8">Welcome {user ? user.username : "Guest"} 👋</h1>

      <div className="pb-12">
        {notes.map((note) => (
          <p key={note.id} className="text-xl py-2">{note.description}</p>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
