import React, { useState, useEffect } from "react";
import axios from "axios";
// import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import background from "../../images/background.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginForm() {
  
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginData, setLoginData] = useState({
    Username: "",
    Password: "",
    Latitude: "",
    Longitude: "",
    LastLoginIP: "",
  });

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setLoginData({
          ...loginData,
          Latitude: response.data.lat,
          Longitude: response.data.lon,
          LastLoginIP: response.data.query,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    setShowModal(true);
    e.preventDefault();
    try {
      const response = await axios.post("https://api.iudi.xyz/api/login", {
        Username: loginData.Username,
        Email: loginData.Email,
        Password: loginData.Password,
        Latitude: loginData.Latitude,
        Longitude: loginData.Longitude,
        LastLoginIP: loginData.LastLoginIP,
      });
      
      setIsSuccess(true);
      console.log("Phản hồi từ API:", response?.data);
      localStorage.setItem("IuDiToken", response?.data?.jwt);
      localStorage.setItem(
        "UserNameIuDi",
        response?.data.user.Users[0].Username
      );
      toast.success('🦄 Wow so easy!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "light",
        });
      window.location.href = "/";
    } catch (error) {
      // setIsSuccess(false);
      // setMessage("Password or Username is incorrect");
      console.error("Error registering:", error);
      toast.error(`Register failed! ${error.response.data.message}`, {closeOnClick:true});
    }
  };

  // const closeModal = () => {
  //   setShowModal(false);
  //   if (isSuccess) {
  //     window.location.href = "/";
  //   }
  // };

  return (

    <div
      style={backgroundImageStyle}
    >
      <Header />

      <div className="flex items-center justify-center mt-20">
        <div className="max-w-md w-full mx-auto">
          <form
            onSubmit={handleLogin}
            className="bg-zinc-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h3
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
              className="text-white text-3xl font-extrabold text-center mb-2 mt-2"
            >
              LOGIN
            </h3>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Username"
                style={{
                  color: "rgba(44,186,55,0.8127626050420168)",
                }}
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Username"
                type="text"
                placeholder="Username"
                name="Username"
                value={loginData.Username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Password"
                style={{
                  color: "rgba(44,186,55,0.8127626050420168)",
                }}
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Password"
                type="password"
                placeholder="Password"
                name="Password"
                value={loginData.Password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <button
                style={{
                  background: "rgba(44,186,55,0.8127626050420168)",
                }}
                className="w-full py-2 px-4 font-bold rounded text-white focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <p
              className="text-white text-center  text-sm"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Don't have an account ?{" "}
              <a href="/register" className="text-500">
                <strong>REGISTER</strong>
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
      {/* {showModal && (
        <Modal
          isSuccess={isSuccess}
          title="LOGIN"
          message={message}
          onClose={closeModal}
        />
      )} */}
    </div>
  );
}
export default LoginForm;
