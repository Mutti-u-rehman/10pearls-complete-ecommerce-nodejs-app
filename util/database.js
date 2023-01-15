const { MongoClient } = require('mongodb');
const store = require('../secret');



async function main() {
    
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${store.userName}:${store.password}@clustercompletenodejs.dwo4wft.mongodb.net/?retryWrites=true&w=majority`;

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    
    try {
        // Connect to the MongoDB cluster
        const connection = await  client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);
    }
    catch(e) {
        console.log(e);
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster 
 */
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


module.exports = main;



