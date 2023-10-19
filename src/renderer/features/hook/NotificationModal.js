import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ProgressBar from 'react-progressbar';
import { MdCheckCircle } from 'react-icons/md';

const NotificationModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setModalIsOpen(false);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);
  const customStyles = {
    overlay: {
      backgroundColor: 'transparent',
    },
    content: {
      top: '10%',
      left: '92%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      borderRadius: '10px',
      float: 'right',
    },
  };
  const progressStyle = {
    position: 'absolute',
    bottom: '0%',
    left: '0%',
    width: '100%',
  };
  const pColor = {
    color: 'green',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Notification Modal"
      style={customStyles}
    >
      <p style={pColor}>
        {' '}
        <span>
          {' '}
          <MdCheckCircle />
        </span>
        Operation Successful.
      </p>
      <div style={progressStyle}>
        <ProgressBar completed={progress} color="red" height="2px" />
      </div>
    </Modal>
  );
};

export default NotificationModal;
