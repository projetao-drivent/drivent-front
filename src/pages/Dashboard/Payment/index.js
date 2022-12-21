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
  Tela2
} from '../../../components/Dashboard/Payment/index.js';

import InputMask from 'react-input-mask';
import { useState } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { useContext } from 'react';
import { FcOk } from 'react-icons/fc';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import * as paymentApi from '../../../services/paymentApi';
//

import useTicket from '../../../hooks/api/useGetTicketTypes';
import useReservation from '../../../hooks/api/useReservation';
import { toast } from 'react-toastify';
import { TicketPrice, TicketType, Card, TicketTypeBox, SubTitle, StyledTypography, Button2 } from '../../../components/Payment';
import * as ticketApi from '../../../services/ticketApi';

export default function Payment() {
  const { userData, setUserData } = useContext(UserContext);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [remote, setRemote] = useState(true);
  const [preco, setPreco] = useState(0);
  const [includeHotel, setIncludeHotel] = useState(true);//
  const [presential, setPresential] = useState(false);
  const [ presentialWithoutHotel, setPresentialWihtoutHotel ] = useState(false);
  const [presentialWithHotel, setPresentialWihtHotel] = useState(false);
  const [online, setOnline] = useState(false);
  const [Ticket, setTicket ] = useState(); 
  const { postTicket, } = useReservation();
  const [tickets, setTickets] = useState([]);
  const { ticket, ticketLoading } = useTicket();
  const [ tela2, setTela2 ] = useState(false);
  let ticketTypeOnline = [];
  let ticketTypePresential = [];
  const token = useToken();
  useEffect(async() => {
    async function confirmPayment() {
      const res= await paymentApi.getTicket(token);
      setRemote(res.TicketType.isRemote);
      setIncludeHotel(res.TicketType.includesHotel);
      setPreco((res.TicketType.price/100).toString().replace('.', ','));
      if(res) {
        setTela2(true);
        const pay = await paymentApi.getPayment(res.id, token);
        if(pay) {
          setUserData({ ...userData, isTickedPayed: true });
        }
      }
    }
    await confirmPayment();
  }, []);
  async function submit2(e) {
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
      toast('Não foi possível completar o pagamento do ingresso');
    }
  }
  
  async function TicketTela() {
    const res= await paymentApi.getTicket(token);
    setRemote(res.TicketType.isRemote);
    setIncludeHotel(res.TicketType.includesHotel);
    setPreco((res.TicketType.price/100).toString().replace('.', ','));
  }
    
  useEffect(() => {
    if(ticket) {
      setTickets(ticket);
    }
  }, [ticketLoading]);

  tickets.map((ticket) => {
    if(ticket.name === 'online') {
      ticketTypeOnline = ticket;
    } else if(ticket.name === 'presencial' && ticket.price === 25000) {
      ticketTypePresential = ticket;
    }
  });
  
  function selectTicket(type) {
    let ticketType = [];
    if(type === 'no hotel') {
      setPresentialWihtoutHotel(!presentialWithoutHotel);
      setPresentialWihtHotel(false);
      ticketType = ticket.filter(item => item.name === 'presencial' && item.includesHotel === false );
      setTicket(ticketType);
      return;
    }
    if(type === 'presencial') {
      setPresential(!presential);
      ticketType = ticket.filter(item => item.name === type && item.includesHotel === false);
    } else if(type === 'online') {
      setOnline(!online);
      ticketType = ticket.filter(item => item.name === type);
    } else {
      setPresentialWihtHotel(!presentialWithHotel);
      setPresentialWihtoutHotel(false);
      ticketType = ticket.filter(item => item.name === 'presencial' && item.includesHotel === true );
    }
    
    setTicket(ticketType);
  };
  async function submit() {
    try {
      const body = { ticketTypeId: Ticket[0].id };
      await postTicket(body);
      await TicketTela();
      setTela2(true);
    } catch (error) {
      toast('Não foi possível reservar o ingresso');
    }
  }
 
  console.log(tickets);

  async function sendInfoTicket( online ) {
    try {
      if(online) {
        const body =  {
          ticketTypeId: ticketTypeOnline.id,
        };
        await ticketApi.postTicket(body, token);
        await postTicket(body);
        await TicketTela();
        setTela2(true);
      }
    } catch(error) {
      toast('Não foi possível reservar o ingresso');
    }
  }; 

  return (
    <>
      <Tela2 display={tela2 ? 'none' : 'block'}>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <SubTitle variant='h6'>Primeiro, escolha sua modalidade de ingresso</SubTitle>
        <TicketTypeBox>
          <Card onClick={() => {selectTicket('presencial'); setPresential(true); setOnline(false);}} primary={presential} >
            <TicketType >{ticket === null ? <> </> : ticketTypePresential.name}</TicketType >
            <TicketPrice>R${ticket === null ? <> </> : (ticketTypePresential.price/100).toString().replace('.', ',')}</TicketPrice>
          </Card>
          <Card onClick={() => {setOnline(true); setPresential(false);}} primary={online} >
            <TicketType >{ticket === null? (<> </>) : (ticketTypeOnline.name) }</TicketType >
            <TicketPrice>R${ticket === null ? (<> </>) : ((ticketTypeOnline.price/100).toString().replace('.', ',') )}</TicketPrice>
          </Card>
        </TicketTypeBox> 
        {presential === true && online === false  ? (
          <>  
            <SubTitle variant='h6'>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
            <TicketTypeBox>
              <Card  onClick={() => selectTicket('no hotel')} primary={presentialWithoutHotel} >
                <TicketType >Sem Hotel</TicketType >
                <TicketPrice>+ R$ 0</TicketPrice>
              </Card>
              <Card  onClick={() => selectTicket()} primary={presentialWithHotel}>
                <TicketType>Com Hotel</TicketType >
                <TicketPrice>+ R$ 350</TicketPrice>
              </Card>
            </TicketTypeBox>
            {presentialWithHotel || presentialWithoutHotel ? (
              <>
                <SubTitle variant='h6'>Fechado! O total ficou em <strong> R$ {(Ticket[0].price/100).toString().replace('.', ',')}.</strong> agora é so confirmar</SubTitle>
                <Button2 onClick={submit}>RESERVAR INGRESSO</Button2>
              </>
            ):(
              <>
              </>
            )}
            
          </>
        ): (
          <>
          </>
        ) }

        {online === true && presential === false ? (
          <>  
            <SubTitle variant='h6'>Fechado! O total ficou em <strong> R$ 100.</strong> agora é so confirmar</SubTitle>
            <Button2 onClick={sendInfoTicket}>RESERVAR INGRESSO</Button2>
          </>
        ): (
          <>
          </>
        ) }
      </Tela2>
      <Tela2 display={tela2 ? 'block' : 'none'}>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <Label cor={'#8E8E8E'} >Ingresso escolhido </Label>
        <TicketInfo width={'290px'} height={'108px'} cor={'rgb(255, 238, 210)'}>
          <p>
            {remote ? 'online' : 'Presencial'} + {includeHotel ? 'Com Hotel' : 'Sem Hotel'}
          </p>
          <p>R$ {preco}</p>
        </TicketInfo>
        <Label cor={'#8E8E8E'} marginTop={'44px'}>Pagamento</Label>
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
              <form onSubmit={submit2}>
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
      </Tela2>
    </>
  );
}

