// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import trashCanIco from '../../../Images/trash.png';
import editIco from '../../../Images/edit.png';
import saveIco from '../../../Images/save.png';
import '../../../Fonts/fontello-notes/css/fontello.css';
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_details-printer-notes.scss';

function NotesBox({ api, id, onNotesBox }) {
  // add authorization

  const [editBtn, setEditBtn] = useState(false); // if authorization >= changer = true
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [newNoteBtn, setNewNoteBtn] = useState(false);

  const [notes, setNotes] = useState([
    'Notes 1 \nthis is multi\n line note.',
    "Note 2 - it's one line note",
    'Notatka 3 - a to notatka po polsku ze słowem żółć.',
  ]);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNote, setEditedNote] = useState('');

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedNote(notes[index]);
  };

  const handleSaveEdit = (index) => {
    const newNotes = [...notes];
    newNotes[index] = editedNote;
    setNotes(newNotes);
    setEditingIndex(-1);
  };

  const handleDelete = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <div className='notes-container'>
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
                  <button
                    className='edit-btn'
                    onClick={() => handleSaveEdit(index)}
                  >
                    {/* <img
                      src={saveIco}
                      alt='Edit'
                      className='save-ico'
                    /> */}
                    <i className='icon-floppy'></i>
                  </button>
                </div>
              ) : (
                <section className='note-wrapper'>
                  <div className='wrapper-text'>{note}</div>
                  <div className='wrapper-btns'>
                    <button
                      className='btn__delete'
                      onClick={() => handleDelete(index)}
                    >
                      <img
                        src={trashCanIco}
                        alt='Delete'
                        className='delete-ico'
                      />
                    </button>{' '}
                    <button
                      className='btn__edit'
                      onClick={() => handleEditClick(index)}
                    >
                      <img
                        src={editIco}
                        alt='Edit'
                        className='edit-ico'
                      />
                    </button>
                  </div>
                </section>
              )}
            </div>
          ))}
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
        </div>
      </div>
    </div>
  );
}

export default NotesBox;
