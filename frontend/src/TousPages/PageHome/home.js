
import { FaTasks, FaLanguage, FaCode, FaLightbulb, FaHeartbeat, FaUserCircle } from "react-icons/fa";
import "./home.css"; 
function Home() {

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="text-primary display-4 mb-3">OneTask</h1>
        <p className="lead">Un service simple qui vous envoie une petite tâche chaque jour par email ✉️</p>
      </header>

      <section className="text-center mb-5">
        <h2 className="h4 mb-3">Comment ça marche ?</h2>
        <p className="mb-4">
          L'utilisateur s'inscrit, choisit un domaine comme la productivité, l'anglais, la programmation, etc.,
          et reçoit chaque jour une petite tâche par email adaptée à ses choix.
        </p>
        <div>
          <button className="btn btn-primary me-2">Commencer</button>
          <button className="btn btn-outline-primary">En savoir plus</button>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-center mb-4">Domaines disponibles</h2>
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaTasks size={30} color="#0d6efd" className="mb-2" />
              <div>Productivité</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaLanguage size={30} color="#6610f2" className="mb-2" />
              <div>Anglais</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaCode size={30} color="#198754" className="mb-2" />
              <div>Programmation</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaLightbulb size={30} color="#fd7e14" className="mb-2" />
              <div>Conseils tech</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaHeartbeat size={30} color="#dc3545" className="mb-2" />
              <div>Santé & sport</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 rounded">
              <FaUserCircle size={30} color="#20c997" className="mb-2"  />
              <div>Développement personnel</div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center" style={{ backgroundColor: "#e9f5ff" }}>
        <h2 className="h5 mb-3">Témoignages</h2>
        <blockquote className="fst-italic mb-2">"Un service simple mais super utile... chaque matin, une petite tâche pour progresser !"</blockquote>
        <blockquote className="fst-italic">"J’adore recevoir mes tâches directement dans ma boîte mail !"</blockquote>
      </section>
    </div>
	
  );
}

export default Home;
