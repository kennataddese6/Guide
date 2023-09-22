import '../styles/changePassword.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from 'renderer/features/auth/authSlice';
import Spinner from '../Utilities/Spinner';
import { reset } from 'renderer/features/auth/authSlice';
const ChangePassowrd = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, sestConfirmPassword] = useState('');
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [displayMessage, setDiplayMessage] = useState('');
  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = () => {
    const userData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      Id: user ? user._id : '',
    };
    dispatch(ChangePassword(userData));
    setError(false);
    setSuccess(false);
  };
  useEffect(() => {
    if (isError) {
      setError(true);
      setDiplayMessage(message);
    }
    if (isSuccess) {
      setSuccess(true);
      setDiplayMessage(message);
    }
    dispatch(reset());
  }, [isError, isSuccess]);
  return (
    <div className="changePassowrdContainer">
      {isLoading && <Spinner />}
      <h3 className="headerText">Change Password</h3>
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '6em' }}
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '2em' }}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '2em' }}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          sestConfirmPassword(e.target.value);
        }}
      />
      <button className="CHangePaaswordButton" onClick={handleSubmit}>
        {' '}
        Submit
      </button>
      <p style={{ color: Error ? 'red' : Success ? 'green' : 'white' }}>
        {' '}
        {displayMessage}
      </p>
    </div>
  );
};
export default ChangePassowrd;
