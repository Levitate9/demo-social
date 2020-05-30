import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {compose} from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        //кривой редирект, будем менять
        this.props.history.push("/login");
      }
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    return (
      <div>
        <Profile { ...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

//считывается снизу вверх, т.е. сначало ProfileContainer оборачивается
//withAuthRedirect(), затем withRouter и в конце connect()
export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
  withRouter,
)(ProfileContainer);
