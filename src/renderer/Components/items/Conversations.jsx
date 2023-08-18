const Conversations = ({ floorNumber }) => {
  console.log('this is the floor number', floorNumber);
  const FloorNumber = floorNumber;
  return (
    <>
      <div>
        <h1>Hello {FloorNumber}</h1>
      </div>
    </>
  );
};

export default Conversations;
