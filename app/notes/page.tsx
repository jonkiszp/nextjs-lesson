"use client"
import { useCallback, useEffect, useEffectEvent, useState } from "react"

export default () => {
    const [notes, setNotes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (e.target.note && e.target.note.value.trim() != "") {
            const note = e.target.note.value.trim();
            setNotes([...notes, note]);
            e.target.note.value = "";
            setShowPopup(false);
        } else {
            setShowPopup(true);
        }
    }

    // Te 2 funkcje działają tak samo
    const funkcja1 = useEffect(() => {
        console.log("test");
    },[showPopup]);

    const funkcja2 = useCallback(() => {
        console.log("test");
    },[showPopup]); 


    return (
        <div>
            <h1>notes</h1>
            <form onSubmit={handleSubmit}>
                <input name="note" placeholder="textbox" className="border border-gray-300 rounded px-2 py-1" type="text" />
                <button className="border border-gray-300 rounded px-2 py-1" type="submit">Dodaj notatke</button>
            </form>
            {showPopup ?
                <div role="dialog" aria-modal="true" className="border border-red-400 bg-red-50 p-3 mt-2 rounded">
                    <p>Notatka nie może być pusta!</p>
                    <button onClick={() => setShowPopup(false)} className="border border-gray-300 rounded px-2 py-1 mt-1">
                        Zamknij
                    </button>
                </div>
                : null}
            <div>
                {notes.map((note, index) => (
                    <p className='note' key={`notes_${index}`}>{note}</p>
                ))}
            </div>
        </div>
    )
}
