import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi.js';

export default function useSaveBooking() {
  const token = useToken();

  const {
    loading: roomBookingLoading,
    error: roomBookingError,
    act: postRoomBooking,
  } = useAsync((data) => bookingApi.postRoomBooking(data, token), false);

  return {
    roomBookingLoading,
    roomBookingError,
    postRoomBooking,
  };
}
