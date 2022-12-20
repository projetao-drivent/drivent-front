import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicekt
  } = useAsync(() => ticketApi.getTicektTypes(token));
  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicekt
  };
}
