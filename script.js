function start()
{
  const bgSound = document.getElementById('bgSound');
  bgSound.volume = 0.5;
  bgSound.play();
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
    <div class="center">
      <h1 id="question"></h1>
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

    showMessage('Cuối tuần này đi xem phim với anh nhéee?😊💕', 'question')
  }, 500);
  
}

function showMessage(message, id)
{
  const textContainer = document.getElementById(id);  
  let index = 0;
  const speed = 50; // milliseconds per character
  function typeWriter() {
    if (index < message.length) {
      textContainer.textContent += message.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter(); // Start the effect
}

function sendLogMessage(mess)
{
  fetch('/log', {
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
  sendLogMessage("Da bam dong y =))");
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <h1>WOOHOOO!!! Vui quáaaaaaa😍</h1>
        <img src="woohoo.gif" style="max-width: 60%; height: auto;" />
        <h2>Chọn film thôiii</h2>
        <button id="dancing-button" onClick="chooseFilmClicked()">Chọn film</button>
      </div>
    `;
    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
    setInterval(randomFirework, 1500);
    // document.addEventListener('click', e => {
    //   createFirework(e.clientX, e.clientY);
    // });
  }, 500);

}

function chooseFilmClicked()
{
  sendLogMessage("Chon film roi nhe :v");
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <div id="gallery" class="image-grid">
          <img src="1.png" alt="Image 1" id="film1" onclick="ChosenFilm(1)">
          <img src="2.png" alt="Image 2" id="film2" onclick="ChosenFilm(2)">
          <img src="3.png" alt="Image 3" id="film3" onclick="ChosenFilm(3)">
          <img src="4.png" alt="Image 4" id="film4" onclick="ChosenFilm(4)">
        </div>
        <h3>
          Đây là 4 phim mà anh thấy đáng xem nhất nè.
          <br>Em hãy bấm vào ảnh để chọn bộ phim em thích nhé
          <br>Hoặc nếu em có đề xuất phim gì khác thì nhắn cho anh vào đây nha
          <input type="text" placeholder="Phim em đề xuất" id="film">
        </h3>
        <button class="purple_button" id="lastStepButton" onclick="lastStepClicked()">Last step</button>
        <h3 id="myRightPrediction" style="display: none;">
          <br>Đúmm ùyy! Anh biết là "Disney Princess" sẽ chọn Silo & Stitch mà 😎
          <br>
        </h3>
        <h3 id="myWrongPrediction" style="display: none;">
          <br>"Disney Princess" không chọn Silo & Stitch à =)))
        </h3>
        <script>
          const images = document.querySelectorAll('.image-grid img');

          images.forEach(img => {
            img.addEventListener('click', () => {
              // Remove 'selected' from all images
              images.forEach(i => i.classList.remove('selected'));
              // Add 'selected' to clicked image
              img.classList.add('selected');
              if (img.id == "film3"){
                document.getElementById("myRightPrediction").style.display = "block";
                document.getElementById("myWrongPrediction").style.display = "none";
              }
              else {
                document.getElementById("myWrongPrediction").style.display = "block";
                document.getElementById("myRightPrediction").style.display = "none";
              }
            });
          });
        </script>
      </div>
    `;
    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
  }, 1000);
}

function lastStepClicked()
{

}

function randomColor() {
  const colors = ['#ff4c4c', '#4cff4c', '#4c4cff', '#ffff4c', '#ff4cff', '#4cffff', '#ffffff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFirework(x, y) {
  const numParticles = 50; // More particles
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = randomColor();

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 200 + 100; // Bigger explosion radius
    const dx = Math.cos(angle) * distance + 'px';
    const dy = Math.sin(angle) * distance + 'px';
    particle.style.setProperty('--x', dx);
    particle.style.setProperty('--y', dy);

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1500);
  }
}

function randomFirework() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.7;
  createFirework(x, y);
}
