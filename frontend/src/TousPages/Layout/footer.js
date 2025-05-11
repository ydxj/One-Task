
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <div className="container text-center">
        <h5 className="mb-3 text-primary">OneTask</h5>
        <p className="text-muted mb-3">
          Une tâche simple par jour, pour une meilleure version de vous-même.
        </p>

        <div className="mb-3">
          <a href="https://facebook.com" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
          <a href="mailto:contact@onetask.com" className="text-primary mx-2">
            <FaEnvelope size={20} />
          </a>
        </div>

        <div className="text-muted small">
          © {new Date().getFullYear()} OneTask. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
