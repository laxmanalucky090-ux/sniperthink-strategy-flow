import { strategySteps } from "../data/strategyData";

function StrategyFlow() {
const container = document.createElement("div");
container.className = "strategy-container";

// Progress bar
const progress = document.createElement("div");
progress.className = "progress-bar";
container.appendChild(progress);

strategySteps.forEach((step, index) => {
const card = document.createElement("div");
card.className = "step-card";

card.innerHTML = `
  <h2>Step ${index + 1}: ${step.title}</h2>
  <p>${step.description}</p>

  <input type="text" placeholder="Enter Name" class="name-input" />
  <input type="email" placeholder="Enter Email" class="email-input" />

  <button class="interest-btn">I'm Interested</button>
  <p class="message"></p>
`;

const button = card.querySelector(".interest-btn") as HTMLButtonElement;
const nameInput = card.querySelector(".name-input") as HTMLInputElement;
const emailInput = card.querySelector(".email-input") as HTMLInputElement;
const message = card.querySelector(".message") as HTMLElement;

// Button click
button.onclick = async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    message.textContent = "Please enter name and email.";
    message.style.color = "red";
    return;
  }

  // Loading state
  button.textContent = "Submitting...";
  button.disabled = true;
  message.textContent = "";

  try {
    const response = await fetch("http://localhost:5000/api/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        step: step.title
      })
    });

    if (response.ok) {
      message.textContent = "Submitted successfully!";
      message.style.color = "green";

      nameInput.value = "";
      emailInput.value = "";
    } else {
      message.textContent = "Submission failed. Try again.";
      message.style.color = "red";
    }

  } catch (error) {
    console.error(error);
    message.textContent = "Server error. Please try later.";
    message.style.color = "red";
  }

  button.textContent = "I'm Interested";
  button.disabled = false;
};

container.appendChild(card);

});

// Scroll progress animation
window.addEventListener("scroll", () => {
const scrollTop = document.documentElement.scrollTop;
const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled = (scrollTop / height) * 100;

const bar = document.querySelector(".progress-bar") as HTMLElement;
if (bar) {
  bar.style.width = scrolled + "%";
}

});

// Step animation when entering viewport
const cards = container.querySelectorAll(".step-card");

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
(entry.target as HTMLElement).classList.add("show");
}
});
});

cards.forEach((card) => {
observer.observe(card);
});

return container;
}

export default StrategyFlow;