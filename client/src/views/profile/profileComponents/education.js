import React from "react";
import Moment from "react-moment";

const Education = (props) => {
  const profile = props.profile.profile;
  return (
    <div class="profile-edu bg-white p-2">
      <h2 class="text-primary">Education</h2>
      {profile?.education?.length > 0 ? (
        profile?.education?.map((item) => {
          return (
            <div>
              <h3>{item?.school}</h3>
              <p>
                <Moment format={"YYYY/MM/DD"}>{item?.from}</Moment> -
                {item.current == true ? (
                  "Current"
                ) : (
                  <Moment format={"YYYY/MM/DD"}>{item?.to}</Moment>
                )}
              </p>
              <p>
                <strong>Degree: </strong>
                {item?.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {item?.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>
                {item?.description}
              </p>
            </div>
          );
        })
      ) : (
        <p>No Education Added</p>
      )}
    </div>
  );
};

export default Education;
