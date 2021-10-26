import axios from "axios";

import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
// import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log("index", data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };
  return (
    <>
      {!hidden && (
        <h1 className="jumbotron  text-center square text-primary">
          {JSON.stringify(user)}
        </h1>
      )}
    </>
  );
};

export default UserIndex;
