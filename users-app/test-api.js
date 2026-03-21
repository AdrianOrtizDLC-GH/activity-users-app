const https = require('https');
function get(url){return new Promise((resolve,reject)=>{https.get(url,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve({status:res.statusCode, body:d, headers:res.headers}));}).on('error',reject);});}
function post(url, data){return new Promise((resolve,reject)=>{
 const options = new URL(url);
 options.method = 'POST';
 options.headers = {'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)};
 const req = https.request(options,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>resolve({status:res.statusCode, body:d}));});
 req.on('error',reject); req.write(data); req.end();
});}
(async()=>{
 console.log('GET start');
 const r = await get('https://peticiones.online/api/users?page=1');
 console.log('GET status', r.status);
 try{const j = JSON.parse(r.body); console.log('GET results count', j.results?.length, 'keys', Object.keys(j));}catch(e){console.error('parse fail', e.message);}
 const d=JSON.stringify({first_name:'tmp',last_name:'user',email:'tmp.user@example.com',image:'https://i.pravatar.cc/150?u=tmp.user@example.com'});
 const pr = await post('https://peticiones.online/api/users', d);
 console.log('POST status', pr.status, pr.body);
 const r2 = await get('https://peticiones.online/api/users?page=1');
 console.log('GET2 status', r2.status);
 try{const j2=JSON.parse(r2.body); console.log('GET2 count', j2.results?.length);}catch(e){console.error('parse2 fail', e.message);}
})();