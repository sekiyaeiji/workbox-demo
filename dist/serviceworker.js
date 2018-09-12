var CACHE_NAME = 'contentData_v1';

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );

  var fetchRequest = event.request.clone();
  return fetch(fetchRequest).then(
    function(response) {
      // レスポンスが正しいかをチェック
      if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      var responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache);
        });

      return response;
    }
  );
});
