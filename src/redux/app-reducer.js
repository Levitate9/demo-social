import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

//экшен криэйтеры
export const initializedSuccess = () => ( {type: INITIALIZED_SUCCESS} );

//санк криэйтеры
export const initializeApp = () => async (dispatch) => {
  let promise = await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
}


export default appReducer;
