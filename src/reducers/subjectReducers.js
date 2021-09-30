import { SUBJECT_TYPES } from "../actions/subject.types"

const initialState = {
    subjectList: [],
    currentSubject: {
        subjectId: '',
        subjectName: '',
        topicsList: [],
    },
    currentTopic: {
        topicId: '',
        topicName: '',
        noteList: ''
    },
    currentNote: {
        noteId: '',
        note: '',
    },
    updateState: false,
}

export default function subjectReducer (state = initialState, action) {
    switch(action.type) {
        case SUBJECT_TYPES.SET_SUBJECT_LIST: 
            return {
                ...state,
                subjectList: action.payload,
            };
        case SUBJECT_TYPES.SET_SUBJECT:
            return {
                ...state,
                currentSubject: {
                    ...state.currentSubject,
                    ...action.payload,
                },
            };
        case SUBJECT_TYPES.CLEAR_SUBJECT_STATE:
            return {
                ...state,
                currentSubject: initialState.currentSubject,
            };
        case SUBJECT_TYPES.SET_TOPIC:
            return {
                ...state,
                currentTopic: {
                    ...state.currentTopic,
                    ...action.payload,
                },
            };
        case SUBJECT_TYPES.CLEAR_TOPIC_STATE:
            return {
                ...state,
                currentTopic: initialState.currentTopic,
            };
        case SUBJECT_TYPES.SET_NOTE:
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    ...action.payload,
                },
            };
        case SUBJECT_TYPES.UPDATE_STATE:
            return {
                ...state,
                updateState: action.payload,
            }
        case SUBJECT_TYPES.CLEAR_NOTE_STATE:
            return {
                ...state,
                currentNote: initialState.currentNote,
            };
        case SUBJECT_TYPES.CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
}