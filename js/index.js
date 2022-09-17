const game = (() => {
  let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let count = 0;

  const player = (simbol, status) => {
    return { simbol, status };
  };

  displayControlller = (() => {
    let p1 = player("X", true);
    let p2 = player("O", false);
    let currentPlayer = p1;
    let setCurrent = () => (currentPlayer.status = !currentPlayer.status);

    let checkWinner = (string) => {
      let answer;

      const CheckRealwinner = (string) => {
        if (
          (tablero[0][0] === string &&
            tablero[1][0] === string &&
            tablero[2][0] === string) ||
          (tablero[0][2] === string &&
            tablero[1][2] === string &&
            tablero[2][2] == string) ||
          (tablero[0][1] === string &&
            tablero[1][1] === string &&
            tablero[2][1] == string) ||
          (tablero[0][0] === string &&
            tablero[0][1] === string &&
            tablero[0][2] == string) ||
          (tablero[1][0] === string &&
            tablero[1][1] === string &&
            tablero[1][2] == string) ||
          (tablero[2][0] === string &&
            tablero[2][1] === string &&
            tablero[2][2] == string) ||
          (tablero[0][0] === string &&
            tablero[1][1] === string &&
            tablero[2][2] == string) ||
          (tablero[0][2] === string &&
            tablero[1][1] === string &&
            tablero[2][0] == string)
        ) {
          return true;
        }
      };

      switch (string) {
        case "X":
          answer = CheckRealwinner("X");
          break;
        case "O":
          answer = CheckRealwinner("O");
          break;

        default:
          break;
      }

      return answer;
    };

    return {
      p1,
      p2,
      currentPlayer,
      setCurrent,
      checkWinner,
    };
  })();

  let printResult = () => {
    displayControlller.checkWinner("O");
    displayControlller.checkWinner("X");
    let h1 = document.getElementById("h1");

    if (displayControlller.checkWinner("X")) {
      h1.classList.add("showmsg")
      h1.innerHTML = " <strong>X</strong> ¡Gana!";
      
      
    } else if (displayControlller.checkWinner("O")) {
      h1.classList.add("showmsg")
      h1.innerHTML = "<strong style='color: red;' >O</strong> ¡Gana!";
      
    } else if (
      displayControlller.checkWinner("O") == undefined &&
      displayControlller.checkWinner("X") == undefined &&
      count == 9
    ) {
      h1.innerHTML = "¡Es un empate! ";
      h1.classList.add("showmsg")
    }
  };


  let hadleLogic = (e) => {
    if (document.getElementById("h1").classList.contains("showmsg") == false ) {
      let fisrtPosition = e.target.id[0];
      let secondPosition = e.target.id[1];
      document.getElementById("btn").addEventListener("click", ()=> clearTablero() )



      if (e.target.innerText === "") {
        let currentPlayer = displayControlller.currentPlayer.status
          ? displayControlller.p1.simbol
          : displayControlller.p2.simbol;
        tablero[fisrtPosition][secondPosition] = currentPlayer;
        e.target.innerText = currentPlayer;
        displayControlller.setCurrent();
        e.target.style.color = currentPlayer === "X" ? "red" : "black";
        count++;


      }

      printResult();
    }
  }


  let clearTablero = () => {
    
    tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
    
    let cuadros =  [...document.getElementsByClassName("cuadro")]
    document.getElementById("h1").classList.remove("showmsg") 
    cuadros.map((currentCuadro) => {
      currentCuadro.innerText = ""
    })




  }


  let drawPlayer = () => {
    document.getElementById("parent").addEventListener("click", (e) => {
      hadleLogic(e)
    });
  };

  return {
    displayControlller,
    tablero,
    drawPlayer,
    player,
  };
})();

game.drawPlayer();
