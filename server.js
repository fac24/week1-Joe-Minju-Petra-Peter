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
    <div class="message-container">
        <div class="message-display">
            <h3 class="username">${userName}</h4>
            <p class="posted-message">${userText}</p> 
            <form action="/delete" method="POST" class="delete-message">
            <label>
                <button name="messageToDelete" value="${userId}" class="delete-button">Delete</button>
            </label>
            </form>
        </div>
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
        <h1>KAPOW!</h1>
        <section id="form-container">
            <form method='POST' id="post-message">
            <h2>Write your message here: </h3>
                <label for='name' id="name-input-label" class="form-labels">
                    Name:
                </label>
                <input name="name" type="text" required maxlength="50" placeholder="Enter your name..." id="name-input" class="form-inputs" />
                <label for='text' id="message-input-label" class="form-labels">
                    Message:
                </label>
                <textarea name="text" required maxlength="140" placeholder="Write a message..." rows="4" id="message-input" class="form-inputs"></textarea>
                <button type='submit' id="submit-button">Submit</button>
            </form>
        </section>
        <section id="message-thread">
            ${myHtml}
        </section>
    </body>
</html>
`;

  res.send(html);
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
