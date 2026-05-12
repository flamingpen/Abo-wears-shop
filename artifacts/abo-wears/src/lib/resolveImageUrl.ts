export function isSpecialShareUrl(url: string): boolean {
  if (!url) return false;
  return (
    url.includes("google.com/imgres") ||
    url.includes("google.com/search") ||
    /instagram\.com\/(p|reel|tv)\//.test(url)
  );
}

export async function resolveImageUrl(raw: string): Promise<string> {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;

  try {
    const u = new URL(trimmed);

    if (
      u.hostname.includes("google.com") &&
      (u.pathname === "/imgres" || u.pathname.startsWith("/search"))
    ) {
      const imgurl = u.searchParams.get("imgurl");
      if (imgurl) return imgurl;
    }

    if (/instagram\.com\/(p|reel|tv)\//.test(trimmed)) {
      const resp = await fetch(
        `/api/resolve-image?url=${encodeURIComponent(trimmed)}`,
      );
      if (resp.ok) {
        const data = (await resp.json()) as { imageUrl?: string };
        if (data.imageUrl) return data.imageUrl;
      }
      return trimmed;
    }
  } catch {
    // Not a valid URL or network error — return as-is
  }

  return trimmed;
}
