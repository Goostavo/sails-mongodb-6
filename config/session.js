/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

const cfg = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'mydb',
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PWD,
};

/**
 * Multiple configurations. Atlas vs On-premise. With auth and without auth. With host configured. Without host configured.
 */
let url;
if (process.env.NODE_ENV === 'production' && cfg.useatlas) {
  url = 'mongodb+srv://' + cfg.user + ':' + cfg.password + '@' + cfg.host + '/' + cfg.database + '?retryWrites=true&w=majority';
} else if (process.env.NODE_ENV === 'production'){
  url = 'mongodb://' + cfg.user + ':' + cfg.password + '@' + cfg.host + '/' + cfg.database + '?retryWrites=true';
} else {
// Localhost may not use username / password
  if (!cfg.user) {
    url = 'mongodb://' + cfg.host + '/' + cfg.database + '?retryWrites=true';
  } else {
    url = 'mongodb://' + cfg.user + ':' + cfg.password + '@' + cfg.host + '/' + cfg.database + '?retryWrites=true';
  }
}


module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: 'omg_this_is_secret!!!!',
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  adapter: 'connect-mongodb-session',
  'uri': url,
  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
