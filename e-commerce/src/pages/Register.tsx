import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig.js"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate();
  
    const handleLogout = (e) => {
      e.preventDefault();
      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Email inválido');
        return;
      }
      createUserWithEmailAndPassword(email, password)
    };
    
    useEffect(() => {
        if (user) {
          navigate('/login');
        }
      }, [user, navigate]);
  
    if(loading){
      return (
        <div className='font-poppins flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-5xl font-bold mb-6'>Registro efetuado com sucesso!</h2>
            <p className='text-2xl font-semibold'>Você será direcionado para a tela de Login</p>
        </div>
      )
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <div className='flex flex-col justify-center items-center'>
              <img src={logo} alt="Logo Furniro" className='w-[50%] mb-4' />
              <h2 className="text-2xl font-bold text-center">Registro de usuário.</h2>
              <h3>Insira um email e crie uma senha</h3>
          </div>        
          {error && <p className="text-red-500">{error.message}</p>}
          <form onSubmit={handleLogout} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-4">E-mail</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder='Insira seu email'
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-button focus:border-button"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-4">Crie uma Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Insira sua senha'
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-button focus:border-button"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-button rounded-md hover:bg-[#b88f2fe5] focus:outline-none focus:ring-2 focus:ring-button"
              onClick={handleLogout}
            >
              Cadastrar
            </button>
            <div className='flex text-xs gap-2 justify-center'>
            <p>Já é cadastrado?</p>
            <Link to={'/login'} className='decoration-solid text-button'>Faça seu Login agora!</Link>
          </div>
          </form>
        </div>
      </div>
    );
  };

export default Register