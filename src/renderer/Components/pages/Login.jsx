import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { useState, useEffect } from 'react';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = (e) => {
    navigate('/LobbyDasboard');

    /*     if (email === 'kennataddese6@gmail.com' && password === 'Whereareyou6') {
    } else {
      setIsError(true);
    } */
  };

  return (
    <div className="mainContainer">
      {' '}
      <div className="group-child">
        {' '}
        <div className="profileCircle">
          <FaUser className="userIcon" />
        </div>
        <div className="inputContainer">
          <MdEmail className="EmailIcon" />
          <input
            type="text"
            className="EmailID"
            placeholder="Email ID"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passwordContainer">
          <FiLock className="passwordIcon" />
          <input
            type="password"
            className="passwordID"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h5 className="forgotpassword">Forgot password?</h5>
        </div>
        <button className="loginbutton" onClick={handleLogin}>
          Sign In
        </button>
        {isError ? (
          <p className="invalidCredentials"> Invalid Username or Password.</p>
        ) : (
          <p className="invalidCredentials"> </p>
        )}
        <div />
      </div>
    </div>
  );
};

export default Login;
