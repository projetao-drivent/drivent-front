import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { getStatusPayment } from '../../../services/hotelApi';

export default function Hotel() {
  const [ StatusPay, setStatusPay] = useState(false); 
  useEffect(async() => {
    try {
      //await getStatusPayment();
      setStatusPay(true);
    }catch(error) {
      console.log(error);
    };
  }, [StatusPay]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {StatusPay ? 
        (<Container>
          <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1>
        </Container>)
        :(<Container> GOKU </Container>)
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Container = styled.div`
  height:90%;
  display: flex;
  text-align:center;
  align-items:center;
  justify-content:center;
  h1{
    width:50%;
    color: gray;
  }
`;
