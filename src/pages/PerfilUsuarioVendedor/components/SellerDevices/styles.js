import styled from 'styled-components';

export const Search = styled.div`
  flex-basis: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

    input {
      flex-basis: 300px;
    }

    @media(max-width: 330px){
      input {
        flex-basis: 200px;
      }
    }
`;

export const SubContainerFirst = styled.div`
  flex: 3;
  display: flex;
  max-width: 800px;
  width: 100%;
  flex-direction: column;
  overflow: auto;
  div{
     margin: 5px;
     border-radius: 5px;

  }
`;

export const SubContainerSecond = styled.div`
  background-color: #234531;
  display: flex;
  align-items: center;
  justify-content: space-around;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

export const ButtonHandleAtivo = styled.button`
  color: #fff;
  background: ${(props) => (props.colorCustom === true ? '#F22B29' : '#F22B29')} ;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  max-width: 80px;
  max-height: 40px;
  font-weight: 400;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.colorCustom === true ? 'block' : 'none')};
`;

export const DeviceInfo = styled.span`
  color: ${(props) => (props.colorCustom === true ? '#0496FF' : '#F22B29')} ;
`;

export const DeviceIcon = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    background-color: white;
    border-radius: 200px;
    padding: 5px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  }
`;

export const DeviceDescription = styled.div`
  background-color: white;
  flex: 3 !important;
  padding: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  display: flex;

  p {
    color: #234531;
    font-weight: 600;
    margin: 10px;
  }
`;
