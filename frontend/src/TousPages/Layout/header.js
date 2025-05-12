import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Headers() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        // navigate("/login");
      }
    });
  }, []);
  

  return (
    <div>
      <header className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="logo One_Task.png" alt="Logo" className="img-fluid" style={{ maxWidth: "70px" ,height: "50"}} />
          </div>

          <nav>
            <ul className="nav">
              {user ? (
                <div class="btn-group">
            <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {user.name}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">dashboard</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div> ) : (
            <>
              <li className="nav-item">
                <a href="/signUp" className="btn btn-outline-primary mx-2">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="btn btn-outline-primary mx-2">
                  Login
                </a>
              </li>
            </>
          )}   
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Headers;
