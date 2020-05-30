import React from 'react';

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render () {
    console.log("render");
    return (
      <div>
        {/*блок работает, если оба выражения перед и после && одновременно тру*/}
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
          </div>
        }

        {this.state.editMode &&
          <div>
            {/*Видео 73, 30-я минута, обновление локального статуса*/}
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}></input>
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;
