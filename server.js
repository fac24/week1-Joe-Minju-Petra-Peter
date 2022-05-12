const express = require("express");

const messages = require("./messages");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);

const bodyParser = express.urlencoded({ extended: true });

let uid = Object.keys(messages).pop(); //5?

server.post("/", bodyParser, (req, res) => {
  // Two alternative methods for getting a unique ID:

  // const lastKey = Object.keys(messages).pop();
  //messages[lastKey+1] = req.body;

  uid++;
  //console.log(uid);
  //console.log(typeof uid);
  messages[uid] = req.body;

  res.redirect("/");
});

server.get("/", (req, res) => {
  let myHtml = "";

  for (const [key, value] of Object.entries(messages)) {
    //console.log(key, value);
    let userName = value.name;
    let userId = key;
    let userText = value.text;
    //console.log(userId, userName, userText)
    myHtml += `
        <div id="message-display">
            <h4 id="username">${userName}</h4>
            <p id="posted-message">${userText}</p> 
            <form action="/delete" method="POST" id="delete-message">
            <label>
                <button name="messageToDelete" value="${userId}" id="delete-button">Delete Me</button>
            </label>
            </form>
        </div>\n`;
  }

  const html = /* html */ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>server...</title>
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    </head>
    <body>
        <h1>Title</h1>
        <form method='POST' id="post-message">
        <h3>Please write message here</h3>
            <label for='name' id="name-input-label">
                Name:
                <input name="name" type="text" required maxlength="50" placeholder="Enter your name..." id="name-input" />
            </label>
            <label for='text' id="message-input-label">
                Message:
                <textarea name="text" required maxlength="140" placeholder="Write a message..." rows="4" id="message-input"></textarea>
            </label>
            <button type='submit' id="submit-button">Submit Please</button>
        </form>
        ${myHtml}
    </body>
</html>
`;

  res.send(`${html}`);
});

server.post("/delete", bodyParser, (req, res) => {
  let messageToDelete = req.body.messageToDelete;
  delete messages[messageToDelete];
  res.redirect("/");
});

// Our original code:
// let PORT =  3333;

// Mentor's suggestion:
const PORT = process.env.PORT || 3000;

// Heroku documentation suggestion:
/* let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
} */

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
