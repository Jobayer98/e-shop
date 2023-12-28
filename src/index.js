require('./db/db');
const { port } = require('./config/config');
const app = require('./app');

app.listen(port, () => {
  console.log(`Server is listening on  http://localhost:${port}`);
});
