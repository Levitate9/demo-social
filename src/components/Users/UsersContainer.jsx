import React from 'react';
import {connect} from 'react-redux';
import {follow, unfollow, setCurrentPage,
  toggleFollowingProgress, requestUsers} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage,
  getIsFetching, getFollowingInProgress} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  //т.к. у нас классовая компонента, мы создаём метод onPageChanged а не функцию
  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, pageSize);
  }

  render() {
    //отрисовываем users компоненту и пробрасываем ей только нужные пропсы
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        //тут без пропсов, потому что метод onPageChanged объявлен в UsersContainer
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  connect(mapStateToProps, {follow, unfollow, setCurrentPage,
    toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer);
