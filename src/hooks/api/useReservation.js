import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useReservation() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: postTicket,
  } = useAsync((data) => ticketApi.postTicket( data, token), false);
  
  return { ticket, ticketLoading, ticketError, postTicket };
};
