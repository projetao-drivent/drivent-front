import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useTicket from '../../../hooks/api/useTicket';
import { useState, useEffect } from 'react';

export default function Hotel() {
  const { ticket, ticketLoading } = useTicket();
  const [ticketType, setTicketType] = useState({});

  useEffect(() => {
    if (ticket) {
      setTicketType(ticket.TicketType);
    }
  }, [ticketLoading]);

  return (
    <>
      {ticketType.includesHotel ? (
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          Primeiro, escolha seu hotel
        </>
      ) : (
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <NoHotelMsg>
            Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades
          </NoHotelMsg>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const NoHotelMsg = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #8e8e8e;
  width: 35vw;
  height: 30vh;
  margin: 30vh auto;
`;
