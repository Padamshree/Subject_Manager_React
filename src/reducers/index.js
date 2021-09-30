import { combineReducers } from "redux";

import subjectReducer from "./subjectReducers";

export default combineReducers({
    subject: subjectReducer,
});