
import { FaTasks, FaLanguage, FaCode, FaLightbulb, FaHeartbeat, FaUserCircle } from "react-icons/fa";
import "./home.css"; 
function Home() {

  return (
    <div>
  {/* Hero Section */}
  <header
  className="text-center py-5 mb-5"
  style={{
    background: "linear-gradient(to right, #dbefff, #f0eaff)"
  }}
>
  <section className="section text-center container">
    <h1 className="text-primary display-4 mb-3">OneTask</h1>
    <p className="lead">
      Un service simple qui vous envoie une petite tâche chaque jour par email ✉️
    </p>
  </section>
  <div className="mt-4">
    <button className="btn btn-primary me-3">Commencer</button>
    <button className="btn btn-outline-secondary text-dark">En savoir plus</button>
  </div>
</header>

  {/* Comment ça marche */}
  

  {/* Domaines */}
  <section className="section section-light">
    <div className="container text-center">
      <h2 className="h5 mb-5 text-dark">Domaines disponibles</h2>
      <div className="row g-4">
        {[
          { icon: <FaTasks size={30} color="#0d6efd" />, label: "Productivité" },
          { icon: <FaLanguage size={30} color="#6610f2" />, label: "Anglais" },
          { icon: <FaCode size={30} color="#198754" />, label: "Programmation" },
          { icon: <FaLightbulb size={30} color="#fd7e14" />, label: "Conseils tech" },
          { icon: <FaHeartbeat size={30} color="#dc3545" />, label: "Santé & sport" },
          { icon: <FaUserCircle size={30} color="#20c997" />, label: "Développement personnel" },
        ].map((domain, i) => (
          <div className="col-md-4" key={i}>
            <div className="bg-white p-4 rounded domain-card h-100 shadow-sm">
              <div className="mb-2">{domain.icon}</div>
              <div className="fw-semibold">{domain.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Témoignages */}
  <section className="section bg-light text-center">
    <div className="container" style={{ backgroundColor: "#e9f5ff", padding: "20px", borderRadius: "20px" }}>
      <h2 className="h5 mb-4 text-primary">Témoignages</h2>
      <blockquote className="fst-italic mb-3">
        "Un service simple mais super utile... chaque matin, une petite tâche pour progresser !"
      </blockquote>
      <blockquote className="fst-italic">
        "J’adore recevoir mes tâches directement dans ma boîte mail !"
      </blockquote>
    </div>
  </section>
</div>
	
  );
}

export default Home;
