import React, { useState } from "react";

function ModifierParams() {
	const [form, setForm] = useState({
		nom: "",
		email: "",
		telephone: "",
		motDePasse: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Traitement de la soumission ici
		alert("Paramètres enregistrés !");
	};

	return (
		<div className="container mt-5" style={{ maxWidth: 500 }}>
			<h3 className="mb-4">Paramètres Administrateur</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Nom</label>
					<input
						type="text"
						className="form-control"
						name="nom"
						value={form.nom}
						onChange={handleChange}
						placeholder="Entrez votre nom"
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Entrez votre email"
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Téléphone</label>
					<input
						type="tel"
						className="form-control"
						name="telephone"
						value={form.telephone}
						onChange={handleChange}
						placeholder="Entrez votre téléphone"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Mot de passe</label>
					<input
						type="password"
						className="form-control"
						name="motDePasse"
						value={form.motDePasse}
						onChange={handleChange}
						placeholder="Nouveau mot de passe"
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100">
					Enregistrer
				</button>
			</form>
		</div>
	);
}

export default ModifierParams;