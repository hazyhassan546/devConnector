import axios from "axios";

export const ApiPost = async (url, body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = {};
  await axios
    .post(url, JSON.stringify(body), config)
    .then(function (response) {
      res = response;
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function (error) {
      if (error.response) {
        res = error.response.data;
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return res;
};

export const ApiGet = async (url) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.get(url, config);
};

export const ApiPut = async (url, body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = {};
  await axios
    .put(url, JSON.stringify(body), config)
    .then(function (response) {
      res = response;
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function (error) {
      if (error.response) {
        res = error.response.data;
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return res;
};
