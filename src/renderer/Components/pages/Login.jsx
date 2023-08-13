import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiLock, FiUnlock } from 'react-icons/fi';


const Login = () => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log();
  };
  const handleLogin = (e) => {
    navigate('/LobbyDasboard');
    /*     e.preventDefault();
    const form = document.querySelector('.group-parent')
    const formData = new FormData(form);
    const data =[...formData.entries()]

    console.log(data) */
  };
  return (
    <div className="mainContainer">
      {' '}
      <div className="group-child">
        {' '}
        <div className="profileCircle" >
          <FaUser className="userIcon" />
        </div>
        <div className ='inputContainer'>
    <MdEmail className='EmailIcon' />
    <input type='text' className='EmailID' placeholder='Email ID' />
    </div>
    <div className='passwordContainer'>
    <FiLock className='passwordIcon'/>
    <input type='password' className='passwordID' placeholder='Password' />
    </div>
    <button  className='loginbutton' onClick={handleLogin}>Sign In</button>
        <div />
      </div>
    </div>
  );
};

export default Login;
