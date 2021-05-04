import React from "react";
import Moment from "react-moment";

const Experience = (props) => {
  const profile = props.profile.profile;
  return (
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experience</h2>
      {profile?.experience?.length > 0 ? (
        profile?.experience?.map((item) => {
          return (
            <div>
              <h3 class="text-dark">{item?.company}</h3>
              <p>
              <Moment format={"YYYY/MM/DD"}>{item?.from}</Moment> - {item.current == true ? "Current" : <Moment format={"YYYY/MM/DD"}>{item?.to}</Moment>}
              </p>
              <p>
                <strong>Position: </strong>{item?.title}
              </p>
              <p>
                <strong>Description: </strong>{item.description}
              </p>
            </div>
          );
        })
      ) : (
        <p>No Experience</p>
      )}
    </div>
  );
};

export default Experience;
