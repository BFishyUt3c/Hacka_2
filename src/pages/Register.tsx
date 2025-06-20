import { useState } from 'react';
import { register as registerAPI } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwd.length < 12) {
      alert('La contraseña debe tener al menos 12 caracteres');
      return;
    }
    try {
      await registerAPI(email, passwd);
      alert('Registrado con éxito, ahora inicia sesión');
      navigate('/login');
    } catch (err) {
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={passwd} onChange={e => setPasswd(e.target.value)} required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
