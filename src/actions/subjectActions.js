import { SUBJECT_TYPES } from "./subject.types";
import { db } from "../firebase";
import firebase from 'firebase';

export const setSubject = (payload) => (dispatch) => {
    console.log(payload);
    dispatch({
        type: SUBJECT_TYPES.SET_SUBJECT,
        payload: payload,
    })
 };

export const setTopic = (payload) => (dispatch) => {
    dispatch({
        type: SUBJECT_TYPES.SET_TOPIC,
        payload: payload,
    })
 }

export const setNote = (payload) => (dispatch) => {
    dispatch({
        type: SUBJECT_TYPES.SET_NOTE,
        payload: payload,
    })
 }

export const setSubjectList = (subList) => ({
   type: SUBJECT_TYPES.SET_SUBJECT_LIST,
   payload: subList,
});

export const getSubjectList = () => (dispatch) => {
    dispatch({
        type: SUBJECT_TYPES.CLEAR_STATE,
        payload: null,
    });
    db.collection('subjects').orderBy('createdAt', 'desc').get()
    .then((data) => {
        let subList = [];
        data.forEach((doc) => {
            subList.push({
                subjectId: doc.id,
                subjectName: doc.data().subjectName,
                topicsList: doc.data().topicsList,
            });
        });
        console.log(subList);
        dispatch(setSubjectList(subList));
    })
    .catch((err) => {
        console.log(err);
    });
};

export const addSubjectToList = (subject) => (dispatch) => { 
    const { subjectName } = subject;  
    db
    .collection('subjects')
    .add({
        subjectName,
        topicsList: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
        if (res.id) {
            dispatch(getSubjectList());
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

export const updateSubjectInList = (subject) => (dispatch) => {
    const { subjectName, subjectId, topicsList } = subject;

    db
    .collection('subjects')
    .doc(subjectId)
    .update({
        subjectName,
        topicsList,
    })
    .then(() => {
        dispatch(getSubjectList());
    })
    .catch((err) => {
        console.log(err);
    });
}

export const removeSubjectInList = (subject) => (dispatch) => {
    const { subjectId } = subject;

    db
    .collection('subjects')
    .doc(subjectId)
    .delete()
    .then(() => {
        dispatch(getSubjectList());
    })
    .catch((err) => {
        console.log(err);
    });
}