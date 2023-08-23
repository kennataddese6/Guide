const FloorConversations = () => {
  return (
    <div className="conversationCard">
      <h3 className="customerName">
        {' '}
        {/* {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName}
         */}{' '}
      </h3>
      <p className="customerContent">
        {/*   Mr {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName + ' '}
        wants to come to {FloorCustomer.Department}. Shall I send him? */}
      </p>
      <p className="rcustomerContent"> Yes. Let him come</p>
      <p className="customerContent">
        {' '}
        I have sent
        {/*  {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName} */}
      </p>
      <p className="rcustomerContent"> He has arrived</p>
      <p className="customerContent"> Remarks:</p>
      <p className="rcustomerTime"> 07/19/2023</p>
    </div>
  );
};
export default FloorConversations;
