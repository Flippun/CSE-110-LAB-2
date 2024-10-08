import './App.css';
import React, { useState, useEffect, FormEvent} from 'react';
import { ThemeContext, themes } from './themeContext';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 


function App() {
    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        isFavorite: false,
    };
    const [createNote, setCreateNote] = useState(initialNote);
    const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);
    const [currentTheme, setCurrentTheme] = useState(themes.light);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault(); 
        const newNote = {
            id: notes.length + 1, 
            title: createNote.title,
            content: createNote.content,
            label: createNote.label,
            isFavorite: false, 
        };
        setNotes([...notes, newNote]);
        setCreateNote(initialNote);
    };

    const deleteNote = (noteId: number) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);

        const updatedFavorites = updatedNotes.filter(note => note.isFavorite);
        setFavoriteNotes(updatedFavorites); 
        setNotes(updatedNotes); 
    };
    
    const toggleFavorite = (noteId: number) => {
        const updatedNotes = notes.map((note) => {
            if (note.id === noteId) {
                const isFavorite = !note.isFavorite; 
                if (isFavorite) {
                    return { ...note, isFavorite }; 
                } else {
                    return { ...note, isFavorite }; 
                }
            }
            return note;
        });
    
        const updatedFavorites = updatedNotes.filter(note => note.isFavorite); 
        setFavoriteNotes(updatedFavorites); 
        setNotes(updatedNotes); 
    };

    const handleNoteChange = (property: keyof Note, value: string) => {
        const updatedNotes = notes.map(note => {
            if (note.id === selectedNote.id) {
                const updatedNote = { ...note, [property]: value };
                return updatedNote; 
            }
            return note;
        });
    
        const updatedFavorites = updatedNotes.filter(note => note.isFavorite);
        setFavoriteNotes(updatedFavorites); 
        setNotes(updatedNotes); 
    };

    return (
    <ThemeContext.Provider value={currentTheme}>
    <div className={`app-container ${currentTheme === themes.dark ? 'dark-mode' : ''}`}>
        <form className="note-form" onSubmit={createNoteHandler}>
            <div className="theme-button">
                <button onClick={toggleTheme}>
                    Toggle to {currentTheme === themes.light ? "Dark" : "Light"} Mode
                </button>
            </div>
            
            <div><input
                placeholder="Note Title"
                value={createNote.title}
                onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
                required>
            </input></div>

            <div><textarea
                placeholder="Note Content"
                value={createNote.content}
                onChange={(event) =>
                    setCreateNote({ ...createNote, content: event.target.value })}
                required
            ></textarea></div>

            <div><select
            value={createNote.label}
            onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label })}
                required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
            </select></div>

            <div><button type="submit">Create Note</button></div>  
        </form>
        
        <div className="notes-grid">
            {notes.map((note) => (
                <div key={note.id} className="note-item">
                <div className="notes-header">
                    <button onClick={() => toggleFavorite(note.id)}>
                        {note.isFavorite ? "❤️" : "♡"}
                    </button> 
                    <button onClick={() => deleteNote(note.id)}>
                        x
                    </button>
                </div>
                <h2
                    contentEditable
                    suppressContentEditableWarning
                    onFocus={() => setSelectedNote(note)} 
                    onBlur={(e) => {
                        const newTitle = e.currentTarget.innerText;
                        handleNoteChange('title', newTitle);
                    }}
                >{note.title}</h2>
                <p
                    contentEditable
                    suppressContentEditableWarning
                    onFocus={() => setSelectedNote(note)} 
                    onBlur={(e) => {
                        const newContent = e.currentTarget.innerText;
                        handleNoteChange('content', newContent);
                    }}
                >{note.content}</p>
                <p
                    contentEditable
                    suppressContentEditableWarning
                    onFocus={() => setSelectedNote(note)} 
                    onBlur={(e) => {
                        const newLabel = e.currentTarget.innerText as Label; 
                        handleNoteChange('label', newLabel);
                    }}
                >{note.label}</p>
            </div>
            ))}
        </div>

        <div className="favorites-list">
            <h2>List of favorites:</h2>
            <ul>
                {favoriteNotes.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
   </div></ThemeContext.Provider>
 );
}

export default App;