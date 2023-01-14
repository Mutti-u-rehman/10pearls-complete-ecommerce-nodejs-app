const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://CompleteNodeJS:SsNs9xxnW5gBVhbf@clustercompletenodejs.dwo4wft.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mongoConnect = (callback) => {
    console.log("connecting");
    MongoClient.connect(uri)
        .then((client) => {
            console.log("Connected");
            callback(client);
        })
        .catch((err) => console.log(err));
}

module.exports = mongoConnect;
