import React,{useState} from 'react'

export const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="h-[450px] flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
      <div className="relative hidden md:block md:w-1/2">
        <img
          src="https://img.freepik.com/free-vector/gradient-blue-background_23-2149333231.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1719532800&semt=ais_user"
          alt="Welcome"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-xl">Back!</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#556ED6] text-white py-2 rounded-lg hover:bg-[#020F3C] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}


export default Login
