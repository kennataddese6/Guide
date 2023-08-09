import { useNavigate } from 'react-router-dom';
import './style.css';
const LobbyDashboard = () => {
  const navigate = useNavigate();
  const toHomepage = () => {
    navigate('/');
  };
  return (
    <div className="dashboard">
      <div className="div">
        <div className="navigation-example">
          <div className="overlap">
            <div className="navigation-elements">
              <div className="divider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyDashboard;
