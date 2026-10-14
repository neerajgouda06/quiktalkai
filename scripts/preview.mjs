import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const host = '127.0.0.1';
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be an integer between 1 and 65535.');
  process.exit(1);
}

let root;
try {
  root = await realpath(resolve(fileURLToPath(new URL('../dist/', import.meta.url))));
} catch (error) {
  console.error(`Unable to open the dist folder: ${error.message}`);
  process.exit(1);
}

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8',
  '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
  '.xml': 'application/xml; charset=utf-8', '.pdf': 'application/pdf',
};

function insideRoot(path) {
  const part = relative(root, path);
  return part !== '..' && !part.startsWith(`..${sep}`) && !isAbsolute(part);
}

function reply(req, res, status, message, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(message),
    ...headers,
  });
  res.end(req.method === 'HEAD' ? undefined : message);
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return reply(req, res, 405, 'Use GET or HEAD.\n', { Allow: 'GET, HEAD' });
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${host}`).pathname);
  } catch {
    return reply(req, res, 400, 'Invalid request path.\n');
  }
  if (/[\0\\:]/.test(pathname)) {
    return reply(req, res, 400, 'Invalid request path.\n');
  }

  try {
    let path = resolve(root, `.${pathname}`);
    if (!insideRoot(path)) return reply(req, res, 403, 'Forbidden.\n');
    path = await realpath(path);
    if (!insideRoot(path)) return reply(req, res, 403, 'Forbidden.\n');
    let info = await stat(path);
    if (info.isDirectory()) {
      path = await realpath(resolve(path, 'index.html'));
      if (!insideRoot(path)) return reply(req, res, 403, 'Forbidden.\n');
      info = await stat(path);
    }
    if (!info.isFile()) return reply(req, res, 404, 'Not found.\n');

    let start = 0;
    let end = info.size - 1;
    let status = 200;
    const headers = {
      'Content-Type': types[extname(path).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
    };
    if (req.method === 'GET' && req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2]) || info.size === 0) {
        return reply(req, res, 416, 'Invalid byte range.\n', { 'Content-Range': `bytes */${info.size}` });
      }
      if (match[1]) {
        start = Number(match[1]);
        end = match[2] ? Number(match[2]) : end;
      } else {
        const suffix = Number(match[2]);
        start = Number.isSafeInteger(suffix) && suffix > 0 ? Math.max(0, info.size - suffix) : NaN;
      }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= info.size || end < start) {
        return reply(req, res, 416, 'Invalid byte range.\n', { 'Content-Range': `bytes */${info.size}` });
      }
      end = Math.min(end, info.size - 1);
      status = 206;
      headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
    }
    headers['Content-Length'] = info.size === 0 ? 0 : end - start + 1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD' || info.size === 0) return res.end();
    const stream = createReadStream(path, { start, end });
    stream.on('error', error => res.destroy(error));
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      return reply(req, res, 404, 'Not found.\n');
    }
    console.error(`Preview request failed: ${error.message}`);
    reply(req, res, 500, 'Unable to read the requested file.\n');
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Stop the other preview or set PORT to another available port.`
    : `Unable to start preview: ${error.message}`);
  process.exit(1);
});
server.listen(port, host, () => {
  console.log(`QuikTalk preview: http://${host}:${port}/`);
  console.log(`Serving ${root}`);
  console.log('Keep this process running while viewing the preview. Press Ctrl+C to stop.');
});
