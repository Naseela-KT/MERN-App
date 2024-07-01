import {useState} from 'react'
import { authApiRequest } from '../config/axios';
import { validate } from '../validations/LoginValidation';
import { useDispatch } from "react-redux";
import { setAdminCredentials } from '../redux/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log(Object.values(errors));
    if (Object.values(errors).every((error) => error === "")) {
      try {
      const response = await authApiRequest({
        method: 'post',
        url: '/login',
        data:formValues
      },{withCredentials:true})
      if(response.adminData){
        console.log(response)
        dispatch(setAdminCredentials(response.adminData))
        localStorage.setItem('Token',response.token)
        toast.success(response.message)
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

    }
  };
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
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
            name="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {formErrors.email ? (
          <p
            className="text-sm"
            style={{ color: "red", marginBottom: 10, marginTop: -10 }}
          >
            {formErrors.email}
          </p>
        ) : null}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
            name='password'
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {formErrors.password ? (
          <p
            className="text-sm"
            style={{ color: "red", marginBottom: 10, marginTop: -10 }}
          >
            {formErrors.password}
          </p>
        ) : null}
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
