const functions = require("firebase-functions");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

admin.initializeApp();

let db = admin.firestore();
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    const misc = req.query.some ? "<h5>" + req.query.some + "</h5>" : "";
    res.send("<h1>Easy DBMS</h1><h3>I work. What about you?</h3>" + misc);
});

// CREATE

app.post("/create-entity", (req, res) => {
    var entity = req.body;
    console.log(entity);
    console.log(JSON.stringify(entity));

    db.collection("entities")
        .add(entity)
        .then((ref) => {
            console.log("Added document ", entity.name, " with ID: ", ref.id);
            res.json({
                code: 200,
                message: "Entity created",
                ref: ref.id,
            });
        })
        .catch((err) => {
            console.log({ error: err });
            res.status(500);
            res.json({
                code: 500,
                message: "Some issue",
                error: err,
            });
        });
});

// READ

function cleanerRelationships(values) {
    var cleaned = [];
    // values.forEach((value) => {
    //     cleaned.push(value[value["valueType"]]);
    // });
    return cleaned;
}

function cleanerConstraints(values) {
    var cleaned = [];
    values.forEach((value) => {
        cleaned.push(value[value["valueType"]]);
    });
    return cleaned;
}

function cleanerAttributes(values) {
    var cleaned = [];
    values.forEach((value) => {
        var attribute = {
            group: "",
            key: "",
            name: "",
            "data-type": "",
            constraints: [""],
        };
        attribute["group"] =
            value[value["valueType"]]["fields"]["group"][
                value[value["valueType"]]["fields"]["group"]["valueType"]
            ];
        attribute["key"] =
            value[value["valueType"]]["fields"]["key"][
                value[value["valueType"]]["fields"]["key"]["valueType"]
            ];
        attribute["name"] =
            value[value["valueType"]]["fields"]["name"][
                value[value["valueType"]]["fields"]["name"]["valueType"]
            ];
        attribute["data-type"] =
            value[value["valueType"]]["fields"]["data-type"][
                value[value["valueType"]]["fields"]["data-type"]["valueType"]
            ];
        attribute["constraints"] = cleanerConstraints(
            value[value["valueType"]]["fields"]["constraints"][
                value[value["valueType"]]["fields"]["constraints"]["valueType"]
            ]["values"]
        );
        cleaned.push(attribute);
    });
    return cleaned;
}

app.get("/read-entity", (req, res) => {
    db.collection("entities")
        .doc(req.query.id)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                res.json({
                    code: 200,
                    message: "Entity Doesn't Exist",
                    data: null,
                });
            } else {
                var entity = { name: "", relationships: [], attributes: [] };
                entity.name =
                    doc["_fieldsProto"]["name"][
                        doc["_fieldsProto"]["name"]["valueType"]
                    ];
                entity.relationships = cleanerRelationships(
                    doc["_fieldsProto"]["relationships"][
                        doc["_fieldsProto"]["relationships"]["valueType"]
                    ]["values"]
                );
                entity.attributes = cleanerAttributes(
                    doc["_fieldsProto"]["attributes"][
                        doc["_fieldsProto"]["attributes"]["valueType"]
                    ]["values"]
                );
                res.json({
                    code: 200,
                    message: "Entity Read",
                    data: entity,
                });
            }
        })
        .catch((err) => {
            console.log("Error getting documents", err);
            res.status(500);
            res.json({ code: 500, message: "Some Issue", error: err });
        });
});

app.get("/read-entities", (req, res) => {
    db.collection("entities")
        .get()
        .then((snapshot) => {
            var entities = [];
            snapshot.forEach((doc) => {
                entities.push({
                    id: doc.id,
                    name:
                        doc["_fieldsProto"]["name"][
                            doc["_fieldsProto"]["name"]["valueType"]
                        ],
                });
            });
            if (entities.length) {
                res.json({
                    code: 200,
                    message: "Entities Read",
                    data: entities,
                });
            } else {
                res.json({
                    code: 200,
                    message: "Entities Couldn't Be Read",
                    data: null,
                });
            }
        })
        .catch((err) => {
            console.log("Error getting documents", err);
            res.status(500);
            res.json({ code: 500, message: "Some Issue", error: err });
        });
});

// UPDATE

app.patch("/update-entity", (req, res) => {
    res.json({
        code: 404,
        message:
            "This route is under construction. Refer to the API Documentation for alternative approaches.",
        docAt: "https://easy-dbms.web.app/doc.html",
    });
    // db.collection("entities")
    //     .doc(req.query.id)
    //     .delete()
    //     .then(() => {
    //         res.json({
    //             code: 200,
    //             message: "Entity Deleted",
    //         });
    //     })
    //     .catch((err) => {
    //         console.log("Error getting documents", err);
    //         res.status(500);
    //         res.json({ code: 500, message: "Some Issue", error: err.message });
    //     });
});

// DELETE

app.delete("/delete-entity", (req, res) => {
    db.collection("entities")
        .doc(req.query.id)
        .delete()
        .then(() => {
            res.json({
                code: 200,
                message: "Entity Deleted",
            });
        })
        .catch((err) => {
            console.log("Error getting documents", err);
            res.status(500);
            res.json({ code: 500, message: "Some Issue", error: err.message });
        });
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
