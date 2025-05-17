import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/getUser/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          password: "",
        });
      })
      .catch((err) => {
        console.error("Erreur getUser:", err);
      });
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

  return (
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
  );
}

export default EditUser;
