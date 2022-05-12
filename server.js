const express = require('express');

const messages = require('./messages');

const server = express();

const staticHandler = express.static('public');

server.use(staticHandler);

const bodyParser = express.urlencoded({extended:true});

let uid = Object.keys(messages).pop(); //5?

server.post('/', bodyParser, (req,res) => {

    // Two alternative methods for getting a unique ID:

    // const lastKey = Object.keys(messages).pop();
    //messages[lastKey+1] = req.body;

    uid++;
    //console.log(uid);
    //console.log(typeof uid);
    messages[uid] = req.body;

    res.redirect('/');
})

server.get('/', (req,res)=>{

    let myHtml = '';

    for (const [key, value] of Object.entries(messages)) {
        //console.log(key, value);
        let userName = value.name;
        let userId = key;
        let userText = value.text;
        //console.log(userId, userName, userText)
        myHtml += `
        <div>
            <h4>${userName}</h4>
            <p>${userText}</p> 
            <form action="/delete" method="POST">
            <label>
                <button name="messageToDelete" value="${userId}">Delete Me</button>
            </label>
            </form>
        </div>\n`;
    }

    const html =/* html */ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>server...</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>Title</h1>
        <form method='POST'>
        <h3>Please write message here</h3>
            <label for='name'>
                Name:
                <input name="name" type="text" required maxlength="50" placeholder="Enter your name..." />
            </label>
            <label for='text'>
                Message:
                <textarea name="text" required maxlength="140" placeholder="Write a message..." rows="4" cols="50"></textarea>
            </label>
            <button type='submit'>Submit Please</button>
        </form>
        ${myHtml}
    </body>
</html>
`;

    res.send(`${html}`);

})

server.post('/delete', bodyParser, (req, res) => {
    let messageToDelete = req.body.messageToDelete;
    delete messages[messageToDelete];
    res.redirect('/');
});

let PORT = 3333;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
