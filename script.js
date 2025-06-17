let logAddress = 'http://157.245.156.135:3000/log';

const bgSound = document.getElementById('bgSound');
const yesSound = document.getElementById('yesSound');

function start()
{
  sendLogMessage("Bat dau thoi")
  yesSound.volume = 0.5;
  bgSound.volume = 0.5;
  yesSound.pause();
  bgSound.play();
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
    <div class="center">
      <h1 id="question"></h1>

    </div>
    <button class="yes" onclick="yesBtnClicked()">Điiiiiii 💖</button>
    <button id="evil-button">Không 🙈</button>
    <div class="reaction" id="reaction" style="display: none;">
      <h3 style="margin-top: 0;">
        <br>Hint: Đuổi nó theo chiều ngang ấy
        <br>Cơ mà để từ chối thì phải bấm đủ 10 lần cơ 😏
      </h3>
    </div>
    <div class="reaction" id="reactionDisapointed" style="display: none;">
      <h3 style="margin-top: 0;">
        <img id="disapointGIF" src="disappointed-disappointed-fan.gif" width="300px">
      </h3>
    </div>
    
    `;

    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
    const evilButton = document.getElementById('evil-button');
    const shock = document.getElementById('shock');
    const runWhy = document.getElementById('runWhy');
    const runBaTan = document.getElementById('runBaTan');
    const runaway = document.getElementById('runaway');
    const quark = document.getElementById('quark');
    const OFFSET = 20
    let move_count = 0
    let clicked_count = 0
    evilButton.addEventListener('click', () => {
      clicked_count += 1;
      sendLogMessage(`Tu choi (${clicked_count})`)
      if(clicked_count % 5 == 1) {
        document.getElementById("reaction").style.display = "block";
        evilButton.innerText = `Uầyyy 😱 ${clicked_count}`;
        shock.play();
      }
      else if(clicked_count % 5 == 2) {
        evilButton.innerText = `Đừngg 🫣 ${clicked_count}`;
        runBaTan.play();
      }
      else if(clicked_count % 5 == 3) {
        evilButton.innerText = `Xin đấy😣 ${clicked_count}`;
        runWhy.play();
      }
      else if(clicked_count % 5 == 4) {
        evilButton.innerText = `Hoyyy 😫 ${clicked_count}`;
        runaway.play();
      }
      else if(clicked_count % 5 == 0) {
        evilButton.innerText = `Chịu ời 🤦‍♂️ ${clicked_count}`;
        quark.play();
      }
      else {
        evilButton.innerText = `Chịu ời 🤦‍♂️ ${clicked_count}`;
        quark.play();
      }

      if (clicked_count == 10) {
        document.getElementById("reaction").style.display = "none";
        document.getElementById("reactionDisapointed").style.display = "block";
      }
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

    showMessage('Bùi Khánh Hương<br>Cuối tuần này đi xem phim với anh nhéee?😊💕', 'question')
  }, 1000);
  
}

function showMessage(message, id)
{
  const textContainer = document.getElementById(id);  
  let index = 0;
  const speed = 50; // milliseconds per character
  let html = '';
  function typeWriter() {
    if (index < message.length) {
      html += message[index];
      textContainer.innerHTML = html;
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter(); // Start the effect
}

function sendLogMessage(mess)
{
  fetch(logAddress, {
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

let fireworkIntervalID = 0;

function yesBtnClicked()
{
  sendLogMessage("Da bam dong y =))");
  bgSound.pause();
  yesSound.play();
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <h1>Vuiii quáaaaaaaa😍</h1>
        <img src="woohoo.gif" style="max-width: 60%; height: auto;" />
        <h2>Chọn film thôiii</h2>
        <button id="dancing-button" onClick="chooseFilmClicked()">Chọn film</button>
      </div>
    `;
    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
    fireworkIntervalID = setInterval(randomFirework, 1500);
    document.addEventListener('click', e => {
      createFirework(e.clientX, e.clientY);
    });
  }, 1000);

}

let has_chose_film = false;
function chooseFilmClicked()
{
  sendLogMessage("Chon film roi nhe :v");
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <div id="gallery" class="image-grid">
          <img src="1.png" alt="Image 1" id="film1" name="Doraemon">
          <img src="2.png" alt="Image 2" id="film2" name="Mission Imposible">
          <img src="3.png" alt="Image 3" id="film3" name="Stitch">
          <img src="4.png" alt="Image 4" id="film4" name="Ballerina">
        </div>
        <h3 id="choose_film_guide">
        </h3>
        <button class="purple_button" id="lastStepButton" onclick="lastStepClicked()">Next</button>
        <h3 id="myRightPrediction" style="display: none;">
          <br>Đúmm ùyy! Anh biết là "Disney Princess" sẽ chọn Lilo & Stitch mà 😎
          <br>
        </h3>
        <h3 id="myWrongPrediction" style="display: none;">
          <br>"Disney Princess" không chọn Lilo & Stitch à, chọn điii anh cũng thích phim đấy =))) 
        </h3>
        <h3 id="alertHasNotChoseFilmText" style="display: none;">
          <br>Em chưa chọn film mà
        </h3>
      </div>
    `;

    const images = document.querySelectorAll('.image-grid img');
    images.forEach(img => {
      img.addEventListener('click', () => {
        has_chose_film = true;
        sendLogMessage("Da chon " + img.name)
        // Remove 'selected' from all images
        images.forEach(i => i.classList.remove('selected'));
        // Add 'selected' to clicked image
        img.classList.add('selected');
        if (img.id == "film3"){
          document.getElementById("myRightPrediction").style.display = "block";
          document.getElementById("myWrongPrediction").style.display = "none";
          document.getElementById("alertHasNotChoseFilmText").style.display = "none";
        }
        else {
          document.getElementById("myWrongPrediction").style.display = "block";
          document.getElementById("myRightPrediction").style.display = "none";
          document.getElementById("alertHasNotChoseFilmText").style.display = "none";
        }
      });
    });

    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');

    let currentIndex = 0;
    function showImage() {
      if (currentIndex < images.length) {
        images.forEach((img,i) => {
          if (i === currentIndex) {
            img.style.opacity = 1;
          }
        });
        currentIndex++;
        setTimeout(showImage, 600);
      }
    }
    setTimeout(showImage, 1000);
    showMessage('4 phim mà anh thấy đáng xem nhất nè<br>Em bấm vào ảnh để chọn phim em thích nhé<br>Hoặc nếu em có đề xuất phim gì khác thì nhắn cho anh vào đây nha<input type="text" placeholder="Phim đề xuất" id="filmInput">', "choose_film_guide");
  }, 1000);
}

function lastStepClicked()
{
  let proposalFilm = document.getElementById("filmInput").value
  if (has_chose_film || proposalFilm)
  {
    if (proposalFilm)
      sendLogMessage("De xuat phim: " + proposalFilm)
    sendLogMessage("Last step rui ne =))");
    document.getElementById("main").classList.remove('fade-in');
    document.getElementById("main").classList.add('fade-out');
    setTimeout(() => {
      document.getElementById("main").innerHTML = `
        <div class="center">
          <img src="schedule.png" style="max-width: 100%; height: auto;"></img>
          <h3 style="margin: 0%;">
            0986774116
          </h3>
          <p style="margin: 0; color: #7d3eb1">
            Không phải "đào lửa" đâu, số của anh đấy nên đừng chặn nhá, bị anh gọi cũng đừng giật mình :v
            <br>Còn nếu em có gì muốn nhắn gì cho anh thì text dưới đây nhen.
          </p>
          <textarea id="autoResizeTextarea" placeholder="Lời nhắn ..."></textarea>
          <br><button class="purple_button" onClick="finish()">Done</button>
        </div>
      `;
      const textarea = document.getElementById('autoResizeTextarea');
      textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset height
        this.style.height = this.scrollHeight + 'px'; // Set to scroll height
      });
      document.getElementById("main").classList.remove('fade-out');
      document.getElementById("main").classList.add('fade-in');
    }, 1000);
  }
  else
  {
    document.getElementById("alertHasNotChoseFilmText").style.display = "block";
  }
}

function finish()
{
  let lastMessage = document.getElementById("autoResizeTextarea").value;
  if (lastMessage)
    sendLogMessage("Last message: " + lastMessage);
  sendLogMessage("Finish roi, done bro.");
  yesSound.pause();
  bgSound.pause();
  yesSound.currentTime = 0;
  bgSound.currentTime = 0;
  document.getElementById("main").classList.remove('fade-in');
  document.getElementById("main").classList.add('fade-out');
  setTimeout(() => {
    document.getElementById("main").innerHTML = `
      <div class="center">
        <img src="start1.png" alt="start" class="zoom-image" onclick="start()" width="300" height="300">
        <h1 style="color: #7d3eb1;">Bắt đầu</h1>
      </div>
    `;
    document.getElementById("main").classList.remove('fade-out');
    document.getElementById("main").classList.add('fade-in');
    clearInterval(fireworkIntervalID);
    fireworkIntervalID = null;
    document.addEventListener('click', e => {});
  }, 1000);
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
