import Typography from '@material-ui/core/Typography';
import { SubTitle } from '../../../components/Payment';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BiExit } from 'react-icons/bi';
import Event from '../../../components/Event';

export default function Activities() {
  const [ Days, setDays] = useState([]);
  const [ isAvailable, setisAvailable] = useState(false);
  const [Background, setBackground ] = useState('#E0E0E0');
  const array = ['Sexta, 22/10', 'Sábado, 23/10', 'Domingo, 24/10'];
  let iconStyles = { color: '#078632',  fontSize: '1.8em', marginTop: '8px' };

  useEffect(() => {setDays(array);}, []);
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <SubTitle variant='h6'>Primeiro, filtre pelo dia do evento</SubTitle>
      <EventDayBox>
        {Days.map((day) => ( <Day Background={Background} onClick={() => setBackground('#FFD37D')}>{day}</Day>))}
      </EventDayBox>
      <PlaningEvent>
        <Event/>
        <Event/>
        <Event/>
      </PlaningEvent>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const EventDayBox = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.75rem;


`;

const Day = styled.div`
  width:9rem;
  height:3rem;
  border-radius:4px;
  background-color:${(props) => props.Background};
  font-family: 'Roboto', sans-serif;
  font-size:16px;
  font-weight:400;
  display: flex;
  justify-content:center;
  align-items:center;
`;

const PlaningEvent = styled.div`
  width:100%;
  height:19rem;
  font-family:'Roboto', sans-serif;
  display:flex;
`;

