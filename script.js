const gameURLs = {
  button1: ""
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
