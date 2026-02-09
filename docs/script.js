let count = 0;
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const endMsg = document.getElementById('endMsg');
const hearts = document.getElementById('hearts');
const mainGif = document.getElementById('mainGif');

function swapButtons(clickedBtn, otherBtn, sizes) {
  clickedBtn.textContent = sizes.currentLabel;
  clickedBtn.className = sizes.currentClass;
  otherBtn.textContent = sizes.otherLabel;
  otherBtn.className = sizes.otherClass;
}

function handleClick(btnType) {
  count++;
  if (count < 5) {
    if(btnType === 'no') {
      swapButtons(noBtn, yesBtn, {
        currentLabel: count === 1 ? 'Yes' :
                      count === 2 ? 'Big Yes' :
                      count === 3 ? 'Big Big Yes' : 'Big Yes',
        currentClass: count === 1 ? 'yes big' :
                      count === 2 ? 'yes bigbig' :
                      count === 3 ? 'yes bigbig' : 'yes big',
        otherLabel: 'No',
        otherClass: 'no'
      });
    } else {
      swapButtons(yesBtn, noBtn, {
        currentLabel: count === 2 ? 'Big Yes' :
                      count === 3 ? 'Big Big Yes' : 'Yessss!!',
        currentClass: count === 2 ? 'yes big' :
                      count === 3 ? 'yes bigbig' : 'yes big',
        otherLabel: 'No',
        otherClass: 'no'
      });
    }
  } else if (count === 5) {
    let clicked, other;
    if (btnType === 'yes') {
      clicked = yesBtn;
      other = noBtn;
    } else {
      clicked = noBtn;
      other = yesBtn;
    }
    clicked.textContent = "Big Big Big Yes!";
    clicked.className = "yes bigbigbig";
    other.style.display = 'none';
    clicked.blur();
    setTimeout(() => {
      document.querySelector('.buttons').style.display = 'none';
      question.style.display = 'none';
      mainGif.style.display = 'none'; // Hide the main GIF on last page
      endMsg.style.display = 'block';
      releaseHearts();
    }, 1000); // 1 second delay
  }
}

yesBtn.onclick = () => handleClick('yes');
noBtn.onclick = () => handleClick('no');

function createHeart(x) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = x + 'px';
  heart.style.bottom = '0px';
  heart.innerHTML = `
    <svg viewBox="0 0 32 29.6">
      <path d="M23.6,0c-2.8,0-5.4,1.9-7.6,5-2.2-3.1-4.8-5-7.6-5C3.1,0,0,3.1,0,7c0,6.7,16,22.6,16,22.6S32,13.7,32,7
        C32,3.1,28.9,0,23.6,0z" fill="#ff4d88"/>
    </svg>
  `;
  hearts.appendChild(heart);
  const drift = (Math.random() - 0.5) * 200;
  heart.animate([
    { transform: `translateY(0) translateX(0) scale(1)`, opacity: 1 },
    { transform: `translateY(-600px) translateX(${drift}px) scale(1.5)`, opacity: 0 }
  ], {
    duration: 2000,
    fill: 'forwards'
  });
  setTimeout(() => heart.remove(), 2200);
}
function releaseHearts() {
  const width = document.body.offsetWidth;
  let nums = 30;
  for (let i = 0; i < nums; i++) {
    setTimeout(() => {
      let left = Math.random() * (width - 40);
      createHeart(left);
    }, i * 100);
  }
}
