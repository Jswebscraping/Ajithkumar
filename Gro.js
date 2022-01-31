const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
let db, Grofer
MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("Grofer")
        Grofer = db.collection("Grofer");

(async () => {
    const response = await fetch('https://grofers.com/v6/merchant/29815/product/402545', {
        method: 'GET',
        credentials: 'true'
        });
        const product = await response.json();
        console.log(product);
        Grofer.deleteMany({})
        Grofer.insertOne(product)
    })();
})

