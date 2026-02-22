/**
 * Photo Gallery — Feature image + thumbnail strip.
 * Clicking a thumbnail crossfades it into the feature position.
 */
(function () {
  var feature = document.getElementById('featurePhoto');
  var thumbs = document.querySelectorAll('.photos-thumbs .thumb');

  if (!feature || !thumbs.length) return;

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-src');
      if (!src || feature.src.endsWith(src.replace('./', '/'))) return;

      // Mark active thumbnail
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      btn.classList.add('active');

      // Crossfade: fade out, swap src, fade in
      feature.classList.add('fading');

      setTimeout(function () {
        feature.src = src;
        feature.onload = function () {
          feature.classList.remove('fading');
          feature.onload = null;
        };
      }, 250); // matches CSS transition duration
    });
  });
})();
