const app = require('../app');
const User = require('../model/User');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.post('/api/register', async (req, res) => {
  const name = req.body.name;
  let user = await User.findOne({ name });

  if (user) {
    res.status(200).send({ message: 'Name already exists!' });
  } else {
    user = new User({ name, registrationDate: new Date() });
    await user.save();
    res.status(200).send({ url: `https://nuxt-fs.now.sh/${name}` });
  }
});

app.get('/:name', async (req, res) => {
  const name = req.params.name;
  const user = await User.findOne({ name });

  if (user) {
    const registrationDate = user.registrationDate;
    const day = days[registrationDate.getDay()];
    const date = registrationDate.getDate();
    const month = months[registrationDate.getMonth()];
    const year = registrationDate.getFullYear();

    res.status(200).send(`[${name}] registered on ${day} ${date}/${month}/${year} (UTC)`);
  } else {
    res.status(200).send('No User Found!');
  }
});

module.exports = app;
