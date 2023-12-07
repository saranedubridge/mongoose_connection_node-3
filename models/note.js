const mongoose= require('mongoose')


// define a schema
const noteSchema = new mongoose. Schema ({
    content: String,
    important: Boolean,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    });
    
    
    // create a model
    module.exports = mongoose.model('Note', noteSchema, 'notes'); // collection name: notes