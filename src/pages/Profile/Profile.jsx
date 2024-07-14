import "./Profile.css";
import { getCurrentUser } from "../../auth/AuthService";


export const Profile = () => {

  const user = getCurrentUser();
  console.log(user);
    
  return (
    <div className="profile-container">
      <h1 className="mx-2">User Profiles</h1>
      <div>Message:</div>
    </div>
  );
};
