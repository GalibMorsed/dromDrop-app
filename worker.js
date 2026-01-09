export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to serve static assets first
    const page = await env.ASSETS.fetch(request);

    // If the asset exists, return it
    if (page.status !== 404) {
      return page;
    }

    // For SPA, serve index.html for any non-asset request
    const indexRequest = new Request(`${url.origin}/index.html`, request);
    return env.ASSETS.fetch(indexRequest);
  },
};