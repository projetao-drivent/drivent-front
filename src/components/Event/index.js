import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Event() {
  let iconStylesGreen = { color: '#078632',  fontSize: '1.8em', marginTop: '8px' };
  let iconStylesRed = { color: '#CC6666',  fontSize: '1.8em', marginTop: '8px' };
  return(
    <Evento>
      <h1>Auditório Principal</h1>
      <Box>
        <MiniBox>
          <div>
            <h1>Minecraft: montando o PC ideal</h1>
            <h2>09:00 - 10:00</h2>
          </div>
          <div>
            <h3>
              <BiExit style={iconStylesGreen}/>
            </h3>
            <h4>27 vagas</h4>
          </div>
        </MiniBox>
      </Box>
    </Evento>
  );
}

const Evento = styled.div`
  width:33.3%;

  h1{
    text-align: center;
    font-size:17px;
    color:#7B7B7B;
    margin-bottom:15px;
  }
`;

const Box = styled.div`
  width:100%;
  height:17rem;
  border: 1px solid #D7D7D7;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-top:8px;

`;

const MiniBox = styled.div`
  width:265px;
  min-height:79px;
  background-color:#D7D7D7;
  border-radius: 5px;
  display:flex;
  justify-content:space-between;
  div{
    padding:8px;
    min-width:80px;
  }
  h1{
    text-align:left;
    color: black;
    font-size:12px;
    font-weight:700;
  }
  h2{
    color: #343434;
    font-weight:400;
    font-size:12px;
  }
  h3{
    text-align:center;
  }
  h4{
    font-size:9px;
    text-align:center;
    color:#078632;
    font-weight:600;
  }
`;

