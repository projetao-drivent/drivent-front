import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi.js';

export default function useBookingByRoom(roomId) {
  const token = useToken();

  const {
    data: roomBooking,
    loading: roomBookingLoading,
    error: roomBookingError,
    act: getRoomBooking,
  } = useAsync(() => bookingApi.getRoomBooking(token, roomId));

  return {
    roomBooking,
    roomBookingLoading,
    roomBookingError,
    getRoomBooking,
  };
}
