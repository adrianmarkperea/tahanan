module.exports = (app, passport) => {
  const memories     = require('./memories');
  const users        = require('./users');
  const auth         = require('./auth')(app, passport);
  const map          = require('./map');
  const landmarks    = require('./landmarks');

  // app.use('/api/cities', cities);
  // app.use('/api/governorates', governorates);
  // app.use('/api/landmarks', landmarks);

  // app.use('/api/users', users);
  app.use('/api/memories', memories);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/map', map);
  app.use('/api/landmarks', landmarks)

}
