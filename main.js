import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

// document.querySelector('body').addEventListener('mousemove', (event) => {

// let x = event.clientX;
// let y = event.clientY;

// let coordinateX = x;
// let coordinateY = y;

// document.querySelector('#positionX').value = coordinateX;
// document.querySelector('#positionY').value = coordinateY;
// });

//Selecting necessary Dom elements
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

//variables to store generated captcha
let captchaText = null;
//function to generate captcha
const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const changeString = randomStringArray.map((char) => (
        Math.random() > 0.5 ? char.toUpperCase() : char)
    );
    captchaText = changeString.join(" ");
    captchaTextBox.value = captchaText;
    console.log(captchaText);
};

const refreshBtnClick = () => {
    generateCaptcha();
    captchaInputBox.value = "";
    captchaKeyUpValidate();
}
const captchaKeyUpValidate = () => {
    submitButton.classList.toggle("disabled", !captchaInputBox.value);
    if (!captchaInputBox.value) message.classList.remove('active');
}
//function to validate the entered captcha value
const submitBtnClick = () => {
    captchaText = captchaText
        .split("")
        .filter((char) => char !== " ")
        .join("");
    message.classList.add("active");
    //test if the captcha is correct or not
    if (captchaInputBox.value == captchaText) {
        message.innerText = "Entered captcha is correct";
        message.style.color = "#826afb";
    } else {
        message.innerText = "Entered captcha is not correct";
        message.style.color = "#ff2525"
    }
};
//add event listener for refresh button 
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);
//generate a captcha when page loads
generateCaptcha();
