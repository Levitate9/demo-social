const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {
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
  ]
};

//state = initialState это значение по умолчанию, для первой отрисовки Аpp
const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:

      let body = action.newMessageBody;
      return {
        //создаём объект на основании state
        ...state,
        //создаём параметр messages на основании state.messages  и добавляем
        //новый объект в конец массива messages
        messages: [...state.messages, {id: 6, message: body}]
      }

    //если ни один из кейсов не сработал - возвращаем первоначальный стэйт
    default: return state;
  }
}

export const sendMessageCreator = (newMessageBody) => {
  return {type: SEND_MESSAGE, newMessageBody}
}

export default dialogsReducer;
