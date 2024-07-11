const axios = require('axios').default;
const Bottleneck = require('bottleneck');

class AutoReplier {
    constructor(tokens, channelIds, userIds, messages) {
        this.tokens = tokens;
        this.channelIds = channelIds;
        this.userIds = userIds;
        this.messages = messages;
        this.lastProcessedMessageIds = new Map();
        this.lastCheckedMessageIds = new Map();
        this.limiter = new Bottleneck({ maxConcurrent: 1, minTime: 2300});
        this.pendingMessages = [];
    }

    async getUserMessages(token, channelId) {
        const userMessages = [];
        try {
            const headers = { 'authorization': token };
            let url = `https://discord.com/api/v10/channels/${channelId}/messages?limit=50`;
            if (this.lastCheckedMessageIds.has(channelId)) {
                url += `&after=${this.lastCheckedMessageIds.get(channelId)}`;
            }
            const response = await axios.get(url, { headers });
            const messages = response.data;

            for (const message of messages) {
                if (this.userIds.includes(message.author.id) && !this.lastProcessedMessageIds.get(channelId)?.has(message.id)) {
                    userMessages.push({ userId: message.author.id, messageId: message.id, channelId });
                    if (!this.lastProcessedMessageIds.has(channelId)) {
                        this.lastProcessedMessageIds.set(channelId, new Set());
                    }
                    this.lastProcessedMessageIds.get(channelId).add(message.id);
                }
            }

            if (messages.length > 0) {
                this.lastCheckedMessageIds.set(channelId, messages[0].id);
            }
        } catch (error) {
            console.error(`An error occurred while fetching user messages from channel ${channelId}: ${error}`);
        }
        return userMessages;
    }

    async replyToMessage(session, token, messageId, channelId, retryCount = 0) {
        try {
            const headers = { 'authorization': token };
            await session.post(`https://discord.com/api/v10/channels/${channelId}/typing`, {}, { headers });
            const currentMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
            const replyPayload = { content: currentMessage, message_reference: { message_id: messageId } };
            await session.post(`https://discord.com/api/v10/channels/${channelId}/messages`, replyPayload, { headers });
            console.log(`Replied to message ID ${messageId} in channel ${channelId} with: ${currentMessage}`);
        } catch (error) {
            console.error(`An error occurred: ${error}`);
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'] || 10;
                console.log(`Rate limited. Retrying in ${retryAfter} seconds...`);
                await new Promise(resolve => setTimeout(resolve, (parseInt(retryAfter) + 1) * 2300));
                this.pendingMessages.push({ session, token, messageId, channelId, retryCount });
            } else if (retryCount < 3) {
                console.log('Retrying in 10 seconds...');
                await new Promise(resolve => setTimeout(resolve, 2300));
                this.pendingMessages.push({ session, token, messageId, channelId, retryCount: retryCount + 1 });
            } else {
                console.error(`Failed to reply to message ID ${messageId} after 3 attempts.`);
            }
        }
    }

    async processPendingMessages() {
        while (this.pendingMessages.length > 0) {
            const { session, token, messageId, channelId, retryCount } = this.pendingMessages.shift();
            await this.limiter.schedule(() => this.replyToMessage(session, token, messageId, channelId, retryCount));
        }
    }
}

async function replyToUsers(autoReplier) {
    while (true) {
        for (const token of autoReplier.tokens) {
            const session = axios.create();
            for (const channelId of autoReplier.channelIds) {
                const userMessages = await autoReplier.getUserMessages(token, channelId);
                for (const { messageId, channelId } of userMessages) {
                    await autoReplier.limiter.schedule(() => autoReplier.replyToMessage(session, token, messageId, channelId));
                }
            }
        }
        await autoReplier.processPendingMessages();
        await new Promise(resolve => setTimeout(resolve, 2300));
    }
}

const tokens = ["توكنك"];
const channelIds = [
"روم ثاني", 
  "روم اول" 
];
const userIds = [
    "ايدي اثنينص", 
"ايدي واحد"

     
];

const messages = [
'كسمك',
'كسختك' 

];

const autoReplier = new AutoReplier(tokens, channelIds, userIds, messages);
replyToUsers(autoReplier);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(`
    <body>
      <center><h1>كسمك يا علاوي</h1></center>
    </body>
  `);
});

app.get('/webview', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <head>
        <title>كسمك يا لحن</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe width="100%" height="100%" src="https://axocoder.vercel.app/" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>
  `);
});

server.listen(8080, () => {
  console.log("im ready to nik ksm 3lawi..!");
  console.log('im ready to nik ksm l7n..!');
});
