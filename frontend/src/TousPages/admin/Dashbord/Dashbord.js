import React, { useState } from "react";
import MenuAdmin from "./menuAdmin";



function AdminDashboard() {
 

 

  return (
    <div className="d-flex">
      {/* Menu */}
     <MenuAdmin/>
	  <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📊 Statistiques Générales</h2>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Utilisateurs</h5>
                <p className="card-text fs-4">2 par exemple</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Tâches envoyées</h5>
                <p className="card-text fs-4">3 par exemple</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Tâches terminées</h5>
                <p className="card-text fs-4">4 par exemple</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">📋 Derniers utilisateurs</div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Domaine</th>
                  <th>Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Lignes dynamiques ici */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <footer className="text-center mt-5 text-muted small">
          &copy; 2025 OneTask Admin
        </footer>
      </div>
    </div>
  );
}

export default AdminDashboard;
