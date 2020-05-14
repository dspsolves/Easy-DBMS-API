# Easy-DBMS Development Plan

Starting with the fundamental component - **DATA** !
- what all data is necessary for a DB to function ? `Entity Information`
- how will it be collected ? `Web Interface`
- where will it be stored ? `JSON Files`

Ohkayyy. How to actually start developing ?

## Step 1 - Define Structure of Data

Defining the structure before the actual data starts coming in as it should be known beforehand that how the incoming data would be structured.

### Front-End

*important and urgent*
- :heavy_exclamation_mark:  design a basic UI
- :heavy_exclamation_mark:  collect data from user to create an entity-relationship diagram
- :heavy_check_mark:  convert this data to back-end readable format; `JSON`

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:  optimize UI keeping UX in mind

### Back-End

*important and urgent*
- :heavy_check_mark:  read incoming request's body for `json` data
- :heavy_check_mark:  interpret entity info
- :heavy_check_mark:  store into respective `.json` files
- :heavy_check_mark:  provide CRUD functionality

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:  connect with DB
- :heavy_minus_sign:  generate respective SQL
- :heavy_minus_sign:  update DB structure
- :heavy_minus_sign:  ~refresh user's view~

## Step 2 - Collect and Store Data
Collecting data from the user or migrating from another format and storing it somewhere either on server or cloud not in proper DBMS right now.

### Front-End

*important and urgent*
- :heavy_exclamation_mark:

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:

### Back-End

*important and urgent*
- :heavy_exclamation_mark:

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:

## Step 3 - Provide CRUD Functionality and DB Integration
Providing CRUD functionality for data, structure manipulation and integration with a DBMS of user's choice.

### Front-End

*important and urgent*
- :heavy_exclamation_mark:

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:

### Back-End

*important and urgent*
- :heavy_exclamation_mark:

*urgent but not important*
- :o:

*important but not urgent*
- :heavy_minus_sign:
