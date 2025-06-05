function start()
{
  const bgSound = document.getElementById('bgSound');
  bgSound.volume = 0.5;
  bgSound.play();
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
    <div class="center">
      <h1>Cuối tuần này đi xem phim zới tui hong?😊💕</h1>
      <div class="reaction" id="reaction" style="display: none;">
        <img src="meme.png" alt="Sad Reaction" />
        <div class="reaction-message">Đuổi nó theo chiều ngang ấy.</div>
        <div class="reaction-message">Cơ mà để từ chối thì phải bấm đủ 10 cơ :v</div>
      </div>
    </div>
    <button class="yes" onclick="yesBtnClicked()">Điiiiiii 💖</button>
    <button id="evil-button">Không 🙈</button>
    `;

    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
    const evilButton = document.getElementById('evil-button');
    const noSound = document.getElementById('noSound');
    const OFFSET = 20
    let move_count = 0
    let clicked_count = 0
    evilButton.addEventListener('click', () => {
      clicked_count += 1
      noSound.play()
    })
  
    document.addEventListener('mousemove', (e) => {
      const x = e.pageX
      const y = e.pageY
      const buttonBox = evilButton.getBoundingClientRect()
      const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
      const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
      const horizontalOffset = buttonBox.width / 2 + OFFSET
      const verticalOffset = buttonBox.height / 2 + OFFSET
      if (Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset) {
        move_count += 1
        console.log("count = ", move_count)
        if (move_count > 100) {
          document.getElementById("reaction").style.display = "block";
        }
        setButtonPosition(
          buttonBox.x + horizontalOffset / horizontalDistanceFrom * 5,
          buttonBox.y + verticalOffset / verticalDistanceFrom * 5
        )
      }
    })
  
    function setButtonPosition(left, top) {
      const windowBox = document.body.getBoundingClientRect()
      const buttonBox = evilButton.getBoundingClientRect()
  
      if(distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - OFFSET
      }
      if(distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + OFFSET
      }
      if(distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
        top = windowBox.bottom - buttonBox.height - OFFSET
      }
      if(distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
        top = windowBox.top + OFFSET
      }
  
      evilButton.style.left = `${left}px`
      evilButton.style.top = `${top}px`
    }
  
    function distanceFromCenter(boxPosition, mousePosition, boxSize) {
      return boxPosition - mousePosition + boxSize / 2
    }
  }, 500);
  
}

function sendLogMessage(mess)
{
  fetch('http://localhost:3000/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: mess
    })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
  });
}

function yesBtnClicked()
{
  sendLogMessage("Yeahhhhhhhhhh, She agreed!!");
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <h1>Yayyyy! 💃 Không biết nói gì hơn, quá xúc động!!! 😍</h1>
        <img src="https://media.giphy.com/media/l0MYLzQ3G9D1pTfOQ/giphy.gif" alt="Happy Dance" style="max-width: 100%; height: auto;" />
      </div>
    `;
    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
  }, 500);

}
