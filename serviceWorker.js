const staticAssets = [
    './',
    './index.html',
	'./demo.html',
	'./6-1.html'
];

self.addEventListener('install', async event => {
	console.log(`install`);
	const cache = await caches.open('news-static');
	cache.addAll(staticAssets);
});


self.addEventListener('fetch', event => {
    const req = event.request;
	const url = new URL(req.url);
	if (url.origin === location.origin) {
        // event.respondWith(cacheFirst(req));
		event.respondWith(networkFirst(req));
        
	} else {
		event.respondWith(networkFirst(req));
	}

});


async function cacheFirst(req) {

    // try {
    //     debugger;

    //     const res = await fetch(req)

    //     console.log(res, 'resres');
    //     // return fetch(req)
    //     return res;
    // }catch(error) {
        const cachedResponse = await caches.match(req);
        // return cachedResponse || fetch(req);
        return cachedResponse || networkFirst(req); 
    // }

	// const cachedResponse = await caches.match(req);
	// // return cachedResponse || fetch(req);
	// return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
	const cache = await caches.open('news-dynamic');
	try {
		const res = await fetch(req)
		cache.put(req, res.clone());
		return res;
	} catch (error) {
		// return await cache.match(req);

		// const await cache.match(req);
		const cachedResponse = await cache.match(req);
		return cachedResponse || await caches.match('./fallback.json');
	}
}

