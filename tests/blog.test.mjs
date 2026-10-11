import assert from 'node:assert/strict';
import { test } from 'node:test';
import { safeLink, videoEmbedUrl, formatBlogDate } from '../lib/blog.ts';

test('rich text links reject executable URLs and disguised external paths', () => {
  for (const input of ['javascript:alert(1)', 'data:text/html,test', '//evil.example', '/\\evil.example', 'java\nscript:alert(1)', ' https://example.com', 'vbscript:msgbox(1)']) {
    assert.equal(safeLink(input), undefined, input);
  }
  assert.equal(safeLink('/palvelut/'), '/palvelut/');
  assert.equal(safeLink('https://example.com/article'), 'https://example.com/article');
  assert.equal(safeLink('mailto:info@example.com', true), 'mailto:info@example.com');
  assert.equal(safeLink('mailto:info@example.com'), undefined);
});

test('video links are normalized to trusted hosts, including Shorts and private Vimeo links', () => {
  for (const input of ['https://youtu.be/dQw4w9WgXcQ?t=3', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://youtube.com/shorts/dQw4w9WgXcQ']) {
    assert.equal(videoEmbedUrl(input), 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  }
  assert.equal(videoEmbedUrl('https://vimeo.com/123456789/abcdef'), 'https://player.vimeo.com/video/123456789?dnt=1&h=abcdef');
  assert.equal(videoEmbedUrl('https://player.vimeo.com/video/123456789?h=abcdef'), 'https://player.vimeo.com/video/123456789?dnt=1&h=abcdef');
  for (const input of ['https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ', 'https://youtube.com/watch?v=invalid', 'javascript:alert(1)', 'https://example.com/video', undefined]) {
    assert.equal(videoEmbedUrl(input), undefined);
  }
});

test('dates use Finnish local time and tolerate incomplete drafts', () => {
  assert.equal(formatBlogDate(undefined), '');
  assert.equal(formatBlogDate('invalid'), '');
  assert.equal(formatBlogDate('2026-10-10T22:30:00Z'), '11. lokakuuta 2026');
});
