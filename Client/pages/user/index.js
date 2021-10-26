import axios from "axios";

import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="jumbotron  text-center square text-primary">
        {JSON.stringify(user)}
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
