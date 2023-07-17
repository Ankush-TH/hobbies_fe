import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { http, getUser, getToken } = AuthUser();
  if (!getToken()) {
    navigate("/login");
  }
  const [hobbies, setHobbies] = useState([]);
  const userData = getUser();
  const fetchUserHobbies = () => {
    http.get("/hobbies/" + userData.id).then((res) => {
      setHobbies(res?.data || []);
    });
  };

  useEffect(() => {
    fetchUserHobbies();
  }, []);

  const deleteHobby = (id) => {
    http.delete("/delete_hobby/" + id).then((res) => {
      if (res?.data?.status === true) {
        alert("Data Deleted successfully!");
      } else {
        alert("Something went wrong!");
      }
      fetchUserHobbies();
    });
  };

  return (
    <>
      <div className="container">
        <div className="text-right">
          <Link className="btn btn-primary my-5" to="/addHobby">
            Add Hobby
          </Link>
        </div>
        <h2>Hobbies List : </h2>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Hobby</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hobbies.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{item?.hobby || ""}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHobby(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
