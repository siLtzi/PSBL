/** Only accept navigable links, never executable URLs from rich text. */
export function safeLink(value?: string, allowContact = false): string | undefined {
  if (!value || /[\u0000-\u0020\u007f]/.test(value)) return undefined;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return value;
  if (value.startsWith('#')) return value;
  try {
    const url = new URL(value);
    if (['https:', 'http:', ...(allowContact ? ['mailto:', 'tel:'] : [])].includes(url.protocol)) return value;
  } catch { /* Incomplete links are normal while editing a draft. */ }
  return undefined;
}

/** Convert a supported public video link to a fixed, trusted embed origin. */
export function videoEmbedUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return undefined;
    const host = url.hostname.replace(/^www\./, '');
    let id: string | null | undefined;
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:embed|shorts|live)\/([^/]+)/.exec(url.pathname)?.[1];
    }
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const match = /^\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/.exec(url.pathname);
      if (match) {
        const hash = match[2] || url.searchParams.get('h');
        return `https://player.vimeo.com/video/${match[1]}?dnt=1${hash && /^[a-zA-Z0-9]+$/.test(hash) ? `&h=${hash}` : ''}`;
      }
    }
  } catch { /* Invalid or incomplete URL. */ }
  return undefined;
}

export function formatBlogDate(value?: string) {
  if (!value || Number.isNaN(Date.parse(value))) return '';
  return new Intl.DateTimeFormat('fi-FI', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Helsinki' }).format(new Date(value));
}
