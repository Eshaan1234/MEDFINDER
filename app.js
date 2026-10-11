var lg="en",VM="list",HL=0,S=null,pend=null,KEY="mednear_v2";
var PH=[{id:1,name:"Sanjeevani Medicals",d:.4,open:1,tel:"+910000000001"},{id:2,name:"CarePlus Pharmacy 24x7",d:.9,open:1,tel:"+910000000002"},{id:3,name:"HealthFirst Chemist",d:1.3,open:1,tel:"+910000000003"},{id:4,name:"Apna Dawakhana",d:1.8,open:0,tel:"+910000000004"},{id:5,name:"LifeLine Drug Store",d:2.4,open:1,tel:"+910000000005"},{id:6,name:"City Wellness Pharmacy",d:3.1,open:1,tel:"+910000000006"}];
var MEDS=[["Paracetamol 500mg",30],["Amoxicillin 500mg",120],["Cetirizine 10mg",25],["Pantoprazole 40mg",95],["Metformin 500mg",40],["ORS Sachet",22],["Azithromycin 500mg",115],["Ibuprofen 400mg",35],["Salbutamol Inhaler",160],["Insulin Glargine",780]];
function $(i){return document.getElementById(i)}
function t(k){return (L[lg]&&L[lg][k])||L.en[k]}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function P(id){return PH.filter(function(p){return p.id===id})[0]}
function seed(){var s={stock:{},rsv:[],nf:{}},n=Date.now();PH.forEach(function(p){s.stock[p.id]={};MEDS.forEach(function(m,i){var r=(p.id*7+i*13+p.id*i*3)%23;s.stock[p.id][m[0]]={q:r<5?0:r<9?r:r*3,t:n-((p.id+i)%9+1)*180000}})});return s}
function load(){try{var x=localStorage.getItem(KEY);if(x)S=JSON.parse(x);var l=localStorage.getItem("mn_lang");if(l&&L[l])lg=l;var th=localStorage.getItem("mn_th");if(th)document.documentElement.setAttribute("data-theme",th)}catch(e){}if(!S||!S.stock)S=seed();if(!S.nf)S.nf={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function toast(m){var e=$("toast");e.textContent=m;e.classList.add("show");setTimeout(function(){e.classList.remove("show")},2600)}
function ago(x){var m=Math.round((Date.now()-x)/60000);return m<1?"•":m<60?m+"m":Math.round(m/60)+"h"}
function st(q){return q===0?["out",t("out")]:q<=5?["low",t("low")+" · "+q]:["ok",t("ins")+" · "+q]}
function theme(){var d=document.documentElement,c=d.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"),n=c==="dark"?"light":"dark";d.setAttribute("data-theme",n);try{localStorage.setItem("mn_th",n)}catch(e){}}
function setLang(k){lg=k;var ap=$("app");ap.classList.remove("fade");void ap.offsetWidth;ap.classList.add("fade");try{localStorage.setItem("mn_lang",k)}catch(e){}applyL()}
function applyL(){document.documentElement.lang=lg;$("dm").options[0].textContent="🏪 "+t("pickup");$("dm").options[1].textContent="🛵 "+t("deliv");$("q").setAttribute("aria-label",t("ph"));drawDays();
 document.querySelectorAll("[data-i]").forEach(function(e){e.textContent=t(e.dataset.i)});
 document.querySelectorAll("[data-ph]").forEach(function(e){e.placeholder=t(e.dataset.ph)});
 $("lang").innerHTML=Object.keys(L).map(function(k){return '<button class="'+(k===lg?"on":"")+'" lang="'+k+'" aria-pressed="'+(k===lg)+'" onclick="setLang(\''+k+'\')">'+L[k].n+'</button>'}).join("");
 $("sort").innerHTML=[["dist","sd"],["price","sp"],["stock","ss"]].map(function(o){return '<option value="'+o[0]+'">'+t(o[1])+'</option>'}).join("");
 $("flt").innerHTML=[["all","fa"],["avail","fv"],["open","fo"]].map(function(o){return '<option value="'+o[0]+'">'+t(o[1])+'</option>'}).join("");
 renderR();renderRsv();renderD();renderRem()}
function tab(n){var v=$("v"+n);v.classList.remove("fade");void v.offsetWidth;v.classList.add("fade");if(n==2)CU=1;$("v1").hidden=n!=1;$("v2").hidden=n!=2;$("t1").className=n==1?"on":"";$("t2").className=n==2?"on":"";if(n==2)renderD();else renderR()}
function view(v){VM=v;$("b1").className=v=="list"?"on":"";$("b2").className=v=="map"?"on":"";renderR()}
function price(m,p){var b=MEDS.filter(function(x){return x[0]===m})[0][1];return Math.round(b*(0.94+((p.id*5)%7)/50))}
function mapSvg(rows){var s='<svg id="map" viewBox="0 0 320 220" role="img"><circle cx="160" cy="110" r="40" fill="none" stroke="var(--line)"/><circle cx="160" cy="110" r="80" fill="none" stroke="var(--line)"/><circle cx="160" cy="110" r="9" fill="var(--pri)"/><text x="160" y="132" font-size="9" text-anchor="middle" fill="var(--mut)">You</text>';
 rows.forEach(function(r){var a=(r.p.id*61+20)*Math.PI/180,x=160+Math.cos(a)*r.p.d/3.1*130,y=110+Math.sin(a)*r.p.d/3.1*88,c=r.q===0?"var(--ou)":r.q<=5?"var(--lo)":"var(--ok)";
  s+='<g class="pin" onclick="focusP('+r.p.id+')"><circle cx="'+x+'" cy="'+y+'" r="11" fill="'+c+'" opacity=".92"/><text x="'+x+'" y="'+(y+4)+'" font-size="11" text-anchor="middle" fill="#fff">+</text><text x="'+x+'" y="'+(y-15)+'" font-size="8.5" text-anchor="middle" fill="var(--ink)">'+r.p.d+' km</text></g>'});
 return s+'</svg>'}
function focusP(id){HL=id;renderR();var e=$("p"+id);if(e)e.scrollIntoView({block:"center"})}
function renderR(){renderIndia();var q=$("q").value.trim().toLowerCase(),b=$("res");
 if(!q){b.innerHTML='<div class="empty">🔎 '+t("ph")+'</div>';return}
 var m=MEDS.filter(function(x){return x[0].toLowerCase().indexOf(q)>-1});
 if(!m.length){b.innerHTML='<div class="empty">'+t("none")+': “'+esc(q)+'”</div>';return}
 var med=m[0][0],f=$("flt").value,so=$("sort").value;
 var rows=PH.map(function(p){var e=S.stock[p.id][med];return{p:p,q:e.q,t:e.t,pr:price(med,p)}});
 var best=rows.filter(function(r){return r.q>0&&r.p.open}).sort(function(a,b){return a.p.d-b.p.d})[0];
 if(f==="avail")rows=rows.filter(function(r){return r.q>0});if(f==="open")rows=rows.filter(function(r){return r.p.open});
 rows.sort(function(a,b){return so==="price"?a.pr-b.pr:so==="stock"?b.q-a.q:a.p.d-b.p.d});
 var n=PH.filter(function(p){return S.stock[p.id][med].q>0}).length;var MP=Math.min.apply(null,rows.filter(function(r){return r.q>0}).map(function(r){return r.pr}));
 var h='<p class="meta" style="margin:4px 0 10px"><b>'+med+'</b>'+(RX.indexOf(med)>-1?' <span class="badge low">Rx</span>':'')+' — '+t("av")+' '+n+'/'+PH.length+'</p>';
 if(n===0)h+='<div class="card"><b>😕 '+t("nostock")+'</b><div class="meta">Tap 🔔 Notify me on a pharmacy below, or ask your pharmacist/doctor about a same-salt generic. Never switch medicines on your own.</div></div>';if(VM==="map")h+=mapSvg(rows);
 if(!rows.length)h+='<div class="empty">'+t("none")+'</div>';
 rows.forEach(function(r){var s=st(r.q),pc=Math.min(100,r.q*3),k=r.p.id,nk=k+"|"+med,cheap=r.q>0&&r.pr===MP;
  h+='<div class="card'+(HL===k?" hl":"")+'" id="p'+k+'"><div class="ph"><div><h3>'+r.p.name+(best&&best.p.id===k?' <span class="badge best">★ '+t("best")+'</span>':'')+(cheap?' <span class="badge ok">💰 '+t("cheap")+'</span>':'')+'</h3><div class="meta">📍 '+r.p.d+' km '+t("away")+' · '+(r.p.open?"🟢":"🔴")+' · '+t("upd")+' '+ago(r.t)+'</div></div><div style="text-align:right"><div style="font-weight:700">₹'+r.pr+'</div><span class="badge '+s[0]+'">'+s[1]+'</span></div></div>'+
  '<div class="bar"><i style="width:'+pc+'%;background:var(--'+(s[0]==="ok"?"ok":s[0]==="low"?"lo":"ou")+')"></i></div><div class="acts">'+
  (r.q===0?'<button class="btn sec" onclick="notify(\''+nk+'\')">🔔 '+(S.nf[nk]?"✓ ":"")+t("nf")+'</button>':'<button class="btn" '+(r.p.open?"":"disabled")+' onclick="openR('+k+',\''+med+'\')">'+t("res")+'</button>')+
  '<a class="btn sec" href="tel:'+r.p.tel+'">📞 '+t("call")+'</a>'+(r.q>0?'<a class="btn sec" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(med+' is available at '+r.p.name+' ('+r.p.d+' km away) — via MedNear')+'">📤 '+t("share")+'</a>':'')+'</div></div>'});
 b.innerHTML=h;var key=med+so+f+VM+lg;b.classList.toggle("enter",key!==RK);RK=key}
function notify(k){S.nf[k]=!S.nf[k];save();if(S.nf[k])toast(t("nfd"));renderR()}
function openR(pid,m){pend={pid:pid,m:m};$("dh").textContent=m;$("ds").textContent=P(pid).name;$("dq").value=1;$("dn").value=U?U.name:"";$("rxb").hidden=RX.indexOf(m)<0;$("rxc").checked=false;$("rxf").value="";$("dm").value="Pickup";$("dlg").showModal()}
function confirmR(){var n=Math.max(1,parseInt($("dq").value)||1),e=S.stock[pend.pid][pend.m];if(n>e.q){toast(e.q+" max");return}if(RX.indexOf(pend.m)>-1&&!$("rxc").checked){toast("Prescription required for this medicine");return}
 e.q-=n;e.t=Date.now();S.rsv.unshift({u:U.name,dm:$("dm").value,rx:RX.indexOf(pend.m)>-1?($("rxf").files[0]?$("rxf").files[0].name:"declared"):"",pid:pend.pid,m:pend.m,q:n,nm:$("dn").value.trim()||"Guest",t:Date.now(),code:"MN"+Math.floor(1000+Math.random()*9000)});
 save();$("dlg").close();toast(t("done"));showOk(S.rsv[0]);renderR();renderRsv()}
function renderRsv(){var b=$("rsv");if(!S.rsv.length){b.innerHTML='<div class="empty">—</div>';return}
 b.innerHTML=S.rsv.map(function(r,i){if(!U||r.u!==U.name)return "";var left=Math.max(0,30-Math.floor((Date.now()-r.t)/60000));
  return '<div class="card"><div class="ph"><div><h3>'+esc(r.m)+' × '+r.q+'</h3><div class="meta">'+P(r.pid).name+' · '+esc(r.nm)+' · ⏱ '+left+' '+t("min")+'</div></div><span class="badge ok">'+t("code")+' '+r.code+'</span></div><div class="acts"><button class="btn" onclick="showOk(S.rsv['+i+'])">🔳 QR</button><button class="btn sec" onclick="cancelR('+i+')">'+t("can")+'</button></div></div>'}).join("")}
function cancelR(i){var r=S.rsv[i],e=S.stock[r.pid][r.m];e.q+=r.q;e.t=Date.now();S.rsv.splice(i,1);save();renderRsv();renderR()}
function renderD(){var pid=+$("psel").value||1;renderInc(pid);renderIns(pid);
 $("dbody").innerHTML=MEDS.map(function(m){var e=S.stock[pid][m[0]],s=st(e.q);
  return '<tr><td>'+m[0]+'</td><td><div class="q"><button onclick="adj('+pid+',\''+m[0]+'\',-5)">−</button><b>'+e.q+'</b><button onclick="adj('+pid+',\''+m[0]+'\',5)">+</button></div></td><td><span class="badge '+s[0]+'">'+s[1].split(" ·")[0]+'</span></td><td class="meta">'+ago(e.t)+'</td></tr>'}).join("")}
function adj(pid,m,d){var e=S.stock[pid][m],was=e.q;e.q=Math.max(0,e.q+d);e.t=Date.now();var k=pid+"|"+m;
 if(was===0&&e.q>0&&S.nf[k]){toast("🔔 "+m+" @ "+P(pid).name+" "+t("back"));S.nf[k]=false}
 save();renderD()}
function voice(){var R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){toast("Voice not supported in this browser");return}
 var r=new R();r.lang={en:"en-IN",hi:"hi-IN",mr:"mr-IN",bn:"bn-IN",ta:"ta-IN",te:"te-IN",gu:"gu-IN",kn:"kn-IN"}[lg];
 r.onresult=function(e){var s=e.results[0][0].transcript.toLowerCase(),h=MEDS.filter(function(m){return s.indexOf(m[0].split(" ")[0].toLowerCase())>-1})[0];$("q").value=h?h[0]:s;renderR()};
 try{r.start();toast("🎤 …")}catch(e){}}
var IC=-1;
var IN=[[68.2,23.7],[69.5,24.3],[70.6,24.9],[71.1,26.2],[70.0,27.6],[71.0,28.0],[72.3,29.4],[74.5,31.0],[74.8,32.3],[75.5,32.9],[74.0,34.5],[73.8,35.5],[75.5,36.9],[77.8,35.5],[78.9,34.3],[78.8,32.8],[78.5,31.8],[79.0,31.0],[80.2,30.5],[80.1,28.8],[81.9,27.9],[83.4,27.4],[84.7,27.0],[87.0,26.4],[88.1,26.5],[88.2,27.8],[89.0,27.3],[89.8,26.8],[92.0,26.9],[92.7,28.0],[95.0,29.2],[96.1,28.2],[97.3,28.2],[96.6,27.2],[97.0,26.0],[95.5,25.8],[94.7,24.0],[93.4,22.9],[93.0,22.0],[92.3,23.0],[92.0,24.2],[91.2,25.1],[90.0,25.2],[89.8,26.0],[89.0,26.3],[88.4,25.8],[88.4,25.0],[88.0,24.7],[88.7,24.0],[88.9,23.0],[88.9,21.7],[87.0,21.5],[86.5,20.3],[85.0,19.3],[84.0,18.5],[82.4,16.7],[81.5,16.0],[80.3,15.4],[80.1,13.5],[80.3,12.5],[79.9,11.5],[79.8,10.3],[78.9,9.2],[78.1,8.9],[77.5,8.1],[76.5,8.9],[75.8,11.0],[75.0,12.5],[74.7,13.8],[74.1,15.0],[73.4,16.5],[72.9,19.0],[72.8,20.5],[72.6,21.7],[72.5,22.5],[72.0,21.2],[70.9,20.7],[69.6,21.8],[68.9,22.3],[70.0,22.9],[69.2,23.0]];
var CT=[["Delhi",77.2,28.6],["Mumbai",73.1,19.1],["Pune",74.1,18.5],["Bengaluru",77.6,13.0],["Chennai",80.3,13.1],["Hyderabad",78.5,17.4],["Kolkata",88.4,22.6],["Ahmedabad",72.6,23.0],["Jaipur",75.8,26.9],["Lucknow",80.9,26.8],["Patna",85.1,25.6],["Bhopal",77.4,23.3],["Nagpur",79.1,21.1],["Kochi",76.4,9.9],["Chandigarh",76.8,30.7],["Guwahati",91.7,26.1],["Bhubaneswar",85.8,20.3],["Srinagar",74.8,34.1],["Visakhapatnam",83.2,17.7],["Indore",75.9,22.7]];
function inMed(){var q=$("q").value.trim().toLowerCase();if(!q)return -1;for(var i=0;i<MEDS.length;i++)if(MEDS[i][0].toLowerCase().indexOf(q)>-1)return i;return -1}
function city(ci){IC=ci;renderIndia();var e=$("icity");if(e)e.scrollIntoView({block:"nearest"})}
var GC=0,G={x:0,y:0,k:1,ci:-1,sel:-1,moved:0,st:[]},PT={};
function city(i){GC=i;renderIndia()}
var RX=["Amoxicillin 500mg","Azithromycin 500mg","Insulin Glargine","Salbutamol Inhaler","Metformin 500mg","Pantoprazole 40mg"];
function renderIns(pid){var low=[],out=0,e,pc=S.rsv.filter(function(r){return r.pid===pid}).length;
 var ok=0;MEDS.forEach(function(m){e=S.stock[pid][m[0]];if(e.q===0)out++;else if(e.q<=5)low.push(m[0]+' ('+e.q+')');else ok++});
 var tp=MEDS.map(function(m,i){return[m[0],(i*37+11)%40+5+((S.sr&&S.sr[m[0]])||0)]}).sort(function(a,b){return b[1]-a[1]}).slice(0,4);
 $("ins").innerHTML=chartHtml(ok,low.length,out,pid,CU)+'<div class="row"><div class="card"><div class="meta">'+t("pend")+'</div><b class="cu" data-n="'+pc+'" style="font-size:1.4rem">'+pc+'</b></div><div class="card"><div class="meta">'+t("out")+'</div><b class="cu" data-n="'+out+'" style="font-size:1.4rem;color:var(--ou)">'+out+'</b></div><div class="card"><div class="meta">'+t("low")+'</div><b class="cu" data-n="'+low.length+'" style="font-size:1.4rem;color:var(--lo)">'+low.length+'</b></div></div>'+(low.length?'<div class="card"><b>⚠ '+t("reord")+'</b><div class="meta">'+low.join(', ')+'</div></div>':'')+'<div class="card"><b>🔥 '+t("topS")+'</b>'+tp.map(function(x){return '<div class="meta">'+x[0]+' — '+x[1]+' 🔍</div>'}).join('')+'<div class="meta" style="margin-top:6px;font-size:.75rem">Sample demand plus searches made in this app.</div></div>';if(CU){CU=0;document.querySelectorAll("#ins .cu").forEach(count)}}
var G2=null,XC=["Surat","Kanpur","Thane","Vadodara","Ludhiana","Coimbatore","Madurai","Mysuru","Ranchi","Raipur","Dehradun","Goa","Thiruvananthapuram","Agra","Varanasi","Amritsar","Jodhpur","Nashik","Aurangabad","Kolhapur"];
function gW(){var mi=inMed();return mi>-1?MEDS[mi][0]+' medical store':'pharmacy'}
function gU(q){return 'https://www.google.com/maps/search/'+encodeURIComponent(q)+(G2?'/@'+G2[0]+','+G2[1]+',15z':'')}
function gHref(){var c=$('gcity').value.trim();$('gca').href='https://www.google.com/maps/search/'+encodeURIComponent(gW()+' in '+(c||'India'))}
function gBtns(){var mi=inMed(),q=[['🏥 '+t('nearme'),'pharmacy'],['🟢 '+t('fo'),'pharmacy open now'],['🌙 '+t('h24'),'24 hour pharmacy'],['💊 Jan Aushadhi','Jan Aushadhi Kendra']];if(mi>-1)q.unshift(['🔎 '+MEDS[mi][0].split(' ')[0]+' near me',MEDS[mi][0]+' medical store']);
 $('gl').innerHTML=q.map(function(x){return '<a class="btn sec" target="_blank" rel="noopener" href="'+gU(x[1])+'">'+x[0]+'</a>'}).join('')}
function gLoc(){var s=$('gst');if(!navigator.geolocation){s.textContent='Location is not supported on this device.';return}s.textContent='Finding you…';
 navigator.geolocation.getCurrentPosition(function(p){G2=[p.coords.latitude.toFixed(5),p.coords.longitude.toFixed(5)];s.textContent='📍 Location found — tap a button to open Google Maps right where you are.';gBtns()},function(){s.textContent='Location blocked. Allow location in your browser settings, or type your city below.'},{enableHighAccuracy:true,timeout:15000})}
function renderIndia(){var w=gW();if(!$('gcl').innerHTML)$('gcl').innerHTML=CT.map(function(c){return c[0]}).concat(XC).map(function(c){return '<option value="'+c+'">'}).join('');
 $('cc2').innerHTML=CT.map(function(c){return '<a class="chip" style="text-decoration:none" target="_blank" rel="noopener" href="https://www.google.com/maps/search/'+encodeURIComponent(w+' in '+c[0]+', India')+'">'+c[0]+'</a>'}).join('');gHref();if(G2)gBtns()}
var U=null,ROLE="c";
function users(){var u={};try{u=JSON.parse(localStorage.getItem("mn_users")||"{}")}catch(e){}if(!u["o:owner"])u["o:owner"]={name:"owner",role:"o",p:"1234",ph:1};return u}
function setRole(r){ROLE=r;$("ra").className=r=="c"?"on":"";$("rb").className=r=="o"?"on":"";$("apw").hidden=r!="o"}
function login(){var n=$("an").value.trim(),p=$("ap").value;if(!n||!p){toast(t("bad2"));return}
 var us=users(),k=ROLE+":"+n.toLowerCase();
 if(us[k]){if(us[k].p!==p){toast(t("bad"));return}U=us[k]}
 else{U={name:n,role:ROLE,p:p,ph:ROLE=="o"?+$("aph").value:0};us[k]=U;try{localStorage.setItem("mn_users",JSON.stringify(us))}catch(e){}}
 try{localStorage.setItem("mn_sess",k);sessionStorage.setItem("mn_sess",k)}catch(e){}
 $("ap").value="";applyRole()}
function logout(){U=null;try{localStorage.removeItem("mn_sess");sessionStorage.removeItem("mn_sess")}catch(e){}applyRole()}
function applyRole(){var a=!U;$("auth").hidden=!a;$("app").hidden=a;$("lo").hidden=a;$("uchip").textContent=U?(U.role=="o"?"🏪 ":"👤 ")+U.name:"";
 if(!U)return;$("t1").parentNode.style.display="none";
 if(U.role=="o"){$("psel").value=U.ph;$("psel").disabled=true;tab(2)}else{tab(1)}renderRsv();renderRem()}
function renderInc(pid){var h="";S.rsv.forEach(function(r,i){if(r.pid===pid)h+='<div class="card"><div class="ph"><div><h3>'+esc(r.m)+' × '+r.q+'</h3><div class="meta">'+esc(r.nm)+' · '+(r.dm=="Delivery"?"🛵 "+t("deliv"):"🏪 "+t("pickup"))+(r.rx?" · 📄 Rx: "+esc(r.rx):"")+' · '+ago(r.t)+'</div></div><span class="badge ok">'+t("code")+' '+r.code+'</span></div><div class="acts"><button class="btn" onclick="pickup('+i+')">✓ '+t("pick")+'</button></div></div>'});$("inc").innerHTML=h||'<div class="empty">—</div>'}
function pickup(i){S.rsv.splice(i,1);save();renderD()}
function demoLogin(r){setRole(r);$("an").value=r=="c"?"Demo User":"owner";$("ap").value=r=="c"?"demo":"1234";login()}
function onStore(e){if(e.key!==KEY||!e.newValue)return;try{S=JSON.parse(e.newValue)}catch(x){return}RK="";if(U){if(!$("v1").hidden){renderR();renderRsv()}if(!$("v2").hidden)renderD()}toast("🔄 "+t("live"))}
function verCode(){var c=$("vc").value.trim().toUpperCase(),pid=+$("psel").value,i=S.rsv.findIndex(function(r){return r.code===c&&r.pid===pid});if(i<0){toast("❌ "+c+" — not found for this pharmacy");return}var r=S.rsv.splice(i,1)[0];save();$("vc").value="";renderD();toast("✅ "+r.m+" × "+r.q+" → "+r.nm)}
function qrSvg(x){try{if(typeof qrcode==="undefined")return"";var q=qrcode(0,"M");q.addData(x);q.make();return q.createSvgTag({cellSize:4,margin:1,scalable:true})}catch(e){return""}}
function chartHtml(ok,lo,ou,pid,an){var C=251.3,tot=ok+lo+ou||1,sg=[[ok,"var(--ok)"],[lo,"var(--lo)"],[ou,"var(--ou)"]],off=0,s="";
 sg.forEach(function(g){var l=C*g[0]/tot;if(g[0])s+='<circle cx="60" cy="60" r="40" fill="none" style="stroke:'+g[1]+'" stroke-width="18" stroke-dasharray="'+l+' '+(C-l)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 60 60)"'+(an?' class="dr"':"")+'/>';off+=l});
 var bars=MEDS.map(function(m){var q=S.stock[pid][m[0]].q,w=Math.min(100,q*3),c=q===0?"var(--ou)":q<=5?"var(--lo)":"var(--ok)";return '<div class="cb"><span>'+m[0].split(" ")[0]+'</span><div class="ct"><i class="'+(an?"an":"")+'" style="width:'+Math.max(w,q?3:0)+'%;background:'+c+'"></i></div><b>'+q+'</b></div>'}).join("");
 return '<div class="card"><b>📈 '+t("chart")+'</b><div class="dn"><svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Stock chart"><circle cx="60" cy="60" r="40" fill="none" style="stroke:var(--line)" stroke-width="18"/>'+s+'<text x="60" y="66" text-anchor="middle" font-size="20" font-weight="700" style="fill:var(--ink)">'+ok+'/'+MEDS.length+'</text></svg><div class="lg"><div><i style="background:var(--ok)"></i> '+t("ins")+' '+ok+'</div><div><i style="background:var(--lo)"></i> '+t("low")+' '+lo+'</div><div><i style="background:var(--ou)"></i> '+t("out")+' '+ou+'</div></div></div>'+bars+'</div>'}
var RD=[1,1,1,1,1,1,1],AC=null,RI=null,RT=null,ALR=null,WL=null,ZZ=[];
function unlockAudio(){try{if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==="suspended")AC.resume()}catch(e){}}
addEventListener("pointerdown",unlockAudio);addEventListener("keydown",unlockAudio);
function beep(f,t,d){var o=AC.createOscillator(),g=AC.createGain();o.type="square";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.03)}
function ringOnce(){if(!AC)return;var n=AC.currentTime;beep(880,n,.2);beep(660,n+.25,.2);beep(880,n+.5,.2);beep(660,n+.75,.2)}
function stopRing(){clearInterval(RI);clearTimeout(RT);try{if(navigator.vibrate)navigator.vibrate(0)}catch(e){}}
function startRing(){stopRing();unlockAudio();ringOnce();RI=setInterval(function(){ringOnce();try{if(navigator.vibrate)navigator.vibrate([400,200,400])}catch(e){}},1600);RT=setTimeout(stopRing,90000)}
function dName(i){return new Date(2024,0,7+i).toLocaleDateString(lg,{weekday:"short"})}
function drawDays(){$("rdays").innerHTML=RD.map(function(on,i){return '<button class="chip" aria-pressed="'+(on?"true":"false")+'" onclick="togDay('+i+')">'+dName(i)+'</button>'}).join("")}
function togDay(i){RD[i]=RD[i]?0:1;drawDays()}
function addTime(){var b=$("rtimes");if(b.children.length>=6){toast("max 6");return}var x=document.createElement("input");x.type="time";x.value="14:00";x.setAttribute("aria-label","Time");b.appendChild(x)}
function addRem(){var m=$("rmed").value,ts=[],ds=[],ins=$("rtimes").querySelectorAll("input");for(var i=0;i<ins.length;i++)if(ins[i].value&&ts.indexOf(ins[i].value)<0)ts.push(ins[i].value);RD.forEach(function(on,i){if(on)ds.push(i)});
 if(!ts.length||!ds.length){toast("⏰ ?");return}ts.sort();S.rm=S.rm||[];S.rm.push({m:m,times:ts,days:ds,u:U?U.name:"",on:1,f:{}});save();renderRem();unlockAudio();wakeLock();
 try{if(window.Notification&&Notification.permission==="default")Notification.requestPermission()}catch(e){}toast("⏰ "+m+" · "+ts.join(", "))}
function delRem(i){S.rm.splice(i,1);save();renderRem()}
function togRem(i){S.rm[i].on=S.rm[i].on?0:1;save();renderRem()}
function normRem(r){if(!r.times){r.times=r.t?[r.t]:[];r.days=[0,1,2,3,4,5,6];r.on=1;r.f=r.f||{}}return r}
function dayTxt(ds){return ds.length===7?t("daily"):ds.map(dName).join(" ")}
function renderRem(){var h="",td=new Date().toDateString(),tk=0;(S.rm||[]).forEach(function(r,i){normRem(r);if(U&&r.u!==U.name)return;
 h+='<div class="rem"><div><b>'+esc(r.m)+'</b><div class="meta">⏰ '+r.times.join(" · ")+' · '+dayTxt(r.days)+'</div></div><div style="display:flex;gap:6px"><button class="btn sec" aria-pressed="'+(r.on?"true":"false")+'" onclick="togRem('+i+')">'+(r.on?"🔔":"🔕")+'</button><button class="btn sec" onclick="delRem('+i+')" aria-label="Delete">✕</button></div></div>'});
 (S.lg||[]).forEach(function(l){if((!U||l.u===U.name)&&l.ok&&l.d===td)tk++});
 $("rlist").innerHTML=h;$("rtk").textContent=tk?"✅ "+t("taken")+": "+tk:""}
function fireAlarm(m,tm){ALR={m:m,tm:tm};$("alt").textContent=t("ttt");$("alm2").textContent="💊 "+m+" · "+tm;$("alarm").hidden=false;startRing();
 try{if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(t("ttt")+" "+m);u.lang=({en:"en-IN",hi:"hi-IN",mr:"mr-IN",bn:"bn-IN",ta:"ta-IN",te:"te-IN",gu:"gu-IN",kn:"kn-IN"})[lg];speechSynthesis.speak(u)}}catch(e){}
 var o={body:t("ttt")+" "+m+" ("+tm+")",icon:"icon-192.png",tag:"mn-"+m,requireInteraction:true,renotify:true,vibrate:[300,100,300,100,300]};
 try{if(!window.Notification||Notification.permission!=="granted")return;if(navigator.serviceWorker&&navigator.serviceWorker.getRegistration)navigator.serviceWorker.getRegistration().then(function(r){if(r)r.showNotification("💊 MedNear",o);else new Notification("💊 MedNear",o)});else new Notification("💊 MedNear",o)}catch(e){}}
function alarmAct(a){stopRing();try{if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}$("alarm").hidden=true;if(!ALR)return;
 if(a==="s"){ZZ.push({at:Date.now()+300000,m:ALR.m,tm:ALR.tm});toast("⏰ +5 min")}
 else{S.lg=S.lg||[];S.lg.unshift({u:U?U.name:"",m:ALR.m,tm:ALR.tm,ok:a==="t"?1:0,d:new Date().toDateString()});S.lg=S.lg.slice(0,60);save();renderRem();toast(a==="t"?"✅ "+t("taken"):"✕ "+t("skip"))}ALR=null}
function testAlarm(){unlockAudio();var n=new Date();fireAlarm($("rmed").value,("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2))}
function wakeLock(){try{if(navigator.wakeLock&&!WL)navigator.wakeLock.request("screen").then(function(l){WL=l;l.addEventListener("release",function(){WL=null})}).catch(function(){})}catch(e){}}
function chkRem(){var n=new Date(),dow=n.getDay(),td=n.toDateString(),nm=n.getHours()*60+n.getMinutes(),ch=0,i;
 (S.rm||[]).forEach(function(r){normRem(r);if(!r.on||!U||r.u!==U.name||r.days.indexOf(dow)<0)return;r.f=r.f||{};
  r.times.forEach(function(tm){var p=tm.split(":"),d=nm-(+p[0]*60+ +p[1]);if(d>=0&&d<=3&&r.f[tm]!==td){r.f[tm]=td;ch=1;fireAlarm(r.m,tm)}})});
 if(ch)save();
 for(i=ZZ.length-1;i>=0;i--)if(Date.now()>=ZZ[i].at){var z=ZZ.splice(i,1)[0];fireAlarm(z.m,z.tm)}}
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"){if((S.rm||[]).length)wakeLock();chkRem()}});
var RK="",CU=0;
function rm(){return matchMedia("(prefers-reduced-motion: reduce)").matches}
function count(el){var n=+el.getAttribute("data-n");if(rm()||!n){el.textContent=n;return}var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/700);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
document.addEventListener("pointerdown",function(e){var b=e.target.closest&&e.target.closest(".btn,.chip,.tabs button,.lang button,.acc button,.ib,.q button");if(!b||rm())return;var r=b.getBoundingClientRect(),s=document.createElement("span"),d=Math.max(r.width,r.height);s.className="rip";s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";b.appendChild(s);setTimeout(function(){s.remove()},600)});
function showOk(r){var c=r.code,o=$("okv");$("okq").innerHTML=qrSvg("MEDNEAR|"+c+"|"+P(r.pid).name+"|"+r.m+" x"+r.q);$("okt").textContent=t("code")+" "+c;o.hidden=false;clearTimeout(showOk.t);showOk.t=setTimeout(function(){o.hidden=true},7000);try{if(navigator.vibrate)navigator.vibrate(40)}catch(e){}}
function contrast(){var d=document.documentElement,on=d.getAttribute('data-contrast')==='high';if(on)d.removeAttribute('data-contrast');else d.setAttribute('data-contrast','high');$('hcb').setAttribute('aria-pressed',String(!on));try{localStorage.setItem('mn_hc',on?'':'1')}catch(e){}}
function init(){load();try{localStorage.removeItem('mn_z');if(localStorage.getItem('mn_hc')){document.documentElement.setAttribute('data-contrast','high');$('hcb').setAttribute('aria-pressed','true')}}catch(e){}var sk=null;try{sk=sessionStorage.getItem("mn_sess")||localStorage.getItem("mn_sess")}catch(e){}U=users()[sk]||null;
 $("meds").innerHTML=MEDS.map(function(m){return '<option value="'+m[0]+'">'}).join("");
 $("chips").innerHTML=MEDS.slice(0,6).map(function(m){return '<button class="chip" onclick="$(\'q\').value=\''+m[0]+'\';HL=0;renderR()">'+m[0]+'</button>'}).join("");
 $("psel").innerHTML=PH.map(function(p){return '<option value="'+p.id+'">'+p.name+'</option>'}).join("");
 $("q").onchange=function(){var i=inMed();if(i>-1){S.sr=S.sr||{};S.sr[MEDS[i][0]]=(S.sr[MEDS[i][0]]||0)+1;save()}};$("aph").innerHTML=$("psel").innerHTML;$("rmed").innerHTML=MEDS.map(function(m){return "<option>"+m[0]+"</option>"}).join("");addEventListener("storage",onStore);applyL();applyRole();renderRem();if((S.rm||[]).length)wakeLock();chkRem();setInterval(chkRem,10000);setInterval(function(){if(!$("v1").hidden){renderR();renderRsv()}},30000)}
init();
