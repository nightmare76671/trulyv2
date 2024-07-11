const http = require('http');
const request = require('request');

const server = http.createServer((req, res) => {
  if (req.url === '/webview') {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <title>Your Web View</title>
        </head>
        <body style="margin: 0; padding: 0;">
          <iframe width="100%" height="100%" src="https://axocoder.vercel.app/" frameborder="0" allowfullscreen></iframe>
        </body>
      </html>
    `);
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.end("I'm alive");
  }
});

server.listen(8080, () => {
  console.log('Server online white_check_mark!!');
});

const tokens = ['توكنك'];
const targetChannelId = 'ايدي قروب';
const userId = '<@منشن>';
const delayBetweenReplies = 20;   

 const randomReplies = [ 

];
 
 client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}`);
 });
const repliesRandom = [
'كسمك', 
'كسختك', 
'شنقمك', 
'خنقمك', 
'بعصمك', 
'ركلمك', 
'زغبمك',  
'كسهلمك',
'رخدمك', 
'رفدمك', 
'قتلمك',  
'شلعمك', 
'كسمك', 
'كسختك', 
];

client.on('messageCreate', async (message) => {
   const isTargetUser = targetUsers.includes(message.author.id);
  const isTargetChannel = targetChannels.includes(message.channel.id);

function uptimeMonitor() {
  setInterval(() => {
    console.log(`Uptime: ${Math.floor(process.uptime())} seconds`);
  }, 300000);
}

function keepAlive() {
  setInterval(() => {
    console.log("Keep alive!");
  }, 300000);
}

function sendMessage(token, channelId, repliesrandom, userId) {
  return new Promise((resolve, reject) => {
    request.post(`https://discord.com/api/v8/channels/${channelId}/typing`, {
      headers: {
        Authorization: token
      }
    }, (error, response, body) => {
      if (error) {
        console.error(`Failed to send typing indicator with token ${token}:`, error);
        reject(error);
      } else {
        setTimeout(() => {
          request.post(`https://discord.com/api/v8/channels/${channelId}/messages`, {
            json: {
              content: `${userId} ${repliesrandom}`
            },
            headers: {
              Authorization: token,
              'Content-Type': 'application/json'
            }
          }, async (error, response, body) => {
            if (error) {
              console.error(`Failed to send message with token ${token}:`, error);
              reject(error);
            } else if (response.statusCode === 429) {
              console.log("Rate limit exceeded. Waiting and retrying...");
              await new Promise(resolve => setTimeout(resolve, 5000));
              await sendMessage(token, channelId, repliesrandom, userId);
              resolve();
            } else {
              console.log(`Message sent successfully with token ${token}: ${repliesrandom} to ${userId}`);
              resolve();
            }
          });
        }, 400);
      }
    });
  });
}

async function main() {
  const interval = 1200;
  while (true) {
    for (const token of tokens) {
      for (const reply of repliesRandom) {
        try {
          await sendMessage(token, targetChannelId, reply, userId);
        } catch (error) {
          console.error(`Failed to send message with token ${token}:`, error);
        }
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }
}

uptimeMonitor();
keepAlive();
main();

const express = require('express');
const app = express();

app.listen(3000, () => console.log("I'm Ready To nik ksm 7ossin..! 24H"));
app.get('/', (req, res) => {
  res.send(
    `<body>
      <center><h1>كسمك يا حسين</h1></center>
    </body>`
  );
});
};
