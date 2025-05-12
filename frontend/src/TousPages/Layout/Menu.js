import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faTasks,
  faChartBar,
  faUser,
  faCog,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <>
      {/* Always-visible open button */}
      {!isOpen && (
        <button
          className="btn btn-outline-primary position-fixed top-0 start-0 m-3"
          onClick={() => setIsOpen(true)}
          style={{ zIndex: 1050 }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* Sidebar container */}
      <div
        className={`position-fixed top-0 start-0 h-100 bg-light`}
        style={{
          width: isOpen ? "250px" : "0px",
          overflowX: "hidden",
          transition: "width 0.3s ease",
          zIndex: 1040,
          borderRight: isOpen ? "1px solid #dee2e6" : "none",
        }}
      >
        {/* Only render content if sidebar is open */}
        {isOpen && (
          <div className="p-3">
            {/* Close button */}
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <a
              href="/"
              className="d-flex align-items-center mb-4 text-decoration-none text-primary fw-bold fs-4"
            >
              <img  style={{ width:"100px" }} alt="Logo" src="./logo One_Task.png" />
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a href="#dashboard" className="nav-link active">
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#tasks" className="nav-link text-dark">
                  <FontAwesomeIcon icon={faTasks} className="me-2" />
                  Tâches
                </a>
              </li>
              <li>
                <a href="#stats" className="nav-link text-dark">
                  <FontAwesomeIcon icon={faChartBar} className="me-2" />
                  Statistiques
                </a>
              </li>
              <li>
                <a href="#profile" className="nav-link text-dark">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Profil
                </a>
              </li>
              <li>
                <a href="#settings" className="nav-link text-dark">
                  <FontAwesomeIcon icon={faCog} className="me-2" />
                  Paramètres
                </a>
              </li>
              <li>
                <a onClick={handleLogout} style={{ cursor:"pointer" }} className="nav-link text-dark">
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
