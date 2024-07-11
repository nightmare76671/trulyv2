const axios = require('axios');
const express = require('express');
const http = require('http');

const app = express();
const port = 8080;

const targetChannels = [
"ايدي قروب" 
];

const groupName = "اسم قروب";
let nextGroupNumbers = {};

targetChannels.forEach(channelId => {
    nextGroupNumbers[channelId] = Math.floor(Math.random() * 5) + 1;
});

async function changeGroupName(channelId) {
    try {
        const newGroupNumber = nextGroupNumbers[channelId];
        const newGroupName = `${groupName} ${newGroupNumber}`;
        const url = `https://discord.com/api/v10/channels/${channelId}`;
        const headers = {
            'Authorization': 'توكنك',
            'Content-Type': 'application/json'
        };
        const payload = {
            name: newGroupName
        };
        const response = await axios.patch(url, payload, { headers });

        if (response.status === 200) {
            console.log(`Room ${channelId} name changed to ${newGroupName}`);
        } else {
            console.log(`Error changing room ${channelId} name: ${response.status}`);
        }

        nextGroupNumbers[channelId] = Math.floor(Math.random() * 5) + 1;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            console.log(`Failed to change room ${channelId} name due to rate limits. Retrying after ${retryAfter} seconds.`);
            await new Promise(resolve => setTimeout(resolve, (retryAfter + 1) * 1000));
        } else {
            console.log(`Error: ${error}`);
        }
    }
}

function keepAlive() {
    setInterval(() => {
        console.log("The application is active and running...");
    }, 300000);
}

async function main() {
    while (true) {
        try {
            const promises = targetChannels.map(channelId => changeGroupName(channelId));
            await Promise.all(promises);
            await new Promise(resolve => setTimeout(resolve, 1400));
        } catch (error) {
            console.log(`Error during main program execution: ${error}`);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
    <html>
      <head>
        <title>شق راسم دارك</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe width="100%" height="100%" src="https://axocoder.vercel.app/" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>`);
});

app.listen(port, () => {
    console.log(`جاري نيك كسم دارك بالبورت ${port}`);
});

setInterval(() => {
    const now = new Date();
    console.log(now.toLocaleTimeString());
}, 10000);

keepAlive();
main(); 
