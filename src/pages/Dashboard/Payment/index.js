import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Cards from 'react-credit-cards';

import 'react-credit-cards/es/styles-compiled.css';
import {
  Label,
  TicketInfo,
  CreditCardContainer,
  Button,
  PaymentConfirmation,
} from '../../../components/Dashboard/Payment/index.js';

import InputMask from 'react-input-mask';
import { useState } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { useContext } from 'react';
import { FcOk } from 'react-icons/fc';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import * as paymentApi from '../../../services/paymentApi';
export default function Payment() {
  const { userData, setUserData } = useContext(UserContext);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [remote, setRemote] = useState(true);
  const [preco, setPreco] = useState(0);
  const [includeHotel, setIncludeHotel] = useState(true);
  const token = useToken();
  async function submit(e) {
    e.preventDefault();
    try {
      const res= await paymentApi.getTicket(token);
      const body={
        ticketId: res.id,
        cardData: {
          issuer: res.TicketType.name,
          number: number,
          name: name,
          expirationDate: expiry,
          cvv: cvc
        }
      };
      
      await paymentApi.pay(body, token);
      setUserData({ ...userData, isTickedPayed: true });
    } catch {
      alert('erro');
    }
  }
  useEffect(async() => {
    async function ticket() {
      const res= await paymentApi.getTicket(token);
      setRemote(res.TicketType.isRemote);
      setIncludeHotel(res.TicketType.includesHotel);
      setPreco((res.TicketType.price/100).toString().replace('.', ','));
      if(res) {
        const pay = await paymentApi.getPayment(res.id, token);
        if(pay) {
          setUserData({ ...userData, isTickedPayed: true });
        }
      }
    }
    
    await ticket();
  }, []);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Label cor={'#8E8E8E'} >Primeiro, escolha sua modalidade de ingresso</Label>
      <TicketInfo width={'290px'} height={'108px'} cor={'rgb(255, 238, 210)'}>
        <p>
          {remote ? 'online' : 'Presencial'} + {includeHotel ? 'Com Hotel' : 'Sem Hotel'}
        </p>
        <p>R$ {preco}</p>
      </TicketInfo>
      <Label marginTop={'44px'}>Pagamento</Label>
      {userData.isTickedPayed ? (
        <PaymentConfirmation>
          <FcOk color={'#36B853'} size={'40px'} style={{ marginRight: '14px' }} />
          <div>
            <p>Pagamento confirmado!</p>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </div>
        </PaymentConfirmation>
      ) : (
        <>
          <CreditCardContainer>
            <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
            <form onSubmit={submit}>
              <InputMask
                type={'tel'}
                name={'number'}
                placeholder="Card Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                pattern="\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d"
                mask="9999 9999 9999 9999"
                maskChar={'*'}
                required
              ></InputMask>
              <p>E.g.: 49..., 51..., 36..., 37...</p>
              <input
                type={'tel'}
                name={'name'}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                required
              />
              <div>
                <InputMask
                  type={'tel'}
                  name={'expiry'}
                  placeholder="Valid Thru"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.replace(' / ', ''))}
                  onFocus={(e) => setFocus(e.target.name)}
                  pattern="\d\d / \d\d"
                  mask="99 / 99"
                  maskChar=""
                  required
                ></InputMask>
                <input
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  pattern="\d{3,4}"
                  maxLength={3}
                  required
                />
              </div>
              <Button type={'submit'} marginTop={'60px'}>
                 FINALIZAR PAGAMENTO
              </Button>
            </form>
          </CreditCardContainer>
        </>
      )}
    </>
  );
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
