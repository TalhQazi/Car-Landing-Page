function showTab(index) {
  const tabs = document.querySelectorAll(".tab-button");
  tabs.forEach((tab, i) => {
    tab.classList.remove("active");
    tab.classList.remove("completed");
    if (i < index) {
      tab.classList.add("completed");
    }
  });

  tabs[index].classList.add("active");

  const panes = document.querySelectorAll(".tab-pane");
  panes.forEach((pane) => pane.classList.remove("active"));

  panes[index].classList.add("active");

  updateConnectingLine(index);
}

function updateConnectingLine(index) {
  const line = document.querySelector(".connecting-line");
  const tabs = document.querySelectorAll(".tab-button");
  const activeTab = tabs[index];
  const activeTabWidth = activeTab.offsetLeft + activeTab.offsetWidth / 2;
  const lineWidth =
    (activeTabWidth / document.querySelector(".tabs-navigation").offsetWidth) *
    100;
  line.style.width = lineWidth + "%";
}

showTab(0);

// faqs
document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const carWrapper = this.querySelector(".car-wrapper");
      const carIcon = this.querySelector(".car-icon");

      if (this.classList.contains("collapsed")) {
        carWrapper.style.transition = "none";
        carWrapper.style.width = "0";

        carIcon.style.transition = "none";
        carIcon.style.right = "-60px";

        setTimeout(() => {
          carWrapper.style.transition = "width 0.5s ease";
          carIcon.style.transition = "right 1.5s ease";

          carWrapper.style.width = "50px";
          carIcon.style.right = "0";
        }, 10);
      }
    });
  });
});

// form Js
function nextStep(step) {
  let contents = document.querySelectorAll(".step-content");
  contents.forEach((content) => content.classList.remove("active"));

  document.getElementById("step-" + step).classList.add("active");

  let steps = document.querySelectorAll(".step-indicator li");
  steps.forEach((item) => {
    item.classList.remove("active", "completed");

    let icon = item.querySelector(".bi-check");
    if (icon) {
      icon.remove();
    }
  });

  for (let i = 0; i < step - 1; i++) {
    steps[i].classList.add("completed");
    if (!steps[i].querySelector(".bi-check")) {
      steps[i].innerHTML += ` <i class="bi bi-check"></i>`;
    }
  }

  steps[step - 1].classList.add("active");

  let mobileSteps = document.querySelectorAll(
    ".mobile-progress .progress-step"
  );
  mobileSteps.forEach((item) => {
    item.classList.remove("active", "completed");

    let icon = item.querySelector(".bi-check");
    if (icon) {
      icon.remove();
    }
  });

  for (let i = 0; i < step - 1; i++) {
    mobileSteps[i].classList.add("completed");
    if (!mobileSteps[i].querySelector(".bi-check")) {
      mobileSteps[i].innerHTML = '<i class="bi bi-check text-dark"></i>';
    }
  }

  mobileSteps[step - 1].classList.add("active");
  mobileSteps[step - 1].innerHTML = "";
}

function validateStep(step) {
  let isValid = true;

  // Reset validation
  let labels = document.querySelectorAll(`#step-${step} .form-label`);
  labels.forEach((label) => label.classList.remove("error"));

  let inputs = document.querySelectorAll(
    `#step-${step} .form-control, #step-${step} .form-select`
  );
  inputs.forEach((input) => {
    input.classList.remove("is-invalid");
  });

  // Check each field in the current step
  document
    .querySelectorAll(`#step-${step} .form-control, #step-${step} .form-select`)
    .forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        input.classList.add("is-invalid");
        input.previousElementSibling.classList.add("error");
      } else if (input.type === "email") {
        // Email validation
        if (!validateEmail(input.value)) {
          isValid = false;
          input.classList.add("is-invalid");
          input.previousElementSibling.classList.add("error");
        }
      }
    });

  if (isValid) {
    nextStep(step + 1);
  }
}

function validateEmail(email) {
  // Regular expression for validating email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
