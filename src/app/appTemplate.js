// src/app/appTemplate.js
const appTemplate = `
<div class="score">
  <div class="final-scoree">
    <span id="player-score">0</span>
    <p>-</p>
    <span id="computer-score">0</span>
  </div>
  <div class="names">
    <div class="user">USER</div>
    <div class="computer">PC</div>
  </div>
</div> 
<div class="mid-game">
  <div id="result" class="hidden"></div>
  <div id="choices-container" class="hidden">
    <button id="rock" class="choice-button"></button>
    <button id="paper" class="choice-button"></button>
    <button id="scissors" class="choice-button"></button>
  </div>
  <p id="countdown" class="hidden"></p>
</div>
<button id="play-button">JUGAR</button>
<div class="whatsnext hidden">
  <button id="next-round-button" class="hidden">SIGUIENTE RONDA</button>
</div>
<div class="restart-btnplace">
  <button id="retry-button" class="hidden">REINICIAR</button>
</div>
`;

export default appTemplate;
