import React from 'react';
import Dialogs from './Dialogs';
import {sendMessageCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    }
  }
}

//тут мы экспортируем DialogsContainer [видео 70, 5 минута]
//последовательность такая: сначало Dialogs оборачивается withAuthRedirect
//затем вокруг этой конструкции создаётся ф-ция DialogsContainer с помощью
//ф-ции connect().
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
