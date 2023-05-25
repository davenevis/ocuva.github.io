const terminalOutput = document.getElementById('terminal-output');
const terminalCursor = document.getElementById('terminal-cursor');
const commandTexts = ['run rootdecrypt.py', '...processing...', 'decryption successful', 'open davenevis.txt',];

const cursorBlinkDelay = 500; // Adjust the blinking delay as desired

let currentCommandIndex = 0;
let currentCharIndex = 0;
let isNewLine = true;

setInterval(toggleCursorVisibility, cursorBlinkDelay);

function toggleCursorVisibility() {
  terminalCursor.classList.toggle('cursor-visible');
}

function typeTerminalText() {
  if (currentCommandIndex < commandTexts.length) {
    const commandText = commandTexts[currentCommandIndex];

    if (currentCharIndex < commandText.length) {
      const char = commandText.charAt(currentCharIndex);

      if (isNewLine) {
        terminalOutput.innerHTML += `<span>${char}</span>`;
        isNewLine = false;
      } else {
        terminalOutput.lastElementChild.innerHTML += char;
      }

      currentCharIndex++;
      setTimeout(typeTerminalText, getRandomTypingDelay());
    } else {
      currentCommandIndex++;
      currentCharIndex = 0;
      isNewLine = true;
      terminalOutput.innerHTML += '<br>';
      if (currentCommandIndex === commandTexts.length) {
        revealProfileSection();
      } else {
        setTimeout(typeTerminalText, 500);
      }
    }
  } else {
    terminalCursor.style.display = 'none';
  }
}

function getRandomTypingDelay() {
  return Math.floor(Math.random() * 100) + 50;
}

function revealProfileSection() {
  const profileSection = document.querySelector('.profile-section');
  profileSection.classList.remove('hidden');

  profileSection.addEventListener('animationend', () => {
    revealPortfolioSection();
  }, { once: true });
}

function revealPortfolioSection() {
  const portfolioSections = document.querySelectorAll('.portfolio-section');
  portfolioSections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add('show');
    }, index * 1000); // Delay each section's animation by 1000ms (1 second)
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', revealPortfolioSection);
setTimeout(typeTerminalText, 1000);
