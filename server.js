if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = require('./server/app');

const port = 8000;

app.listen(port, () => {
  console.log(`express is running on port ${port}`);
});
