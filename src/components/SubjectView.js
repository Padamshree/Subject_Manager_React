// import React, { useEffect, useState } from 'react';
// import { Button, Card, TextField } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';
// import uuid from 'react-uuid';

// import TopicModal from './TopicModal';

// import { getSubject,
// } from '../actions/subjectActions';

// import '../styles/Main.css';

// export default function SubjectView() {
//   const dispatch = useDispatch();
//   const { subjectId } = useParams();

//   const subject = useSelector((state) => state.subject);
//   const { currentSubject : { subjectName, topicsList } } = subject;

//   const [topic, setTopic] = useState('');
//   const [localTopicsList, setLocalTopicsList] = useState(topicsList ? topicsList: []);

//   useEffect(() => {
//       console.log(subjectName, topicsList)
//     dispatch(getSubject(subjectId));
//   }, []);

//   const addTopicHandler = () => {
//     const newList = [ ...localTopicsList, { topicId: uuid(), topic: topic, noteList: []}];
//     setLocalTopicsList(newList);
//     setTopic('');
//   }

//   const addNote = (id, note) => {
//     setLocalTopicsList(prev => prev.map(topic => 
//         (topic.topicId === id ?  { ...topic, noteList: [ ...topic.noteList, { note: note }] }
//             : topic
//             )
//         )
//     )
//   }

//   useEffect(() => {
//     console.log(localTopicsList)
//   }, [localTopicsList]);

//   return (
//     <div className='main-container'>
//       <div className="add-subject-container">
//         <TextField
//           className='add-subject-action'
//           placeholder="Subject"
//           value={subjectName}
//         //   onChange={(e) => dispatch(setSubject(e.target.value))}
//         />
//         <Button
//           className='add-subject-action'
//           variant='outlined'
//           color='inherit'
//           size='small'
//         //   onClick={addSubjectHandler}
//         >
//             Edit
//         </Button>
//       </div>
//       <div className="add-subject-container">
//         <TextField
//           className='add-subject-action'
//           label="Topic"
//           value={topic}
//           onChange={(e) => {
//               setTopic(e.target.value);
//             }}
//         />
//         <Button
//           className='add-subject-action'
//           variant='outlined'
//           color='inherit'
//           size='small'
//           onClick={addTopicHandler}
//         >
//           Add
//         </Button>
//       </div>
//       <br />
//       <div className="cards-container">
//         <div>
//           {
//             localTopicsList && localTopicsList.length
//             && localTopicsList.map((topic) => {
//               console.log(topic);
//               return (
//                 <div key={topic.id}>
//                   {topic.topic}
//                   {topic.id}
//                   <TopicModal 
//                     {...topic}
//                     addNote={addNote}
//                   />
//                 </div>
//             )
//             })
//           }
//         </div>
//       </div>
//     </div>
//   )
    
// }