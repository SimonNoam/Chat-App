import styled from "styled-components";
function Board(props) {
    return (
        <Container>
       <div className="board">
        {props.squares.map((square, i) => (
            <button
            key={i}
            className="square"
            onClick={() => props.onClick(i)}
            >
            {square}
          </button>
        ))}
      </div>
        </Container>
    );
  }
  
  export default Board;

  const Container = styled.div`
  .board {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  
  .square {
    width: 100px;
    height: 100px;
    font-size: 72px;
    font-weight: bold;
    text-align: center;
    border: 2px solid #ccc;
    background-color: #fff;
    cursor: pointer;
  }
  
  .square:hover {
    background-color: #f0f0f0;
  }
  `;