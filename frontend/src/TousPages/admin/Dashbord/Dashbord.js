import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "./menuAdmin";
import axios from "axios";

function AdminUtilisateur() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((res) => setUsers(res.data.result[0]))
      .catch((err) => console.error("Erreur fetch:", err));
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="d-flex">
      <MenuAdmin />
      <div className="container-fluid p-4">
        <h2>👥 Utilisateurs</h2>
        <div className="card mt-4">
          <div className="card-header">📋 Liste des utilisateurs</div>
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
                {users.filter(user => user.role !== 'admin').map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.productivity}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditUser(user.id)}>Modifier</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="text-center mt-5 text-muted small">&copy; 2025 OneTask Admin</footer>
      </div>
    </div>
  );
}

export default AdminUtilisateur;
