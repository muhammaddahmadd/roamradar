import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styles from "./User.module.css";



function User() {
const navigate = useNavigate();

  const { logout, user } = useAuth();
  function handleClick() {
    logout()
    navigate("/")
  }

  return (
    <div className={styles.user}>
      {/* <img src={user.avatar} alt={user.name} /> */}
      {/* <span>Welcome, {user.email}</span> */}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

