import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useTicket from '../../../hooks/api/useTicket';
import useHotel from '../../../hooks/api/useHotel';
import { useState, useEffect } from 'react';

export default function Hotel() {
  const { ticket, ticketLoading } = useTicket();
  const { hotel, hotelLoading } = useHotel();
  const [ticketType, setTicketType] = useState({});
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (ticket) {
      setTicketType(ticket.TicketType);
    }
  }, [ticketLoading]);

  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
    }
  }, [hotelLoading]);

  console.log(hotels);

  return (
    <>
      {ticketType.includesHotel ? (
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
          <Title>Primeiro, escolha seu hotel</Title>
          <Container>
            {hotels.map((hotel) => (
              <HotelCard>
                <HotelImg image={hotel.image} />
                <HotelName>{hotel.name}</HotelName>
                <Accomodations>
                  Tipos de acomodação:
                  {hotel.Rooms.find((room) => room.capacity > 2) ? (
                    <Info>Single, Double e Triple</Info>
                  ) : (
                    <Info>Single e Double</Info>
                  )}
                </Accomodations>
              </HotelCard>
            ))}
          </Container>
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

const Title = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
`;

const Info = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #3c3c3c;
`;

const NoHotelMsg = styled.div`
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

const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  background-color: #ebebeb;
  color: #343434;
  width: 15vw;
  height: 35vh;
  border-radius: 10px;
  padding: 15px;
  margin-right: 20px;
`;

const HotelImg = styled.div`
  width: 12.3vw;
  height: 15vh;
  background: url(${(props) => props.image});
  border-radius: 5px;
`;

const HotelName = styled.div`
  width: 12vw;
  height: 5vh;
  margin-top: 10px;
`;

const Accomodations = styled.div`
  display: flex;
  flex-direction: column;
  width: 12vw;
  height: 15vh;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #3c3c3c;
`;

const Container = styled.div`
  height: 100vh;
  max-height: ${(props) => props.height || '600px'};

  width: 100%;
  max-width: ${(props) => props.width || '1200px'};

  margin-top: 20px;
  display: flex;
  overflow: hidden;

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
  }
`;
