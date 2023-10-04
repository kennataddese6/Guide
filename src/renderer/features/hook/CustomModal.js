import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // replace '#root' with the id of your app element
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    borderRadius: '10px',
  },
};
const buttonStyle = {
  backgroundColor: 'rgb(255,25,25)',
  color: 'white',
  fontSize: '16px',
  marginRight: '15px',
};
const buttonStyle2 = {
  backgroundColor: 'lightgray',
  color: 'black',
  fontSize: '16px',
};
const buttonPosition = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '25px',
};
const highlight = {
  color: 'purple',
};
const CustomModal = ({ isOpen, onRequestClose, content , resetPassowrd }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2>Reset Password?</h2>
    <p>
      {' '}
      Are you sure you want to reset the password of{' '}
      <span style={highlight}>{content}</span>
    </p>
    <div style={buttonPosition}>
      <button style={buttonStyle} onClick={resetPassowrd}>
        Reset
      </button>
      <button style={buttonStyle2} onClick={onRequestClose}>
        Cancel
      </button>
    </div>
  </Modal>
);

export default CustomModal;
