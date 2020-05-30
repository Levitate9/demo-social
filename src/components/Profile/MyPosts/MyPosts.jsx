import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';


const MyPosts = React.memo(props => {

  let postsElements = props.posts.map( el =>
    //отрисовываем посты для каждого объекта из массива state.profilePage.posts
    <Post message={el.message} like={el.likeCount} />
  );

  let addPost = (formData) => {
    props.addPost(formData.newPostElement);
  }

  return (
    <div className={s.posts_block}>
      <h3>My posts</h3>
      <div>
        <AddPostFormRedux onSubmit={addPost}/>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
})

export default MyPosts;

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name={"newPostElement"} placeholder={"yo cmon"}
        validate={[required, maxLength10]} />
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm( {form: "addPostForm"} )(AddPostForm);
