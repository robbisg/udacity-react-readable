import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import  MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { reducer } from './reducers/posts'
import { fetchPosts, addPost } from './actions/posts'

//const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      //loggerMiddleware // neat middleware that logs actions
    )
  )
)

console.log(store.getState());
console.log(store.dispatch(fetchPosts()))
console.log(store.dispatch(addPost("Prova", "Prova il mio post", "robbisg", "redux")))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root'));

registerServiceWorker();
