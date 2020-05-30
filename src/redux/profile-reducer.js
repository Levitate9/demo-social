import {profileAPI} from "../api/api";

const ADD_POST = "/my-app/profilePage/ADD-POST";
const SET_USER_PROFILE = "/my-app/profilePage/SET_USER_PROFILE";
const SET_STATUS = "/my-app/profilePage/SET_STATUS";
const DELETE_POST = "/my-app/profilePage/DELETE_POST";

let initialState = {
  posts: [
    {id: 1, message: "Hi, how are you?", likeCount: "15"},
    {id: 2, message: "It's my first post", likeCount: "20"}
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let text = action.newPostElement;
      return {
        ...state,
        posts: [...state.posts, {id: 5, message: text, likeCount: 0}]
      }
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile}
    }

    case SET_STATUS: {
      return { ...state, status: action.status}
    }

    case DELETE_POST: {
      return { ...state, posts: state.posts.filter(p => p.id != action.postId)}
    }

    //если ни один из кейсов не сработал - возвращаем первоначальный стэйт
    default: return state;
  }
}

//экшен криэйтеры
export const addPost = (newPostElement) => ({type: ADD_POST, newPostElement})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

//санк криэйтеры
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export default profileReducer;
