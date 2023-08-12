import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="container">
      <div className="login">
        <div className="rectangle-parent-login">
          <div className="group-child" />

          <b className="welcome-back">Welcome back!</b>
          <form action="#" className="group-parent">
            <div className="email-parent">
              <div className="email">Email</div>
              <input
                className="login-item"
                type="email"
                placeholder="Enter your email"
                required
                id="email"
                name="email"
              />
            </div>
            <button onClick={handleLogin} className="rectangle-group-login">
              <div className="group-inner" />
              <div className="log-in">Log In</div>
            </button>
            <div className="frogot-password-parent">
              <Link to="forgot-password" className="frogot-password">
                Frogot Password?
              </Link>
              <div className="email-parent">
                <div className="password">Password</div>
                <input
                  className="login-item"
                  type="password"
                  placeholder="Enter password"
                  required
                  id="password"
                  name="password"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
