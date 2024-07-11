const request = require('request');



const token = "توكنك"; 

   
const payload = {

  'content': ">#**تسب زبي يبن القحبه و تحسب قضيبي بيسكت لكس امك يبن الفواجر انيك كسختك لكسم اهلك يبن المكبوته ادحس العتاد بكسمك و انيج كسمك بكل زمان يبن شراميط تشرد كس امك يبن العاهرة لك ادعس على كس امك و ابرهن كسمين امك يبن المنيوكه انا الكابوس فحلمك الي يخلي ابوك ملبوس شرموط يحب يمص الزوبر الي خلا كس امك مفتوح يبن المنيوكه ابعبص كسم اهلك يبن الزانيه و انيك كسم اهلك ب ايري الجبار الي خلا كسمك فتات يبن المنيوكه انيك كسختك لكسم اهلك يبن الفاجرة بشل عظام امك يبن القحبه و ابعبص كسم اهلك يبن الدواعر ينعل كسم امك يبن الالف قحبه انيك كسمك يبن المقحوبه نيك كسم اسلافمك لكسم اخواتك لكسم اهلك يبن الشرمطه انيك كسمك يبن المقحبه و انعل كسختينمك يبن الفواجر لك بسطح كس امك يبن الزربه و انعل كس امك يبن المقتوله بطرح كس امك يبن العاهرة ينعل كس امك يبن الفواجر شوف كيف بنيك كس امك دحين يبن العاريه بجلط عروقمك يبن الدواعر و انيك كسختك يبن المماحن انا الي بنيجمك دحين و بزغب في رحممك يبن الشرموطه لاضرب كسمك لكسختك لكسم اهلك لكسم اسلافك يخو شراميط ينعل كسم اهلك يبن الالف قحبه بدمر كسمك يبن منيوكه ينعل كسمك يبن مشخوله ولك ادمر كسخواتمك يبن الرقاصه ببسط كس امك و انيك كس امك تحت البيت و اشطر كسمك بكل الابعاد يبن المنيوكه صدقني لا انيك كسختك اليوم يبن الدعارة ينعل كس اخواتمك يبن المنيوكات اضرب كسمك لكسختك لكسم اهلك يبن العاريه ينعل كس امك يبن الفاجرة نيك كسمك لكسختك لكسم اسلافك لكسم احيائك اشق كسهلك يبن بلاعه العيوره انيك كسمك لكسم اخواتك يبن الشرموطه بنيك كس امك ب اربع ايادي و احط الطاقه البنفسجيه بكس اختك و اجعل طبونمك وردي زيادة عن الزوم يبن المقحوبه بنيك كس امك بعقد سماوي يبن المنيوكه و ادحس العتاد بحتشون يماك  يبن الزانيه تعال انيك كسم احيائك اليوم لاسبب رعب لكس امك يبن الشرموطات ينعل كس امك يبن الداعرة ولك انيك كسختين اهل اهلك يبن المنيوكه انيك كسمك بكل مرونه يبن شرموطه نيك كسم اهلك يبن الداعرة اضرب كسمك لكسم اخواتك يبن الزانيه بغمي كس اختك يبن المكبوته و بضرب كس امك يبن الشرموطه ينعل كسمين امك يبن الالف قحبه بنيك كس امك و اجعل من كس امك شطيره ب الخردل و الكاتشب يبن الزانيه لك اخبط كس امك ارضا و اخلي كس امك يرتقي ل اعلي طبقات الدياثه يخو المقحوبه بشطر كسخوات اهلك المماحن الفواجر كسمكك @here(اعدائي)**"  
};

const header = {

  'Authorization': token

};

const groupIds = [

"قروب واحد", 
"قروب اثنين" 


]; 
let currentGroupIndex = 0;

function sendRequest() {
  const currentGroupId = groupIds[currentGroupIndex];
  
  request.post(`https://discord.com/api/v9/channels/${currentGroupId}/messages?limit=50`, {
    headers: header,
    json: payload
  }, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    function keepAlive() {
  setInterval(() => {
    console.log("Keep alive!");
  }, 300000);
}
function uptimeMonitor() {
  setInterval(() => {
    console.log(`Uptime: ${Math.floor(process.uptime())} seconds`);
  }, 300000);
}
    if (response.statusCode >= 4000 && response.statusCode < 4000) {
      console.error(`Received ${response.statusCode} error. Trying again later.`);
      const retryInterval = 5000; 
      setTimeout(sendRequest, retryInterval);
      return;
    }
    
    console.log(body);
    
    const intervalBetweenGroups = 200;
    
    const intervalAfterMessage = 200;
    
    currentGroupIndex = (currentGroupIndex + 1) % groupIds.length;
    
    setTimeout(sendRequest, intervalBetweenGroups);
  });
}

sendRequest();

const express = require("express");
const app = express();

app.listen(() => console.log("I'm Ready To nik ksm iblis..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>كسمك حسين </h1></center
  </body>`);
});

setInterval(function() app.get('/webview', (req, res) => {
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
