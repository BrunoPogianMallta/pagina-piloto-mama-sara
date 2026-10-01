(function(){'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var WA='5541991397148',reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Origem (UTM / referrer), só em sessionStorage ---------- */
var UTM={};
try{UTM=JSON.parse(sessionStorage.getItem('ms_utm')||'{}');var q=new URLSearchParams(location.search),f=false;
['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src'].forEach(function(k){if(q.get(k)){UTM[k]=q.get(k).slice(0,60);f=true}});
if(!f&&!UTM.utm_source&&document.referrer){var h=new URL(document.referrer).hostname;if(h&&h!==location.hostname)UTM.ref=h}
sessionStorage.setItem('ms_utm',JSON.stringify(UTM))}catch(e){}
$$('a[href*="pay.kiwify.com.br"]').forEach(function(a){try{var u=new URL(a.href);Object.keys(UTM).forEach(function(k){if(k!=='ref')u.searchParams.set(k,UTM[k])});a.href=u.href}catch(e){}});

/* ---------- Eventos ---------- */
function track(n,p){p=p||{};try{if(window.plausible)plausible(n,{props:p});if(window.umami&&umami.track)umami.track(n,p);if(window.gtag)gtag('event',n,p)}catch(e){}}
function where(el){var s=el.closest('header,footer,.sticky,.wa-fab,.hero,.final-cta,#produtos,.contact,.modal-ov,.guarantee');return s?(s.id||s.className.split(' ')[0]||s.tagName.toLowerCase()):'page'}
document.addEventListener('click',function(e){var a=e.target.closest('a[href],[data-order]');if(!a)return;var h=a.getAttribute('href')||'',l=where(a);
if(a.hasAttribute('data-order'))track('order_open',{loc:l,product:a.dataset.slug});
else if(h.indexOf('pay.kiwify')>-1)track('checkout_card',{loc:l});
else if(h.indexOf('wa.me')>-1)track('whatsapp_click',{loc:l});
else if(h.indexOf('instagram.com')>-1)track('instagram_click',{loc:l});
else if(h.indexOf('mailto:')===0)track('email_click',{loc:l})});
document.addEventListener('toggle',function(e){if(e.target.open&&e.target.classList.contains('faq-i'))track('faq_open',{q:e.target.firstElementChild.textContent.trim().slice(0,60)})},true);
var depth={};addEventListener('scroll',function(){var p=(scrollY+innerHeight)/document.documentElement.scrollHeight*100;[25,50,75,90].forEach(function(t){if(p>=t&&!depth[t]){depth[t]=1;track('scroll_depth',{pct:t})}})},{passive:true});
var lcp=0,cls=0,sent=false;
try{new PerformanceObserver(function(l){var e=l.getEntries();lcp=e[e.length-1].startTime}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(function(l){l.getEntries().forEach(function(e){if(!e.hadRecentInput)cls+=e.value})}).observe({type:'layout-shift',buffered:true})}catch(e){}
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden'&&!sent&&lcp){sent=true;track('web_vitals',{lcp:Math.round(lcp),cls:+cls.toFixed(3)})}});
var errs=0;addEventListener('error',function(e){if(errs++<3)track('js_error',{msg:String(e.message).slice(0,80)})});

/* ---------- Header, scrollspy, sticky ---------- */
var header=$('.header'),sticky=$('#sticky'),pastHero=false,inBuy=false,tick=false;
function syncSticky(){var on=pastHero&&!inBuy;sticky.classList.toggle('show',on);document.body.classList.toggle('sticky-on',on)}
addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;header.classList.toggle('scrolled',scrollY>8);pastHero=scrollY>600;syncSticky()})},{passive:true});
var IO='IntersectionObserver' in window;
if(IO){
var zones=$$('#produtos,.final-cta'),zio=new IntersectionObserver(function(es){es.forEach(function(e){e.target._v=e.isIntersecting});inBuy=zones.some(function(n){return n._v});syncSticky()});zones.forEach(function(n){zio.observe(n)});
var links={};$$('.nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){for(var k in links)links[k].removeAttribute('aria-current');if(links[e.target.id])links[e.target.id].setAttribute('aria-current','true')}})},{rootMargin:'-45% 0px -50% 0px'});
Object.keys(links).forEach(function(id){var s=document.getElementById(id);if(s)sio.observe(s)});
var vio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){track('section_view',{id:e.target.id});vio.unobserve(e.target)}})},{threshold:.3});
$$('#colecao,#produtos,#depoimentos,#autora,#faq,.final-cta').forEach(function(s){vio.observe(s)});
}

/* ---------- Reveal (só abaixo da dobra; classes removidas ao fim) ---------- */
if(IO&&!reduce){
var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;rio.unobserve(el);el.classList.add('in');setTimeout(function(){el.classList.remove('rv','in');el.style.removeProperty('--d')},900)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.manifesto-q .ln,.story-img,.story-txt-in,.sec-label,.sec-title,.step,.prod-feat,.prod-card,.why-item,.t-card,.author-photo,.author-text,.team,.g-item,.final-cta>*').forEach(function(el){
if(el.getBoundingClientRect().top<innerHeight*.92)return;var sib=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(sib%4,3)*80+'ms');el.classList.add('rv');rio.observe(el)})}
else{$('.manifesto-q')&&$$('.manifesto-q .ln').forEach(function(l){l.classList.remove('rv')})}

/* ---------- Pedido por Pix (WhatsApp) ---------- */
var modal=$('#modal'),form=$('#order-form'),ok=$('#order-ok'),last=null,msg='';
function setInert(v){$$('.header,main,.footer,#sticky,.wa-fab').forEach(function(n){n.inert=v})}
function openOrder(slug,name,cents){last=document.activeElement;
$('#product-slug').value=slug;$('#product-name').value=name;$('#product-price').value=cents;
$('#modal-product-name').textContent=name;$('#modal-product-price').textContent='R$ '+(cents/100).toLocaleString('pt-BR',{minimumFractionDigits:2});
form.hidden=false;ok.hidden=true;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setInert(true);
setTimeout(function(){(matchMedia('(hover:hover)').matches?$('#order-name'):$('.modal')).focus({preventScroll:true})},0)}
function closeOrder(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';setInert(false);
setTimeout(function(){if(!modal.classList.contains('open')){form.reset();form.hidden=false;ok.hidden=true}},250);
if(last&&last.focus)last.focus()}
document.addEventListener('click',function(e){var o=e.target.closest('[data-order]');if(o){openOrder(o.dataset.slug,o.dataset.name,parseInt(o.dataset.price,10));return}
if(e.target.closest('[data-close]')||e.target===modal)closeOrder()});
document.addEventListener('keydown',function(e){if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeOrder();
if(e.key==='Tab'){var f=$$('button:not([hidden]),[href],input,select,textarea',modal).filter(function(n){return!n.closest('[hidden]')}),a=f[0],z=f[f.length-1];
if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
var tel=$('#order-whatsapp'),cep=$('#order-cep');
tel.addEventListener('input',function(){var d=this.value.replace(/\D/g,'').slice(0,11);this.value=d.length>10?d.replace(/(\d\d)(\d{5})(\d{0,4})/,'($1) $2-$3'):d.length>6?d.replace(/(\d\d)(\d{4})(\d{0,4})/,'($1) $2-$3'):d.length>2?d.replace(/(\d\d)(\d*)/,'($1) $2'):d;this.setCustomValidity('')});
cep.addEventListener('input',function(){var d=this.value.replace(/\D/g,'').slice(0,8);this.value=d.length>5?d.slice(0,5)+'-'+d.slice(5):d;this.setCustomValidity('')});
function code(){var c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',b=new Uint8Array(6);crypto.getRandomValues(b);return'MS2027-'+[].map.call(b,function(x){return c[x%c.length]}).join('')}
form.addEventListener('submit',function(e){e.preventDefault();
if(tel.value.replace(/\D/g,'').length<10){tel.setCustomValidity('Informe DDD + número');tel.reportValidity();return}
if(cep.value.replace(/\D/g,'').length!==8){cep.setCustomValidity('CEP com 8 dígitos');cep.reportValidity();return}
var d=new FormData(form),g=function(k){return(d.get(k)||'').trim()},price=parseInt(g('product_price'),10);
msg='*Novo pedido Mama Sara 2027*\n\n*Código:* '+code()+'\n*Produto:* '+g('product_name')+'\n*Valor:* '+(price/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})+'\n*Pagamento:* Pix\n\n*Nome:* '+g('name')+'\n*WhatsApp:* '+g('whatsapp')+'\n';
if(g('email'))msg+='*E-mail:* '+g('email')+'\n';
msg+='*Endereço:*\n'+g('endereco')+'\n'+g('cidade')+' - '+g('uf')+'\nCEP: '+g('cep')+'\n';
if(g('notes'))msg+='\n*Observações:* '+g('notes')+'\n';
var o=UTM.utm_source||UTM.src||UTM.ref;if(o)msg+='\n_Origem: '+o+'_';
var url='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);$('#order-wa').href=url;
form.hidden=true;ok.hidden=false;ok.focus&&$('#order-wa').focus({preventScroll:true});
track('order_submit_pix',{product:g('product_slug')});
var w=window.open(url,'_blank');if(w)w.opener=null});
$('#order-copy').addEventListener('click',function(){var b=this;function done(){b.textContent='Mensagem copiada ✓'}
if(navigator.clipboard)navigator.clipboard.writeText(msg).then(done,function(){});else done()});
})();
