import SideBar from '../items/SideBar';
import '../styles/RegisterCusomer.css';
const RegisterCustomer = () => {
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <div className="container">
            <div className="rectangle-parent">
              <div className="frame-child" />
              <input
                className="frame-item"
                type="number"
                placeholder="Floor Number"
                required
                id="floorNumber"
              />
              <div className="registration-form"> Registration Form</div>
              <input
                className="frame-inner"
                type="text"
                placeholder="First Name"
                maxLength={3}
                minLength={10}
                required
                id="firstName"
              />
              <div className="first-name">
                <p className="first-name1">First Name</p>
              </div>
              <div className="rectangle-group">
                <input
                  className="rectangle-input"
                  type="text"
                  placeholder="Last Name"
                  maxLength={3}
                  minLength={10}
                  required
                  id="lastName"
                />
                <div className="last-name">Last Name</div>
              </div>
              <input
                className="frame-child1"
                type="tel"
                placeholder="Phone"
                minLength={10}
                required
                id="phone"
              />
              <div className="phone">
                <p className="first-name1">Phone</p>
              </div>
              <input
                className="frame-child2"
                type="text"
                placeholder="Woreda"
                required
                id="woreda"
              />
              <div className="woreda">
                <p className="first-name1">Woreda</p>
              </div>
              <input
                className="frame-child3"
                type="text"
                placeholder="Subcity"
                required
                id="subcity"
              />
              <div className="subcity">
                <p className="first-name1">Subcity</p>
              </div>
              <input
                className="frame-child4"
                type="text"
                placeholder="Provider Name"
                required
                id="providerName"
              />
              <input
                className="frame-child5"
                type="number"
                placeholder="Office Number"
                required
                id="officeNumber"
              />
              <div className="provider-name">
                <p className="first-name1">Provider Name</p>
              </div>
              <div className="office-number">
                <p className="first-name1">Office Number</p>
              </div>
              <div className="floor-number">
                <p className="first-name1">Floor Number</p>
              </div>
              <input
                className="frame-child6"
                type="text"
                placeholder="Department"
                required
                id="department"
              />
              <div className="department">
                <p className="first-name1">Department</p>
              </div>
              <input
                className="frame-child7"
                type="number"
                placeholder="Elevator Number"
                required
                id="elevatorNumber"
              />
              <div className="elevator-number">
                <p className="first-name1">Elevator Number</p>
              </div>
              <input
                className="frame-child8"
                type="text"
                placeholder="Pre-request"
                id="pre-request"
              />
              <div className="pre-request">
                <p className="first-name1">Pre-request</p>
              </div>
              <input className="frame-child9" type="text" />
              <input
                className="frame-child10"
                type="text"
                required
                id="upload"
              />

              <button className="submit">Submit</button>
              <div className="ellipse-div" />
              <input className="frame-child11" type="radio" required />
              <input className="frame-child12" type="radio" required />
              <div className="male">Male</div>
              <div className="female">Female</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCustomer;
