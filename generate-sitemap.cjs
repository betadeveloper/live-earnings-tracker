const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },
];

(async () => {
    const stream = new SitemapStream({ hostname: 'https://earningstracker.vercel.app' });
    const writeStream = createWriteStream('./public/sitemap.xml');

    stream.pipe(writeStream);

    for (const link of links) {
        stream.write(link);
    }

    stream.end();

    await streamToPromise(stream);
    console.log('✅ Sitemap successfully generated!');
})();
