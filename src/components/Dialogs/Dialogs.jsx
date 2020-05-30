import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {

  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map( dialog => <DialogItem
    name={dialog.name} id={dialog.id} userPhoto={dialog.userPhoto} /> );
  let messagesElements = state.messages.map( el => <Message message={el.message} />);
  let newMessageBody = state.newMessageBody;

  let newMessageElement = React.createRef();

  let addNewMessage = (formData) => {
    props.sendMessage(formData.newMessageBody);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
}

export default Dialogs;
