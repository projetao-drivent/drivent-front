import * as paymentApi from '../../../services/paymentApi';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import {
  NoHotelMsg
} from '../../../components/Dashboard/Activities/index.js';
export default function Activities() {
  const [ tela, setTela ] = useState(true);
  const [ tela2, setTela2 ] = useState(true);
  const token = useToken();
  useEffect(async() => {
    async function confirmPayment() {
      const res= await paymentApi.getTicket(token);
      if(res) {
        if(res.status==='PAID')  {
          setTela(false);
        }
        if(res.TicketType.isRemote) {
          setTela2(false);
        }
      }
    }
    await confirmPayment();
  }, []);
  return(tela ? <NoHotelMsg>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</NoHotelMsg>: <> {tela2 ? <>Atividades: Em breve!</>:<NoHotelMsg>Você não precisa escolher as atividades</NoHotelMsg>}</>); 
}
