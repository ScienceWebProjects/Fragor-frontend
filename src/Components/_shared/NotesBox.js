// libs

// hooks
import { useState, useEffect, useRef } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import '../../Fonts/fontello/css/fragor.css';
import Button from '../UI/shared/buttons/Button';

// scss
import '../UI/shared/_box.scss';
import './UI/_details-notes.scss';

function NotesBox({ api, object, id, onNotesBox }) {
  const user = useToken();
  const permission = usePermissions(user);
  const lastNoteRef = useRef(null);

  // check the object for which the note is to be changed
  const objectApi =
    object === 'printer'
      ? api.printerAPI
      : object === 'filament'
      ? api.filamentAPI
      : null;

  // if authorization >= changer = true
  const changerUser = permission.changer;
  const editBtn = changerUser ? true : false;
  const deleteBtn = changerUser ? true : false;
  const saveBtn = changerUser ? true : false;
  const newNoteBtn = changerUser ? true : false;

  const [notes, setNotes] = useState([
    {
      id: 1,
      note: 'Note 1',
    },
    {
      id: 2,
      note: 'Note 2',
    },
    {
      id: 3,
      note: 'Note 3',
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNote, setEditedNote] = useState('');
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);

  const getNoteApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${api.ip}${objectApi}${api.printerNotesGet_printerId}${id}/`,
        requestOptions
      );

      const notes = await response.json();

      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoteApiCall();
  });

  const newEditNoteApiCall = async (noteId, note = null) => {
    const editData = {
      noteID: noteId,
      note: note,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editData),
    };

    try {
      const response = await fetch(
        `${api.ip}${objectApi}${api.printerNoteUpdate_printerId}${id}/`,
        requestOptions
      );

      if (response.status === 200) {
        return true;
      }

      if (response.status === 400 || response.status === 404) {
        alert(response.message);
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
      return;
    }
  };

  const noteError = () => {
    // If you try to add a new note before saving the current note
    const editingNote = document.querySelector('.save-text');
    editingNote.classList.toggle('warning');

    setTimeout(() => {
      editingNote.classList.toggle('warning');
    }, 300);
  };

  const editHandler = (index) => {
    if (isAddingNewNote) {
      noteError();
      return;
    }

    setIsAddingNewNote(true);
    setEditingIndex(index);
    setEditedNote(notes[index]);
  };

  const saveHandler = (noteId, note) => {
    console.log(noteId, note);

    const success = newEditNoteApiCall(noteId, note);

    if (success === true) {
      setEditingIndex(-1);
      setIsAddingNewNote(false);
    }
  };

  const deleteHandler = async (noteId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.ip}${objectApi}${id}/${api.printerNoteDelete_id}${noteId}/`,
        requestOptions
      );

      if (response.status === 204) {
        return console.log('Delete note.');
      }

      if (response.status === 400 || response.status === 404) {
        alert(response.message);
        return;
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
      return;
    }
  };

  const addNewNoteHandler = () => {
    if (isAddingNewNote) {
      noteError();
      return;
    }

    setIsAddingNewNote(true);

    // creating new note
    const newNote = {
      id: notes.length + 1,
      note: 'New note',
    };

    // Add a new note to an existing note list
    const newNotes = [...notes, newNote];

    // Set the index of a new note in edit mode
    const newIndex = newNotes.length - 1;

    setNotes(newNotes);
    setEditingIndex(newIndex);
    setEditedNote(newNote);

    setTimeout(() => {
      if (lastNoteRef.current) {
        lastNoteRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 100);
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <div className='notes-container'>
          <InfiniteScroll
            dataLength={''}
            hasMore={true}
            height={'50vh'}
            // endMessage={'No more added filaments'}
          >
            {notes.map((note, index) => (
              <div
                key={note.id}
                ref={index === notes.length - 1 ? lastNoteRef : null}
              >
                {index === editingIndex ? (
                  <div className='note-save'>
                    <textarea
                      rows={'4'}
                      value={editedNote.note}
                      className='save-text'
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                    {saveBtn && (
                      <button
                        className='save-btn'
                        onClick={() => {
                          saveHandler(note.id, editedNote);
                        }}
                      >
                        <i className='icon-floppy'></i>
                      </button>
                    )}
                  </div>
                ) : (
                  <section className='note-wrapper'>
                    <div className='wrapper-text'>{note.note}</div>
                    <div className='wrapper-btns'>
                      {deleteBtn && (
                        <button
                          className='btn__delete'
                          onClick={() => {
                            deleteHandler(note.id);
                          }}
                        >
                          <i className='icon-trash'></i>
                        </button>
                      )}

                      {editBtn && (
                        <button
                          className='btn__edit'
                          onClick={() => editHandler(index)}
                        >
                          <i className='icon-edit-1'></i>
                        </button>
                      )}
                    </div>
                  </section>
                )}
              </div>
            ))}
          </InfiniteScroll>
        </div>

        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='red'
            type='button'
            onClick={() => onNotesBox(false)}
          >
            Back
          </Button>
          {newNoteBtn && (
            <Button
              className='btns-btn'
              color='green'
              type='button'
              onClick={() => addNewNoteHandler()}
            >
              Add note
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesBox;
