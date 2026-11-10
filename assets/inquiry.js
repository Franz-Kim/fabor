(() => {
  'use strict';
  const config = window.FABOR_INQUIRY || {};
  const en = document.documentElement.lang === 'en';
  const t = en ? {
    title:'Works & collaborations', intro:'Tell us what you have in mind. We will reply by email.', close:'Close ×',
    name:'Name', email:'Email', nameHint:'Your name', emailHint:'An address we can reply to', required:'Required', optional:'Optional',
    types:'What is your enquiry about?', typeHint:'Optional · select any that apply',
    typeLabels:['Spatial & brand collaboration','Purchase & custom work','Exhibition & loan','Other'],
    message:'Your enquiry', messageHint:'Which work or project are you interested in?', help:'If relevant, include the space, intended use or preferred timing.',
    extra:'Additional details', extraHint:'Phone · how you found us', expand:'Expand', collapse:'Collapse', company:'Company / studio', companyHint:'Company, studio or “Individual”', phone:'Phone',
    discovery:'How did you find FABOR?', choose:'Please select', sources:['Instagram','Magazine / online article','Exhibition / fair','Search','Recommendation','Other'],
    sourceDetail:'Exhibition name or other details',
    consent:'I agree to the collection and use of my information to respond to this enquiry.', privacy:'How your information is used',
    policy1:'FABOR uses your name, company / studio, email and message, along with any optional information you provide, to respond to and manage your enquiry.',
    policy3:'Enquiries are stored in FABOR’s private Google Sheet and delivered to FABOR by email. Contact faborobjet@gmail.com to request access, correction or deletion.',
    policy2:'Retention: {months} months from receipt. You may decline consent; the form cannot be submitted without it. Contact faborobjet@gmail.com to request deletion.',
    send:'Send enquiry', sending:'Sending…', sendHint:'We will reply to the email address above.',
    preview:'Preview — nothing you enter here is sent or saved to Google.',
    invalid:'Please complete your name, company / studio, a valid email, your message, and the consent checkbox.',
    spaces:'Please enter text rather than spaces only.',
    success:'Your enquiry has been received.', successBody:'Thank you. We will reply to the email address you provided.',
    previewSuccess:'Preview submission complete.', previewSuccessBody:'This shows the completed state. Nothing has been sent or saved to Google.',
    failed:'We could not confirm receipt.', failedBody:'Your message is still here. Copy the details below and email them to FABOR, or try again.',
    copyAll:'Copy all enquiry details', copyEmail:'Copy email address', copied:'Enquiry details copied.', emailCopied:'Email address copied.', copyFailed:'Copy was unavailable. Select and copy the text below.',
    edit:'Edit enquiry', retry:'Try again', new:'Write another enquiry', finish:'Close', reference:'Reference',
    eventText:'Continue the conversation', eventButton:'Leave an enquiry', dismiss:'Hide event enquiry bar',
    transport:'Enquiry delivery', copyLabel:'Your complete enquiry', privacyVersion:'Consent version',
    unspecified:'Not specified', previewFailure:'Previewing the failure state. No submission has been attempted.'
  } : {
    title:'작품·협업 문의', intro:'궁금한 작품이나 함께하고 싶은 일을 남겨주세요. 이메일로 답변드리겠습니다.', close:'닫기 ×',
    name:'이름', email:'이메일', nameHint:'성함을 알려주세요', emailHint:'답변받을 이메일 주소', required:'필수', optional:'선택',
    types:'어떤 문의인가요?', typeHint:'선택 · 여러 개 선택 가능',
    typeLabels:['공간·브랜드 협업','작품 구매·맞춤 제작','전시·대여','기타'],
    message:'문의 내용', messageHint:'관심 있는 작품이나 생각하고 계신 일을 편하게 적어주세요.', help:'사용 공간이나 희망 일정이 있다면 함께 알려주세요.',
    extra:'추가 정보 입력', extraHint:'전화번호 · 알게 된 경로', expand:'펼치기', collapse:'접기', company:'소속', companyHint:'회사·스튜디오명 (개인은 ‘개인’)', phone:'전화번호',
    discovery:'파보르를 어떻게 알게 되셨나요?', choose:'선택해 주세요', sources:['인스타그램','잡지·온라인 기사','전시·박람회','검색','지인 소개','기타'],
    sourceDetail:'전시명 또는 자세한 경로',
    consent:'문의 응대를 위한 개인정보 수집·이용에 동의합니다.', privacy:'개인정보 이용 안내',
    policy1:'파보르는 문의 응대와 이력 관리를 위해 이름·소속·이메일·문의 내용 및 직접 입력하신 선택 정보를 이용합니다.',
    policy3:'문의는 파보르의 비공개 Google 스프레드시트에 저장하고 이메일로 전달합니다. 열람·정정·삭제 요청은 faborobjet@gmail.com으로 보내주세요.',
    policy2:'보유 기간: 접수일로부터 {months}개월. 동의를 거부할 수 있으며, 동의하지 않으면 이 양식을 제출할 수 없습니다. 삭제 요청은 faborobjet@gmail.com으로 보내주세요.',
    send:'문의 보내기', sending:'보내는 중…', sendHint:'남겨주신 이메일로 답변드리겠습니다.',
    preview:'미리보기입니다. 입력한 내용은 Google에 저장되거나 발송되지 않습니다.',
    invalid:'이름, 소속, 올바른 이메일 주소, 문의 내용과 개인정보 동의를 확인해 주세요.',
    spaces:'공백을 제외한 내용을 입력해 주세요.',
    success:'문의가 접수되었습니다.', successBody:'남겨주셔서 감사합니다. 입력하신 이메일로 답변드리겠습니다.',
    previewSuccess:'미리보기 제출을 확인했습니다.', previewSuccessBody:'접수 완료 화면의 예시입니다. 실제 저장이나 메일 발송은 이루어지지 않았습니다.',
    failed:'접수 여부를 확인하지 못했습니다.', failedBody:'작성하신 내용은 그대로 남아 있습니다. 아래 내용을 복사해 이메일로 보내주시거나 다시 시도해 주세요.',
    copyAll:'문의 내용 전체 복사', copyEmail:'이메일 주소 복사', copied:'문의 내용이 복사되었습니다.', emailCopied:'이메일 주소가 복사되었습니다.', copyFailed:'자동으로 복사하지 못했습니다. 아래 내용을 선택해 직접 복사해 주세요.',
    edit:'내용 수정', retry:'다시 시도', new:'새 문의 작성', finish:'닫기', reference:'접수번호',
    eventText:'작품에 대한 이야기를 이어가세요', eventButton:'문의 남기기', dismiss:'행사 문의 안내 닫기',
    transport:'문의 전송', copyLabel:'작성한 문의 전체 내용', privacyVersion:'동의 문안 버전',
    unspecified:'미선택', previewFailure:'전송 실패 화면 미리보기입니다. 실제 전송은 시도하지 않았습니다.'
  };
  const types = ['collaboration','purchase-custom','exhibition-loan','other'];
  const sourceIds = ['instagram','article','exhibition','search','referral','other'];
  const isPreview = config.mode !== 'live';
  let eventOverride = isPreview && new URLSearchParams(location.search).has('inquiry-demo') ? new URLSearchParams(location.search).get('inquiry-demo') === 'event' : null;
  let previewResult = new URLSearchParams(location.search).get('inquiry-result') === 'failure' ? 'failure' : 'success';
  const email = config.email || 'faborobjet@gmail.com';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dialog = document.createElement('dialog');
  dialog.id = 'inquiry-modal'; dialog.className = 'inquiry-modal';
  dialog.setAttribute('aria-labelledby','inquiry-title');
  dialog.innerHTML = `
    <div class="inquiry-bar"><span>FABOR</span><button type="button" data-inquiry-close>${t.close}</button></div>
    <div class="inquiry-content">
      <header class="inquiry-heading" tabindex="-1"><h2 id="inquiry-title">${t.title}</h2><p>${t.intro}</p><p class="inquiry-preview-note" ${isPreview?'':'hidden'}>${t.preview}</p></header>
      <form class="inquiry-form" novalidate>
        <div class="inquiry-pair">
          <label class="inquiry-field"><span>${t.name}<small>${t.required}</small></span><input name="name" autocomplete="name" maxlength="80" placeholder="${t.nameHint}" required></label>
          <label class="inquiry-field"><span>${t.company}<small>${t.required}</small></span><input name="company" autocomplete="organization" maxlength="120" placeholder="${t.companyHint}" required></label>
        </div>
        <label class="inquiry-field inquiry-email-field"><span>${t.email}<small>${t.required}</small></span><input name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="${t.emailHint}" required></label>
        <fieldset class="inquiry-options"><legend>${t.types} <small>${t.typeHint}</small></legend><div class="inquiry-option-grid">${types.map((id,i)=>`<label class="inquiry-option"><input type="checkbox" name="types" value="${id}"><span>${t.typeLabels[i]}</span></label>`).join('')}</div></fieldset>
        <label class="inquiry-field"><span>${t.message}<small>${t.required}</small></span><textarea name="message" rows="4" maxlength="5000" placeholder="${t.messageHint}" aria-describedby="inquiry-message-help" required></textarea></label>
        <p id="inquiry-message-help" class="inquiry-help">${t.help}</p>
        <details class="inquiry-extra"><summary><span class="inquiry-disclosure-copy"><span>${t.extra} <small>${t.optional}</small></span><small>${t.extraHint}</small></span><span class="inquiry-disclosure-action"><span data-expand-label>${t.expand}</span><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></summary><div class="inquiry-extra-body">
          <label class="inquiry-field"><span>${t.phone}</span><input name="phone" type="tel" autocomplete="tel" maxlength="50"></label>
          <label class="inquiry-field"><span>${t.discovery}</span><select name="source"><option value="">${t.choose}</option>${sourceIds.map((id,i)=>`<option value="${id}">${t.sources[i]}</option>`).join('')}</select></label>
          <label class="inquiry-field" data-source-detail hidden><span>${t.sourceDetail} <small>${t.optional}</small></span><input name="sourceDetail" maxlength="200" disabled></label>
        </div></details>
        <label class="inquiry-consent"><input type="checkbox" name="consent" required><span>${t.consent}</span></label>
        <details class="inquiry-privacy"><summary>${t.privacy}</summary><p>${t.policy1}</p><p>${t.policy2.replace('{months}',esc(config.retentionMonths || 12))}</p><p>${t.policy3}</p></details>
        <div class="inquiry-honeypot" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <p class="inquiry-error" role="alert" hidden></p>
        <button class="inquiry-submit" type="submit"><span>${t.send}</span><span aria-hidden="true">→</span></button>
        <p class="inquiry-submit-hint">${t.sendHint}</p>
      </form>
      <section class="inquiry-result" tabindex="-1" hidden aria-labelledby="inquiry-result-title"></section>
    </div><div class="copy-toast" role="status" aria-live="polite" hidden></div>`;
  document.body.append(dialog);
  if (typeof dialog.showModal !== 'function') { dialog.remove(); return; }
  const form = dialog.querySelector('form');
  const result = dialog.querySelector('.inquiry-result');
  const error = dialog.querySelector('.inquiry-error');
  const submit = form.querySelector('[type=submit]');
  const toast = dialog.querySelector('[role=status]');
  const eventBar = document.createElement('aside');
  eventBar.className='inquiry-event'; eventBar.hidden=true;
  eventBar.innerHTML=`<div class="inquiry-event-inner"><p class="inquiry-event-copy">${t.eventText}</p><button class="inquiry-event-button" type="button" data-inquiry-open="event" aria-haspopup="dialog" aria-controls="inquiry-modal"><span>${t.eventButton}</span><span aria-hidden="true">+</span></button><button class="inquiry-event-dismiss" type="button" aria-label="${t.dismiss}">×</button></div>`;
  document.body.append(eventBar);
  let opener, scrollPosition=0, previousBodyTop='', pending=null, lastAttempt=null, openedAt=Date.now(), entry='contact', eventDismissed=false, toastTimer;
  const uuid = () => window.crypto?.randomUUID ? crypto.randomUUID() : 'req-'+Date.now().toString(36)+'-'+Array.from(crypto.getRandomValues(new Uint32Array(4)),x=>x.toString(36)).join('-');
  function eventActive() {
    if (isPreview && eventOverride !== null) return eventOverride;
    const e=config.event || {}, now=Date.now();
    if(!e.enabled)return false;
    const start=e.startAt ? Date.parse(e.startAt) : -Infinity, end=e.endAt ? Date.parse(e.endAt) : Infinity;
    return !Number.isNaN(start) && !Number.isNaN(end) && now>=start && now<end;
  }
  function updateEvent() {
    const show=eventActive() && !eventDismissed;
    eventBar.hidden=!show;
    document.body.classList.toggle('inquiry-event-active',show);
  }
  updateEvent();
  setInterval(updateEvent,60000);
  eventBar.querySelector('.inquiry-event-dismiss').addEventListener('click',()=>{eventDismissed=true;updateEvent();});
  function open(button) {
    if (dialog.open || document.querySelector('dialog[open]'))return;
    opener=button; entry=button.dataset.inquiryOpen || 'contact'; scrollPosition=window.scrollY;
    previousBodyTop=document.body.style.top;
    document.body.classList.add('locked','inquiry-is-open');
    document.body.style.position='fixed'; document.body.style.top=`-${scrollPosition}px`; document.body.style.width='100%';
    dialog.showModal(); dialog.scrollTop=0;
    document.dispatchEvent(new Event('fabor:modal-open'));
    (result.hidden?dialog.querySelector('.inquiry-heading'):result).focus({preventScroll:true});
  }
  document.querySelectorAll('[data-inquiry-open]').forEach(button=>{button.hidden=false;button.addEventListener('click',()=>open(button));});
  dialog.querySelector('[data-inquiry-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{
    const b=dialog.getBoundingClientRect();
    if(e.target===dialog && (e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close();
  });
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('locked','inquiry-is-open');
    document.body.style.position='';document.body.style.top=previousBodyTop;document.body.style.width='';
    const root=document.documentElement, previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';
    window.scrollTo(0,scrollPosition);root.style.scrollBehavior=previous;
    opener?.focus({preventScroll:true});
    document.dispatchEvent(new Event('fabor:modal-close'));
  });
  const field = name => form.elements.namedItem(name);
  field('source').addEventListener('change',()=>{
    const show=['exhibition','other'].includes(field('source').value);
    form.querySelector('[data-source-detail]').hidden=!show;field('sourceDetail').disabled=!show;
  });
  const extra = form.querySelector('.inquiry-extra');
  extra.addEventListener('toggle',()=>{extra.querySelector('[data-expand-label]').textContent=extra.open?t.collapse:t.expand;});
  ['name','company','email','message'].forEach(name=>field(name).addEventListener('input',()=>field(name).setCustomValidity('')));
  function collect() {
    const d=new FormData(form);
    return {name:d.get('name').trim(),email:d.get('email').trim(),message:d.get('message').trim(),
      company:d.get('company').trim(),phone:d.get('phone').trim(),types:d.getAll('types'),
      source:d.get('source'),sourceDetail:d.get('sourceDetail')?.trim() || '',consent:d.get('consent')==='on',
      privacyVersion:config.privacyVersion || '',language:en?'en':'ko',
      entry,eventId:eventActive()?config.event?.id || '':'',website:d.get('website'),openedAt};
  }
  function completeText(p) {
    const selected=p.types.map(id=>t.typeLabels[types.indexOf(id)]).join(', ') || t.unspecified;
    return [`FABOR · ${t.title}`,`${t.name}: ${p.name}`,`${t.company}: ${p.company}`,`${t.email}: ${p.email}`,`${t.phone}: ${p.phone || '—'}`,`${t.types}: ${selected}`,`${t.discovery}: ${t.sources[sourceIds.indexOf(p.source)] || t.unspecified}${p.sourceDetail?' / '+p.sourceDetail:''}`,'',t.message,p.message].join('\n');
  }
  function feedback(message) {
    clearTimeout(toastTimer);toast.textContent=message;toast.hidden=false;toast.classList.add('is-visible');
    toastTimer=setTimeout(()=>{toast.classList.remove('is-visible');toast.hidden=true;},4200);
  }
  async function copy(text,button,kind) {
    let ok=false;
    try {if(window.isSecureContext && navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);ok=true;}} catch {}
    if(!ok) {
      const tmp=document.createElement('textarea');tmp.value=text;tmp.readOnly=true;
      tmp.style.cssText='position:fixed;left:0;top:0;opacity:0;width:1px;height:1px;font-size:16px';dialog.append(tmp);
      tmp.focus();tmp.select();try{ok=document.execCommand('copy');}catch{}tmp.remove();button.focus({preventScroll:true});
    }
    feedback(ok?(kind==='email'?t.emailCopied:t.copied):t.copyFailed);
    if(!ok){const visible=result.querySelector('textarea');if(visible){visible.focus();visible.select();}}
  }
  function showResult(ok,p) {
    form.hidden=true;result.hidden=false;
    result.innerHTML=ok
      ? `<h3 id="inquiry-result-title">${isPreview?t.previewSuccess:t.success}</h3><p>${isPreview?t.previewSuccessBody:t.successBody}</p>${p.reference?`<p class="inquiry-reference">${t.reference}: ${esc(p.reference)}</p>`:''}<div class="inquiry-result-actions"><button class="inquiry-submit" type="button" data-finish>${t.finish}<span aria-hidden="true">×</span></button><button class="inquiry-secondary" type="button" data-new>${t.new}</button></div>`
      : `<h3 id="inquiry-result-title">${t.failed}</h3><p>${t.failedBody}</p>${isPreview?`<p class="inquiry-preview-note">${t.previewFailure}</p>`:''}<textarea class="inquiry-copy-text" readonly aria-label="${t.copyLabel}"></textarea><button class="inquiry-submit" type="button" data-copy-all>${t.copyAll}<span aria-hidden="true">+</span></button><button class="inquiry-email-copy" type="button" data-copy-address title="${t.copyEmail}"></button><div class="inquiry-result-actions"><button class="inquiry-secondary" type="button" data-retry>${t.retry}</button><button class="inquiry-secondary" type="button" data-edit>${t.edit}</button></div>`;
    if(ok){
      result.querySelector('[data-finish]').onclick=()=>dialog.close();
      result.querySelector('[data-new]').onclick=()=>{form.reset();field('source').dispatchEvent(new Event('change'));lastAttempt=null;openedAt=Date.now();form.querySelectorAll('details').forEach(d=>d.open=false);edit();};
    } else {
      result.querySelector('textarea').value=completeText(p);
      const address=result.querySelector('[data-copy-address]');address.textContent=email+' · '+t.copyEmail;
      address.onclick=()=>copy(email,address,'email');
      const all=result.querySelector('[data-copy-all]');all.onclick=()=>copy(completeText(p),all,'all');
      result.querySelector('[data-edit]').onclick=edit;
      result.querySelector('[data-retry]').onclick=()=>{edit();form.requestSubmit();};
    }
    dialog.scrollTop=0;if(dialog.open)result.focus({preventScroll:true});
  }
  function edit(){result.hidden=true;form.hidden=false;error.hidden=true;dialog.scrollTop=0;if(dialog.open)dialog.querySelector('.inquiry-heading').focus({preventScroll:true});}
  function busy(value){submit.disabled=value;submit.querySelector('span').textContent=value?t.sending:t.send;form.setAttribute('aria-busy',String(value));
    form.querySelectorAll('input,textarea,select,summary').forEach(el=>{if(el.tagName!=='SUMMARY')el.disabled=value || (el.name==='sourceDetail'&&form.querySelector('[data-source-detail]').hidden);});
  }
  function validEndpoint(){try{const u=new URL(config.endpoint);return u.origin==='https://script.google.com' && /^\/macros\/s\/[^/]+\/exec$/.test(u.pathname);}catch{return false;}}
  function cleanupTransport(item){clearTimeout(item.timer);clearTimeout(item.probeTimer);item.probe?.remove();if(item.callback)delete window[item.callback];item.form?.remove();item.frame?.remove();if(pending===item)pending=null;}
  // Check receipt independently of the response iframe and Google account cookies.
  // Check only the non-personal receipt metadata through its Content Service as a fallback.
  function probeReceipt(item){
    if(pending!==item || (item.probes||0)>=6)return;
    item.probes=(item.probes||0)+1;item.probe?.remove();
    const callback=item.callback || ('faborReceipt_'+item.nonce.replace(/-/g,'_'));item.callback=callback;
    window[callback]=d=>{
      if(pending!==item || d?.type!=='fabor:receipt' || d.nonce!==item.nonce || d.requestId!==item.payload.requestId)return;
      if(d.pending===false)done(item,d.accepted===true,d.reference);
    };
    const url=new URL(config.endpoint);url.search=new URLSearchParams({action:'receipt',callback,nonce:item.nonce,requestId:item.payload.requestId,replyOrigin:location.origin,attempt:String(item.probes)});
    const script=document.createElement('script');script.src=url.href;script.crossOrigin='anonymous';script.async=true;script.referrerPolicy='no-referrer';item.probe=script;
    const again=()=>{if(pending===item)item.probeTimer=setTimeout(()=>probeReceipt(item),4000);};script.onload=again;script.onerror=again;document.head.append(script);
  }
  let previewSequence=0;
  function previewReference(){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',year:'2-digit',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    return ['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('')+'-'+String(++previewSequence).padStart(3,'0');
  }
  function done(item,ok,reference=''){if(pending!==item)return;cleanupTransport(item);busy(false);item.payload.reference=ok?(isPreview?previewReference():(/^\d{6}-\d{3,}$/.test(reference)?reference:'')):'';showResult(ok,item.payload);}
  function sendLive(payload){
    if(!config.privacyApproved || !validEndpoint()){busy(false);showResult(false,payload);return;}
    const frame=document.createElement('iframe');frame.name='fabor-receipt-'+uuid();frame.title=t.transport;frame.className='inquiry-transport';frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');
    const transport=document.createElement('form');transport.method='POST';transport.action=config.endpoint;transport.target=frame.name;transport.hidden=true;
    const nonce=uuid();
    for(const [name,value] of Object.entries({payload:JSON.stringify(payload),replyOrigin:location.origin,nonce})){
      const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;transport.append(input);
    }
    dialog.append(frame,transport);
    const item={payload,nonce,frame,form:transport};pending=item;
    item.timer=setTimeout(()=>done(item,false),45000);
    item.probeTimer=setTimeout(()=>probeReceipt(item),4000);
    // A load event is NOT a receipt. Only a matching, trusted server message is accepted.
    try{HTMLFormElement.prototype.submit.call(transport);}catch{done(item,false);}
  }
  window.addEventListener('message',event=>{
    if(isPreview && event.source===window.parent && event.source!==window && (event.origin===location.origin || location.protocol==='file:')){
      const d=event.data;if(d?.type==='fabor-review'){
        if(typeof d.event==='boolean'){eventOverride=d.event;eventDismissed=false;updateEvent();}
        if(['success','failure'].includes(d.result))previewResult=d.result;
        if(d.open)open(document.querySelector('[data-inquiry-open]'));
      }
    }
    const item=pending,d=event.data;
    if(!item || isPreview || !d || d.type!=='fabor:receipt' || d.nonce!==item.nonce || d.requestId!==item.payload.requestId)return;
    let origin;try{origin=new URL(event.origin);}catch{return;}
    if(origin.protocol!=='https:' || !(origin.hostname==='script.google.com' || origin.hostname==='script.googleusercontent.com' || origin.hostname.endsWith('.script.googleusercontent.com') || origin.hostname.endsWith('-script.googleusercontent.com')))return;
    done(item,d.accepted===true,d.reference);
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();if(pending)return;
    ['name','company','email','message'].forEach(name=>{field(name).value=field(name).value.trim();field(name).setCustomValidity(field(name).value?'':t.spaces);});
    if(!form.checkValidity()){error.textContent=t.invalid;error.hidden=false;form.reportValidity();return;}
    error.hidden=true;
    const p=collect();const fingerprint=JSON.stringify(p);
    p.requestId=lastAttempt?.fingerprint===fingerprint?lastAttempt.payload.requestId:uuid();
    lastAttempt={fingerprint,payload:p};busy(true);
    if(isPreview){const item={payload:p};pending=item;item.timer=setTimeout(()=>done(item,previewResult==='success'),450);}
    else sendLive(p);
  });
})();
