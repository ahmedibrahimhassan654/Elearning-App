import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      //   const { data } = await axios.post(`/api/forgot-password`, {
      //     email,
      //   });

      setLoading(false);
      toast("check your mail");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square mt-3">
        forget password{" "}
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          {/* <input
            type="password"
            className="form-control mb-4 p-4"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          /> */}

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || loading}
          >
            {loading ? <SyncOutlined spin /> : "reset your password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
