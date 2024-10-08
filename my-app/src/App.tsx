import './App.css';
import React, { useState, useEffect} from 'react';
import { Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module


function App() {
    const [notes, setNotes] = useState(dummyNotesList);
    const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);

     // Toggle the favorite status of a note
    const toggleFavorite = (noteId: number) => {
        const updatedNotes = notes.map((note) => {
            if (note.id === noteId) {
                const isFavorite = !note.isFavorite; // Toggle favorite status
                if (isFavorite) {
                    setFavoriteNotes([...favoriteNotes, note]); // Add to favorites
                } else {
                    setFavoriteNotes(favoriteNotes.filter((fav) => fav.id !== note.id)); // Remove from favorites
                }
                return { ...note, isFavorite }; // Update the note's favorite status
            }
            return note;
        });
        setNotes(updatedNotes); 
    };

    return (
    <div className='app-container'>
        <form className="note-form">
            <div><input placeholder="Note Title" ></input></div>

            <div><textarea placeholder="Note Content"></textarea></div>

            <div><select name="labels" id="label-select">
                <option value="">--Please choose an option--</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="other">Other</option>
            </select></div>

            <div><button type="submit">Create Note</button></div>
        </form>
        
        <div className="notes-grid">
            {notes.map((note) => (
                <div
                key={note.id}
                className="note-item">
                <div className="notes-header">
                    {/* Toggle favorite when the heart button is clicked */}
                    <button onClick={() => toggleFavorite(note.id)}>
                        {note.isFavorite ? "❤️" : "♡"}
                    </button>
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
                </div>
            ))}
        </div>

        {/* New Section to display just the titles of favorited notes */}
        <div className="favorites-list">
            <h2>List of favorites:</h2>
            <ul>
                {favoriteNotes.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
   </div>

 );
}

export default App;