const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const tokens = [
    'توكنك'
];

const clients = [];
const messageContent = 'سبامك';
const intervalTime = 1000;

tokens.forEach(token => {
    const client = new Client({ checkUpdate: false });

    clients.push(client);

    client.on('ready', async () => {
        const serverId = 'ايدي السيرفر';
        
        const updateChannels = () => {
            const server = client.guilds.cache.get(serverId);
            if (!server) {
                console.error(`Cannot find server with ID: ${serverId}`);
                return;
            }
            
            return server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
        };

        let channels = updateChannels();

        setInterval(() => {
            channels.forEach(channel => {
                channel.send(messageContent)
                    .catch(error => {
                        if (error.code === 429) {
                            console.error('Rate limited. Waiting and retrying...');
                            setTimeout(() => {
                                channel.send(messageContent).catch(console.error);
                            }, error.retry_after);
                        } else {
                            console.error('Error occurred:', error);
                        }
                    });
            });
        }, intervalTime);

        setInterval(() => {
            channels = updateChannels();
        }, 60000); // Update every minute

        client.on('channelCreate', channel => {
            if (channel.guild.id === serverId && channel.type === 'GUILD_TEXT') {
                channels = updateChannels();
            }
        });
    });

    client.login(token);
});

app.get('/', (req, res) => {
    res.send(`<body><center><h1>كسمك يا علاوي</h1></center></body>`);
});

app.get('/webview', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
            <head>
                <title>ام علاوي</title>
            </head>
            <body style="margin: 0; padding: 0;">
                <iframe width="100%" height="100%" src="https://axocoder.vercel.app/" frameborder="0" allowfullscreen></iframe>
            </body>
        </html>
    `);
});

server.listen(8080, () => {
    console.log("im ready to nik ksm 3lawi!!");
});
