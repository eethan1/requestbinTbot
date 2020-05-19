self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          fetch(`https://c.cjiso.ninja/data/${event.request.url}`);
        }
      )
    );
  });
  