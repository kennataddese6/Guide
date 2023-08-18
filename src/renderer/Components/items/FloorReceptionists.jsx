import '../styles/FloorRecetionists.css';
const FloorReceptionists = () => {
  return (
    <>
      <div className="ReceptionistContainer">
        <h3 className="ReceptionistName">1st Floor Receptionist</h3>
        <p className="messageContent"> I have sent Mr.Tewodros to Sdc 13th..</p>
        <p className="TimeandDate"> 7/19/2013</p>
      </div>
      <div className="ReceptionistContainer">
        <h3 className="ReceptionistName">2nd Floor Receptionist</h3>
        <p className="messageContent"> Let Mr.Melaku come to the office..</p>
        <p className="TimeandDate"> 6/19/2013</p>
      </div>
      <div className="ReceptionistContainer">
        <h3 className="ReceptionistName">3rd Floor Receptionist</h3>
        <p className="messageContent">Mrs. Aster wants to come to the 32th..</p>
        <p className="TimeandDate"> 5/19/2013</p>
      </div>
      <div className="ReceptionistContainer">
        <h3 className="ReceptionistName">4th Floor Receptionist</h3>
        <p className="messageContent">
          Mr. Giram has arrived at the 42th Flo...
        </p>
        <p className="TimeandDate"> 3/19/2013</p>
      </div>
    </>
  );
};

export default FloorReceptionists;
