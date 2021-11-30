const express = require('express');

const app = express();

app.use(express.json());

let data = require('./MOCK_DATA.json');


const dataa = {
    api_requested_by :"Your name",
    books : data
}

const logger = (name) =>{

    return (req,res,next) =>{

        dataa.api_requested_by = name
        next();
    }
}


// ========================================================================
// responding with Book data when GET request is made to homepage
// ========================================================================

app.get("/", logger("Kalpit Sharma"), (req, res) =>{
    res.send(dataa);
});


// ========================================================================
// posting data
// ========================================================================

app.post("/books", logger("Kalpit Sharma"), (req, res) =>{

    const newData = [...data, req.body];

    dataa.books = newData;

    // console.log(newData);

    res.send(dataa);
});


// ========================================================================
// filtering data from ID
// ========================================================================

app.get("/books/:id", logger("Kalpit Sharma"), (req, res) =>{

    const newData = data.filter((book) => book.id === Number(req.params.id));

    dataa.books = newData;

    // console.log(req.params.id, newData);

    res.send(dataa);
});


// ========================================================================
// patching data from ID
// ========================================================================

app.patch("/books/:id", logger("Kalpit Sharma"), (req, res) =>{

    
    const newData = data.map(book =>{
        if(req.params.id == book.id){
            
            if(req?.body?.author) book.author = req.body.author;

            if(req?.body?.book_name) book.book_name = req.body.book_name;

            if(req?.body?.pages) book.pages = req.body.pages;

            if(req?.body?.published_year) book.published_year = req.body.published_year;
        }

        return book;
    });

    dataa.books = newData;

    res.send(dataa);
});


// =========================================================================
// deleting data which match ID
// ========================================================================

app.delete("/books/:id", logger("Kalpit Sharma"), (req, res) =>{

    const newData = data.filter((book) => book.id != req.params.id);

    dataa.books = newData;

    res.send(dataa);
});

// =================================================
// listening on port 3000
// =================================================

app.listen(3000, (req, res) =>{
    console.log("Listening on port 3000");
})