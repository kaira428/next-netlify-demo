import styles from "../styles/Guides.module.css";
import { useContext, useEffect } from "react";
import AuthContext from "../stores/authContext";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);

  if (authReady) {
    console.log(user?.token?.access_token);
  }

  useEffect(() => {
    if (authReady) {
      fetch("/.netlify/functions/guides", user && {
        headers: {
          Authorization: "Bearer " + user.token.access_token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div>
  );
}
