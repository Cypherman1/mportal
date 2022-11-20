const express = require('express')
// const admin = require('firebase-admin')
// const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const keys = require('./config/keys')
const dotenv = require('dotenv')
const compression = require('compression')
var expressStaticGzip = require('express-static-gzip')
var history = require('connect-history-api-fallback')

require('./models/User')
require('./models/UploadedImgs')
require('./models/Templates')
require('./models/ImgsTemplate')
require('./services/passport')
require('./services/requireAuth')
// require('./services/firebase')

// const path = require('path')
// const requireAuth = require('./services/requireAuth')

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(keys.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Mongodb connected!"))
//   .catch((err) => console.log(err));

const app = express()

//const whitelist = ["http://localhost:3000", "http://example2.com"];
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(compression())
app.use(history())

// Then pass them to cors:
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
// app.use(express.static("public"));

app.use(passport.initialize())
app.use(passport.session())
// app.all("/api/*", requireAuth);

require('./routes/authRoutes')(app)
require('./routes/uploadRoute')(app)
require('./routes/templateRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  // app.use(express.static("client_web/dist"));
  app.use('/', expressStaticGzip('client_web/dist'))

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client_web", "dist", "index.html"));
  // });
}

// const PORT = process.env.PORT || 5000;

console.log('listening on port ' + keys.PORT)

app.listen(keys.PORT)
