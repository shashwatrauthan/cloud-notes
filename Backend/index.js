const connectToMongo = require("./db.js");
const express = require('express');
const cors = require('cors');
const Notes = require("./models/Notes.js");


connectToMongo();


const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require("./routes/notes"));


if(process.env.NODE_ENV == "production")
{
  const path = require("path");

  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'../',"cloud-Notes","build")));
    res.sendFile(path.resolve(__dirname,'../',"cloud-Notes","build","index.html"));
  })
}

app.listen(port, () => {
  console.log(`Cloud Notes(Backend) listening on port ${port}`)
})


