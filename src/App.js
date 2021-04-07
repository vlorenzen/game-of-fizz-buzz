import { useState } from "react";
import "./App.css";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [currentUserPC, setCurrentUserPC] = useState(false);
  const [input, setInput] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [output, setOutput] = useState([]);

  const fizzValue = 3;
  const buzzValue = 5;
  const score = localStorage.getItem("LastGameScore");
  const highScore = localStorage.getItem("HighScore");

  const whatIsCurrentNumber = () => {
    const isNumberDivisible = (dividend, divisor) => dividend % divisor === 0;
    let isFizz = isNumberDivisible(currentNumber, fizzValue);
    let isBuzz = isNumberDivisible(currentNumber, buzzValue);

    if (isFizz || isBuzz) {
      let outputString = "";
      if (isFizz) {
        outputString += "Fizz";
      }
      if (isBuzz) {
        outputString += "Buzz";
      }
      return outputString;
    } else {
      //Not a Fizz / Buzz number
      return false;
    }
  };

  const handleNextPlayer = () => {
    setCurrentUserPC(!currentUserPC);
    setCurrentNumber(currentNumber + 1);
  };

  const handleGameOver = () => {
    // if you failed we count the points earned and save it to localStorage and humiliate you.
    let points = currentNumber - 1;

    if (points > highScore) {
      localStorage.setItem("HighScore", points);
      setOutput([`Game Over!You earned ${points} points, a new high score!`]);
    } else {
      setOutput([`Game Over! You earned ${points} points.`]);
    }

    localStorage.setItem("LastGameScore", points);
    setGameStarted(false);
  };

  const handleUserCommands = (e) => {
    e.preventDefault();
    let fizzOrBuzz = whatIsCurrentNumber();
    let inputUpperCase = input.toUpperCase();

    if (gameStarted) {
      // If we have started a game we only need to keep track if input matching our rules.
      if (fizzOrBuzz) {
        //Current Number is a fizz / buzz number

        if (inputUpperCase === fizzOrBuzz.toUpperCase()) {
          setOutput([...output, fizzOrBuzz]);
          handleNextPlayer();
        } else {
          handleGameOver();
        }
      } else {
        // Current Number is normal number

        if (input - 0 === currentNumber) {
          setOutput([...output, input]);
          handleNextPlayer();
        } else {
          handleGameOver();
        }
      }
    } else {
      // If we are not playing we are watching for the allowable commands.

      switch (inputUpperCase) {
        case "START":
          setGameStarted(true);
          setCurrentUserPC(Math.random() < 0.5);
          setCurrentNumber(1);
          setOutput(["Waiting for user input.."]);
          break;
        case "SCORE":
          setOutput([`Last game you manage a measly ${score} points.`]);
          break;
        case "HIGHSCORE":
          setOutput([`Currently highest score is ${highScore} points.`]);
          break;
        case "RULES":
        case "EXIT":
          setGameStarted(false);
          setOutput([]);
          break;
        default:
          setOutput([`Invalid command.`]);
      }
    }
    setInput("");
  };

  if (gameStarted && currentUserPC) {
    // Computers 'moves' made here.. All Hail Our Computer Overlords!
    let fizzOrBuzz = whatIsCurrentNumber();

    if (currentNumber === 1) {
      setOutput([currentNumber]);
    } else {
      if (fizzOrBuzz) {
        setOutput([...output, fizzOrBuzz]);
      } else {
        setOutput([...output, currentNumber]);
      }
    }

    handleNextPlayer();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the game of FizzBuzz!</h1>
      </header>
      <main>
        {gameStarted || output.length > 0 ? (
          <ul className="App-chat">
            {output.map((out, index) => (
              <li key={index}>{out}</li>
            ))}
          </ul>
        ) : (
          <>
            <h3>Rules:</h3>
            <ul>
              <li>Counting starts from 1.</li>
              <li>Players take turns incrementing the number by 1.</li>
              <li>
                If the number is divisible by 3, replace the number with the
                word 'Fizz'.
              </li>
              <li>
                If the number is divisible by 5, replace the number with the
                word 'buzz'.
              </li>
              <li>
                If the number is divisible by both, write the word 'FizzBuzz'.
              </li>
            </ul>
            To start a new game, type <em>'start'</em>.
            <br />
            To check the previous score, type <em>'score'</em>.
            <br />
            To check the current highscore, type <em>'highscore'</em>.
            <br />
            To see the rules type <em>'rules'</em>.
            <br />
          </>
        )}
      </main>
      <form
        className="App-user-input"
        onSubmit={(e) => handleUserCommands(e)}
        autoComplete="off"
      >
        <input
          type="text"
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          size="8"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
