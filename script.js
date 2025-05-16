const gameURLs = {
  button1: "https://serve.gamejolt.net/f9bc1ddee8f9a3610bbe5df0f1507ec11cf22763de8b254884a7705db57cfefa,1747464806,7/data/games/15/177/956177/files/6787d14f5ab77/index.html?gjapi_username=Goldcrescent&gjapi_token=WAyjCh"
  button2: "https://serve.gamejolt.net/7c544f49db4281753885287a298e8f94e288217c4906ff89c18691656d013d74,1747464755,7/data/games/15/10/990760/files/68174664c85f3/index.html?gjapi_username=Goldcrescent&gjapi_token=WAyjCh"
  button3: "https://serve.gamejolt.net/911317fd8a72d81cf6e56e81a3fe02d97f6979f3ef77ac736df94525e710099b,1747464999,7/data/games/14/21/922021/files/66d562413e719/index.html?gjapi_username=Goldcrescent&gjapi_token=WAyjCh"
}

const gameWindows = {};

function openGame(url, key) {
  if (gameWindows[key] && !gameWindows[key].closed) {
    gameWindows[key].focus();
    return;
  }

  const gameWin = window.open();
  gameWin.document.body.style.margin = '0';
  gameWin.document.body.style.height = '100vh';

  const iframe = gameWin.document.createElement('iframe');
  iframe.style = 'border:none;width:100%;height:100%;margin:0;';
  iframe.src = url;

  gameWin.document.body.appendChild(iframe);

  const checker = setInterval(() => {
    if (gameWin.closed) {
      clearInterval(checker);
      gameWindows[key] = null;
    }
  }, 500);

  gameWindows[key] = gameWin;
}

// Auto attach click listeners
for (const [buttonId, url] of Object.entries(gameURLs)) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => openGame(url, buttonId));
  }
}
