import {usersAPI} from "../api/api";

const FOLLOW = "my-app/usersPage/FOLLOW";
const UNFOLLOW = "my-app/usersPage/UNFOLLOW";
const SET_USERS = "my-app/usersPage/SET_USERS";
const SET_CURRENT_PAGE = "my-app/usersPage/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "my-app/usersPage/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "my-app/usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "my-app/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [ ],
  pageSize: 10, //количество юзеров отображаемое на одной странице
  totalUsersCount: 20, //общее количество юзеров
  currentPage: 1, 
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map( u =>  {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map( u =>  {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      }

    case SET_USERS: {
      return { ...state, users: [ ...action.users ] }
    }

    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }
    }

    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count}
    }

    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching}
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        //видео 64, button disabled может не работать, если превышем лимит обращений к серверу
        followingInProgress: action.isFetching
          ? [ ...state.followingInProgress, action.userId ]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    }

    default:
      return state;
  }
}

//вместо того, чтобы писать usersId: usersId можно писать один раз usersId
export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
//вот тут мы не можем написать просто totalUsersCount, т.к. мы в case SET_TOTAL_USERS_COUNT
//указали action.count, а не action.totalUsersCount
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


//thunk криэйтеры
export const requestUsers = (page, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

  const data = await usersAPI.getUsers(page, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
}

export const follow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));

  const response = await usersAPI.follow(userId);
  if (response.data.resultCode == 0) {
    dispatch(followSuccess(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const unfollow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));

  const response = await usersAPI.unfollow(userId);
  if (response.data.resultCode == 0) {
    dispatch(unfollowSuccess(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export default usersReducer;
