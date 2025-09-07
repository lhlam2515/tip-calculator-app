const form = document.getElementById("tip-form");
const tipSelector = form.querySelector(".tip-selector");
const tipButtons = tipSelector.querySelectorAll("button");
const customTipInput = tipSelector.querySelector("input");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalPerPersonDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");

const getTipPercentage = () => {
  let percentage = 0;

  tipButtons.forEach((button) => {
    if (button.ariaSelected === "true") {
      percentage = parseInt(button.value) / 100;
    }
  });

  if (customTipInput.value) {
    percentage = parseInt(customTipInput.value) / 100;
  }

  return percentage;
};

const calculateTip = (billAmount, tipPercentage, numberOfPeople) => {
  if (billAmount && tipPercentage && numberOfPeople) {
    const tipPerPerson = (billAmount * tipPercentage) / numberOfPeople;
    const totalPerPerson = billAmount / numberOfPeople + tipPerPerson;

    return { tipPerPerson, totalPerPerson };
  }

  return { tipPerPerson: 0, totalPerPerson: 0 };
};

const updateDisplay = () => {
  const billAmount = parseFloat(form.bill.value) || 0;
  const numberOfPeople = parseInt(form.people.value) || 0;
  const tipPercentage = getTipPercentage();

  const { tipPerPerson, totalPerPerson } = calculateTip(
    billAmount,
    tipPercentage,
    numberOfPeople
  );

  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

  resetButton.disabled = tipPerPerson === 0 && totalPerPerson === 0;
};

form.addEventListener("input", updateDisplay);
form.addEventListener("click", updateDisplay);

tipSelector.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const buttons = tipSelector.querySelectorAll("button");
  const customInput = tipSelector.querySelector("input");

  buttons.forEach((button) => {
    button.ariaSelected = "false";
  });
  event.target.ariaSelected = "true";
  customInput.value = "";
});

tipSelector.addEventListener("input", (event) => {
  if (event.target.tagName !== "INPUT") return;

  const buttons = tipSelector.querySelectorAll("button");

  if (event.target.tagName === "INPUT") {
    buttons.forEach((button) => {
      button.ariaSelected = "false";
    });
  }
});

resetButton.addEventListener("click", () => {
  form.reset();

  tipButtons.forEach((button) => {
    button.ariaSelected = "false";
  });
  customTipInput.value = "";

  tipAmountDisplay.textContent = "$0.00";
  totalPerPersonDisplay.textContent = "$0.00";
  resetButton.disabled = true;
});
