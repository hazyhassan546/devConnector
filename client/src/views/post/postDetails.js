import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "../../components/layouts/spinner";
import { SERVER_URL } from "../../common/routes";

const PostDetails = (props) => {
  const [formData, setFormData] = useState({
    text: "",
    postId: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      postId: props?.post?.post?._id,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData.text !== "") {
      props.addComment(formData);
    }
  };
  useEffect(() => {
    props.getSinglePost({
      postId: props.match?.params?.id,
    });
  }, []);
  const { post } = props;
  return (
    <Fragment>
      {post.loading ? (
        <Spinner></Spinner>
      ) : post.post !== null ? (
        <Fragment>
          <Link to="/Posts" class="btn">
            Back To Posts
          </Link>
          <div class="post bg-white p-1 my-1">
            <div>
              <Link to={`profile/${post?.post?.user}`}>
                <img class="round-img" src={post?.post?.avatar} alt="" />
                <h4>{post?.post?.name}</h4>
              </Link>
            </div>
            <div>
              <p class="my-1">{post?.post?.text}</p>
            </div>
          </div>

          <div class="post-form">
            <div class="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form class="form my-1" onSubmit={(e) => submitForm(e)}>
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                value={formData.text}
                onChange={(e) => {
                  onChange(e);
                }}
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
          </div>

          <div class="comments">
            {post?.post?.comments?.length > 0 && (
              <Fragment>
                {post?.post?.comments.map((item) => {
                  return (
                    <div class="post bg-white p-1 my-1">
                      <div>
                        <a href="profile.html">
                          <img
                            class="round-img"
                            src={SERVER_URL + item?.avatar}
                            alt=""
                          />
                          <h4>{item?.name}</h4>
                        </a>
                      </div>
                      <div>
                        <p class="my-1">{item?.text}</p>
                        <p class="post-date">
                          Posted on
                          <Moment format={"YYYY/MM/DD"}>{item?.date}</Moment>
                        </p>
                        {item?.user === props?.auth?.user?._id && (
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              props.deleteComment({
                                commentId: item?._id,
                                postId: post?.post?._id,
                              });
                            }}
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            )}
          </div>
        </Fragment>
      ) : (
        <p>No Post Found</p>
      )}
    </Fragment>
  );
};

PostDetails.propTypes = {};

export default globalConnect()(PostDetails);
