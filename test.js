const express = require('express');
const bodyParser = require('body-parser');
const FacebookAuth = require('facebook-auth');
const GoogleAuth = require('google-auth-library');

const app = express();
app.use(bodyParser.json());

// Configure Facebook authentication
const facebookAuth = new FacebookAuth({
  appId: 'YOUR_FACEBOOK_APP_ID',
  appSecret: 'YOUR_FACEBOOK_APP_SECRET',
});

// Configure Google authentication
const googleAuth = new(require('google-auth-library')).GoogleAuth({
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
});

// Create a route for creating an account using Facebook or Google
app.post('/accounts', async (req, res) => {
  // Get the user's credentials
  const { email, password } = req.body;

  // Try to authenticate the user with Facebook
  try {
    const facebookUser = await facebookAuth.signInWithEmailAndPassword(email, password);
    res.json({
      success: true,
      accountId: facebookUser.id,
    });
  } catch (err) {
    // If the user couldn't be authenticated with Facebook, try to authenticate them with Google
    try {
      const googleUser = await googleAuth.signInWithEmailAndPassword(email, password);
      res.json({
        success: true,
        accountId: googleUser.id,
      });
    } catch (err) {
      // If the user couldn't be authenticated with Google, return an error
      res.json({
        success: false,
        error: err.message,
      });
    }
  }
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});