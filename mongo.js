const mongoose=require('mongoose');

const url = `mongodb+srv://saranraj1803164:Guvi@cluster0.llda61a.mongodb.net/NotesDB?retryWrites=true&w=majority`

mongoose.connect(url)
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

//         // actual data to store in the database
        
//         const note = new Note({
//             content:"backend deployment to render.com",
//             important: true,
        
//         });

//         // Save a note in the db
//         note.save()
//                 .then((result)=>{
//                     console.log('note saved!');
//                     mongoose.connection.close();

//                 })


Note.find({},{})
    .then(notes=>{
        
        console.log(notes);
        mongoose.connection.close();
    })
    