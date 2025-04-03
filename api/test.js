export default function handler(req, res) {
  res.json({
    message: 'Test endpoint successful',
    timestamp: new Date().toISOString(),
    requestInfo: {
      headers: req.headers,
      query: req.query,
      method: req.method,
      path: req.url
    }
  });
}
