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
  const [succcess, setsucccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [code, setcode] = useState("");
  const { state, dispatch } = useContext(Context);

  const { user } = state;
  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table({ name, email, password });
    try {
      const { data } = await axios.post(`/api/forgot-password`, {
        email,
      });
      setsucccess(true);

      setLoading(false);
      toast("check your mail for secret code ");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPsaaword = async (e) => {
    e.preventDefault();

    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/reset-password`, {
        email,
        code,
        newPassword,
      });

      setEmail("");
      setcode("");
      setNewPassword("");
      setLoading(false);
      toast("your password was reset ");
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
        <form onSubmit={succcess ? handleResetPsaaword : handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          {succcess && (
            <>
              <input
                type="text"
                className="form-control mb-4 p-4"
                value={code}
                onChange={(e) => setcode(e.target.value)}
                placeholder="Enter code that you recived in email"
                required
              />
              <input
                type="text"
                className="form-control mb-4 p-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </>
          )}
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
