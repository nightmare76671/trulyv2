const fs = require('fs'); 
 const axios = require('axios').default; 
 const express = require('express'); 
  
 const app = express(); 
 const http = require('http'); 
 const server = http.createServer(app); 
  
 const tokens = [ 
   
'توكنك'
 ]; 
  
 const payload = { 
   'content': '>#**تسب زبي يبن القحبه و تحسب قضيبي بيسكت لكس امك يبن الفواجر انيك كسختك لكسم اهلك يبن المكبوته ادحس العتاد بكسمك و انيج كسمك بكل زمان يبن شراميط تشرد كس امك يبن العاهرة لك ادعس على كس امك و ابرهن كسمين امك يبن المنيوكه انا الكابوس فحلمك الي يخلي ابوك ملبوس شرموط يحب يمص الزوبر الي خلا كس امك مفتوح يبن المنيوكه ابعبص كسم اهلك يبن الزانيه و انيك كسم اهلك ب ايري الجبار الي خلا كسمك فتات يبن المنيوكه انيك كسختك لكسم اهلك يبن الفاجرة بشل عظام امك يبن القحبه و ابعبص كسم اهلك يبن الدواعر ينعل كسم امك يبن الالف قحبه انيك كسمك يبن المقحوبه نيك كسم اسلافمك لكسم اخواتك لكسم اهلك يبن الشرمطه انيك كسمك يبن المقحبه و انعل كسختينمك يبن الفواجر لك بسطح كس امك يبن الزربه و انعل كس امك يبن المقتوله بطرح كس امك يبن العاهرة ينعل كس امك يبن الفواجر شوف كيف بنيك كس امك دحين يبن العاريه بجلط عروقمك يبن الدواعر و انيك كسختك يبن المماحن انا الي بنيجمك دحين و بزغب في رحممك يبن الشرموطه لاضرب كسمك لكسختك لكسم اهلك لكسم اسلافك يخو شراميط ينعل كسم اهلك يبن الالف قحبه بدمر كسمك يبن منيوكه ينعل كسمك يبن مشخوله ولك ادمر كسخواتمك يبن الرقاصه ببسط كس امك و انيك كس امك تحت البيت و اشطر كسمك بكل الابعاد يبن المنيوكه صدقني لا انيك كسختك اليوم يبن الدعارة ينعل كس اخواتمك يبن المنيوكات اضرب كسمك لكسختك لكسم اهلك يبن العاريه ينعل كس امك يبن الفاجرة نيك كسمك لكسختك لكسم اسلافك لكسم احيائك اشق كسهلك يبن بلاعه العيوره انيك كسمك لكسم اخواتك يبن الشرموطه بنيك كس امك ب اربع ايادي و احط الطاقه البنفسجيه بكس اختك و اجعل طبونمك وردي زيادة عن الزوم يبن المقحوبه بنيك كس امك بعقد سماوي يبن المنيوكه و ادحس العتاد بحتشون يماك  يبن الزانيه تعال انيك كسم احيائك اليوم لاسبب رعب لكس امك يبن الشرموطات ينعل كس امك يبن الداعرة ولك انيك كسختين اهل اهلك يبن المنيوكه انيك كسمك بكل مرونه يبن شرموطه نيك كسم اهلك يبن الداعرة اضرب كسمك لكسم اخواتك يبن الزانيه بغمي كس اختك يبن المكبوته و بضرب كس امك يبن الشرموطه ينعل كسمين امك يبن الالف قحبه بنيك كس امك و اجعل من كس امك شطيره ب الخردل و الكاتشب يبن الزانيه لك اخبط كس امك ارضا و اخلي كس امك يرتقي ل اعلي طبقات الدياثه يخو المقحوبه بشطر كسخوات اهلك المماحن الفواجر كسمكك @here(اعدائي)** ' 
 }; 
 const groupIds = [ 
   "1241108301853491290", 
    "1245000304156741703", 
     "1137034796892168323", 
      "1138169174837973155", 
      "1138169199194280018", 
       "1252358224972087471", 
       "1256668691211227187"
 ]; 
  
 let currentTokenIndex = 0; 
 let currentGroupIndex = 0; 
  
 let cachedData = {}; 
 if (fs.existsSync('cachedData.json')) { 
   const data = fs.readFileSync('cachedData.json'); 
   cachedData = JSON.parse(data); 
 } 
  
 function saveCachedData() { 
   fs.writeFileSync('cachedData.json', JSON.stringify(cachedData)); 
 } 
  
 function sendRequest() { 
   const currentToken = tokens[currentTokenIndex]; 
   const currentGroupId = groupIds[currentGroupIndex]; 
  
   const header = { 
     'Authorization': currentToken 
   }; 
  
   if (cachedData[currentTokenIndex] && cachedData[currentTokenIndex][currentGroupId]) { 
     const lastRequestTime = cachedData[currentTokenIndex][currentGroupId]; 
     const currentTime = new Date().getTime(); 
     const timeDiff = currentTime - lastRequestTime; 
  
     if (timeDiff < 3000) { 
       const retryInterval = 3000 - timeDiff; 
       setTimeout(sendRequest, retryInterval); 
       return; 
     } 
   } 
  
   axios.post(`https://discord.com/api/v10/channels/${currentGroupId}/messages`, payload, { 
     headers: header 
   }) 
   .then(response => { 
     console.log(response.data); 
  
     const intervalBetweenGroups = 3000;  
  
     currentTokenIndex = (currentTokenIndex + 1) % tokens.length; 
     currentGroupIndex = (currentGroupIndex + 1) % groupIds.length; 
  
     if (!cachedData[currentTokenIndex]) { 
       cachedData[currentTokenIndex] = {}; 
     } 
     cachedData[currentTokenIndex][currentGroupId] = new Date().getTime(); 
     saveCachedData(); 
  
     setTimeout(sendRequest, intervalBetweenGroups); 
   }) 
   .catch(error => { 
     if (error.response && error.response.status === 429) { 
  
       console.error(`Rate limited. Retrying after exponential backoff.`); 
       const retryAfter = error.response.headers['retry-after'] || 10;  
       setTimeout(sendRequest, retryAfter * 1000); 
     } else { 
       console.error(`Error: ${error.message}`); 
       const retryInterval = 1000;  
       setTimeout(sendRequest, retryInterval); 
     } 
   }); 
 } 
  
 sendRequest(); 
  
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
