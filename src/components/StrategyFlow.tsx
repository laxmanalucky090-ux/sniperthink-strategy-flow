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

    // Card content: title & description
    card.innerHTML = `
      <h2>Step ${index + 1}: ${step.title}</h2>
      <p>${step.description}</p>
      <input type="text" placeholder="Enter Name" class="name-input" />
      <input type="email" placeholder="Enter Email" class="email-input" />
      <button class="interest-btn">I'm Interested</button>
    `;

    const button = card.querySelector(".interest-btn") as HTMLButtonElement;
    const nameInput = card.querySelector(".name-input") as HTMLInputElement;
    const emailInput = card.querySelector(".email-input") as HTMLInputElement;

    // Click handler
    button.onclick = async () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (!name || !email) {
        alert("Please enter both name and email!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, step: step.title }),
        });

        if (response.ok) {
          alert("Interest submitted successfully!");
          // Optional: clear inputs after submit
          nameInput.value = "";
          emailInput.value = "";
        } else {
          alert("Failed to submit. Try again.");
        }
      } catch (error) {
        console.error(error);
        alert("Error submitting interest. Check console.");
      }
    };

    container.appendChild(card);
  });

  // Scroll-based progress bar
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

  return container;
}

export default StrategyFlow;