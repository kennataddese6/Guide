import '../styles/UpdateGuide.css';
import { FaTimes } from 'react-icons/fa';
const UpdateGuide = ({ setShowUpdatePopup }) => {
  return (
    <div className="backdrop">
      <div className="UpdateGuideContainer">
        <h3 className="updateHeader">Update Guide</h3>
        <div
          className="UpdateCancelIcon"
          onClick={() => {
            setShowUpdatePopup(false);
          }}
        >
          <FaTimes />
        </div>
        <div className="UpdateButtonHolder">
          <button className="UpdateButton">Update</button>
          <button
            className="UpdateCancelButton"
            onClick={() => {
              setShowUpdatePopup(false);
            }}
          >
            {' '}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateGuide;
