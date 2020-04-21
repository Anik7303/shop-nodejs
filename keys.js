// Session
module.exports.SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

// MongoDB
module.exports.MONGODB_LOCAL_URI = `mongodb://localhost:27017/${ process.env.MONGODB_DATABASE }`;
module.exports.MONGODB_ATLAS_URI = `mongodb+srv://${ process.env.MONGODB_USER }:${ process.env.MONGODB_PASSWORD }@cluster0-5fdut.mongodb.net/${ process.env.MONGODB_DATABASE }`;
