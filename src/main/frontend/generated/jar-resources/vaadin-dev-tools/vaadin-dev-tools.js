import"construct-style-sheets-polyfill";import{css as V,LitElement as A,html as u,nothing as B,render as F}from"lit";import{property as m,state as y,customElement as R,query as z}from"lit/decorators.js";import{classMap as H}from"lit/directives/class-map.js";function h(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n}const C=1e3,_=(s,e)=>{const t=Array.from(s.querySelectorAll(e.join(", "))),o=Array.from(s.querySelectorAll("*")).filter(i=>i.shadowRoot).flatMap(i=>_(i.shadowRoot,e));return[...t,...o]};let O=!1;const S=(s,e)=>{O||(window.addEventListener("message",i=>{i.data==="validate-license"&&window.location.reload()},!1),O=!0);const t=s._overlayElement;if(t){if(t.shadowRoot){const i=t.shadowRoot.querySelector("slot:not([name])");if(i&&i.assignedElements().length>0){S(i.assignedElements()[0],e);return}}S(t,e);return}const o=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");s.isConnected&&(s.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${o}</div></no-license>`)},E={},$={},w={},U={},f=s=>`${s.name}_${s.version}`,L=s=>{const{cvdlName:e,version:t}=s.constructor,o={name:e,version:t},i=s.tagName.toLowerCase();E[e]=E[e]??[],E[e].push(i);const n=w[f(o)];n&&setTimeout(()=>S(s,n),C),w[f(o)]||U[f(o)]||$[f(o)]||($[f(o)]=!0,window.Vaadin.devTools.checkLicense(o))},j=s=>{U[f(s)]=!0,console.debug("License check ok for",s)},G=s=>{const e=s.product.name;w[f(s.product)]=s,console.error("License check failed for",e);const t=E[e];(t==null?void 0:t.length)>0&&_(document,t).forEach(o=>{setTimeout(()=>S(o,w[f(s.product)]),C)})},W=s=>{const e=s.message,t=s.product.name;s.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,w[f(s.product)]=s,console.error("No license found when checking",t);const o=E[t];(o==null?void 0:o.length)>0&&_(document,o).forEach(i=>{setTimeout(()=>S(i,w[f(s.product)]),C)})},q=s=>s.command==="license-check-ok"?(j(s.data),!0):s.command==="license-check-failed"?(G(s.data),!0):s.command==="license-check-nokey"?(W(s.data),!0):!1,K=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(s=>{L(s)}),window.Vaadin.devTools.createdCvdlElements={push:s=>{L(s)}}};function Y(s,e){if(s.contains(e))return!0;let t=e;const o=e.ownerDocument;for(;t&&t!==o&&t!==s;)t=t.parentNode||(t instanceof ShadowRoot?t.host:null);return t===s}var l;(function(s){s.ACTIVE="active",s.INACTIVE="inactive",s.UNAVAILABLE="unavailable",s.ERROR="error"})(l||(l={}));class x{constructor(){this.status=l.UNAVAILABLE}onHandshake(){}onConnectionError(e){}onStatusChange(e){}setActive(e){!e&&this.status===l.ACTIVE?this.setStatus(l.INACTIVE):e&&this.status===l.INACTIVE&&this.setStatus(l.ACTIVE)}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}}x.HEARTBEAT_INTERVAL=18e4;class J extends x{constructor(e){super(),this.webSocket=new WebSocket(e),this.webSocket.onmessage=t=>this.handleMessage(t),this.webSocket.onerror=t=>this.handleError(t),this.webSocket.onclose=t=>{this.status!==l.ERROR&&this.setStatus(l.UNAVAILABLE),this.webSocket=void 0},setInterval(()=>{this.webSocket&&self.status!==l.ERROR&&this.status!==l.UNAVAILABLE&&this.webSocket.send("")},x.HEARTBEAT_INTERVAL)}onReload(){}handleMessage(e){let t;try{t=JSON.parse(e.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}t.command==="hello"?(this.setStatus(l.ACTIVE),this.onHandshake()):t.command==="reload"?this.status===l.ACTIVE&&this.onReload():this.handleError(`Unknown message from the livereload server: ${e}`)}handleError(e){console.error(e),this.setStatus(l.ERROR),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}}const X=V`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var Z=function(){var s=document.getSelection();if(!s.rangeCount)return function(){};for(var e=document.activeElement,t=[],o=0;o<s.rangeCount;o++)t.push(s.getRangeAt(o));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return s.removeAllRanges(),function(){s.type==="Caret"&&s.removeAllRanges(),s.rangeCount||t.forEach(function(i){s.addRange(i)}),e&&e.focus()}},D={"text/plain":"Text","text/html":"Url",default:"Text"},Q="Copy to clipboard: #{key}, Enter";function ee(s){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return s.replace(/#{\s*key\s*}/g,e)}function te(s,e){var t,o,i,n,r,a,p=!1;e||(e={}),t=e.debug||!1;try{i=Z(),n=document.createRange(),r=document.getSelection(),a=document.createElement("span"),a.textContent=s,a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(g){if(g.stopPropagation(),e.format)if(g.preventDefault(),typeof g.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var I=D[e.format]||D.default;window.clipboardData.setData(I,s)}else g.clipboardData.clearData(),g.clipboardData.setData(e.format,s);e.onCopy&&(g.preventDefault(),e.onCopy(g.clipboardData))}),document.body.appendChild(a),n.selectNodeContents(a),r.addRange(n);var b=document.execCommand("copy");if(!b)throw new Error("copy command was unsuccessful");p=!0}catch(g){t&&console.error("unable to copy using execCommand: ",g),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",s),e.onCopy&&e.onCopy(window.clipboardData),p=!0}catch(I){t&&console.error("unable to copy using clipboardData: ",I),t&&console.error("falling back to prompt"),o=ee("message"in e?e.message:Q),window.prompt(o,s)}}finally{r&&(typeof r.removeRange=="function"?r.removeRange(n):r.removeAllRanges()),a&&document.body.removeChild(a),i()}return p}let k=class extends A{constructor(){super(...arguments),this.serverInfo={versions:[]}}createRenderRoot(){return this}render(){return u` <div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        ${this.serverInfo.versions.map(e=>u`
            <dt>${e.name}</dt>
            <dd>${e.version}</dd>
          `)}
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${!this._devTools.conf.enable||(this._devTools.frontendStatus===l.UNAVAILABLE||this._devTools.frontendStatus===l.ERROR)&&(this._devTools.javaStatus===l.UNAVAILABLE||this._devTools.javaStatus===l.ERROR)}
              ?checked="${this._devTools.frontendStatus===l.ACTIVE||this._devTools.javaStatus===l.ACTIVE}"
              @change=${e=>this._devTools.setActive(e.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.javaStatus)}"
        >
          Java ${this._devTools.javaStatus}
          ${this._devTools.conf.backend?`(${d.BACKEND_DISPLAY_NAME[this._devTools.conf.backend]})`:""}
        </dd>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.frontendStatus)}"
        >
          Front end ${this._devTools.frontendStatus}
        </dd>
      </dl>
    </div>`}handleMessage(e){return(e==null?void 0:e.command)==="serverInfo"?(this.serverInfo=e.data,!0):!1}copyInfoToClipboard(){const e=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),t=Array.from(e).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");te(t),this._devTools.showNotification(v.INFORMATION,"Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}};h([m({type:Object})],k.prototype,"_devTools",void 0);h([y()],k.prototype,"serverInfo",void 0);k=h([R("vaadin-dev-tools-info")],k);let T=class extends A{createRenderRoot(){return this}activate(){this._devTools.unreadErrors=!1,this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".message-tray .message:last-child");e&&e.scrollIntoView()})}render(){return u`<div class="message-tray">
      ${this._devTools.messages.map(e=>this._devTools.renderMessage(e))}
    </div>`}};h([m({type:Object})],T.prototype,"_devTools",void 0);T=h([R("vaadin-dev-tools-log")],T);const M=16384;class P extends x{constructor(e){if(super(),!e)return;const t={transport:"websocket",fallbackTransport:"websocket",url:e,contentType:"application/json; charset=UTF-8",reconnectInterval:5e3,timeout:-1,maxReconnectOnClose:1e7,trackMessageLength:!0,enableProtocol:!0,handleOnlineOffline:!1,executeCallbackBeforeReconnect:!0,messageDelimiter:"|",onMessage:o=>{const i={data:o.responseBody};this.handleMessage(i)},onError:o=>{this.handleError(o)}};oe().then(o=>{this.socket=o.subscribe(t)})}onReload(){}onUpdate(e,t){}onMessage(e){}handleMessage(e){let t;try{t=JSON.parse(e.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}t.command==="hello"?(this.setStatus(l.ACTIVE),this.onHandshake()):t.command==="reload"?this.status===l.ACTIVE&&this.onReload():t.command==="update"?this.status===l.ACTIVE&&this.onUpdate(t.path,t.content):this.onMessage(t)}handleError(e){console.error(e),this.setStatus(l.ERROR),this.onConnectionError(e)}send(e,t){if(!this.socket){N(()=>this.socket,r=>this.send(e,t));return}const o=JSON.stringify({command:e,data:t});let n=o.length+"|"+o;for(;n.length;)this.socket.push(n.substring(0,M)),n=n.substring(M)}}P.HEARTBEAT_INTERVAL=18e4;function N(s,e){const t=s();t?e(t):setTimeout(()=>N(s,e),50)}function oe(){return new Promise((s,e)=>{N(()=>{var t;return(t=window==null?void 0:window.vaadinPush)==null?void 0:t.atmosphere},s)})}var c,v;(function(s){s.LOG="log",s.INFORMATION="information",s.WARNING="warning",s.ERROR="error"})(v||(v={}));let d=c=class extends A{constructor(){super(...arguments),this.unhandledMessages=[],this.conf={enable:!1,url:"",liveReloadPort:-1},this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=l.UNAVAILABLE,this.javaStatus=l.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:"vaadin-dev-tools-log"},{id:"info",title:"Info",render:"vaadin-dev-tools-info"},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.nextMessageId=1,this.transitionDuration=0}static get styles(){return[V`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,X]}static get isActive(){const e=window.sessionStorage.getItem(c.ACTIVE_KEY_IN_SESSION_STORAGE);return e===null||e!=="false"}static notificationDismissed(e){const t=window.localStorage.getItem(c.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return t!==null&&t.includes(e)}elementTelemetry(){let e={};try{const t=localStorage.getItem("vaadin.statistics.basket");if(!t)return;e=JSON.parse(t)}catch{return}this.frontendConnection&&this.frontendConnection.send("reportTelemetry",{browserData:e})}openWebSocketConnection(){if(this.frontendStatus=l.UNAVAILABLE,this.javaStatus=l.UNAVAILABLE,!this.conf.token){console.error("Dev tools functionality denied for this host."),this.log(v.LOG,"See Vaadin documentation on how to configure devmode.hostsAllowed property.",void 0,"https://vaadin.com/docs/latest/configuration/properties#properties",void 0);return}const e=n=>this.log(v.ERROR,n),t=()=>{this.showSplashMessage("Reloading…");const n=window.sessionStorage.getItem(c.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),r=n?parseInt(n,10)+1:1;window.sessionStorage.setItem(c.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,r.toString()),window.sessionStorage.setItem(c.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(n,r)=>{let a=document.head.querySelector(`style[data-file-path='${n}']`);a?(this.log(v.INFORMATION,"Hot update of "+n),a.textContent=r,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):t()},i=new P(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log(v.LOG,"Vaadin development mode initialized"),c.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=e,i.onReload=t,i.onUpdate=o,i.onStatusChange=n=>{this.frontendStatus=n},i.onMessage=n=>this.handleFrontendMessage(n),this.frontendConnection=i,this.conf.backend===c.SPRING_BOOT_DEVTOOLS&&(this.javaConnection=new J(this.getSpringBootWebSocketUrl(window.location)),this.javaConnection.onHandshake=()=>{c.isActive||this.javaConnection.setActive(!1)},this.javaConnection.onReload=t,this.javaConnection.onConnectionError=e,this.javaConnection.onStatusChange=n=>{this.javaStatus=n},this.javaConnection.onHandshake=()=>{this.conf.backend&&this.log(v.INFORMATION,`Java live reload available: ${c.BACKEND_DISPLAY_NAME[this.conf.backend]}`)}),this.conf.backend||this.showNotification(v.WARNING,"Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}tabHandleMessage(e,t){const o=e;return o.handleMessage&&o.handleMessage.call(e,t)}handleFrontendMessage(e){for(const t of this.tabs)if(t.element&&this.tabHandleMessage(t.element,e))return;e.command==="featureFlags"?this.features=e.data.features:q(e)||this.unhandledMessages.push(e)}getDedicatedWebSocketUrl(){function e(o){const i=document.createElement("div");return i.innerHTML=`<a href="${o}"/>`,i.firstChild.href}if(this.conf.url===void 0)return;const t=e(this.conf.url);if(!t.startsWith("http://")&&!t.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${t}?v-r=push&debug_window&token=${this.conf.token}`}getSpringBootWebSocketUrl(e){const{hostname:t}=e,o=e.protocol==="https:"?"wss":"ws";if(t.endsWith("gitpod.io")){const i=t.replace(/.*?-/,"");return`${o}://${this.conf.liveReloadPort}-${i}`}else return`${o}://${t}:${this.conf.liveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.conf=window.Vaadin.devToolsConf||this.conf,this.disableEventListener=i=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),window.sessionStorage.getItem(c.TRIGGERED_KEY_IN_SESSION_STORAGE)){const i=new Date,n=`${`0${i.getHours()}`.slice(-2)}:${`0${i.getMinutes()}`.slice(-2)}:${`0${i.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${n}`),window.sessionStorage.removeItem(c.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),document.documentElement.addEventListener("vaadin-overlay-outside-click",i=>{const n=i,r=n.target.owner;if(r?Y(this,r):!1)return;n.detail.sourceEvent.composedPath().includes(this)&&i.preventDefault()});const o=window.Vaadin;o.devToolsPlugins&&(Array.from(o.devToolsPlugins).forEach(i=>this.initPlugin(i)),o.devToolsPlugins={push:i=>this.initPlugin(i)}),this.openWebSocketConnection(),K()}async initPlugin(e){const t=this;e.init({addTab:(o,i)=>{t.tabs.push({id:o,title:o,render:i})},send:function(o,i){t.frontendConnection.send(o,i)}})}format(e){return e.toString()}catchErrors(){const e=window.Vaadin.ConsoleErrors;e&&e.forEach(t=>{this.log(v.ERROR,t.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:t=>{this.log(v.ERROR,t.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(e=>this.dismissNotification(e.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(e){this.splashMessage=e,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},c.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log(v.LOG,this.splashMessage),this.showSplashMessage(void 0)}checkLicense(e){this.frontendConnection?this.frontendConnection.send("checkLicense",e):G({message:"Internal error: no connection",product:e})}log(e,t,o,i,n){const r=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:r,type:e,message:t,details:o,link:i,dontShowAgain:!1,dontShowAgainMessage:n,deleted:!1});this.messages.length>c.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const a=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&a?(setTimeout(()=>a.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):e===v.ERROR&&(this.unreadErrors=!0)})}showNotification(e,t,o,i,n,r){if(n===void 0||!c.notificationDismissed(n)){if(this.notifications.filter(b=>b.persistentId===n).filter(b=>!b.deleted).length>0)return;const p=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:p,type:e,message:t,details:o,link:i,persistentId:n,dontShowAgain:!1,dontShowAgainMessage:r,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(p)},c.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(e,t,o,i)}dismissNotification(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const o=this.notifications[t];if(o.dontShowAgain&&o.persistentId&&!c.notificationDismissed(o.persistentId)){let i=window.localStorage.getItem(c.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?o.persistentId:`${i},${o.persistentId}`,window.localStorage.setItem(c.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const i=this.findNotificationIndex(e);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(e){let t=-1;return this.notifications.some((o,i)=>o.id===e?(t=i,!0):!1),t}toggleDontShowAgain(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const o=this.notifications[t];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(e){var t,o;(t=this.frontendConnection)==null||t.setActive(e),(o=this.javaConnection)==null||o.setActive(e),window.sessionStorage.setItem(c.ACTIVE_KEY_IN_SESSION_STORAGE,e?"true":"false")}getStatusColor(e){return e===l.ACTIVE?"var(--dev-tools-green-color)":e===l.INACTIVE?"var(--dev-tools-grey-color)":e===l.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":e===l.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(e){return u`
      <div
        class="message ${e.type} ${e.deleted?"animate-out":""} ${e.details||e.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${e.message}</div>
          <div class="message-details" ?hidden="${!e.details&&!e.link}">
            ${e.details?u`<p>${e.details}</p>`:""}
            ${e.link?u`<a class="ahreflike" href="${e.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${e.persistentId?u`<div
                class="persist ${e.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(e.id)}
              >
                ${e.dontShowAgainMessage||"Don’t show again"}
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(e.id)}>Dismiss</div>
      </div>
    `}render(){return u` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${e=>e.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(e=>u`<button
                class=${H({tab:!0,active:this.activeTab===e.id,unreadErrors:e.id==="log"&&this.unreadErrors})}
                id="${e.id}"
                @click=${()=>{const t=this.tabs.find(n=>n.id===this.activeTab);if(t&&t.element){const n=typeof t.render=="function"?t.element.firstElementChild:t.element,r=n==null?void 0:n.deactivate;r&&r.call(n)}this.activeTab=e.id;const o=typeof e.render=="function"?e.element.firstElementChild:e.element,i=o.activate;i&&i.call(o)}}
              >
                ${e.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        <div id="tabContainer"></div>
      </div>

      <div class="notification-tray">${this.notifications.map(e=>this.renderMessage(e))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        style="display: var(--dev-tools-button-display, none)"
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?u`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:u`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?u`<span class="status-description">${this.splashMessage}</span></div>`:B}
      </div>`}updated(e){var n;super.updated(e);const t=this.renderRoot.querySelector("#tabContainer"),o=[];if(this.tabs.forEach(r=>{r.element||(typeof r.render=="function"?r.element=document.createElement("div"):(r.element=document.createElement(r.render),r.element._devTools=this),o.push(r.element))}),(t==null?void 0:t.childElementCount)!==this.tabs.length){for(let r=0;r<this.tabs.length;r++){const a=this.tabs[r];t.childElementCount>r&&t.children[r]===a.element||t.insertBefore(a.element,t.children[r])}for(;(t==null?void 0:t.childElementCount)>this.tabs.length;)(n=t.lastElementChild)==null||n.remove()}for(const r of this.tabs){typeof r.render=="function"?F(r.render(),r.element):r.element.requestUpdate&&r.element.requestUpdate();const a=r.id===this.activeTab;r.element.hidden=!a}for(const r of o)for(var i=0;i<this.unhandledMessages.length;i++)this.tabHandleMessage(r,this.unhandledMessages[i])&&(this.unhandledMessages.splice(i,1),i--)}renderFeatures(){return u`<div class="features-tray">
      ${this.features.map(e=>u`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${e.id}"
              type="checkbox"
              ?checked=${e.enabled}
              @change=${t=>this.toggleFeatureFlag(t,e)}
            />
            <span class="slider"></span>
            ${e.title}
          </label>
          <a class="ahreflike" href="${e.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}setJavaLiveReloadActive(e){var t;this.javaConnection?this.javaConnection.setActive(e):(t=this.frontendConnection)==null||t.setActive(e)}toggleFeatureFlag(e,t){const o=e.target.checked;this.frontendConnection?(this.frontendConnection.send("setFeature",{featureId:t.id,enabled:o}),this.showNotification(v.INFORMATION,`“${t.title}” ${o?"enabled":"disabled"}`,t.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${t.id}${o?"Enabled":"Disabled"}`)):this.log(v.ERROR,`Unable to toggle feature ${t.title}: No server connection available`)}};d.MAX_LOG_ROWS=1e3;d.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";d.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";d.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";d.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";d.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;d.HOTSWAP_AGENT="HOTSWAP_AGENT";d.JREBEL="JREBEL";d.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";d.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};h([m({type:Boolean,attribute:!1})],d.prototype,"expanded",void 0);h([m({type:Array,attribute:!1})],d.prototype,"messages",void 0);h([m({type:String,attribute:!1})],d.prototype,"splashMessage",void 0);h([m({type:Array,attribute:!1})],d.prototype,"notifications",void 0);h([m({type:String,attribute:!1})],d.prototype,"frontendStatus",void 0);h([m({type:String,attribute:!1})],d.prototype,"javaStatus",void 0);h([y()],d.prototype,"tabs",void 0);h([y()],d.prototype,"activeTab",void 0);h([y()],d.prototype,"features",void 0);h([y()],d.prototype,"unreadErrors",void 0);h([z(".window")],d.prototype,"root",void 0);h([y()],d.prototype,"componentPickActive",void 0);d=c=h([R("vaadin-dev-tools")],d);
