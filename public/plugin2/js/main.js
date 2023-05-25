(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// Contoh penggunaan SweetAlert2

function loginUser() {
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
      if (result.statusCode === 200) {
        Swal.fire("Succes", "you are login now", "success");
        window.location.href = "/";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong username and password",
        });
      }
      // Tanggapan dari server setelah login
      // Lakukan tindakan yang sesuai setelah login berhasil
    })
    .catch((error) => {
      console.error(error); // Tanggapan error dari server
      // Lakukan penanganan kesalahan yang sesuai
    });
}

const formDiv = document.getElementById("myForm");

formDiv.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Menghentikan perilaku default "submit" saat menekan tombol "Enter"
    // Lakukan aksi yang diinginkan saat menekan tombol "Enter"
    // Misalnya, panggil fungsi untuk melakukan submit atau aksi lainnya.
    loginUser();
  }
});
