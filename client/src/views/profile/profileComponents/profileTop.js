import React from "react";

const ProfileTop = (props) => {
  const profile = props.profile.profile;
  return (
    <div class="profile-top bg-primary p-2">
      <img class="round-img my-1" src={profile?.user?.avatar} alt="" />
      <h1 class="large">{profile?.user?.name}</h1>
      <p class="lead">
        {profile?.status} {profile?.company && "at " + profile?.company}
      </p>
      <p>{profile?.location}</p>

      <div class="icons my-1">
        {profile?.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <i class="fas fa-globe fa-2x"></i>
          </a>
        )}

        {profile?.social?.twitter && (
          <a href={profile?.twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
        )}

        {profile?.social?.facebook && (
          <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
        )}

        {profile?.social?.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        )}

        {profile?.social?.youtube && (
          <a href={profile?.youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </a>
        )}

        {profile?.social?.instagram && (
          <a
            href={profile?.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
