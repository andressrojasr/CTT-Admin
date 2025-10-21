import { useState } from "react"
import { login } from "../api/auth"
import { useNavigate } from "react-router-dom"


export default function Login () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 👇 Llamada al servicio login()
      const response = await login(email, password);

      // Si tu API devuelve un token o user info
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
      }

      console.log('Usuario autenticado:', response);

      // Redirige al panel o dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex h-screen flex-col justify-center"
        style={{
          backgroundImage: `url('src/assets/fisei.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="sm:mx-auto bg-white rounded-2xl shadow-xl border border-gray-300 p-8 sm:w-full sm:max-w-[500px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="src/assets/logoCTT.webp"
              className="mx-auto h-30 w-auto"
            />
            <h2 className="text-center text-2xl font-bold mt-1 tracking-tight text-[#6C1313]">
              Panel Administrativo CTT
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#6C1313]">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#6C1313]">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            {loading && (
                    <div className="flex justify-center items-center mt-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6C1313]"></div>
                    </div>
                )}
            {errorMessage && (

              <p className="text-red-600 text-sm text-center">{errorMessage }</p>
            )}
            

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#6C1313] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#8a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Iniciando...' : 'Iniciar sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
