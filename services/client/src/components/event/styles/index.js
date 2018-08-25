import css from "styled-jsx/css";

export default css`
  .event {
    background-color: #fff;
    border-bottom: 2px solid #f8fafc;
    display: flex;
    padding: 0.5rem;
  }

  .recent-event {
    background-color: white;
    border: 1px solid #FF0000;
    border-top: none;
    -webkit-box-shadow: 0px 0px 53px 6px #FF0000;
    -moz-box-shadow: 0px 0px 53px 6px #FF0000;
    box-shadow: 0px 0px 53px 6px #FF0000;
  }

  .nows-events{
    background-color: white;
    border: 1px solid #34B188;
    border-top: none;
    -webkit-box-shadow: 0px 0px 53px 6px #34B188;
    -moz-box-shadow: 0px 0px 53px 6px #34B188;
    box-shadow: 0px 0px 53px 6px #34B188;
    
  }

  .event-icon {
    margin-left: 0.5rem;
  }

  .event-content {
    margin-left: 1rem;
    margin-top: 0.25rem;
  }
  
`;
