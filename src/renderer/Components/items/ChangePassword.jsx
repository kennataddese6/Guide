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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [displayMessage, setDiplayMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [confirmFoucus, setConfirmFocus] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
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
    if (!newPassword || !confirmPassword) {
      setEmptyField(true);
    } else {
      setEmptyField(false);
    }
  }, [newPassword, confirmPassword]);
  useEffect(() => {
    if (isError) {
      setError(true);
      setDiplayMessage(message);
    }
    if (isSuccess) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
      setDiplayMessage(message);
    }
    dispatch(reset());
  }, [isError, isSuccess]);
  useEffect(() => {
    if (newPassword !== confirmPassword && confirmFoucus) {
      setPasswordMatch(false);
      setError(true);
      setDiplayMessage('Passwords Must Match!');
      setSuccess(false);
    } else {
      if (!Success) {
        setPasswordMatch(true);
        setError(false);
        setDiplayMessage('');
      }
    }
  }, [newPassword, confirmPassword]);
  useEffect(() => {
    if (newPassword) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isPasswordValid = passwordRegex.test(newPassword);

      if (!isPasswordValid) {
        setValidPassword(false);
        setError(true);
        setDiplayMessage('Weak Password!');
      } else {
        setValidPassword(true);
        setError(false);
        setDiplayMessage('');
      }
    }
  }, [newPassword]);
  return (
    <div className="changePassowrdContainer">
      {isLoading && <Spinner />}
      <h3 className="headerText">Change Password</h3>
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '6em', color: 'black' }}
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <input
        type="password"
        className="EmailID"
        style={{
          marginTop: '2em',
          color: 'black',
          borderBottomColor: validPassword ? '' : 'red',
        }}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <input
        type="password"
        className="EmailID"
        style={{
          marginTop: '2em',
          borderBottomColor: passwordMatch ? '' : 'red',
          color: 'black',
        }}
        placeholder="Confirm Password"
        value={confirmPassword}
        onFocus={() => {
          setConfirmFocus(true);
        }}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button
        className={
          !passwordMatch || emptyField || !validPassword
            ? 'CHangePaaswordButtonInactive'
            : 'CHangePaaswordButton'
        }
        onClick={handleSubmit}
        disabled={!passwordMatch || !!emptyField || !validPassword}
      >
        {' '}
        Submit
      </button>
      <p style={{ color: Error ? 'red' : Success ? 'green' : 'yellow' }}>
        {' '}
        {displayMessage}
      </p>
    </div>
  );
};
export default ChangePassowrd;
