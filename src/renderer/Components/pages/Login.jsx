import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

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
        <div className="profileCircle" onClick={handleLogin}>
          <FaUser className="userIcon" />
        </div>
        <div />
      </div>
    </div>
  );
};

export default Login;
