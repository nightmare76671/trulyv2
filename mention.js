const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const tokens = [

'توكنك';
];
const targetChannelId = 'ايدي قروب';
const mentionId = '<ايدي مستخدم@>';

const messages = [
   'شقمك', 
  'حرقمك',
  'بصعمك', 
  'فتحمك',
  'كسمك', 
  'كسختك', 
  'كسعمتك', 
  'كسخالاتك', 
  'كسخالك', 
  'كسم اسلافك', 
 'اسلق كسمك',
 'اقود طيزمك', 
 'اقرط ربمك', 
 'اخسف عرضمك', 
 'اشلمك', 
 'اعوقمك', 
 'اخنقمك', 
 'اقتلمك', 
 'افعطمك', 
 'اجلطمك', 
 'اقودمك', 
 'نيكمك', 
 'صفعمك', 
 'جلطمك', 
 'خرطمك', 
 'نباحمك', 
 'استفسارمك', 
 'هروبمك', 
 'قشعمك', 
 'غدرمك', 
 'سلخمك', 
 'فسخمك', 
 'يبن زبي', 
 'يبن الشرموطة', 
 'يبن المفعوصة', 
 'يبن المقعورة', 
 'يبن المقتولة', 
 'يبن المبعورة', 
 'اغشائمك', 
 'نطح كسمك', 
 'اختفائمك', 
 'ارباكمك', 
 'توترمك', 
 'توسلمك', 
 'تقعبرمك', 
 'تنشفمك', 
 'تخسفمك', 
 'طلبمك الرحمة', 
 'استنجادمك', 
 'استفزازمك', 
 'يبن المزعجة', 
 'نيكخواتمك', 
 'انطفائمك', 
 'انقهارمك', 
 'انحراقمك', 
 'خرقمك', 
 'تعسفمك', 
 'تخسفمك', 
 'تقشرمك', 
 'تعثرمك', 
 'انفصالمك', 
 'انخصالمك', 
 'انتحار دينمك', 
 'اخضاعمك', 
 'استغلالمك', 
 'تقرطمك', 
 'فشلمك', 
 'تعبمك', 
 'خرطمك', 
 'طحنمك', 
 'فقس عقلمك', 
 'نيك اهلمك', 
 'شوي جدمك', 
 'رفدمك', 
 'رعفمك', 
 'خلقمك', 
 'شوطمك', 
 'حنطمك', 
 'تكريسمك', 
 'تعبيسمك', 
 'تفريممك', 
 'تقليدمك', 
 'تعنيفمك', 
 'تخرفنمك', 
 'تبزيزمك', 
 'تعبمك', 
 'نيكهامك', 
 'نيكاصلمك', 
 'تعوبجمك', 
 'طخمك', 
 'طعنمك', 
 'نفخمك', 
 'صفقمك', 
 'شلقمك' 

];

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

async function sendMessage(token, channelId, message, mention) {
    try {
        await axios.post(`https://discord.com/api/v10/channels/${channelId}/typing`, {}, {
            headers: {
                Authorization: `${token}`
            }
        });

        setTimeout(async () => {
            try {
                const response = await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                    content: `${mention} ${message}`
                }, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    console.log(`Message sent successfully with token ${token}: ${message} to ${mention}`);
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.log(`Rate limit exceeded for token ${token}. Waiting for ${error.response.data.retry_after}ms and retrying...`);
                    await new Promise(resolve => setTimeout(resolve, error.response.data.retry_after));
                    await sendMessage(token, channelId, message, mention); 
                } else if (error.response && error.response.status === 401) {
                    console.error(`Unauthorized (401) with token ${token}:`, error.response.data);
                } else if (error.response && error.response.status === 400) {
                    console.error(`Bad Request (400) with token ${token}:`, error.response.data);
                } else {
                    console.error(`Failed to send message with token ${token}:`, error.response ? error.response.data : error.message);
                }
            }
        }, 400);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error(`Unauthorized (401) with token ${token}:`, error.response.data);
        } else {
            console.error(`Failed to start typing with token ${token}:`, error.response ? error.response.data : error.message);
        }
    }
}

async function main() {
    const interval = 1200;
    while (true) {
        const randomMessageIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomMessageIndex];

        await Promise.all(tokens.map(token => sendMessage(token, targetChannelId, randomMessage, mentionId)));

        await new Promise(resolve => setTimeout(resolve, interval));
    }
}

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
  console.log("ولكم بنيك كسم علاوي و لحن بزبي");
});

uptimeMonitor();
keepAlive();
main();
