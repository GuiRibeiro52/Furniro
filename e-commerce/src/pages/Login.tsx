import { useState, useEffect  } from 'react';
import logo from '../assets/logo.png';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig.js"
import { Link, useNavigate  } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Email inválido');
        return;
      }
      signInWithEmailAndPassword(email, password)
    };

    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);
  
    if(loading){
      return (
        <div className='font-poppins flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-5xl font-bold mb-6'>Login efetuado com sucesso!</h2>
            <p className='text-5xl font-semibold'>Boas Compras</p>
        </div>
      )
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className='flex flex-col justify-center items-center'>
            <img src={logo} alt="Logo Furniro" className='w-[50%]' />
            <h2 className="text-2xl font-bold text-center">Login</h2>
        </div>        
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-4">Email</label>
            <input
              id="username"
              name="username"
              type="text"              
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Insira o email cadastrado'
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-button focus:border-button"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-4">Senha</label>
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
            onClick={handleLogin}
          >
            Login
          </button>
          <div className='flex text-xs gap-2 justify-center'>
            <p>Ainda não é usuário?</p>
            <Link to={'/register'} className='decoration-solid text-button'>Faça seu cadastro agora!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
