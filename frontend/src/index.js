import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Provider} from 'react-redux';

import Home from './components/home';
import Login from './components/login';
import Auth from './components/auth';
import UserRegistration from './components/userRegistration';
import BookIndex from './components/bookIndex';
import BookRegistration from './components/bookRegistration';
import BookDetails from './components/bookDetails';
import ReviewRegistration from './components/reviewRegistration';
import User from './components/user';

import './sass/app.scss';


const store = createStore(reducer,applyMiddleware(thunk))
ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component= {Login} />
            <Route path="/register" component= {UserRegistration} />
            <Auth>
              <Route exact path="/" component= {Home} />
              <Route path="/home" component= {Home} />
              <Route exact path="/user/:id/books" component={BookIndex} />
              <Route exact path="/registerBook" component={BookRegistration} />
              <Route exact path="/user/:id/book/:bookId" component={BookDetails} />
              <Route exact path="/user/:id/book/:bookId/registerReview" component={ReviewRegistration} />
              <Route exact path="/user/:id" component={User} />
            </Auth>
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
