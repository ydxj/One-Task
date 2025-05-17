import React, {useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./menuAdmin.css";
import axios from "axios";


function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(true);
   const [user, setUser] = useState(null);
    const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          // You can uncomment this if you want to redirect if not logged in
           navigate("/login");
        }
      });
  }, []);

   const handleLogout = async () => {
      try {
        await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
        window.location.href = "/login";
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    
  

  return (
    <div className={`sidebar bg-dark text-white ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isOpen ? "⬅" : "➡"}
      </button>

      {isOpen && (
        <>
          <div className="text-center mb-4">
            <Link to="/">
              <img
                src="logo One_Task.png"
                alt="Logo OneTask"
                style={{ width: "90px", marginBottom: "20px" }}
              />
            </Link>
          </div>

          <ul className="nav flex-column px-2">
            <li className="nav-item mb-2">
              <Link to="/admin/users"  className="link">👤 Utilisateurs</Link>
            </li>
  
            <li className="nav-item mb-2">
              <Link to="/admin/domains" className="link" >📂 Domaines</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/admin/settings" className="link">⚙️ Paramètres</Link>
            </li>
             <li><a class="dropdown-item" onClick={handleLogout} style={{ cursor:"pointer" }}>🔓 Déconnecté</a></li>
          </ul>
        </>
      )}
    </div>
  );
}

export default MenuAdmin;
