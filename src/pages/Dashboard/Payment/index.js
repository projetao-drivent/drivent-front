import useTicket from '../../../hooks/api/useGetTicketTypes';
import { useEffect, useState } from 'react';
import { TicketPrice, TicketType, Card, TicketTypeBox, SubTitle, StyledTypography, Button } from '../../../components/Payment';

export default function Payment() {
  const [presential, setPresential] = useState(false);
  const [online, setOnline] = useState(false);
  const [Tickets, setTickets ] = useState({}); 
  const { ticket, ticketLoading } = useTicket();
  
  function selectTicket(type) {
    if(type === 'presential') {
      setPresential(!presential);
    } else {
      setOnline(!online);
    }
  };
  
  useEffect(() => {
    if(ticket) {
      setTickets({ ticket });
    }
  }, [ticketLoading]);
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle variant='h6'>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <TicketTypeBox>
        <Card onClick={() => selectTicket('presential')} primary={presential} >
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
