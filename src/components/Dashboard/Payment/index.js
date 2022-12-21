import styled from 'styled-components';

export const Label = styled.p`
  margin-top: ${(props) => props.marginTop || 0};
  margin-bottom: 17px;
  color: ${(props) => props.cor};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  display:${(props) => props.display};
`;
export const TicketInfo = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.cor};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  margin-right:24px;
  border: 1px solid #CECECE;

  p:first-child {
    font-size: 16px;
    line-height: 18.75px;
    color: var(--lightblack);
    margin-bottom: 8px;
  }

  p:last-child {
    font-size: 14px;
    line-height: 16.4px;
    color: var(--grayForPrices);
  }
`;

export const CreditCardContainer = styled.div`
  width: 640px;
  display: flex;
  font-family: 'Roboto', sans-serif;
  position: relative;

  form {
    margin-left: 30px;

    p {
      color: gray;
      font-size: 17px;
      margin-bottom: 10px;
    }
    input {
      width: 320px;
      height: 45px;
      border-radius: 5px;
      font-size: 20px;
      border: 1.5px solid gray;
      padding-left: 8px;
      margin-bottom: 20px;
    }

    > input:first-child {
      margin-bottom: 0;
    }

    div {
      display: flex;
      align-items: center;

      input:first-child {
        width: 200px;
        margin-right: 15px;
      }

      input:last-child {
        width: 105px;
      }
    }
  }
`;

export const Button = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  position: absolute;
  left: 0;
  bottom: -${(props) => props.marginTop};
  cursor: pointer;
`;

export const PaymentConfirmation = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 16px;
    line-height: 18.75px;
    color: var(--lightblack);
    font-family: 'Roboto', sans-serif;
  }

  p:first-child {
    font-weight: bold;
  }
`;

export const Tela2 =styled.div`
  display: ${(props) => props.display};
`;
