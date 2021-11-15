import axios from "axios";

import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return <UserRoute></UserRoute>;
};

export default UserIndex;
