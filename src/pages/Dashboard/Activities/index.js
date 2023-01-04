import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useTicket from '../../../hooks/api/useTicket';
import { useState, useEffect } from 'react';

export default function Activities() {
  const { ticket, ticketLoading } = useTicket();
  const [userTicket, setUserTicket] = useState({});

  useEffect(() => {
    if (ticket) {
      setUserTicket(ticket);
    }
  }, [ticketLoading]);

  console.log(ticket);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {userTicket.status === 'RESERVED' ? (
        <NoActivitiesMsg>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</NoActivitiesMsg>
      ) : (
        <></>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const NoActivitiesMsg = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #8e8e8e;
  width: 35vw;
  height: 30vh;
  margin: 30vh auto;
`;
