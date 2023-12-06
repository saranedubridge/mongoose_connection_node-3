// Simple web Server
const express= require('express')
const app = express();
const cors=require('cors')
const mongoose=require('mongoose');
const logger=require('./utils/logger');
const config=require('./utils/config');
const notesRouter=require('./controllers/notes')
const middleware=require('./utils/middleware');

mongoose.set('strictQuery',false);
logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
})
    .catch((err) => {
        logger.error('Error connecting to MongoDB',logger.error.message);
});


//middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);


app.use('/api/notes',notesRouter);  
app.use(middleware.unknownEndpoint);



 module.exports=app;