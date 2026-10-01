/* Analytics sem cookies. Preencha CFG e libere o host no CSP (_headers). Veja README.md. */
(function(){
var CFG={provider:'none',id:'',host:''}; // 'plausible' | 'umami' | 'ga4' | 'none'
function add(src,attrs){var s=document.createElement('script');s.defer=true;s.src=src;for(var k in attrs)s.setAttribute(k,attrs[k]);document.head.appendChild(s)}
if(CFG.provider==='plausible')add((CFG.host||'https://plausible.io')+'/js/script.js',{'data-domain':CFG.id});
if(CFG.provider==='umami')add((CFG.host||'https://cloud.umami.is')+'/script.js',{'data-website-id':CFG.id});
if(CFG.provider==='ga4'){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',CFG.id,{anonymize_ip:true});add('https://www.googletagmanager.com/gtag/js?id='+CFG.id)}
})();
