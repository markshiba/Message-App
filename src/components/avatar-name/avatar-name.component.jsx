import Avatar from "../avatar/avatar.component";
import "./avatar-name.styles.scss";
const AvatarName = ({ avatarSrc, displayName }) => {
  return (
    <div className="userMeta">
      <Avatar avatarSrc={avatarSrc} />
      <div>
        <p>{displayName}</p>
      </div>
    </div>
  );
};

export default AvatarName;
