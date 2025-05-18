import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModifierProfil() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setForm({
            name: res.data.user.name,
            email: res.data.user.email,
            password: "",
          });
        } else {
          navigate("/login");
        }
      })
      .catch(err => {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password.trim()) {
      alert("Le mot de passe est requis.");
      return;
    }

    axios.put(`http://localhost:5000/updateUser/${user.id}`, form, {
      withCredentials: true,
    })
      .then(() => {
        alert("Profil mis à jour avec succès !");
        navigate("/profil");
      })
      .catch(err => {
        console.error("Erreur lors de la mise à jour :", err);
        alert("Une erreur est survenue.");
      });
  };

  const handleBack = () => {
    navigate(-1); // revenir à la page précédente
  };

  if (loading) {
    return <div className="text-center py-5"><h4>Chargement...</h4></div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h3 className="mb-4">Modifier mon profil</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Mot de passe (requis)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
            placeholder="Entrez un nouveau mot de passe"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Retour
          </button>
          <button type="submit" className="btn btn-primary">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifierProfil;
