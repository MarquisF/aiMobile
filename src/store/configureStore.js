import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware, { takeLatest } from 'redux-saga';
import { call, put, fork, wait } from 'redux-saga/effects';
import models from '../models';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware ];

const sagas = [];
const reducers = {};

const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    // switch case
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

models.forEach( model => {
  Object.keys( model.effects ).forEach( action_type => {
    sagas.push( fork (function* () {
      yield * takeLatest(action_type, action => {
          return model.effects[action_type](action, { call, put, wait });
      });
    }));
  })

  if ( model.reducers ) {

    // const modelReducers = {};
    // Object.keys(model.reducers).forEach( state => {
    //   var lala = [...model.reducers[state]];
    //   debugger;

    //   modelReducers[ state ] = createReducer( ...model.reducers[state] );
    // })

    // reducers[ model.state ] = combineReducers( modelReducers );
  } else if ( model.reducer ) {
    reducers[ model.state ] = createReducer( ...model.reducer );
  }
})

const rootReducer = combineReducers(reducers);
const rootSaga = function* root(){ yield sagas; };

export default function configureStore( initialState ) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware( ...middlewares )
  )
  sagaMiddleware.run(rootSaga);
  return store;
}
