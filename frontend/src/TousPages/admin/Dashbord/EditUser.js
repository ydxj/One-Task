import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuAdmin from "./menuAdmin";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 const fetchUser = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/getUser/${id}`);
    setFormData({name: res.data.rows.name, email: res.data.rows.email, password: ""});
    setLoading(false);
  } catch (err) {
    console.error("Erreur getUser:", err);
  }
};

  fetchUser(); // Appel de la fonction async dans useEffect
}, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateUser/${id}`, formData);
      navigate("/admin/users");
    } catch (err) {
      console.error("Erreur mise à jour:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h2 className="h4 mb-4 text-dark">Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <MenuAdmin />
      
      <div className="container mt-5">
        <h2>✏️ Modifier Utilisateur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Nouveau mot de passe (optionnel)</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Laisser vide si inchangé"
            />
          </div>
          <button type="submit" className="btn btn-success">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
