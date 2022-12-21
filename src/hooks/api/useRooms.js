import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomsApi from '../../services/roomApi.js';

export default function useHotelRooms(hotelId) {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync(() => roomsApi.getHotelsRooms(token, hotelId));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
