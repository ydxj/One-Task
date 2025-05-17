import React, { useState, useEffect } from "react";
import MenuAdmin from "./menuAdmin";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:5000/getUsers")
    .then((res) => {
      console.log("Data reçue :", res.data.result); 
      setUsers(res.data.result[0]); // Assurez-vous que la structure de la réponse est correcte
    })
    .catch((err) => console.error("Erreur fetch:", err));
}, []);


  // Supprimer utilisateur
  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/deleteUser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <div className="d-flex">
      <MenuAdmin />
      <div className="container-fluid p-4">
        <h2>📊 Statistiques Générales</h2>

        {/* Users */}
        <div className="card mt-4">
          <div className="card-header">📋 Derniers utilisateurs</div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Domaine</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.productivity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
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
