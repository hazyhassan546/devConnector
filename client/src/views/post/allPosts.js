import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const AllPostsScreen = (props) => {
  const [formData, setFormData] = useState({
    text: "",
  });
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (formData.text !== "") {
      props.createPost(formData);
      setFormData({
        text: "",
      });
    }
  };

  useEffect(() => {
    props.getAllPosts();
  }, []);
  return (
    <Fragment>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => submitForm(e)}>
          <textarea
            name="text"
            cols="30"
            onChange={(e) => onChange(e)}
            rows="5"
            value={formData.text}
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {props.post.posts.length > 0 ? (
        props.post.posts.map((item) => {
          return (
            <div class="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img class="round-img" src={item.avatar} alt="" />
                  <h4>{item?.name}</h4>
                </a>
              </div>
              <div>
                <p class="my-1">{item.text}</p>
                <p class="post-date">
                  Posted on <Moment format={"YYYY/MM/DD"}>{item?.date}</Moment>
                </p>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => {
                    props.likePost({
                      postId: item._id,
                    });
                  }}
                >
                  <i class="fas fa-thumbs-up"></i>
                  <span>{item.likes.length}</span>
                </button>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => {
                    props.unlikePost({
                      postId: item._id,
                    });
                  }}
                >
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <Link to="postDetail" class="btn btn-primary">
                  Discussion
                  {item?.comments?.length > 0 && (
                    <span class="comment-count">{item?.comments?.length}</span>
                  )}
                </Link>

                {item?.user === props.auth.user._id &&
                  props.post.loading === false && (
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        props.deletePost({
                          postId: item._id,
                        });
                      }}
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No Post found</p>
      )}
    </Fragment>
  );
};

AllPostsScreen.propTypes = {};

export default globalConnect()(AllPostsScreen);
