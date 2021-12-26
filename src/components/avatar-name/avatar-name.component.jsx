import Avatar from "../avatar/avatar.component";
import "./avatar-name.styles.scss";
const AvatarName = ({ avatarSrc, displayName }) => (
  <div className="userMeta">
    <Avatar source={avatarSrc} />
    <div>
      <p>{displayName}</p>
    </div>
  </div>
);

export default AvatarName;
