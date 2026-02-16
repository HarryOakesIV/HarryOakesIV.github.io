/**
 * Video Lightbox
 * Intercepts YouTube video links in the projects section and plays them
 * inline in a modal overlay. Playlist-only links open in a new tab.
 */
(function () {
  const overlay = document.getElementById("videoLightbox");
  const iframe = document.getElementById("lightboxIframe");
  const closeBtn = overlay.querySelector(".lightbox-close");

  if (!overlay || !iframe) return;

  /**
   * Extract a YouTube video ID from a URL.
   * Returns null if the URL is a playlist-only link (no video ID).
   *
   * Handles:
   *   - https://youtu.be/VIDEO_ID
   *   - https://www.youtube.com/watch?v=VIDEO_ID
   *   - https://www.youtube.com/watch?v=VIDEO_ID&list=...
   *   - https://youtube.com/watch?v=VIDEO_ID&list=...
   */
  function getYouTubeVideoId(url) {
    // Playlist-only URLs — no video to lightbox
    if (/youtube\.com\/playlist/i.test(url)) return null;

    // youtu.be short links
    var shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // youtube.com/watch?v= links
    var longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (longMatch) return longMatch[1];

    return null;
  }

  /** Open the lightbox with a given YouTube video ID */
  function openLightbox(videoId) {
    iframe.src =
      "https://www.youtube.com/embed/" +
      videoId +
      "?autoplay=1&rel=0&modestbranding=1";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /** Close the lightbox and stop playback */
  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    // Clear src after transition so video stops immediately
    setTimeout(function () {
      iframe.src = "";
    }, 300);
  }

  // --- Event Listeners ---

  // Intercept clicks on YouTube links inside #projects
  var projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.addEventListener("click", function (e) {
      // Walk up from the click target to find the nearest <a>
      var link = e.target.closest("a");
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href) return;

      // Only handle YouTube URLs
      if (!/youtu\.?be/i.test(href)) return;

      var videoId = getYouTubeVideoId(href);

      if (videoId) {
        // It's a single video — open in lightbox
        e.preventDefault();
        openLightbox(videoId);
      }
      // If videoId is null it's a playlist — let the default behavior
      // (open in new tab) happen naturally
    });
  }

  // Close on X button
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Close on overlay background click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeLightbox();
    }
  });
})();
