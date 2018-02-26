module.exports = (app, passport) => {
  const cities       = require('./cities.js');
  const governorates = require('./governorates');
  const landmarks    = require('./landmarks');
  const memories     = require('./memories');
  const users        = require('./users');
  const auth         = require('./auth')(app, passport);

  app.use('/api/cities', cities);
  app.use('/api/governorates', governorates);
  app.use('/api/landmarks', landmarks);
  app.use('/api/memories', memories);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
}
