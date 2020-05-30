import React from 'react';
import s from './Message.module.css';

const Message = (props) => {

  return (
    <div className={s.message}>
      <img className={s.userPhoto} /><div className={s.messageItem}>{props.message}</div>
    </div>
  );
}

export default Message;
