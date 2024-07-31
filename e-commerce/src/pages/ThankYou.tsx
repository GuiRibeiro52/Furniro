
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className="font-poppins min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center space-y-10">
        <h2 className="text-5xl font-bold">Obrigado por sua compra</h2>
        <h3 className="text-3xl font-semibold">Verifique a caixa de entrada do seu email.</h3>
        <button>
          <Link to="/" className="text-xl font-medium text-blue-500 underline">Voltar para Home</Link>
        </button>
      </div>
    </div>
  )
}

export default ThankYou