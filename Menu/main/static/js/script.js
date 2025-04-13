let tabcontents = document.getElementsByClassName('tab-content');

function opentab(arg) {
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove('active-tab'); // Remove active class from all tabs
    }
    document.getElementById(arg).classList.add('active-tab'); // Add active class to the clicked tab
}




const input = document.querySelector("#phone");
const button = document.querySelector("#btn");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
const iti = window.intlTelInput(input, {
  initialCountry: "us",
  loadUtils: () => import("/intl-tel-input/js/utils.js?1733756310855"),
});

const reset = () => {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

const showError = (msg) => {
  input.classList.add("error");
  errorMsg.innerHTML = msg;
  errorMsg.classList.remove("hide");
};

// on click button: validate
button.addEventListener('click', () => {
  reset();
  if (!input.value.trim()) {
    showError("Required");
  } else if (iti.isValidNumber()) {
    validMsg.classList.remove("hide");
  } else {
    const errorCode = iti.getValidationError();
    const msg = errorMap[errorCode] || "Invalid number";
    showError(msg);
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);