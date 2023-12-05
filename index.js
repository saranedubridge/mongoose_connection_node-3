// Simple web Server
const express= require('express')
const app = express();
const cors=require('cors')
const mongoose=require('mongoose');
const logger=require('./utils/logger');
const config=require('./utils/config')

//middleware
app.use(cors());
app.use(express.json());



mongoose.connect(config.MONGODB_URI)
        .then(()=>{
            console.log('connected to Mongodb');
            // mongoose.connection.close();
        })
        .catch((err)=>{
            console.error(err);
        });


//         // save a note in the db
//         // define a schema

        const noteSchema=new mongoose.Schema({

            content:String,
            important:Boolean
        });

//         // Create a model 

        const Note= mongoose.model('Note',noteSchema, 'notes'); //collection name :notes




// set endpoint 

//to get all the notes

app.get ('/api/notes',(request,response)=>{
    Note.find({},{})
    .then(notes=>{
        response.status(200).json(notes)
    })
})


// Create a new resources based on the request

app.post('/api/notes',(request,response)=>{
    const note = new Note(request.body);
    note.save()
    .then(()=>{
     response.status(201).json({message:"Note created sucessfully "})
    });
   
    
});



// fetches a single resources based on id
app.get('/api/notes/:id',(request,response)=>{
    const  id = request.params.id;

    Note.findById(id)
    .then(note=>{
        if(note){
            response.status(200).json(note);
        }
        else{
            response.status(404).json({message:"id does not exits"});
        }
       
    })
    
})


// delete a single resources based on id

app.delete('/api/notes/:id',(request,response)=>{
    // get the id
    const id =request.params.id
    Note.findByIdAndDelete(id)
    .then((deletedNote)=>{
        if(deletedNote){
            response.status(204).json(deletedNote);
         
        }else{
            response.status(404).json({message:'id does not exists '})
        }
    })


});

// put request=> Replaces the entire notes identifed by api

app.put('/api/notes/:id',(request,response)=>{
    const id = request.params.id;
    const noteToReplace=request.body;

    Note.findByIdAndUpdate(id,noteToReplace)
    .then((updatedNote)=>{
        if(updatedNote){
            response.status(200).json({message:'note Replaced'})
        }else{
            response.status(404).json({message:'Id does not exist'})
        }
    })
   
});


// patch request=> update or replace a single field  identifed by api

app.patch('/api/notes/:id',(request,response)=>{
    const id = request.params.id;
    const noteToPatch=request.body;

Note.findByIdAndUpdate(id,noteToReplace)
.then((updatedNote)=>{
    if(updatedNote){
        response.status(200).json({message:"note patched"});

    }else{
        response.status(404).json({message:"id does not exist"});
    }
});
});

app.listen(config.PORT,()=>{
    console.log(`server running on port ${config.PORT}`);

});



