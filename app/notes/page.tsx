"use client"
import { useState } from "react"

export default () => {
    const [notes, setNotes] = useState<string[]>([]);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (e.target.note && e.target.note.value.trim() != "") {
            const note = e.target.note.value.trim();
            setNotes([...notes, note]);
            e.target.note.value = "";
        }
    }

    return (
        <div>
            <h1>notes</h1>
            <form onSubmit={handleSubmit}>
                <input name="note" className="border border-gray-300 rounded px-2 py-1" type="text" />
                <button className="border border-gray-300 rounded px-2 py-1" type="submit">Dodaj notatke</button>
            </form>
            <div>
                {notes.map((note, index) => (
                    <p key={`notes_${index}`}>{note}</p>
                ))}
            </div>
        </div>
    )
}