/**
 * Peek Grid — Netflix-style progressive disclosure for archive sections.
 * Each .peek-section shows one row of cards with a fade overlay.
 * Clicking the header, "Show all" button, or "Collapse" button toggles.
 */
(function () {
  var sections = document.querySelectorAll('[data-peek]');

  sections.forEach(function (section) {
    var toggle = section.querySelector('[data-peek-toggle]');
    var expandBtn = section.querySelector('[data-peek-expand]');
    var collapseBtn = section.querySelector('[data-peek-collapse]');

    function expand() {
      section.classList.add('expanded');
    }

    function collapse() {
      section.classList.remove('expanded');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (section.classList.contains('expanded')) {
          collapse();
        } else {
          expand();
        }
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        expand();
      });
    }

    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        collapse();
      });
    }
  });
})();
