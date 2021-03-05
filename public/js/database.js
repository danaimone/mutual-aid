const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "dawc",
            password: "ChrisDanHannahRobbie!"
        },
        type: "default"
    },
    server: "mutual-aid.database.windows.net",
    options: {
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
        console.log("connected");
        queryDatabase();
    }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `INSERT INTO users (username, firstName, lastName) VALUES ('dawc', 'Chris', 'Daw');`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}

connection.connect();