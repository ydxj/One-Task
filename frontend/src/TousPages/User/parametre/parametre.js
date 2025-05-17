import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTasks, FaLanguage, FaCode, FaLightbulb, FaHeartbeat, FaUserCircle
} from "react-icons/fa";
import Sidebar from "../../Layout/Menu";

const domaines = [
  { id: "productivity", label: "Productivité", icon: <FaTasks /> },
  { id: "english", label: "Anglais", icon: <FaLanguage /> },
  { id: "programming", label: "Programmation", icon: <FaCode /> },
  { id: "tech", label: "Conseils tech", icon: <FaLightbulb /> },
  { id: "health", label: "Santé & sport", icon: <FaHeartbeat /> },
  { id: "selfdev", label: "Développement personnel", icon: <FaUserCircle /> },
];

function Parametres() {
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setSelected(res.data.user.productivity);
        } else {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5000/modifierProductivity", {
        productivity: selected,
      }, { withCredentials: true });
      setSubmitted(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  if (loading) return <div className="text-center py-5">Chargement...</div>;

  return (
    <>
        <Sidebar />
        <div className="container py-5">
        <h2 className="mb-4">Modifier votre domaine de productivité</h2>

        <div className="row g-3">
            {domaines.map((d) => (
            <div className="col-md-4" key={d.id}>
                <div
                className={`card p-3 shadow-sm ${selected === d.id ? "border-primary bg-light" : ""}`}
                onClick={() => setSelected(d.id)}
                style={{ cursor: "pointer" }}
                >
                <div className="text-center fs-4 mb-2">{d.icon}</div>
                <h6 className="text-center">{d.label}</h6>
                </div>
            </div>
            ))}
        </div>

        <div className="text-center mt-4">
            <button
            className="btn btn-primary"
            disabled={!selected}
            onClick={handleSubmit}
            >
            Enregistrer
            </button>
            {submitted && (
            <div className="alert alert-success mt-3">
                ✅ Domaine mis à jour avec succès !
            </div>
            )}
        </div>
        </div>
    </>
    
  );
}

export default Parametres;
