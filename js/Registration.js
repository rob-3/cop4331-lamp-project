/* Splash Screen Loading */
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{

                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        },2000);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        },2800);



    })
})

 
/* Other Functions */
function passwordRequirements(password) {
    let upperCase = false;
    let lowerCase = false;
    let passwordNumber = false;
    let passwordLength = false;
  
    if (password.length >= 8) {
      passwordLength = true;
    }
  
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        passwordNumber = true;
      } else if (password[i].toUpperCase() === password[i]) {
        upperCase = true;
      } else if (password[i].toUpperCase() !== password[i]) {
        lowerCase = true;
      }
    }
  
    if (passwordLength && passwordNumber && upperCase && lowerCase) {
      return true;
    } else {
      return false;
    }
  }
  
  async function doRegister() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let login = document.getElementById("registerName").value;
    let password = document.getElementById("registerPassword").value;
  
    if (passwordRequirements(password)) {
      const data = await fetch("/api/Register.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password,
          firstName,
          lastName,
        }),
      }).then((b) => b.json());
      if (data.result) {
        console.log("Account created successfully!");
        window.location.href = "index.html";
      } else {
        console.log(data.error);
        var test = document.getElementById('error');
          if(!test){
          document.getElementById('noerror').id = 'error';
          }
        const text = document.getElementById('error');
        text.textContent = "Error: Username already taken";      
      }
    } else {
        console.log("Password must meet all requirements!");
        var test = document.getElementById('error');
        if(!test){
            document.getElementById('noerror').id = 'error';                  
        }
        const text = document.getElementById('error');
        text.textContent = "Error: Please check your password requirements";   
    }
  }
  document.querySelector("#registerButton").addEventListener("click", doRegister);
  
