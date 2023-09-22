import '../styles/changePassword.css';
import { useState } from 'react';
const ChangePassowrd = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, sestConfirmPassword] = useState('');
  const handleSubmit = () => {
    console.log(
      'Here are the inputs',
      currentPassword,
      confirmPassword,
      newPassword
    );
  };
  return (
    <div className="changePassowrdContainer">
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
    </div>
  );
};
export default ChangePassowrd;
