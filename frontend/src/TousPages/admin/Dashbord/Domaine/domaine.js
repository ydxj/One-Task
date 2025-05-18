import React, { useState } from "react";
import axios from "axios";

const DomaineForm = () => {
	const [domaine, setDomaine] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
					const response = await axios.post("http://localhost:5000/createTask", {
					domain: domaine,
					content: message,
				});

			

			console.log("Réponse backend:", response.data);

			if (response.data.success) {
				setStatus("✅ Tâche ajoutée avec succès !");
				setDomaine("");
				setMessage("");
			} else {
				setStatus("❌ Une erreur est survenue.");
			}
		
		} catch (error) {
			console.error("Erreur Axios:", error);
			setStatus("❌ Erreur lors de la création de la tâche.");
		}
	};

	return (
		<div className="container mt-5">
			<h3 className="text-center mb-4">Créer un Domaine</h3>
			<form onSubmit={handleSubmit} className="card p-4 shadow-sm">
				<div className="mb-3">
					<label htmlFor="domaine" className="form-label">
						Choisir un domaine :
					</label>
					<select
						id="domaine"
						className="form-select"
						value={domaine}
						onChange={(e) => setDomaine(e.target.value)}
						required
					>
						<option value="">-- Sélectionner --</option>
						<option value="english">english</option>
						<option value="programming">programming</option>
						<option value="tech">tech</option>
						<option value="selfdev">selfdev</option>
						<option value="health">health</option>
						<option value="productivity">productivity</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="message" className="form-label">Message :</label>
					<textarea
						id="message"
						className="form-control"
						rows={4}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary w-100">
					Envoyer
				</button>

				{status && (
							<div
								className={`alert ${
									status.includes("succès") ? "alert-success" : "alert-danger"
								} mt-3`}
							>
								{status}
							</div>
						)}
			</form>
		</div>
	);
};

export default DomaineForm;
