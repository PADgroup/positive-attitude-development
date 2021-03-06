
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const adminRouter = require('./routes/admin.router');
const valueRouter = require('./routes/values.router');
const snapshotRouter = require('./routes/snapshot.router');
const adminContactRouter = require('./routes/adminContact.router'); 
const participantRouter = require('./routes/participant.router');
const urlRouter = require('./routes/url.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */

app.use('/api/admin', adminRouter);
app.use('/api/values', valueRouter);
app.use('/api/snapshot', snapshotRouter);
app.use('/api/adminContact', adminContactRouter); 
app.use('/api/participant', participantRouter);
app.use('/api/url', urlRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
