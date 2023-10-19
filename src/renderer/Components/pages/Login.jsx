import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { login } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/auth/authSlice';
import Spinner from '../Utilities/Spinner';
import { sendMessage } from '../../webSocket';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [errMsg, seterrMsg] = useState('');
  const { isSuccess, isLoading, user, message, isError } = useSelector(
    (state) => state.auth
  );
  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };
  useEffect(() => {
    if (isSuccess || user) {
      if (user && user.Roles === 1000) {
        const connected = {
          email: user ? user.Email : '',
        };
        sendMessage(connected);
        navigate('/LobbyDasboard');
      }
      if (user && user.Roles === 4800) {
        const connected = {
          email: user ? String(user.FloorNumber) : '',
        };
        sendMessage(connected);
        navigate('/FloorDashboard');
      }
      if (user && user.Roles == 7706) {
        const connected = {
          email: user ? user.Email : '',
        };
        sendMessage(connected);
        navigate('/AdminDashboard');
      }
    }
    if (isError) {
      message === 'Network Error'
        ? seterrMsg('Network Error!')
        : seterrMsg('Invalid Email or Password');
      console.log('here is the error', message);
      setIsErrorLogin(true);
    }
    dispatch(reset());
  }, [isSuccess, user, isError]);
  const handleNotificationClick = () => {
    if (user && user.Roles === 1000) {
      navigate('/Messages');
    }
    if (user && user.Roles === 4800) {
      navigate('/FloorMessages');
    }
  };
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'notification-clicked',
      handleNotificationClick
    );
    return () => {};
  }, []);
  return (
    <div className="mainContainer">
      {' '}
      <div className="group-child">
        {isLoading && <Spinner />}{' '}
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
        {isErrorLogin ? (
          <p className="invalidCredentials"> {errMsg}</p>
        ) : (
          <p className="invalidCredentials"> </p>
        )}
        <div />
      </div>
    </div>
  );
};

export default Login;
