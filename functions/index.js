const functions = require("firebase-functions");
const express = require("express");
const morgan = require("morgan");

const app = express();

//Middleware

app.use((req, res, next) => {
    console.log(
        "Request Received: ",
        new Date().toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
        })
    );
    next();
});
app.use(morgan("dev"));
express.json();

//Security

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

//Routes

app.get("/knock", (req, res) => {
    var sender = req.headers["user-agent"];
    if (sender.match(/^(Mozilla).*/)) {
        const misc = req.query.some ? "<h5>" + req.query.some + "</h5>" : "";
        res.send("<h1>Easy DBMS</h1><h3>I work. What about you?</h3>" + misc);
    } else {
        res.json({
            code: 9107,
            message:
                "This route is just for fun. Make the same request from a browser to feel different. Refer to the API Documentation for more constructive approaches.",
            docAt: "https://easy-dbms.web.app/doc.html",
        });
    }
});

// CREATE TABLE

const removeSurroundingSquareBraces = (str) => str.replace(/[\[\]']+/g, "");

function getDataType(type) {
    let datatype = "",
        temp = type.split(" ");
    if (temp[0] === "varchar")
        datatype = `${temp[0].toUpperCase()}(${removeSurroundingSquareBraces(
            temp[1]
        )})`;
    else if (temp[0] === "char")
        datatype = `${temp[0].toUpperCase()}(${removeSurroundingSquareBraces(
            temp[1]
        )})`;
    else if (temp[0] === "int") datatype = temp[0].toUpperCase();
    else if (temp[0] === "date") datatype = temp[0].toUpperCase();

    return datatype;
}

function parseConstraints(cons) {
    return cons.join(" ");
}

function parseColumnData(columns) {
    let attributes = [],
        primaryKey = "";
    columns.forEach((column) => {
        attribute = [];
        if (column.key === "PK") primaryKey = `PRIMARY KEY ( ${column.name} )`;

        attribute.push(column.name);
        attribute.push(getDataType(column.datatype));
        attribute.push(parseConstraints(column.constraints));

        attributes.push(attribute.filter((n) => n).join(" "));
    });
    attributes.push(primaryKey);

    return attributes.join(", ");
}

function buildQuery(type, entity) {
    let query = "";
    if (type === "create-table") {
        query += `create table ${entity.name}`;
        query += ` (`;
        query += parseColumnData(entity.attributes);
        query += `);`;
    }
    return query;
}

app.post("/create-table", (req, res) => {
    const entity = req.body;

    const query = buildQuery("create-table", entity);

    res.json({ data: query });
});

//Error Handling

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log({ badaError: error });
    res.status(error.status || 500);
    res.json({
        error: {
            code: error.status,
            message: error.message,
        },
    });
});

exports.api = functions.https.onRequest(app);
