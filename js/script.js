const inputs = document.querySelectorAll(".input-wrapper input");
const showBtn = document.querySelectorAll(".show-btn");
const registerBtn = document.getElementById("register");
const modal = document.getElementById("modal");
const closeModalBtn = modal.querySelector(".close-modal");

inputs.forEach((e) =>
  e.addEventListener("blur", (e) => {
    if (e.target.type === "date") return;
    e.target.value
      ? e.target.classList.add("fill")
      : e.target.classList.remove("fill");
  })
);

showBtn.forEach((e) =>
  e.addEventListener("click", (e) => {
    if (!parseInt(e.target.dataset.visible)) {
      e.target.children[0].src = "./assets/visible.svg";
      e.target.parentElement.children[0].type = "text";
      e.target.dataset.visible = 1;
    } else {
      e.target.children[0].src = "./assets/visible-off.svg";
      e.target.parentElement.children[0].type = "password";
      e.target.dataset.visible = 0;
    }
  })
);

// register click event
registerBtn.addEventListener("click", (event) => {
  event.preventDefault(); //will delete soon
  let check = true;

  inputs.forEach((e) => {
    validate(e);
    if (e.classList.contains("err")) check = false;
  });
  const course = validateRadio();
  if (!course || !matchPassword()) check = false;
  if (!check) return;
  const data = collectData(course);
  console.log(JSON.stringify(data)); // <= anggap aja fetching
  modal.style.visibility = "visible";
  modal.children[0].classList.add("active");
});

[modal, closeModalBtn].forEach((e) => {
  e.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    modal.children[0].classList.remove("active");
  })
})

// functions
function validate(element) {
  const { name, value } = element;
  const errMsg = element.parentElement.querySelector(".err-msg");
  const regex = {
    name: /[A-z ]{1,64}/,
    email: /.{1,64}\@\w{1,64}\.\w{2,8}(\.\w{2,8})?$/,
    birthDay: /[\d\- ]+/,
    username: /.{3,64}/,
    password: /.{7,64}/,
  };

  if (name === "confirm-password") return;
  errorStyling(element, errMsg, regex[name].test(value));
}

function validateRadio() {
  const radioTitle = document.querySelector(".radio-title");
  const radioValue = document.querySelector('input[type="radio"]:checked');
  !radioValue
    ? radioTitle.classList.add("err")
    : radioTitle.classList.remove("err");
  return radioValue?.value;
}

function matchPassword() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const errMsg = confirmPassword.parentElement.querySelector(".err-msg");
  const res = password.value === confirmPassword.value ? true : false;

  errorStyling(confirmPassword, errMsg, res);
  return res;
}

function collectData(course) {
  let obj = new Object();
  inputs.forEach((e) => {
    if (e.name === "confirm-password") return;
    obj[e.name.toLowerCase()] = e.value;
  });
  obj["course"] = course;
  return obj;
}

function errorStyling(element, errMsg, boolean) {
  if (!boolean) {
    element.classList.add("err");
    errMsg.style.visibility = "visible";
  } else {
    element.classList.remove("err");
    errMsg.style.visibility = "hidden";
  }
}
