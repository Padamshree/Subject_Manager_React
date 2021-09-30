import React, { useState } from "react";
import { TextField, Button, Modal, Box,  makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import { setNote, setTopic } from "../actions/subjectActions";
import { SUBJECT_TYPES } from "../actions/subject.types";

import '../styles/TopicModal.css'

const useStyles = makeStyles(() => ({
  saveModal: {
    margin: '0px 200px',
    marginBottom: '20px',
  },
  modalTopic: {
    margin: '0 120px',
    marginBottom: '25px',
}
}));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  overflow:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TopicModal ({ topicName, topicId, noteList, updateTopic, deleteTopic }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subject);
  const { currentNote, currentTopic, updateState } = subject;

  const handleOpen = () => {
    const topicItem = { topicName, topicId, noteList };
    dispatch(setTopic(topicItem));
    setOpen(true);
  };
  const handleClose = () => {
    dispatch({ type: SUBJECT_TYPES.CLEAR_NOTE_STATE, payload: null });
    setOpen(false);
  }

  const addNoteHandler = () => {
    const newNote = {
      ...currentNote,
      noteId: uuid(),
    }
    const currentList = [ ...currentTopic.noteList, newNote];
    const newTopic = {
      ...currentTopic,
      noteList: currentList,
    }
    dispatch(setTopic(newTopic));
    dispatch({ type: SUBJECT_TYPES.CLEAR_NOTE_STATE, payload: null });
  }

  const editNote = (noteId) => {
    dispatch({ type: SUBJECT_TYPES.UPDATE_STATE, payload: true });
    const note = currentTopic.noteList.find((note) => note.noteId === noteId);
    dispatch(setNote(note));
  }

  const updateNoteHandler = () => {
    const updatedNotesList = [];
    currentTopic.noteList.forEach((note) => {
      if (note.noteId !== currentNote.noteId) {
        updatedNotesList.push(note);
      } else {
        updatedNotesList.push({ ...currentNote });
      }
    });

    dispatch(setTopic({ ...currentTopic, noteList: updatedNotesList }));
    dispatch({ type: SUBJECT_TYPES.CLEAR_NOTE_STATE, payload: null });
    dispatch({ type: SUBJECT_TYPES.UPDATE_STATE, payload: false });
  }

  const deleteNote = (noteId) => {
    const updatedNotesList = currentTopic.noteList.filter((note) => note.noteId !== noteId);
    dispatch(setTopic({ ...currentTopic, noteList: updatedNotesList }));
  }


  return (
    <div>
      <Button 
        onClick={handleOpen}
        variant='contained'
        color='primary'
        style={{ margin: '8px 8px' }}
      >
        View
      </Button>
      <Button 
        onClick={() => deleteTopic(topicId)}
        variant='contained'
        color='secondary'
      >
        Delete Topic
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Button
            className={classes.saveModal}
            variant='contained'
            color='primary'
            onClick={updateTopic}
          >
            Save
          </Button>
          <br />
          <TextField
            className={classes.modalTopic}
            label="Topic"
            variant='outlined'
            inputProps={{ style: { textAlign: 'center' } }}
            value={currentTopic.topicName || ''}
            onChange={(e) => {
              const newItem = { ...currentTopic, topicName: e.target.value };
              dispatch(setTopic(newItem));
            }}
          />
          <br />
          <div className='add-modal-note'>
            <TextField
              label="Note"
              variant='outlined'
              style={{ width: '60%' }}
              multiline
              maxRows={Infinity}
              value={currentNote.note || ''}
              onChange={(e) => {
                const newItem = { ...currentNote, note: e.target.value };
                dispatch(setNote(newItem));
              }}
            />
            {
              !updateState ? (
              <Button
              onClick={addNoteHandler}
              >
                Add Note
              </Button>
              ) : (
                <Button
              onClick={updateNoteHandler}
              >
                Update Note
              </Button>
              )
            }
          </div>
          <br />
          <div>
            {
              !updateState && currentTopic.noteList && currentTopic.noteList.length > 0
              && currentTopic.noteList.map((note) => {
                return (
                <div className='note-div' key={note.noteId}>
                  <hr style={{ margin: '16px 0px' }}/>
                  <TextField
                    label="Note"
                    variant='outlined'
                    multiline
                    style={{ width: '60%' }}
                    value={note.note || ''}
                    disabled={currentNote.noteId === note.noteId ? false : true}
                    onChange={(e) => {
                      const newItem = { ...currentNote, note: e.target.value };
                      dispatch(setNote(newItem));
                    }}
                  />
                  <Button
                    onClick={() => editNote(note.noteId)}
                  >
                    Edit Note
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => deleteNote(note.noteId)}
                  >
                    Delete
                  </Button>
                 </div>
              )})
            }
          </div>
          <br />
          <Button
            variant='outlined'
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}