import React from "react";

const About = (props) => {
  const profile = props.profile.profile;
  return (
    <div class="profile-about bg-light p-2">
      <h2 class="text-primary">{profile?.user?.name}'s Bio</h2>
      <p>{profile?.bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {profile?.skills?.map((skill) => {
          return (
            <div class="p-1">
              <i class="fa fa-check"></i> {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
