const { Client } = require('discord.js-selfbot-v13'); 
 const express = require('express'); 
 const http = require('http'); 
  
 const tokens = [ 
   'توكنك' 
 ];  
 const targetUsers = [ 
   "ايدي مستخدم" 
 ]; 
 const targetChannels = [ 
   "ايدي الروم" 
 ]; 
 const initialDelay = 2000;  
 const typingDuration = 4 * 60 * 1000;  
 const shortTypingInterval = 10 * 1000;  
 const maxWords = 30;  
  
 const randomWords = [ 

 ];  
  
  
 const getRandomSentence = (words, length) => { 
   let sentence = ''; 
   for (let i = 0; i < length; i++) { 
     const randomWord = words[Math.floor(Math.random() * words.length)]; 
     sentence += `${randomWord} `; 
   } 
   return sentence.trim(); 
 }; 
  
 const repliedMessages = new Map(); 
  
 const shouldReply = (message) => { 
   const words = message.content.split(' '); 
   if (words.length > maxWords) { 
     return true; 
   } 
   return false; 
 }; 
  
 const clients = tokens.map(token => { 
   const client = new Client(); 
  
   client.once('ready', () => { 
     console.log(`Logged in as ${client.user.tag}`); 
   }); 
  
   client.on('messageCreate', async (message) => { 
     if (!targetUsers.includes(message.author.id) || !targetChannels.includes(message.channel.id)) return; 
  
     const channelId = message.channel.id; 
     const userId = message.author.id; 
  
     if (!shouldReply(message)) return; 
     if (repliedMessages.has(channelId) && repliedMessages.get(channelId) === message.id) return; 
  
     try { 
       const startTime = Date.now(); 
       while (Date.now() - startTime < typingDuration) { 
         message.channel.sendTyping(); 
         await new Promise(resolve => setTimeout(resolve, shortTypingInterval)); 
       } 
  
       const randomReply = getRandomSentence(randomWords, 90); 
       const replyMessage = await message.reply(randomReply); 
       repliedMessages.set(channelId, replyMessage.id); 
       console.log(`Replied to message: ${replyMessage.content}`); 
  
       const replyTime = Date.now(); 
       while (Date.now() - replyTime < typingDuration) { 
         message.channel.sendTyping(); 
         await new Promise(resolve => setTimeout(resolve, shortTypingInterval)); 
       } 
  
     } catch (error) { 
       console.error(`Error replying to message: ${error}`); 
  
       if (error.code === 429) { 
         console.log('Rate limited! Retrying after delay...'); 
         await new Promise(resolve => setTimeout(resolve, initialDelay)); 
       } else { 
         console.error('Encountered an unexpected error. Retrying...'); 
         await new Promise(resolve => setTimeout(resolve, initialDelay)); 
       } 
     } 
   }); 
  
   client.on('error', (error) => { 
     console.error('Client encountered an error:', error); 
   }); 
  
   client.login(token); 
   return client; 
 }); 
  
 const app = express(); 
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
   console.log("Server is running on http://localhost:8080"); 
   console.log("I'm ready to nik ksm 3lawi..!"); 
   console.log("I'm ready to nik ksm l7n..!"); 
 });
