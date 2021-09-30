import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import SubjectView from './components/SubjectView';

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path='/' component={Main}/>
            {/* <Route exact path='/subject/:subjectId' component={SubjectView}/> */}
          </Switch>
        </Router>
    </div>
  );
}

export default App;
