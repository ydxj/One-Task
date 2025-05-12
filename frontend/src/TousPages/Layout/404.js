import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light text-center">
      <div>
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3">
          😕 <span className="text-dark">Page non trouvée</span>
        </p>
        <p className="lead">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
