/**
 * Video Lightbox
 * Intercepts YouTube links in the projects section and plays them
 * inline in a modal overlay. Handles both single videos and playlists.
 * Playlists show an indicator bar above the player.
 */
(function () {
  var overlay = document.getElementById("videoLightbox");
  var iframe = document.getElementById("lightboxIframe");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var playlistBar = document.getElementById("lightboxPlaylistBar");

  if (!overlay || !iframe) return;

  /**
   * Parse a YouTube URL and return its embed type and ID.
   *
   * Returns: { type: "video" | "playlist", id: "..." }
   * Returns null if not a recognized YouTube link.
   */
  function parseYouTubeUrl(url) {
    // Playlist-only URLs
    var playlistMatch = url.match(
      /youtube\.com\/playlist\?.*list=([a-zA-Z0-9_-]+)/i
    );
    if (playlistMatch) {
      return { type: "playlist", id: playlistMatch[1] };
    }

    // youtu.be short links
    var shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) {
      return { type: "video", id: shortMatch[1] };
    }

    // youtube.com/watch?v= links
    var longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (longMatch) {
      return { type: "video", id: longMatch[1] };
    }

    return null;
  }

  /**
   * Build the embed URL based on type.
   * - Videos:    /embed/VIDEO_ID?autoplay=1&rel=0
   * - Playlists: /embed/videoseries?list=PLAYLIST_ID&autoplay=1&rel=0
   */
  function buildEmbedUrl(parsed) {
    var base = "https://www.youtube.com/embed/";
    var params = "?autoplay=1&rel=0&modestbranding=1";

    if (parsed.type === "playlist") {
      return base + "videoseries" + params + "&list=" + parsed.id;
    }

    return base + parsed.id + params;
  }

  /** Open the lightbox */
  function openLightbox(parsed) {
    iframe.src = buildEmbedUrl(parsed);

    // Show or hide the playlist indicator bar
    if (playlistBar) {
      if (parsed.type === "playlist") {
        playlistBar.style.display = "flex";
        overlay.classList.add("is-playlist");
      } else {
        playlistBar.style.display = "none";
        overlay.classList.remove("is-playlist");
      }
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /** Close the lightbox and stop playback */
  function closeLightbox() {
    overlay.classList.remove("active");
    overlay.classList.remove("is-playlist");
    document.body.style.overflow = "";
    setTimeout(function () {
      iframe.src = "";
    }, 300);
  }

  // --- Event Listeners ---

  // Intercept clicks on YouTube links inside #projects
  var projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href) return;

      // Only handle YouTube URLs
      if (!/youtu\.?be/i.test(href)) return;

      var parsed = parseYouTubeUrl(href);

      if (parsed) {
        e.preventDefault();
        openLightbox(parsed);
      }
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