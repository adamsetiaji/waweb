// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const express = require('express');
const { phoneNumberFormatter } = require('./helpers/formatter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));




venom
    .create({
        session: 'session-whatsapp-api', //name of session
        multidevice: true // for version not multidevice use false.(default: true)
    })
    .then((client) => listenPort(client))
    // .then((client) => start(client))
    // .then((client) => console.log(client))
    .catch((erro) => {
        console.log(erro);
    });
function listenPort(client){
    app.get('/', (req, res)=>{
        res.status(200).json({
            status: true,
            message: "Sip Mantap"
        });
    })

    start(client);

    app.listen((process.env.PORT || 5000), function(){
        console.log('App Running on http://localhost:'+ (process.env.PORT || 5000))
    });
}


function start(client) {
    // sendMessage
    app.post('/send-message', (req, res) =>{
        const number = phoneNumberFormatter(req.body.number);
        // const number = req.body.number;
        const message = req.body.message;

        client
        .sendText(number,message)
        .then(response =>{
            res.status(200).json({
                status: true,
                response:response
            });
        })
        .catch(err =>{
            res.status(500).json({
                status: false,
                response:err
            });
        });
    });

    // Auto Reply Message
    client.onMessage((message) => {
        if (message.body === 'norek' && message.isGroupMsg === false) {
        client.sendText(message.from, 'A.n. Muhamad Adam Setiaji\nBank BCA : 1540607962\nBank Mandiri : 1590002908761\nBank BRI : 129301002565509')
        }

        if (message.body === 'Muaahh' && message.isGroupMsg === false) {
        client.sendText(message.from, 'Muuuahhh')
        }

        if (message.body === 'utang' && message.isGroupMsg === false) {
        client.sendText(message.from, 'Masih Utang _*PUASA*_ 6 KALI!!')
        }
    });
}

// app.listen(port, function(){
//     console.log('App Running on http://localhost:'+port)
// });
