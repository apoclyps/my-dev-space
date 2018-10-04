import css from "styled-jsx/css";

export default css`
  .banner {
    background-color: #f8fafc;
    border-bottom: 1px solid #dae1e7;
    text-align: center;
    font-size: 0.875rem;
    height: 30px;
    padding: 5px 1px 10px 1px;
  }

  .search {
    width: 100%;
    position: relative;
  }

  .searchTerm {
    width: 96%;
    border: 3px solid #00b4cc;
    height: 20px;
    border-radius: 5px;
    outline: none;
    color: #9dbfaf;
    font-weight: 200;
    padding: 0.5em;
  }

  .searchTerm:focus {
    color: #00b4cc;
  }

  .searchButton {
    position: relative;
    width: 10%;
    height: 36px;
    border: 1px solid #00b4cc;
    background: #00b4cc;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    margin-right: 5px;
  }

  .wrap {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
