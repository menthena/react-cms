var secrets = {};

secrets.google = {
	clientID: '328354766394-2v20l3ggtoo2q69qttv07btohmhv2c6j.apps.googleusercontent.com',
  clientSecret: 'pBwgaKSwhwxe0dypxswrMpnB',
  callbackURL: 'http://localhost:3000/auth/google/callback'
};

secrets.session = {
	secret: 'happymealsforeveryone'
};

module.exports = secrets;
