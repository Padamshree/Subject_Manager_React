import React, { useEffect } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import uuid from 'react-uuid';

import SubjectCard from './SubjectCards';
import TopicModal from './TopicModal';
import Test from './Test';

import { getSubjectList, 
  setSubject,
  addSubjectToList,
  setTopic,
  setSubjectList,
  updateSubjectInList,
  removeSubjectInList,
} from '../actions/subjectActions';

import '../styles/Main.css';

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
  }, []);

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
    dispatch(updateSubjectInList(newSub));
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
          currentSubject.subjectId && 
            <div>
              <Button
                className='add-subject-action'
                variant='outlined'
                color='inherit'
                size='small'
                onClick={editSubjectHandler}
              >
                Edit
              </Button>
              <br />
              <Button
                className='add-subject-action'
                variant='outlined'
                color='inherit'
                size='small'
                onClick={deleteSubjectHandler}
              >
                Delete
              </Button>
            </div>
        }
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
        <Select
          placeholder="Select Subject"
          isMulti={false}
          isSearchable
          value = { currentSubject.subjectId ? { value: currentSubject.subjectName, label: currentSubject.subjectName } : '' }
          options={(subjectList && subjectList.length
          && subjectList.map((item) => ({ value: item.subjectId, label: item.subjectName })))}
          onChange={(option, _action) => {
            console.log(option);
            const selectedOption = subjectList.find((subject) => subject.subjectId === option.value);
            console.log(selectedOption);
            dispatch(setSubject(selectedOption));
            }
          }
        />
      </div>
      <div className="cards-container">
        <div>
          {
            currentSubject.subjectName && 
            <div style={{ width: '300px' }}>
              <div className="add-subject-container">
                <TextField
                  className='add-subject-action'
                  placeholder="Topic"
                  value={currentTopic.topicName || ''}
                  onChange={(e) => {
                      const newItem = { ...currentTopic, topicName: e.target.value }
                      dispatch(setTopic(newItem));
                    }}
                />
                <Button
                  className='add-subject-action'
                  variant='outlined'
                  color='inherit'
                  size='small'
                  onClick={addTopicHandler}
                >
                  Add
                </Button>
              </div>
              <br />
              <div>
                {
                  currentSubject.topicsList && currentSubject.topicsList.length ? (
                    currentSubject.topicsList.map((topic) => (
                      <div key={topic.topicId} style={{ width: '200px' }}>
                        {topic.topicName}
                        <TopicModal
                          {...topic}
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
    </div>
  )
    
}