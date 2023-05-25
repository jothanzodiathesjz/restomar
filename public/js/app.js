function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    username: username,
    password: password,
  };

  fetch("/login-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result); // Tanggapan dari server setelah login
      // Lakukan tindakan yang sesuai setelah login berhasil
    })
    .catch((error) => {
      console.error(error); // Tanggapan error dari server
      // Lakukan penanganan kesalahan yang sesuai
    });
}
