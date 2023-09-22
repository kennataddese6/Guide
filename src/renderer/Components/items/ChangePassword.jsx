import '../styles/changePassword.css';
const ChangePassowrd = () => {
  return (
    <div className="changePassowrdContainer">
      <h3 className="headerText">Change Password</h3>
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '6em' }}
        placeholder="Current Password"
      />
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '2em' }}
        placeholder="New Password"
      />
      <input
        type="password"
        className="EmailID"
        style={{ marginTop: '2em' }}
        placeholder="Confirm Password"
      />
      <button className="CHangePaaswordButton"> Submit</button>
    </div>
  );
};
export default ChangePassowrd;
