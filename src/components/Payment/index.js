import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
export const SubTitle = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;
`;
export const TicketTypeBox = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.75rem;

`;

export const Card = styled.div`
  display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 145px;
    height: 145px;
    border: 1px solid #CECECE;
    border-radius: 20px;
    background: ${props => props.primary? '#FFEED2': ''};
    &:hover{
      background-color: #FFEED2;
      cursor: pointer;
    }

`;
export const TicketType = styled.span`
  color: #454545;
  font-size: 1rem;
  margin-bottom: .3rem;
`;

export const TicketTypePresential = styled.span`
  color: #FFEED2;
  font-size: 1rem;
  margin-bottom: .3rem;
`;

export const TicketPrice = styled.span`
  color: #898989    ;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 162px;
  height: 37px;
  cursor: pointer;

  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
`; 
