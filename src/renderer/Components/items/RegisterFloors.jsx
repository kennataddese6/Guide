const RegisterFloors = () => {
  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div className="div" style={{ height: '622px' }}>
            <div className="register-employee">
              Register Building Work Units
            </div>
            {/*    {isLoading && <Spinner />} */}

            <input
              className="firstNameInput"
              type="text"
              style={{ width: '349px' }}
            />
            <div className="overlap-group"></div>
            <input
              className="emailInput"
              type="text"
              //value={email}
              /* onChange={(e) => {
                setEmail(e.target.value);
              }} */
            />

            <input
              className="phoneInput"
              type="text"
              style={{ width: '349px' }}

              //value={phoneNumber}
              /* onChange={(e) => {
                setPhoneNumber(e.target.value);
              }} */
            />
            <input
              className="phoneInput"
              type="number"
              style={{ width: '136px', position: 'absolute', top: '438px' }}

              //value={phoneNumber}
              /* onChange={(e) => {
                setPhoneNumber(e.target.value);
              }} */
            />
            <input
              className="phoneInput"
              type="number"
              style={{
                width: '136px',
                position: 'absolute',
                top: '438px',
                left: '279px',
              }}

              //value={phoneNumber}
              /* onChange={(e) => {
                setPhoneNumber(e.target.value);
              }} */
            />
            <div className="text-wrapper-4">Work Unit</div>
            <div className="text-wrapper">Division</div>
            <div className="text-wrapper-2">Department</div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '396px' }}
            >
              Floor Number
            </div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '396px', left: '279px' }}
            >
              Office Number
            </div>
            <div
              className="submitButton"
              onClick={''}
              style={{ position: 'absolute', top: '502px' }}
            >
              <div className="text-wrapper-6">Submit</div>
            </div>

            {/*             {SuccessMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '85%',
                  color: 'green',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MdCheckCircle color="green" />
                <h4> Success</h4>
              </div>
            ) : (
              ''
            )} */}

            {/*             {ErrorMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '85%',
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MdCancel color="red" />
                <h4> Error. Something went wrong</h4>
              </div>
            ) : (
              ''
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterFloors;
