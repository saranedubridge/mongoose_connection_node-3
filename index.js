// Simple web Server
const express= require('express')
const app = express();
const cors=require('cors')
const mongoose=require('mongoose');

//middleware
app.use(cors());
app.use(express.json());


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




// set endpoint 

//to get all the notes

app.get ('/api/notes',(request,response)=>{
    Note.find({},{})
    .then(notes=>{
        response.status(200).json(notes)
    })
})


// // Create a new resources based on the request

// app.post('/api/notes',(request,response)=>{
//     notes = notes.concat(request.body)
//     response.status(201).json({message:"Note created sucessfully "})
// })



// // fetches a single resources based on id
// app.get('/api/notes/:id',(request,response)=>{
//     const  id = request.params.id;
//     const note=notes.find(note=>note.id==id);
//     if(note){
//         response.status(200).json(note);
//     }
//     else{
//         response.status(404).json({message:"id does not exists"})
//     }
   
// })


// // delete a single resources based on id

// app.delete('/api/notes/:id',(request,response)=>{
//     // get the id
//     const id =request.params.id
//     const note=notes.find(note=>note.id==id);
// notes= notes.filter(note=>note.id !=id);
// if(note){
//     response.status(204).json(note);
 
// }else{
//     response.status(404).json({message:'id does not exists '})
// }

// });

// // put request=> Replaces the entire notes identifed by api

// app.put('/api/notes/:id',(request,response)=>{
//     const id = request.params.id;
//     const noteToReplace=request.body;

//     notes=notes.map(note=>note.id==id?noteToReplace:note);
//     const note=notes.find(note=>note.id==id);
//     if(note){
//         response.status(200).json({message:'note Replaced'})
//     }else{
//         response.status(404).json({message:'Id does not exist'})
//     }
// });


// // patch request=> update or replace a single field  identifed by api

// app.patch('/api/notes/:id',(request,response)=>{
//     const id = request.params.id;
//     const noteToReplace=request.body;
// const note =notes.find(note=>note.id==id)
//   notes=  notes.map(note=>note.id==id?{...note,...noteToReplace}:note);
//     if(note){
//         response.status(200).json({message:"note patched"});

//     }else{
//         response.status(404).json({message:"id does not exist"});
//     }
// });

const PORT =3001;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

});



