export default async (request, context) => {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return Response.json({ error: "url query param is required" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return Response.json({ error: "Only http/https URLs are supported" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return Response.json(
        { error: `Upstream returned ${response.status}` },
        { status: 502 }
      );
    }

    const html = await response.text();

    const ogMatch =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      );

    if (ogMatch?.[1]) {
      return Response.json({ imageUrl: ogMatch[1] });
    }

    return Response.json(
      { error: "No image found at that link" },
      { status: 404 }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
};

export const config = {
  path: "/api/resolve-image",
};
