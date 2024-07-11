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

const token = "توكنك";

const payload = {
  'content': '> # **نكح امك في كل مكان نيك اختك في كل زمان شق مصارين امك و وضع بطيزمك الإعلام اني الي نكت امك وجعلت ابوك لزيبيان اني الي نكت امك لدرجه خليتك حيران اني الي نجت امك بالزمكان افجر مصارين امك واخليه اكله للحيوان يبن الدعاره يبن السكران رح اخلي كسمك يجي فوق زبي واخليه ذيبان اادحش بكسمك للحديد والنار واخليه ميعان يبن الزنى يبن الخرعان بخلي زبي بكس امك وبكس الي جابك يبن القحبه انيك كس امواتك انيك كل شخص من سلالتك بقطع راس امك واخليه بكسها يبن الدعاره يبن الميته اشق كسمك اشوي مصارين امك.اكل احشاء امك واسويها شطيره واكلها اكل مصارين اختك اشوي مصارين امك انيك كسختك انيك كسمك اطبخ كسمك اشوي مصارين امك افجر طيزمك احشي بكس اختك القنابل واطشرها واسويها أشلاء بعطي كسمك للكلاب يبن الضعيفه شافو امك ينيكوها بكل زمان يبن الدعارة ناجو كسمك ونجتها وخليتها ميته من نيج دخول زبي باعماق كسمك والقذف داخله نيكمك بالجحيم شق امك بالهاكاي نجنا كسمك وكسخت.ك انا و ترولي و ليون و نايتمير  ننيك ام امك<@ اقصد كل المتعارك معهم او متشمكل معهم> @here'
};

const header = {
  'authorization': token
};

// قم بإنشاء مصفوفة لتخزين IDs القنوات في الترتيب المطلوب
const channels = [
"ايدي روم",

];

let currentIndex = 0; // متغير لتتبع القناة الحالية

function sendMessage() {
  const channelId = channels[currentIndex];
  const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
  request.post(url, {
    headers: header,
    json: payload
  }, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(body);
  });
  currentIndex = (currentIndex + 1) % channels.length; // التحقق من القناة التالية في كل دورة
}

// تعيين وقت الانتظار بين كل دورة من الرسائل (بالمللي ثانية)
const intervalTime = 1000;

// بدء الدورة المتكررة لإرسال الرسائل
setInterval(sendMessage, intervalTime);
// https://ra3dstudio.com CopyRight Codes

// السورس الاساسي لـ اظهار رابط موقعك في ريبل ات وجعل البوت الخاص فيك 24ساعة
// https://ra3dstudio.com CopyRight Codes

setInterval(function() {
  var now = new Date();
  console.log(now.toLocaleTimeString());
}, 1000);
