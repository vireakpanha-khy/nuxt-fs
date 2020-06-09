const app = require('../app');

app.get('/api', (req, res) => {
  res.status(200).send({
    message: '/api route received.'
  });
});

app.post('/api', function(req, res) {
  const example = req.body.example;
  res.status(200).send(`EXAMPLE = ${example}`);
});

app.get('/:example', (req, res) => {
  res.status(200).send(`EXAMPLE = ${req.params.example}`);
});

module.exports = app;
