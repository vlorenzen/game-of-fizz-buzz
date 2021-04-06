import { useState } from "react";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the game of FizzBuzz!</h1>
      </header>
      <main>
        {gameStarted ? (
          <ul className="App-chat">
            <li>1</li>
            <li>2</li>
            <li>Fizz</li>
            <li>4</li>
            <li>Buzz</li>
            <li>Fizz</li>
            <li>7</li>
            <li>8</li>
            <li>Fizz</li>
            <li>Buzz</li>
            <li>11</li>
            <li>Fizz</li>
            <li>13</li>
            <li>14</li>
            <li>FizzBuzz</li>
          </ul>
        ) : (
          <>
            <h3>Rules:</h3>
            <ul>
              <li>Counting starts from 1.</li>
              <li>Players take turns incrementing the number by 1.</li>
              <li>
                If the number is divisible by 3, replace the number with the
                word "Fizz".
              </li>
              <li>
                If the number is divisible by 5, replace the number with the
                word "buzz".
              </li>
              <li>
                If the number is divisible by both, write the word "FizzBuzz".
              </li>
            </ul>
            To start a new game, type <em>"start"</em>.
            <br />
            To check the previous score, type <em>"score"</em>.
            <br />
            To check the current highscore, type <em>"highscore"</em>.
            <br />
            To see the rules type <em>"rules"</em>.
            <br />
          </>
        )}
      </main>
      <form className="App-user-input">
        <input type="text"></input>
        <button>send</button>
      </form>
    </div>
  );
};

export default App;
