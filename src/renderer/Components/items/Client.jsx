import useColorAndBrightness from 'renderer/features/hook/useColorAndBrightness';
import { FiMoreVertical } from 'react-icons/fi';

const Client = ({
  client,
  handleDragStart,
  handleDragOver,
  handleDropOnWaitingClients,
}) => {
  const fullName = client.FirstName + ' ' + client.LastName;
  const { color, isLightColor } = useColorAndBrightness(fullName);

  return (
    <div
      className="comments-elements"
      draggable="true"
      onDragStart={(event) => handleDragStart(event, client)}
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleDropOnWaitingClients(event)}
    >
      <div
        className="img-2"
        alt="Avatar woman"
        style={{
          backgroundColor: color,
          color: isLightColor ? 'black' : 'white',
        }}
      >
        {' '}
        {client.FirstName[0].toUpperCase()}
      </div>
      <div className="overlap-3">
        <p>
          {client.FirstName + ' '} {client.LastName}
        </p>
        <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
          {client.Department}
        </p>
      </div>
      <FiMoreVertical className="icon-navigation-more" />
    </div>
  );
};

export default Client;
