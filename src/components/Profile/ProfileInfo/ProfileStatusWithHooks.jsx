import React, {useState, useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {
  //ф-ция useState вернёт массив, первому значению массива мы прасваиваем setEditMode
  //второму значению мы присваиваем колбэк ф-цию setEditMode
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  //в массив мы передаём событие, которое нужно синхронизировать
  //перед массивом идёт функция, с помощью которой и будет происходить синхронизация
  useEffect( () => {
    setStatus(props.status);
  }, [props.status] );

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      {/*блок работает, если оба выражения перед и после && одновременно тру*/}
      { !editMode &&
        <div>
          <span onDoubleClick={ activateEditMode } >{ props.status || "------" }</span>
        </div>
      }

      { editMode &&
        <div>
          {/*Видео 73, 30-я минута, обновление локального статуса*/}
          <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode }
            value={ status }></input>
        </div>
      }
    </div>
  )
}


export default ProfileStatusWithHooks;
