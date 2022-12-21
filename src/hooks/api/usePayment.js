import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usepayPayment() {
  const token = useToken();
  const { data } = useAsync();
  const {
    loading: payPaymentLoading,
    error: payPaymentERROR,
    act: payPayment
  } = useAsync(() => paymentApi.pay(data, token), false);

  return {
    payPaymentLoading,
    payPaymentERROR,
    payPayment
  };
}
