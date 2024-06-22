//import SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu";

//import useState and useEffect
import { useState, useEffect } from "react";

//import js cookie
import Cookies from "js-cookie";

export default function Dashboard() {
  //init state user
  const [user, setUser] = useState([]);

  //useEffect
  useEffect(() => {
    // Get user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      //assign user data to state "user"
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">DASHBOARD</div>
            <div className="card-body">
              Selamat Datang, <strong>{user?.name}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
