import { useEffect, useState } from "react";
import axios from "axios";
import {FaTasks,FaLanguage,FaCode,FaLightbulb,FaHeartbeat,FaUserCircle} from "react-icons/fa";
import Sidebar from "../../Layout/Menu";
import { useNavigate } from "react-router-dom";

const domains = [
    { id: "productivity", icon: <FaTasks size={30} color="#0d6efd" />, label: "Productivité" },
    { id: "english", icon: <FaLanguage size={30} color="#6610f2" />, label: "Anglais" },
    { id: "programming", icon: <FaCode size={30} color="#198754" />, label: "Programmation" },
    { id: "tech", icon: <FaLightbulb size={30} color="#fd7e14" />, label: "Conseils tech" },
    { id: "health", icon: <FaHeartbeat size={30} color="#dc3545" />, label: "Santé & sport" },
    { id: "selfdev", icon: <FaUserCircle size={30} color="#20c997" />, label: "Développement personnel" },
];

function UserDashboard() {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(null);

    const handleSelect = (id) => {
        setSelected(id);
        setSubmitted(false);
    };
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/me", { withCredentials: true })
        .then(res => {
        if (res.data.loggedIn) {
            setUser(res.data.user);
        } else {
            navigate("/login");
        }
        });
    }, []);


    const handleSubmit = async () => {
        if (!selected) return;
        try {
            await axios.put("http://localhost:5000/modifierProductivity", { productivity: selected }, { withCredentials: true });
            setSubmitted(true);
        } catch (err) {
            console.error("Submission failed", err);
        }
    };

    return (
        <>
        <Sidebar />
            <div className="container py-5 text-center">
                <h2 className="h4 mb-4 text-dark">Choisissez un domaine</h2>
                <div className="row g-4">
                    {domains.map((domain) => (
                        <div className="col-md-4" key={domain.id}>
                            <div
                            className={`p-4 rounded h-100 shadow-sm border ${selected === domain.id ? "border-primary bg-light" : "border-0"}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelect(domain.id)}
                            >

                            <div className="mb-2">{domain.icon}</div>
                            <div className="fw-semibold">{domain.label}</div>
                        </div>
                </div>
                    ))}
            </div>
        <button className="btn btn-primary mt-4" onClick={handleSubmit} disabled={!selected} >
            Valider mon choix
        </button>
        {submitted && (
            <div className="alert alert-success mt-3">
            ✅ Domaine enregistré avec succès !
            </div>
        )}
    </div>
        </>
    
    );
}

export default UserDashboard;