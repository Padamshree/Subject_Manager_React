import React, { useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import uuid from 'react-uuid';

import TopicModal from './TopicModal';

import { getSubjectList, 
  setSubject,
  addSubjectToList,
  setTopic,
  updateSubjectInList,
  removeSubjectInList,
} from '../actions/subjectActions';

import '../styles/Main.css';
import { SUBJECT_TYPES } from '../actions/subject.types';

export default function Main() {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subject);
  const { 
    currentSubject, 
    subjectList, 
    currentTopic 
  } = subject;

  useEffect(() => {
    dispatch(getSubjectList());
  }, [dispatch]);

  const addSubjectHandler = () => {
    dispatch(addSubjectToList(currentSubject));
  }

  const editSubjectHandler = () => {
    dispatch(updateSubjectInList(currentSubject));
  }

  const deleteSubjectHandler = () => {
    dispatch(removeSubjectInList(currentSubject));
  }

  const addTopicHandler = () => {
    const { topicsList } = currentSubject;
    const addTopic = {
      topicId: uuid(),
      topicName: currentTopic.topicName,
      noteList: [],
    }
    const currentList = [ ...topicsList, addTopic ];
    const newSub = {
      ...currentSubject,
      topicsList: currentList,
    }
    dispatch(setSubject(newSub));
    dispatch({ type: SUBJECT_TYPES.CLEAR_TOPIC_STATE, payload: null });
  }

  const updateTopic = () => {
    const updatedTopicsList = [];
    currentSubject.topicsList.forEach((topic) => {
      if (topic.topicId !== currentTopic.topicId) {
        updatedTopicsList.push(topic);
      } else {
        updatedTopicsList.push(currentTopic);
      }
    })
    dispatch(setSubject({ ...currentSubject, topicsList: updatedTopicsList }));
  }

  const deleteTopic = (topicId) => {
    const updatedTopicsList = currentSubject.topicsList.filter((topic) => topic.topicId !== topicId);
    dispatch(setSubject({ ...currentSubject, topicsList: updatedTopicsList }));
  }
  

  return (
    <div className='main-container'>
      <div className="add-subject-container">
        <TextField
          className='add-subject-action'
          label="Subject"
          value={currentSubject.subjectName || ''}
          onChange={(e) => {
            const newItem = { ...currentSubject, subjectName: e.target.value }
            dispatch(setSubject(newItem));
          }}
        />
        <br />
        {
          !currentSubject.subjectId && 
          <Button
            className='add-subject-action'
            variant='outlined'
            color='inherit'
            size='small'
            onClick={addSubjectHandler}
          >
            Add
          </Button>
        }
      </div>
      <br />
      <div style={{ width: '200px' }}>
        { subjectList && subjectList.length > 0 &&
          <Select
            placeholder="Select Subject"
            isMulti={false}
            isSearchable
            value = { currentSubject.subjectId ? { value: currentSubject.subjectName, label: currentSubject.subjectName } : '' }
            options={(subjectList && subjectList.length
            && subjectList.map((item) => ({ value: item.subjectId, label: item.subjectName })))}
            onChange={(option, _action) => {
              const selectedOption = subjectList.find((subject) => subject.subjectId === option.value);
              dispatch(setSubject(selectedOption));
              }
            }
          />
        }
      </div>
      <div className="cards-container">
        <div>
          {
            currentSubject.subjectId && 
            <div>
              <div className="topic-container">
                <TextField
                  className='add-topic'
                  placeholder="Topic"
                  value={currentTopic.topicName || ''}
                  onChange={(e) => {
                      const newItem = { ...currentTopic, topicName: e.target.value }
                      dispatch(setTopic(newItem));
                    }}
                />
                <br />
                <Button
                  variant='outlined'
                  color='inherit'
                  size='small'
                  onClick={addTopicHandler}
                >
                  Add
                </Button>
              </div>
              <br />
              <div className='topics-list'>
                {
                  currentSubject.topicsList && currentSubject.topicsList.length ? (
                    currentSubject.topicsList.map((topic) => (
                      <div key={topic.topicId} className='topic-card'>
                        {topic.topicName}
                        <TopicModal
                          {...topic}
                          updateTopic={updateTopic}
                          deleteTopic={deleteTopic}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      No Topic for this subject
                    </div>
                  )
                }
              </div>
            </div>
          }
        </div>
      </div>
      {
          currentSubject.subjectId && 
            <div>
              <br />
              <Button
                className='delete-btn act-btn'
                variant='contained'
                color='secondary'
                size='small'
                style={{ margin: '0.5rem 0.5rem' }}
                onClick={deleteSubjectHandler}
              >
                Delete Subject
              </Button>
              <br />
              <Button
                className='save-btn act-btn'
                variant='contained'
                color='primary'
                size='small'
                style={{ margin: '0.5rem 0.5rem' }}
                onClick={editSubjectHandler}
              >
                Save Changes
              </Button>
              <br />
              <Button
                className='add-new-btn act-btn'
                variant='outlined'
                color='inherit'
                style={{ margin: '0.5rem 0.5rem' }}
                onClick={() => dispatch({ type: SUBJECT_TYPES.CLEAR_SUBJECT_STATE, payload: null })}
              >
                Add New Subject
              </Button>
            </div>
        }
    </div>
  )
    
}