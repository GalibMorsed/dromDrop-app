export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    console.log('env.ASSETS:', env.ASSETS);

    if (!env.ASSETS) {
      return new Response('Assets not configured', { status: 500 });
    }

    // Try to serve static assets first
    try {
      const page = await env.ASSETS.fetch(request);

      // If the asset exists, return it
      if (page.status !== 404) {
        return page;
      }
    } catch (e) {
      console.error('Error fetching asset:', e);
      return new Response('Error fetching asset', { status: 500 });
    }

    // For SPA, serve index.html for any non-asset request
    try {
      const indexRequest = new Request(`${url.origin}/index.html`);
      return await env.ASSETS.fetch(indexRequest);
    } catch (e) {
      console.error('Error fetching index.html:', e);
      return new Response('Error fetching index.html', { status: 500 });
    }
  },
};