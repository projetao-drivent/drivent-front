import useTicket from '../../../hooks/api/useGetTicketTypes';
import { useEffect, useState } from 'react';
import { TicketPrice, TicketType, Card, TicketTypeBox, SubTitle, StyledTypography, Button } from '../../../components/Payment';
import useEnrollment from '../../../hooks/api/useEnrollment';
import * as ticketApi from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [presential, setPresential] = useState(false);
  const [online, setOnline] = useState(false);
  const [tickets, setTickets] = useState([]); 
  const [enrollments, setEnrollments] = useState([]);
  const { ticket, ticketLoading } = useTicket();
  const { enrollment } = useEnrollment();
  const token = useToken();
  let ticketTypeOnline = [];
  let ticketTypePresential = [];
  
  useEffect(() => {
    if(ticket) {
      setTickets(ticket);
    }

    if(enrollment) {
      setEnrollments({ enrollment });
    };
  }, [ticketLoading]);

  tickets.map((ticket) => {
    if(ticket.name === 'online') {
      ticketTypeOnline = ticket;
    } else if (ticket.name === 'presencial' && ticket.price === 250) {
      ticketTypePresential = ticket;
    }
  });
  
  async function sendInfoTicket( online ) {
    if(online) {
      const body =  {
        ticketTypeId: tickets[0].id,
      };
      await ticketApi.postTicket(body, token);
    }
  }; 

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle variant='h6'>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <TicketTypeBox>
        <Card onClick={() => {setPresential(true); setOnline(false);}} primary={presential} >
          <TicketType >{ticket === null ? <> </> : ticketTypePresential.name}</TicketType >
          <TicketPrice>R${ticket === null ? <> </> : ticketTypePresential.price }</TicketPrice>
        </Card>
        <Card onClick={() => {setOnline(true); setPresential(false);}} primary={online} >
          <TicketType >{ticket === null? (<> </>) : (ticketTypeOnline.name) }</TicketType >
          <TicketPrice>R${ticket === null ? (<> </>) : (ticketTypeOnline.price)}</TicketPrice>
        </Card>
      </TicketTypeBox> 
      {presential === true && online === false  ? (
        <>  
          <SubTitle variant='h6'>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
          <TicketTypeBox>
            <Card>
              <TicketType >Sem Hotel</TicketType >
              <TicketPrice>+ R$ 0</TicketPrice>
            </Card>
            <Card>
              <TicketType >Com Hotel</TicketType >
              <TicketPrice>+ R$ 350</TicketPrice>
            </Card>
          </TicketTypeBox>
        </>
      ): (
        <>
        </>
      ) }

      {online === true && presential === false ? (
        <>  
          <SubTitle variant='h6'>Fechado! O total ficou em <strong> R$ 100.</strong> agora é so confirmar</SubTitle>
          <Button onClick={sendInfoTicket}>RESERVAR INGRESSO</Button>
        </>
      ): (
        <>
        </>
      ) }
    </>
  );
}
