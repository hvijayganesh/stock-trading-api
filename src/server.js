const initApp = require('./app').default;

const PORT = process.env.PORT || 3000;

(async () => {
  const app = await initApp();
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})();


