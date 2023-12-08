const notesRouter = require('express').Router();
const Note = require ('../models/note');
const jwt=require("jsonwebtoken");
const config=require("../utils/config");
const User=require('../models/user')

// endpoint to get all the notes
notesRouter.get('/', (request, response) => {
    Note.find({}, {})
        .then (notes => {
             response.status (200).json (notes);
        }); 
}); 
  
// authoraization

const getTokenFrom=(request)=>{
    const authorization=request.get('authorization')

    if(authorization && authorization.startsWith('bearer ')){
        return authorization.replace('bearer ','')
    }
    return null;
}

// creates a new resource based on the request data
notesRouter.post('/', async(request, response) => {
    // get the request body content
    const body = request.body;

    // get the token
    const token = getTokenFrom(request);

    // verify the token
const decodedToken=jwt.verify(token,config.SECRET)

// if the token is not valid,return an errror
if(!decodedToken.id){
    return response.status(401).json({error:"token Invalid"});
}
const user = await User.findById(decodedToken.id);

// prepare the note to push to db

const note= new Note({
    content:body.content,
    important: body.important,
    user:user._id
});

// save the note to note collection

const savedNote= await note.save();

// push the id of the savedNote to the user collection

user.notes=user.notes.concat(savedNote._id);

await user.save();

response.json(savedNote);

});


// fetches a single resource based on id
notesRouter.get('/:id', (request, response) => {
    const id = request.params.id;
    
    Note.findById(id)
        .then (note  =>{
             if (note) {
                 response.status (200).json (note);
            } else {
                 response.status (404).json ({message: 'id does not exists'});
            }
        });
});


// deletes a single resource based on id
notesRouter.delete('/:id', (request, response) => {
    // get the id
    const id = request.params.id;
    Note.findByIdAndDelete(id)
        .then((deletedNote) => {
    
            if(deletedNote){
                 response.status (204).json ({message: 'note deleted successfully'});
            } else {
                 response.status (404).json ({message: 'id does not exists'});
            }
        });
    });


     // replaces the entire note object identified by an id
notesRouter.put('/:id', (request, response) => {
    const id= request.params.id;
    const noteToReplace= request.body;


    Note.findByIdAndUpdate (id, noteToReplace)
         .then( (updatedNote) => {
             if(updatedNote) {
                response.status (200).json ({message: 'note updated successfully'});
             } else {
                 response.status (404).json ({message: 'id does not exists' });
             }
         });
});



notesRouter.patch('/:id', (request, response) => {
    const id = request.params.id;
    const noteToPatch = request.body;
    Note.findByIdAndUpdate (id, noteToPatch)
        .then((updatedNote) => {
             if(updatedNote) {
                response.status (200).json ({message: 'note updated successfully'});
         } else {
             response.status (404).json ({message: 'id does not exists' });
         }
      
        });
});
    

module.exports = notesRouter;