import { useState } from "react";
import AuthUser from "./AuthUser";
import { useForm } from "react-hook-form";

export default function Login() {
  const { http, setToken } = AuthUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    http
      .post("/login", { email: data.email, password: data.password })
      .then((res) => {
        console.log("respo", res);
        if (res?.data?.error) {
          alert("Authentication Failed!");
        } else {
          setToken(res.data.user, res.data.access_token);
        }
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                name="email"
                className="form-control mt-3"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors?.email?.type === "required" && (
                <p className="mt-2" style={{ color: "red" }}>
                  This field is required
                </p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                  pattern: /^[A-Za-z0-9]+$/i,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="mt-2" style={{ color: "red" }}>
                  This field is required
                </p>
              )}
              {errors?.password?.type === "pattern" && (
                <p className="mt-2" style={{ color: "red" }}>
                  Alphabetical characters only
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
