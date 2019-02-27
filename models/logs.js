const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// TODO: Logs needs to be saved in a model so need to define a schema and necessary attributes to be saved

/*
    Data to be logged onto the server under a user

    1. Login and logout time.
    2. Browsing history.
    3. GitHub commits and pull requests
    4. Computer resource usage logs per hour
*/

var logsSchema = new mongoose.Schema({
    userId: ObjectId
});