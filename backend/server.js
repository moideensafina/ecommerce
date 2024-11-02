const app = require('./app');

const path = require("path");
const connectDatabase = require('./config/database');




connectDatabase()
app.get('/',(req,res)=>{
    res.send("hellom worlds")
})
app.listen(process.env.PORT,()=>{
    console.log(`my server listen  port${process.env.PORT} in ${process.env.NODE_ENV}`);

})

process.on('unhandledRejection',(err)=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to unhandled rejection error`);
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception error`);
    server.close(()=>{
        process.exit(1)
    })
})