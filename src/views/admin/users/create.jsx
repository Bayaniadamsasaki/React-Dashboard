//import useState dan useEffect
import { useState } from "react";

//import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";

//import useNavigate
import { useNavigate } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import api
import api from "../../../services/api";

//get token from cookies
const token = Cookies.get("token");

export default function UsersCreate() {
  //useNavigate
  const navigate = useNavigate();

  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //state validation
  const [validation, setValidation] = useState([]);

  //function "storeUser"
  const storeUser = async (e) => {
    e.preventDefault();

    //call api
    api.defaults.headers.common["Authorization"] = token;
    await api
      .post("/api/admin/users", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        //redirect ke halaman users
        navigate("/admin/users");
      })
      .catch((error) => {
        //assign error to state validation
        setValidation(error.response.data);
      });
  };

  return (
    <div class="container mt-5 mb-5">
      <div class="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div class="col-md-9">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-header">ADD USER</div>
            <div class="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={storeUser}>
                <div class="form-group mb-3">
                  <label class="mb-1 fw-bold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="mb-1 fw-bold">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="form-control"
                    placeholder="Email Address"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="mb-1 fw-bold">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="form-control"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" class="btn btn-sm btn-primary">
                  SAVE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
