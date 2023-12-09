const app = require('./src/app');
const { PORT } = require('./config');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉🎉🎉 Application running on port: ${PORT} 🎉🎉🎉`);
});

module.exports = server;