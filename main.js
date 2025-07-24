let correctClicked = 0;
const items = document.querySelectorAll('.item');
const result = document.getElementById('result');
const clickSound = document.getElementById('clickSound');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

items.forEach(item => {
  item.addEventListener('click', () => {
    // Reset semua sound biar gak tabrakan
    clickSound.pause();
    correctSound.pause();
    wrongSound.pause();
    clickSound.currentTime = 0;
    correctSound.currentTime = 0;
    wrongSound.currentTime = 0;

    clickSound.play().catch(e => console.warn('Click sound blocked:', e));

    if (item.dataset.correct === "true" && !item.classList.contains('clicked')) {
      item.classList.add('clicked');
      item.style.backgroundColor = "#f9d5e5";

      correctSound.play().catch(e => console.warn('Correct sound blocked:', e));
      correctClicked++;

      if (correctClicked === 4) {
        result.innerHTML = `
          <div class="instruction" style="margin-top: 20px;">
            You're great! 💖<br/><br/>
            Here's the key to open the surprise:<br/><br/>
            <strong>Username:</strong> cipaacantik<br/>
            <strong>Password:</strong> myonlyonecipa<br/><br/>
            <a href="login.html" style="color: #4d2c2c; text-decoration: underline;">Go to Login Page ➜</a>
          </div>
        `;

        // CONFETTI saat berhasil
        startConfetti(); // ➕ manggil confetti di sini
      }
    } else if (!item.classList.contains('clicked')) {
      item.classList.add('wrong');

      wrongSound.play().catch(e => console.warn('Wrong sound blocked:', e));
      setTimeout(() => item.classList.remove('wrong'), 400);
    }
  });
});

// Background love animation
function createLove() {
  const love = document.createElement('div');
  love.classList.add('love');
  love.style.left = `${Math.random() * 100}%`;
  love.style.animationDuration = `${3 + Math.random() * 2}s`;
  love.innerText = '💕';
  document.querySelector('.background-loves').appendChild(love);
  setTimeout(() => love.remove(), 5000);
}

setInterval(createLove, 300);