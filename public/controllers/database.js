const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "dawc",
            password: "ChrisDanHannahRobbie!" // TODO: Use environment variables for this!
        },
        type: "default"
    },
    server: "mutual-aid.database.windows.net",
    options: {
        rowCollectionOnRequestCompletion: true,
        database: "mutual-aid-website",
        encrypt: true
    }
};
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Database connected.");
    }
});

connection.connect();

module.exports = connection;