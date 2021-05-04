import React, { useEffect } from "react";
import PropTypes from "prop-types";

const GithubRepo = (props) => {
  useEffect(() => {
    props?.getGithubRepo({
      github_usr_name: props?.profile?.profile?.githubUserName,
    });
  }, []);
  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>

      {props?.profile?.repos?.length === 0 ? (
        <p>No Github Repo Found</p>
      ) : (
        props?.profile?.repos?.map((item) => {
          return (
            <div class="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    {item?.name}
                  </a>
                </h4>
                <p>{item?.description}</p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">
                    Stars: {item?.stargazers_count}
                  </li>
                  <li class="badge badge-dark">Watchers: {item?.watchers}</li>
                  <li class="badge badge-light">Forks: {item?.forks_count}</li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

GithubRepo.propTypes = {};

export default GithubRepo;
