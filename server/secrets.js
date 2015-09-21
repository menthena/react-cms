var secrets = {};

secrets.google = {
	clientID: '328354766394-vpocb7doatubgb31qu5hu55p3mnk6unq.apps.googleusercontent.com',
  clientSecret: 'rwf7sE20_wlxfnA5Ir1OR0Nu',
  callbackURL: 'http://localhost:3000/auth/google/callback'
};

secrets.session = {
	secret: 'bitsinpieces'
};

module.exports = secrets;
