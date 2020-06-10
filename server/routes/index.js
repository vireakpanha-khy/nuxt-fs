require('dotenv').config();
const app = require('../app');
const User = require('../model/User');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function addZero(n) {
  return n > 9 ? n : '0' + n;
}

app.post('/api/register', async (req, res) => {
  const name = req.body.name;
  let user = await User.findOne({ name });

  if (user) {
    res.status(200).send({ message: 'Name already exists!' });
  } else {
    user = new User({ name, registrationDate: new Date() });
    await user.save();
    const URL = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.API_DEV_PORT}` : 'https://nuxt-fs.now.sh';
    res.status(200).send({ url: `${URL}/${name}` });
  }
});

app.get('/:name', async (req, res) => {
  const name = req.params.name;
  const user = await User.findOne({ name });

  if (user) {
    const registrationDate = user.registrationDate;
    const currentDate = new Date(registrationDate.toString());
    const day = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    res.status(200).send(`[${name}] registered on ${day} ${addZero(date)}/${month}/${year} at ${addZero(hour)}:${addZero(minute)}`);
  } else {
    res.status(200).send('No User Found!');
  }
});

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') {
  const PORT = process.env.API_DEV_PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
} else {
  module.exports = app;
}
