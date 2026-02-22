// const hamburger = document.querySelector(".hamburger");
// const navMenu = document.querySelector(".nav-menu");

// if (hamburger && navMenu) {
//   hamburger.addEventListener("click", mobileMenu);

//   function mobileMenu() {
//     hamburger.classList.toggle("active");
//     navMenu.classList.toggle("active");
//   }

//   const navLink = document.querySelectorAll(".nav-link");
//   navLink.forEach((n) => n.addEventListener("click", closeMenu));

//   function closeMenu() {
//     hamburger.classList.remove("active");
//     navMenu.classList.remove("active");
//   }
// }

// Event Listeners: Handling toggle event
// const toggleSwitch = document.querySelector(
//   '.theme-switch input[type="checkbox"]'
// );

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute("data-theme", "dark");
//   } else {
//     document.documentElement.setAttribute("data-theme", "light");
//   }
// }

// toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute("data-theme", "dark");
//     localStorage.setItem("theme", "dark"); //add this
//   } else {
//     document.documentElement.setAttribute("data-theme", "light");
//     localStorage.setItem("theme", "light"); //add this
//   }
// }

// Save user preference on load

// const currentTheme = localStorage.getItem("theme")
//   ? localStorage.getItem("theme")
//   : null;

// if (currentTheme) {
//   document.documentElement.setAttribute("data-theme", currentTheme);

//   if (currentTheme === "dark") {
//     toggleSwitch.checked = true;
//   }
// }

//Adding date

// let myDate = document.querySelector("#datee");

// const yes = new Date().getFullYear();
// myDate.innerHTML = yes;

/* ===== Hamburger Menu ===== */
var hamburger = document.querySelector(".hamburger-menu");
var navMenu = document.querySelector(".menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close navbar when a menu link is clicked
  var menuLinks = navMenu.querySelectorAll("a");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* ===== Sticky Nav Avatar ===== */
(function () {
  var heroAvatar = document.getElementById('heroAvatar');
  var navAvatar  = document.getElementById('navAvatar');
  if (!heroAvatar || !navAvatar) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAvatar.classList.remove('visible');
          heroAvatar.classList.remove('faded');
        } else {
          navAvatar.classList.add('visible');
          heroAvatar.classList.add('faded');
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-70px 0px 0px 0px'
    }
  );

  observer.observe(heroAvatar);
})();

/* ── Background Texture Parallax ──
   Moves the body background at a fraction of the scroll speed.
   Adjust PARALLAX_SPEED to taste:
     0.0 = fully fixed (no movement)
     0.5 = moves at half scroll speed (default)
     1.0 = moves with scroll (no parallax)
*/

(function () {
  const PARALLAX_SPEED = 0.95;

  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const offset = window.scrollY * PARALLAX_SPEED;
        document.body.style.backgroundPositionY = offset + "px";
        ticking = false;
      });
      ticking = true;
    }
  });
})();

