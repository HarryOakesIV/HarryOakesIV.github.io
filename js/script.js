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

/* ── Background Texture Parallax (smooth lerp) ──
   Instead of snapping to the target position each frame,
   we interpolate toward it. This smooths out the coarse
   scroll deltas from mouse wheels and touch input.

   PARALLAX_SPEED  – fraction of scroll applied (0 = fixed, 1 = no parallax)
   LERP_FACTOR     – how fast we catch up each frame (0.05 = silky, 0.15 = snappy)
*/

(function () {
  var PARALLAX_SPEED = 0.10;
  var LERP_FACTOR    = 0.45;

  var currentY = window.scrollY * PARALLAX_SPEED;
  var targetY  = currentY;
  var running  = false;

  function tick() {
    currentY += (targetY - currentY) * LERP_FACTOR;

    if (Math.abs(targetY - currentY) < 0.5) {
      currentY = targetY;
      running = false;
    }

    document.body.style.backgroundPositionY = -currentY + "px";

    if (running) {
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", function () {
    targetY = window.scrollY * PARALLAX_SPEED;

    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  });
})();

var navAvatarEl = document.getElementById('navAvatar');
if (navAvatarEl) {
  navAvatarEl.style.cursor = 'pointer';
  navAvatarEl.addEventListener('click', function () {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ===== Scroll Hint — "More below" chevron =====
   Dynamically injected so we don't need to touch index.html.
   Placed inside the #contact section, after its .container. */
(function () {
  var contact = document.getElementById('contact');
  if (!contact) return;

  // Build the hint element
  var hint = document.createElement('div');
  hint.className = 'scroll-hint';
  hint.setAttribute('aria-hidden', 'true');

  var label = document.createElement('span');
  label.className = 'scroll-hint__label';
  label.textContent = 'More below';

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'scroll-hint__chevron');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '6 9 12 15 18 9');
  svg.appendChild(polyline);

  hint.appendChild(label);
  hint.appendChild(svg);

  // Insert at end of the contact section (after .container, before </section>)
  contact.appendChild(hint);

  // Show the hint only while the contact section is in view
  // AND the archive section has not yet scrolled into view.
  var archive = document.getElementById('archive');
  var contactVisible = false;
  var archiveVisible = false;

  function updateHint() {
    if (contactVisible && !archiveVisible) {
      hint.classList.add('visible');
    } else {
      hint.classList.remove('visible');
    }
  }

  // Watch the contact section
  var contactObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        contactVisible = entry.isIntersecting;
        updateHint();
      });
    },
    { threshold: 0.3 }
  );
  contactObserver.observe(contact);

  // Watch the archive section — once its top edge appears, hide the hint
  if (archive) {
    var archiveObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          archiveVisible = entry.isIntersecting;
          updateHint();
        });
      },
      { threshold: 0.05 }
    );
    archiveObserver.observe(archive);
  }
})();