import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import AppLayout from './layouts/AppLayout';
import { Home, Login, Register, Profile, Docs } from './pages';

function App() {
  return (
    <Router>
      <AppLayout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/docs" component={Docs} />
      </AppLayout>
    </Router>
  );
}

export default App;
