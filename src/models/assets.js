import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';

const getAssets = params => {
  const ajax = new Promise(( resolve, reject ) => {
    setTimeout(() => {
      resolve([ 1, 2, 3, 4, 5 ]);
      console.log('received')
    }, 2000)
  })

  return ajax.then( res => {
    return res;
  })
}

export const actions = {
  get( params ) {
    return {
      type: types.GET_ASSETS,
      params
    }
  },

  receiveAssets( params ) {
    return {
      type: types.RECEIVE_ASSETS,
      params
    }
  }
}

const assets = {
  state: 'assets',

  effects: {
    * [types.GET_ASSETS](action, { call, put }) {
      try {
        const response = yield call(getAssets, action.params);
        yield put(actions.receiveAssets({ response }));
      } catch(error) {
        yield put({type: 'LOAD_FILES_FAILURE', error})
      }
    }
  },

  // reducer数组第一个值是 initialState
  reducer: [fromJS({
      isFetching: false,
      data: []
    }), {

    [types.RECEIVE_ASSETS](state, action) {
      return state
        .setIn(['isFetching'], false )
        .setIn(['data'], action.params.response);
    },

    [types.GET_ASSETS](state, action) {
      return state
        .setIn(['isFetching'], true );
    }
  }]
}

export default assets;