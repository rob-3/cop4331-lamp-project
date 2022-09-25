async function doLogin() {
  const username = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;

  const data = await fetch("/api/Login.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((b) => b.json());
  if (data.result) {
    console.log(
      "Your name is " +
        data.user.firstName +
        " " +
        data.user.lastName +
        " and you have logged in."
    );
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = "LandingPage.html";
  } else console.log(data.error);
}

function doLogout() {
  localStorage.clear();
  window.location.href = "index.html";
}
