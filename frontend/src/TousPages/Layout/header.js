import axios from "axios";
import { useEffect, useState} from "react";
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
          // You can uncomment this if you want to redirect if not logged in
          // navigate("/login");
        }
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      navigate("/login"); // Use navigate instead of window.location.href
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <header className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <img 
              src="logo One_Task.png" 
              alt="Logo" 
              className="img-fluid" 
              style={{ maxWidth: "70px", height: "50px" }} // Corrected height
            />
          </div>

          <nav>
            <ul className="nav">
              {user ? (
                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-success dropdown-toggle" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    {user.role === "admin" ? (
                      <li><a className="dropdown-item" href="/dashboardAdmin">Admin</a></li>
                    ):(
                      <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                    )
                    }
                    <li><a className="dropdown-item" onClick={handleLogout} style={{ cursor:"pointer" }}>Logout</a></li>
                  </ul>
                </div>
              ) : (
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
