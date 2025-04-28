import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher l'erreur
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Mot de passe:', password);
    axios.post('http://localhost:8000/api/login', { email, password })
      .then(response => {
        console.log('Réponse API:', response);
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem("token"));
        navigate('/planifier-formation');
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        setError('Identifiants incorrects');
        if (error.response) {
          console.log('Détails de l\'erreur:', error.response.data);
        }
      });
  };
  


  return (
    <div className="login-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>} {/* Afficher l'erreur ici */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        <div className="links">
          <a href="#">Mot de passe oublié ?</a>
          <p>
            Pas encore de compte ? <a href="#">S'inscrire</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
