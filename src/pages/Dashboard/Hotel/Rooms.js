import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';

export default function Rooms({ room, selectedRoom, setSelectedRoom }) {
  let freeRooms = new Array(room.capacity - room.Booking.length).fill(0);
  let bgColor = '#FFFFFF';
  let iconColor = '#454545';

  if (freeRooms.length === 0) {
    bgColor = '#E9E9E9';
  }
  if (selectedRoom.id === room.id) {
    bgColor = '#FFEED2';
    iconColor = '#FF4791';
  }

  function selectRoom() {
    if (freeRooms.length !== 0) {
      freeRooms.push(0);
      selectedRoom.Booking?.pop();
      room.Booking.push(0);
      setSelectedRoom(room);
    }
  }

  return (
    <RoomCard onClick={() => selectRoom()} background={bgColor}>
      {room.name}
      <Icons color={iconColor}>
        {freeRooms.map(() => {
          return <IoPersonOutline />;
        })}
        {room.Booking.map(() => {
          return <IoPerson />;
        })}
      </Icons>
    </RoomCard>
  );
}

const RoomCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 190px;
  height: 45px;
  background-color: ${(props) => props.background};
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 10px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color};
`;
