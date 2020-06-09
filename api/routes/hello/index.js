const app = require('../../app');

app.get('/api/hello', (req, res) => {
  res.status(200).send({
    message: '/api/hello route received.'
  });
});

app.get('/api/hello/:name', (req, res) => {
  res.status(200).send({
    message: `Hello, ${req.params.name}`
  });
});

module.exports = app;
