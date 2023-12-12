const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRoute = express.Router();

//Create Book 
bookRoute.post('/create', expressAsyncHandler( async(req,res) => {
    const book = await Book.create(req.body);
    if(book){
        res.status(200);
        res.json(book);
    }else{
        res.status(500);
        throw new Error('Book creating failed');
    }
})
);
//Fetch Books 
bookRoute.get('/fetch', expressAsyncHandler( async(req,res) => {
    const book = await Book.find({});
    if(book){
        res.status(200);
        res.json(book);
    }else{
        res.status(500);
        throw new Error('Book creating failed');
    }
})
);
//Update Book
bookRoute.put('/:id', expressAsyncHandler( async(req,res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
            }
        );
        res.status(200);
        res.json(updatedBook);
    }else{
        throw new Error('Update Failed')
    }
})
);
//Delete Book
bookRoute.delete('/:id', expressAsyncHandler( async(req,res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
}catch(error){
    res.json(error);
}
})
);
module.exports = bookRoute;
