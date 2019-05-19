window.onload = function() {
  if ("serviceWorker" in navigator) {
    const offlineButton = document.createElement("button");

    offlineButton.className = "button";

    caches.open("SavedPages").then(function(cache) {
      cache.match(window.location.href).then(function(result) {
        if (result) {
          document.querySelector(".post-buttons-wrapper").appendChild(offlineButton);
          offlineButton.innerText = "This page is ready for offline reading 👍🏻";
          offlineButton.setAttribute("disabled", "disabled");
        } else {
          document.querySelector(".post-buttons-wrapper").appendChild(offlineButton);
          offlineButton.innerText = "Save this page for offline reading";
        }
      });
    });

    caches.open("cachedPages").then(function(cache) {
      cache.match(window.location.href).then(function(result) {
        if (result) {
          document.querySelector(".post-buttons-wrapper").appendChild(offlineButton);
          offlineButton.innerText = "This page is ready for offline reading 👍🏻";
          offlineButton.setAttribute("disabled", "disabled");
        } else {
          document.querySelector(".post-buttons-wrapper").appendChild(offlineButton);
          offlineButton.innerText = "Save this page";
        }
      });
    });

    offlineButton.addEventListener("click", function(ev) {
      ev.preventDefault();

      var btn = this;

      btn.innerText = "Saving...";

      caches.open("SavedPages").then(function(cache) {
        cache.add(window.location.href).then(function() {
          const data = {
            title: document.querySelector("title").innerText
          };

          localStorage.setItem(window.location.href, JSON.stringify(data));

          btn.innerText = "This page is ready for offline reading 👍🏻";
          btn.setAttribute("disabled", "disabled");
        });
      });
    });
  }
};
