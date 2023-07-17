import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useForm } from "react-hook-form";

export default function AddHobby() {
  const navigate = useNavigate();
  const { http, getUser } = AuthUser();
  const userData = getUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    http
      .post("/store_hobby", { user_id: data.user_id, hobby: data.hobby })
      .then((res) => {
        console.log("resp:", res);
        if (res?.data?.status === true) {
          alert("Data Saved successfully!");
        } else {
          alert("Something went wrong!");
        }
        navigate("/dashboard");
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Enter Hobby:</label>
              <input
                type="text"
                name="hobby"
                className="form-control mt-3"
                placeholder="Please Enter Hobby"
                {...register("hobby", { required: true })}
              />
              {errors?.hobby?.type === "required" && (
                <p className="mt-2" style={{ color: "red" }}>
                  This field is required
                </p>
              )}
            </div>
            <input
              type="hidden"
              name="user_id"
              value={userData?.id || ""}
              {...register("user_id")}
            />
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
