import useTicket from '../../../hooks/api/useGetTicketTypes';
import useReservation from '../../../hooks/api/useReservation';
import { useState }  from 'react';
import { toast } from 'react-toastify';
import { TicketPrice, TicketType, Card, TicketTypeBox, SubTitle, StyledTypography, Button } from '../../../components/Payment';

export default function Payment() {
  const [presential, setPresential] = useState(false);
  const [ presentialWithoutHotel, setPresentialWihtoutHotel ] = useState(false);
  const [presentialWithHotel, setPresentialWihtHotel] = useState(false);
  const [online, setOnline] = useState(false);
  const [Ticket, setTicket ] = useState(); 
  const { postTicket, } = useReservation();
  const { ticket } = useTicket();
  
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
      ticketType = ticket.filter(item => item.name === type && item.includesHotel === false );
    } else if(type === 'online') {
      setOnline(!online);
      ticketType = ticket.filter(item => item.name === type);
    }else {
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
    } catch (error) {
      toast('Não foi possível reservar o ingresso');
    }
  }
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle variant='h6'>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <TicketTypeBox>
        <Card onClick={() => selectTicket('presencial')} primary={presential} >
          <TicketType >{ticket === null ? <> </> : ticket[1].name}</TicketType >
          <TicketPrice>R${ticket === null ? <> </> : ticket[1].price }</TicketPrice>
        </Card>
        <Card onClick={() => selectTicket('online')} primary={online} >
          <TicketType >{ticket === null? (<> </>) : (ticket[0].name) }</TicketType >
          <TicketPrice>R${ticket === null ? (<> </>) : (ticket[0].price)}</TicketPrice>
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
              <SubTitle variant='h6'>Fechado! O total ficou em <strong> R$ {Ticket[0].price}.</strong> agora é so confirmar</SubTitle>
              <Button onClick={submit}>RESERVAR INGRESSO</Button>
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

      {online && presential === false ? (
        <>  
          <SubTitle variant='h6'>Fechado! O total ficou em <strong> R$ 100.</strong> agora é so confirmar</SubTitle>
          <Button>RESERVAR INGRESSO</Button>
        </>
      ): (
        <>
        </>
      ) }
    </>
  );
}
