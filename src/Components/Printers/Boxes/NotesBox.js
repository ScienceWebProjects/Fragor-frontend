// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';
import usePermissions from '../../../Hooks/usePermissions';

// components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import '../../../Fonts/fontello-notes/css/fontello.css';
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_details-printer-notes.scss';

function NotesBox({ api, object, id, onNotesBox }) {
  const user = useToken();
  const permission = usePermissions(user);

  // if authorization >= changer = true
  const changerUser = permission.changer;
  const editBtn = changerUser ? true : false;
  const deleteBtn = changerUser ? true : false;
  const saveBtn = changerUser ? true : false;
  const newNoteBtn = changerUser ? true : false;

  const [notes, setNotes] = useState([
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
    'No added note yet.',
  ]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNote, setEditedNote] = useState('');

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
        `${api.ip}${api.shareNotesGet}${object}/${id}/`,
        requestOptions
      );

      const notesArray = await response.json();

      setNotes(notesArray);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoteApiCall();
  });

  const newEditNoteApiCall = async () => {
    // e.preventDefault();

    const editData = {
      object: object,
      id: id,
      notes: notes,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editData),
    };

    try {
      const response = await fetch(
        `${api.ip}${api.shareNotesUpdate}${object}/${id}/`,
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

  const editHandler = (index) => {
    setEditingIndex(index);
    setEditedNote(notes[index]);
  };

  const saveHandler = (index) => {
    const newNotes = [...notes];
    newNotes[index] = editedNote;

    const success = newEditNoteApiCall();
    if (success === true) {
      setNotes(newNotes);
    }

    setEditingIndex(-1);
  };

  const deleteHandler = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);

    const success = newEditNoteApiCall();

    if (success === true) {
      setNotes(newNotes);
    }
  };

  const addNewNoteHandler = () => {
    const success = newEditNoteApiCall();

    if (success === true) {
      // create new note
      const newNote = 'New note';

      // Add a new note to an existing note list
      const newNotes = [...notes, newNote];

      // Set the index of a new note in edit mode
      const newIndex = newNotes.length - 1;

      setNotes(newNotes);
      setEditingIndex(newIndex);
      setEditedNote(newNote);
    }
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
              <div key={index}>
                {index === editingIndex ? (
                  <div className='note-edit'>
                    <textarea
                      rows={'4'}
                      value={editedNote}
                      className='edit-text'
                      onChange={(e) => setEditedNote(e.target.value)}
                    />
                    {saveBtn && (
                      <button
                        className='edit-btn'
                        onClick={() => {
                          saveHandler(index);
                        }}
                      >
                        <i className='icon-floppy'></i>
                      </button>
                    )}
                  </div>
                ) : (
                  <section className='note-wrapper'>
                    <div className='wrapper-text'>{note}</div>
                    <div className='wrapper-btns'>
                      {deleteBtn && (
                        <button
                          className='btn__delete'
                          onClick={() => {
                            deleteHandler(index);
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
