const notesRouter = require('express').Router();
const Note = require ('../models/note')

// endpoint to get all the notes
notesRouter.get('/', (request, response) => {
    Note.find({}, {})
        .then (notes => {
             response.status (200).json (notes);
        }); 
}); 
  

// creates a new resource based on the request data
notesRouter.post('/', (request, response) => {
    // prepare an object to store it in the collection
    const note = new Note(request.body);
    note.save()
        .then(() => {
            response.status (201).json ({message: 'note created successfully'});
        });
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