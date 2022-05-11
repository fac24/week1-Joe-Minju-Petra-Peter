const express = require('express');

const placeholderMessages = require('./messages');



const server = express();

const bodyParser = express.urlencoded({extended:true});

let users = Object.values(placeholderMessages)

//console.log(users)


let myHtml = '';

for (const user of users) {
    let userName = user.name;
    let userText = user.text;
    myHtml += `<div><h4>${userName}</h4><p>${userText}</p></div>\n`;
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

server.post('/', bodyParser, (req,res) => {

    users.push(req.body);

    res.redirect('/')
})

server.get('/',(req,res)=>{
    res.send(`${html}`)
})

let PORT = 3333;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
