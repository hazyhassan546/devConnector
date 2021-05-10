export const SERVER_URL = "https://secret-river-29715.herokuapp.com/";
export const LOCAL_SERVER = "http://localhost:3000/";
export const ENDPOINTS = {
  register: "/api/users",
  login: "/api/auth/login",
  profileImage: "/api/users/profileImage",
  /////
  profile: "/api/profile/me",
  profileById: "/api/profile/byID",
  createUpdateProfile: "/api/profile/create_or_update_Profile",
  addExperience: "/api/profile/add_experience",
  addEducation: "/api/profile/add_education",
  deleteEducation: "/api/profile/delete_education_by_id",
  deleteExperience: "/api/profile/delete_experience_by_id",
  deleteProfile: "/api/profile/delete_profile",
  getAllProfiles: "/api/profile",
  getAllGithubRepo: "/api/profile/gihubrepositories",
  ////
  getAllPost: "/api/post/getAllPosts",
  getPostById: "/api/post/postById",
  createPost: "/api/post/add_post",
  deletePost: "/api/post/deletePost",
  likePost: "api/post/like",
  unlikePost: "api/post/unlike",
  addPostComment: "/api/post/addComment",
  deletePostComment: "/api/post/deleteComment",
};
