import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = (props) => {
  //это более короткая запись props.profile == null || props.profile == undefined
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      {/*<div>
        <img className={s.profileImage} src="https://img.veenaworld.com/group-tours/world/europe/eupr/eupr-bnn-1.jpg" alt="аватар"/>
      </div>*/}
      <div className={s.description_block}>
        <img src={props.profile.photos.large} />
        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.lookingForAJob ? "Ищу работу" : "Трудоустроен"}</div>
        <div>instagram: {props.profile.contacts.instagram}</div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

      </div>
    </div>
  );
}

export default ProfileInfo;
