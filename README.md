# One-Task
# 📝 OneTask – Backend avec Node.js & MySQL

OneTask est un service simple d’envoi de tâches quotidiennes par email selon un domaine choisi par l’utilisateur (productivité, apprentissage, sport…).  
Ce backend est conçu avec :

- 🟢 Node.js + Express
- 🛢️ MySQL (avec mysql2)
- 🔐 dotenv
- 📩 SendGrid (envoi d'emails)
- ⏰ node-cron (pour les tâches automatiques)

---

## ⚙️ Fonctionnalités actuelles

- Connexion à la base de données MySQL
- Route de test : GET /
- Prêt à recevoir des fonctionnalités :
  - Authentification utilisateur
  - Choix d'un domaine
  - Envoi d'un email chaque matin avec une tâche

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ydxj/One-Task.git
cd One-Task
cd Backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Créer un fichier .env
Créer un fichier .env à la racine du projet avec ce contenu de .env.example et Remplace les valeurs par tes vraies infos de connexion MySQL et ton API Key SendGrid.

## ▶️ Lancer le serveur
```bach
npm start
```

## Tu devrais voir dans la console :

```arduino
✅ MySQL Database Connected
✅ Backend running on http://localhost:5000
```

## 🧱 Structure du projet
```bash
.
├── dbs.js          # Connexion MySQL
├── index.js        # Point d'entrée principal
├── .env            # Variables d'environnement
├── package.json
└── README.md

```
