# Easy DBMS - API Documentation

The Easy-DBMS API provides CRUD Functionalities on Entity Information. All this data is stored on **Firebase** for accessibility.

**URL** : `https://us-central1-easy-dbms.cloudfunctions.net/api`

## Trial Ball

<pre>
curl --location --request GET '<b>URL</b>/knock'
</pre>

**RESPONSE**

```html
<h1>Easy DBMS</h1>
<h3>I work. What about you?</h3>
```

---

### DISCLAIMER : Features listed down are only adequately operational.

##### Please press `ctrl+F5` before reporting any inconvenience. :D

---

## Entity Records

### Create New Entity

<pre>
curl --location --request POST '<b>URL</b>/create-entity'
--header 'Content-Type: application/json'
--data-raw '{
    "name": "Student",
    "attributes": [
        {
        	"group": "General",
            "key": "PK",
            "name": "UID",
            "data-type": "varchar [9]",
            "constraints": []
        },
        {
        	"group": "General",
            "key": "none",
            "name": "Name",
            "data-type": "varchar [27]",
            "constraints": [
                "NOT NULL"
            ]
        },
        {
        	"group": "Contact",
            "key": "none",
            "name": "Mobile",
            "data-type": "char [10]",
            "constraints": [
            	"UNIQUE",
                "NOT NULL"
            ]
        }
    ],
    "relationships": []
}'
</pre>

**RESPONSE**

```javascript
{
    "code": 200,
    "message": "Entity created",
    "ref": referenceID
}
```

### Read All Entities

<pre>
curl --location --request GET '<b>URL</b>/read-entities'
</pre>

**RESPONSE**

```javascript
{
    "code": 200,
    "message": "Entities Read"
    "data": [
        {
            "id": referenceID,
            "name": entityName
        },
        ...
    ]
}
```

### Read Particular Entity

<pre>
curl --location --request GET '<b>URL</b>/read-entity?id=<b>referenceID</b>'
</pre>

**RESPONSE**

```javascript
{
    "code": 200,
    "message": "Entity Read"
    "data": {
        ENTITY
    }
}
```

### Update Student Record

<pre>
curl --location --request PATCH '<b>URL</b>/update-entity'
</pre>

**RESPONSE**

```javascript
{
    "code": 404,
    "message": "This route is under construction. Refer to the API Documentation for alternative approaches.",
    "docAt": "https://easy-dbms.web.app/doc.html"
}
```

### Delete Particular Entity

<pre>
curl --location --request DELETE '<b>URL</b>/delete-entity?id=<b>referenceID</b>'
</pre>

**RESPONSE**

```javascript
{
    "code": 200,
    "message": "Entity Deleted"
}
```
