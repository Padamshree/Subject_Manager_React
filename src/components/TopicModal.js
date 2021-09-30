import React, { useState } from "react";
import { TextField, Button, Modal, Typography, Box } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { setNote, setTopic, updateSubjectInList, setSubject } from "../actions/subjectActions";
import { SUBJECT_TYPES } from "../actions/subject.types";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  overflow:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TopicModal ({ topicName, topicId, noteList }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subject);
  const { currentNote, currentTopic, currentSubject } = subject;

  const handleOpen = () => {
    const topicItem = { topicName, topicId, noteList };
    dispatch(setTopic(topicItem));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const addNoteHandler = () => {
    const newNote = {
      ...currentNote,
      noteId: uuid()
    }
    const currentList = [ ...currentTopic.noteList, newNote];
    
    const newTopic = {
      ...currentTopic,
      noteList: currentList,
    }

    dispatch(setTopic(newTopic));

    const updatedTopicsList = [];

    currentSubject.topicsList.forEach((topic) => {
      if (topic.topicId !== currentTopic.topicId) {
        updatedTopicsList.push(topic);
      } else {
        updatedTopicsList.push(newTopic)
      }
    })

    dispatch(setSubject({ ...currentSubject, topicsList: updatedTopicsList }))
    dispatch({ type: SUBJECT_TYPES.CLEAR_NOTE_STATE, payload: null })
  }

  const editNote = () => {
    
  }

  return (
    <div>
      <Button 
        onClick={handleOpen}
        variant='contained'
        color='primary'
      >
        View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            placeholder='Topic'
            variant='outlined'
            value={currentTopic.topicName || ''}
            onChange={(e) => {
              const newItem = { ...currentTopic, topicName: e.target.value };
              dispatch(setTopic(newItem));
            }}
          />
          <br />
          <div>
          <TextField
            label="Note"
            variant='outlined'
            value={currentNote.note || ''}
            onChange={(e) => {
              const newItem = { ...currentNote, note: e.target.value };
              dispatch(setNote(newItem));
            }}
          />
          <Button
            onClick={addNoteHandler}
          >
            ADD NOTE
          </Button>
          </div>
          <br />
          <div>
            {
              noteList && noteList.length
              && noteList.map((note) => {
                (
                <div>
                  {note.note}
                  <TextField
                    label="Note"
                    variant='outlined'
                    value={currentNote.note || ''}
                    disabled={currentNote.noteId === note.noteId ? false : true}
                    onChange={(e) => {
                      const newItem = { ...currentNote, note: e.target.value };
                      dispatch(setNote(newItem));
                    }}
                  />
                  <Button
                    onClick={editNote}
                  >
                    ADD NOTE
                  </Button>
                 </div>
              )})
            }
          </div>
          <br />
          <Button
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