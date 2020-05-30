import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: "Hi, how are you?", likeCount: "15"},
        {id: 2, message: "It's my first post", likeCount: "20"}
      ],
      newPostText: ''
    },
    dialogsPage: {
      dialogs: [
        {id: 1, name: "Dimych", userPhoto: "https://www.menshairstylesnow.com/wp-content/uploads/2018/03/Hairstyles-for-Square-Faces-Slicked-Back-Undercut.jpg"},
        {id: 2, name: "Andrey", userPhoto: "https://media.gqindia.com/wp-content/uploads/2017/11/andrew-866x956.jpg"},
        {id: 3, name: "Sveta", userPhoto: "https://image.businessinsider.com/589dbb873149a101788b4c85?width=1100&format=jpeg&auto=webp"},
        {id: 4, name: "Sasha", userPhoto: "https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg"},
        {id: 5, name: "Viktor", userPhoto: "https://www.theadultman.com/wp-content/uploads/2018/07/Red-headed-man-with-a-diamond-face-looking-into-the-distance.jpg"},
        {id: 6, name: "Valera", userPhoto: "https://www.michiganradio.org/sites/michigan/files/styles/medium/public/201309/Shigeto_close.jpg"}
      ],
      messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your it-kamasutra"},
        {id: 3, message: "Yo"}
      ],
      newMessageBody: ''
    },
  },
  _callSubscriber() {
    console.log('State changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    //обновляем стэйт, с помощью редюсеров
    //передаём каждому редьюсеру свою ветку стэйта для работы
    //затем присваиваем старому стэйту обновлённое значение, полученое с помощью редюсера
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  }
}

export default store;
window.store = store;
