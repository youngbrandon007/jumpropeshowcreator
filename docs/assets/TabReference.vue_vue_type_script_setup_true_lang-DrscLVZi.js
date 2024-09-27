import{d as Le,r as Fe,w as Ue,a as qe,o as Me,j as ze,g as Pe,l as je,n as Be}from"./index-DZXZa7g7.js";var we;(function(r){r.csv="text/csv",r.tsv="text/tab-separated-values",r.plain="text/plain"})(we||(we={}));var de=r=>r,K=r=>r,pe=de,_e=de,fe=de,Re=de,Se=de,Ne={fieldSeparator:",",decimalSeparator:".",quoteStrings:!0,quoteCharacter:'"',showTitle:!1,title:"My Generated Report",filename:"generated",showColumnHeaders:!0,useTextFile:!1,fileExtension:"csv",mediaType:we.csv,useBom:!0,columnHeaders:[],useKeysAsHeaders:!1,boolDisplay:{true:"TRUE",false:"FALSE"},replaceUndefinedWith:""},He=`\r
`,Ke="\uFEFF",ve=r=>Object.assign({},Ne,r);class Qe extends Error{constructor(n){super(n),this.name="CsvGenerationError"}}class Je extends Error{constructor(n){super(n),this.name="EmptyHeadersError"}}class Ge extends Error{constructor(n){super(n),this.name="CsvDownloadEnvironmentError"}}class Ve extends Error{constructor(n){super(n),this.name="UnsupportedDataFormatError"}}var Ze=function(r,n){return n=='"'&&r.indexOf('"')>-1?r.replace(/"/g,'""'):r},Ye=r=>Re(typeof r=="object"?r.key:r),Xe=r=>Se(typeof r=="object"?r.displayLabel:r),We=(r,...n)=>n.reduce((g,d)=>d(g),r),$e=r=>n=>r.useBom?_e(K(n)+Ke):n,et=r=>n=>r.showTitle?Ee(_e(K(n)+r.title))(fe("")):n,Ee=r=>n=>_e(K(r)+K(n)+He),Te=r=>(n,g)=>tt(r)(fe(K(n)+K(g))),tt=r=>n=>de(K(n)+r.fieldSeparator),rt=(r,n)=>g=>{if(!r.showColumnHeaders)return g;if(n.length<1)throw new Je("Option to show headers but none supplied. Make sure there are keys in your collection or that you've supplied headers through the config options.");let d=fe("");for(let O=0;O<n.length;O++){const H=Xe(n[O]);d=Te(r)(d,Ae(r,K(H)))}return d=fe(K(d).slice(0,-1)),Ee(g)(d)},nt=(r,n,g)=>d=>{let O=d;for(var H=0;H<g.length;H++){let L=fe("");for(let oe=0;oe<n.length;oe++){const f=Ye(n[oe]),ee=g[H][K(f)];L=Te(r)(L,Ae(r,ee))}L=fe(K(L).slice(0,-1)),O=Ee(O)(L)}return O},it=r=>+r===r&&(!isFinite(r)||!!(r%1)),st=(r,n)=>{if(it(n)){if(r.decimalSeparator==="locale")return pe(n.toLocaleString());if(r.decimalSeparator)return pe(n.toString().replace(".",r.decimalSeparator))}return pe(n.toString())},me=(r,n)=>{let g=n;return(r.quoteStrings||r.fieldSeparator&&n.indexOf(r.fieldSeparator)>-1||r.quoteCharacter&&n.indexOf(r.quoteCharacter)>-1||n.indexOf(`
`)>-1||n.indexOf("\r")>-1)&&(g=r.quoteCharacter+Ze(n,r.quoteCharacter)+r.quoteCharacter),pe(g)},at=(r,n)=>{const g=n?"true":"false";return pe(r.boolDisplay[g])},ot=(r,n)=>typeof n>"u"&&r.replaceUndefinedWith!==void 0?me(r,r.replaceUndefinedWith+""):n===null?me(r,"null"):me(r,""),Ae=(r,n)=>{if(typeof n=="number")return st(r,n);if(typeof n=="string")return me(r,n);if(typeof n=="boolean"&&r.boolDisplay)return at(r,n);if(n===null||typeof n>"u")return ot(r,n);throw new Ve(`
    typeof ${typeof n} isn't supported. Only number, string, boolean, null and undefined are supported.
    Please convert the data in your object to one of those before generating the CSV.
    `)},ut=r=>n=>{const g=ve(r),d=g.useKeysAsHeaders?Object.keys(n[0]):g.columnHeaders;let O=We(_e(""),$e(g),et(g),rt(g,d),nt(g,d,n));if(K(O).length<1)throw new Qe("Output is empty. Is your data formatted correctly?");return O},lt=r=>n=>{const g=ve(r),d=K(n),O=g.useTextFile?"text/plain":g.mediaType;return new Blob([d],{type:`${O};charset=utf8;`})},ht=r=>n=>{if(!window)throw new Ge("Downloading only supported in a browser environment.");const g=lt(r)(n),d=ve(r),O=d.useTextFile?"txt":d.fileExtension,H=`${d.filename}.${O}`,L=document.createElement("a");L.download=H,L.href=URL.createObjectURL(g),L.setAttribute("visibility","hidden"),document.body.appendChild(L),L.click(),document.body.removeChild(L)},ft=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ie={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(r,n){(function(g,d){r.exports=d()})(ft,function g(){var d=typeof self<"u"?self:typeof window<"u"?window:d!==void 0?d:{},O=!d.document&&!!d.postMessage,H=d.IS_PAPA_WORKER||!1,L={},oe=0,f={parse:function(t,e){var i=(e=e||{}).dynamicTyping||!1;if(y(i)&&(e.dynamicTypingFunction=i,i={}),e.dynamicTyping=i,e.transform=!!y(e.transform)&&e.transform,e.worker&&f.WORKERS_SUPPORTED){var s=function(){if(!f.WORKERS_SUPPORTED)return!1;var c=(M=d.URL||d.webkitURL||null,S=g.toString(),f.BLOB_URL||(f.BLOB_URL=M.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",S,")();"],{type:"text/javascript"})))),p=new d.Worker(c),M,S;return p.onmessage=De,p.id=oe++,L[p.id]=p}();return s.userStep=e.step,s.userChunk=e.chunk,s.userComplete=e.complete,s.userError=e.error,e.step=y(e.step),e.chunk=y(e.chunk),e.complete=y(e.complete),e.error=y(e.error),delete e.worker,void s.postMessage({input:t,config:e,workerId:s.id})}var o=null;return f.NODE_STREAM_INPUT,typeof t=="string"?(t=function(c){return c.charCodeAt(0)===65279?c.slice(1):c}(t),o=e.download?new m(e):new R(e)):t.readable===!0&&y(t.read)&&y(t.on)?o=new N(e):(d.File&&t instanceof File||t instanceof Object)&&(o=new E(e)),o.stream(t)},unparse:function(t,e){var i=!1,s=!0,o=",",c=`\r
`,p='"',M=p+p,S=!1,u=null,A=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||f.BAD_DELIMITERS.filter(function(a){return e.delimiter.indexOf(a)!==-1}).length||(o=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(i=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(S=e.skipEmptyLines),typeof e.newline=="string"&&(c=e.newline),typeof e.quoteChar=="string"&&(p=e.quoteChar),typeof e.header=="boolean"&&(s=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");u=e.columns}e.escapeChar!==void 0&&(M=e.escapeChar+p),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(A=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var h=new RegExp(W(p),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return Y(null,t,S);if(typeof t[0]=="object")return Y(u||Object.keys(t[0]),t,S)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||u),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),Y(t.fields||[],t.data||[],S);throw new Error("Unable to serialize unrecognized input");function Y(a,w,j){var T="";typeof a=="string"&&(a=JSON.parse(a)),typeof w=="string"&&(w=JSON.parse(w));var z=Array.isArray(a)&&0<a.length,U=!Array.isArray(w[0]);if(z&&s){for(var q=0;q<a.length;q++)0<q&&(T+=o),T+=P(a[q],q);0<w.length&&(T+=c)}for(var l=0;l<w.length;l++){var _=z?a.length:w[l].length,C=!1,F=z?Object.keys(w[l]).length===0:w[l].length===0;if(j&&!z&&(C=j==="greedy"?w[l].join("").trim()==="":w[l].length===1&&w[l][0].length===0),j==="greedy"&&z){for(var b=[],B=0;B<_;B++){var I=U?a[B]:B;b.push(w[l][I])}C=b.join("").trim()===""}if(!C){for(var k=0;k<_;k++){0<k&&!F&&(T+=o);var X=z&&U?a[k]:k;T+=P(w[l][X],k)}l<w.length-1&&(!j||0<_&&!F)&&(T+=c)}}return T}function P(a,w){if(a==null)return"";if(a.constructor===Date)return JSON.stringify(a).slice(1,25);var j=!1;A&&typeof a=="string"&&A.test(a)&&(a="'"+a,j=!0);var T=a.toString().replace(h,M);return(j=j||i===!0||typeof i=="function"&&i(a,w)||Array.isArray(i)&&i[w]||function(z,U){for(var q=0;q<U.length;q++)if(-1<z.indexOf(U[q]))return!0;return!1}(T,f.BAD_DELIMITERS)||-1<T.indexOf(o)||T.charAt(0)===" "||T.charAt(T.length-1)===" ")?p+T+p:T}}};if(f.RECORD_SEP="",f.UNIT_SEP="",f.BYTE_ORDER_MARK="\uFEFF",f.BAD_DELIMITERS=["\r",`
`,'"',f.BYTE_ORDER_MARK],f.WORKERS_SUPPORTED=!O&&!!d.Worker,f.NODE_STREAM_INPUT=1,f.LocalChunkSize=10485760,f.RemoteChunkSize=5242880,f.DefaultDelimiter=",",f.Parser=ye,f.ParserHandle=ce,f.NetworkStreamer=m,f.FileStreamer=E,f.StringStreamer=R,f.ReadableStreamStreamer=N,d.jQuery){var ee=d.jQuery;ee.fn.parse=function(t){var e=t.config||{},i=[];return this.each(function(c){if(!(ee(this).prop("tagName").toUpperCase()==="INPUT"&&ee(this).attr("type").toLowerCase()==="file"&&d.FileReader)||!this.files||this.files.length===0)return!0;for(var p=0;p<this.files.length;p++)i.push({file:this.files[p],inputElem:this,instanceConfig:ee.extend({},e)})}),s(),this;function s(){if(i.length!==0){var c,p,M,S,u=i[0];if(y(t.before)){var A=t.before(u.file,u.inputElem);if(typeof A=="object"){if(A.action==="abort")return c="AbortError",p=u.file,M=u.inputElem,S=A.reason,void(y(t.error)&&t.error({name:c},p,M,S));if(A.action==="skip")return void o();typeof A.config=="object"&&(u.instanceConfig=ee.extend(u.instanceConfig,A.config))}else if(A==="skip")return void o()}var h=u.instanceConfig.complete;u.instanceConfig.complete=function(Y){y(h)&&h(Y,u.file,u.inputElem),o()},f.parse(u.file,u.instanceConfig)}else y(t.complete)&&t.complete()}function o(){i.splice(0,1),s()}}}function Z(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var i=be(e);i.chunkSize=parseInt(i.chunkSize),e.step||e.chunk||(i.chunkSize=null),this._handle=new ce(i),(this._handle.streamer=this)._config=i}).call(this,t),this.parseChunk=function(e,i){if(this.isFirstChunk&&y(this._config.beforeFirstChunk)){var s=this._config.beforeFirstChunk(e);s!==void 0&&(e=s)}this.isFirstChunk=!1,this._halted=!1;var o=this._partialLine+e;this._partialLine="";var c=this._handle.parse(o,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var p=c.meta.cursor;this._finished||(this._partialLine=o.substring(p-this._baseIndex),this._baseIndex=p),c&&c.data&&(this._rowCount+=c.data.length);var M=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(H)d.postMessage({results:c,workerId:f.WORKER_ID,finished:M});else if(y(this._config.chunk)&&!i){if(this._config.chunk(c,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);c=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(c.data),this._completeResults.errors=this._completeResults.errors.concat(c.errors),this._completeResults.meta=c.meta),this._completed||!M||!y(this._config.complete)||c&&c.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),M||c&&c.meta.paused||this._nextChunk(),c}this._halted=!0},this._sendError=function(e){y(this._config.error)?this._config.error(e):H&&this._config.error&&d.postMessage({workerId:f.WORKER_ID,error:e,finished:!1})}}function m(t){var e;(t=t||{}).chunkSize||(t.chunkSize=f.RemoteChunkSize),Z.call(this,t),this._nextChunk=O?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(i){this._input=i,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),O||(e.onload=ne(this._chunkLoaded,this),e.onerror=ne(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!O),this._config.downloadRequestHeaders){var i=this._config.downloadRequestHeaders;for(var s in i)e.setRequestHeader(s,i[s])}if(this._config.chunkSize){var o=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+o)}try{e.send(this._config.downloadRequestBody)}catch(c){this._chunkError(c.message)}O&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(i){var s=i.getResponseHeader("Content-Range");return s===null?-1:parseInt(s.substring(s.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(i){var s=e.statusText||i;this._sendError(new Error(s))}}function E(t){var e,i;(t=t||{}).chunkSize||(t.chunkSize=f.LocalChunkSize),Z.call(this,t);var s=typeof FileReader<"u";this.stream=function(o){this._input=o,i=o.slice||o.webkitSlice||o.mozSlice,s?((e=new FileReader).onload=ne(this._chunkLoaded,this),e.onerror=ne(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var o=this._input;if(this._config.chunkSize){var c=Math.min(this._start+this._config.chunkSize,this._input.size);o=i.call(o,this._start,c)}var p=e.readAsText(o,this._config.encoding);s||this._chunkLoaded({target:{result:p}})},this._chunkLoaded=function(o){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(o.target.result)},this._chunkError=function(){this._sendError(e.error)}}function R(t){var e;Z.call(this,t=t||{}),this.stream=function(i){return e=i,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var i,s=this._config.chunkSize;return s?(i=e.substring(0,s),e=e.substring(s)):(i=e,e=""),this._finished=!e,this.parseChunk(i)}}}function N(t){Z.call(this,t=t||{});var e=[],i=!0,s=!1;this.pause=function(){Z.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){Z.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(o){this._input=o,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){s&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):i=!0},this._streamData=ne(function(o){try{e.push(typeof o=="string"?o:o.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(c){this._streamError(c)}},this),this._streamError=ne(function(o){this._streamCleanUp(),this._sendError(o)},this),this._streamEnd=ne(function(){this._streamCleanUp(),s=!0,this._streamData("")},this),this._streamCleanUp=ne(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function ce(t){var e,i,s,o=Math.pow(2,53),c=-o,p=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,M=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,S=this,u=0,A=0,h=!1,Y=!1,P=[],a={data:[],errors:[],meta:{}};if(y(t.step)){var w=t.step;t.step=function(l){if(a=l,z())T();else{if(T(),a.data.length===0)return;u+=l.data.length,t.preview&&u>t.preview?i.abort():(a.data=a.data[0],w(a,S))}}}function j(l){return t.skipEmptyLines==="greedy"?l.join("").trim()==="":l.length===1&&l[0].length===0}function T(){return a&&s&&(q("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+f.DefaultDelimiter+"'"),s=!1),t.skipEmptyLines&&(a.data=a.data.filter(function(l){return!j(l)})),z()&&function(){if(!a)return;function l(C,F){y(t.transformHeader)&&(C=t.transformHeader(C,F)),P.push(C)}if(Array.isArray(a.data[0])){for(var _=0;z()&&_<a.data.length;_++)a.data[_].forEach(l);a.data.splice(0,1)}else a.data.forEach(l)}(),function(){if(!a||!t.header&&!t.dynamicTyping&&!t.transform)return a;function l(C,F){var b,B=t.header?{}:[];for(b=0;b<C.length;b++){var I=b,k=C[b];t.header&&(I=b>=P.length?"__parsed_extra":P[b]),t.transform&&(k=t.transform(k,I)),k=U(I,k),I==="__parsed_extra"?(B[I]=B[I]||[],B[I].push(k)):B[I]=k}return t.header&&(b>P.length?q("FieldMismatch","TooManyFields","Too many fields: expected "+P.length+" fields but parsed "+b,A+F):b<P.length&&q("FieldMismatch","TooFewFields","Too few fields: expected "+P.length+" fields but parsed "+b,A+F)),B}var _=1;return!a.data.length||Array.isArray(a.data[0])?(a.data=a.data.map(l),_=a.data.length):a.data=l(a.data,0),t.header&&a.meta&&(a.meta.fields=P),A+=_,a}()}function z(){return t.header&&P.length===0}function U(l,_){return C=l,t.dynamicTypingFunction&&t.dynamicTyping[C]===void 0&&(t.dynamicTyping[C]=t.dynamicTypingFunction(C)),(t.dynamicTyping[C]||t.dynamicTyping)===!0?_==="true"||_==="TRUE"||_!=="false"&&_!=="FALSE"&&(function(F){if(p.test(F)){var b=parseFloat(F);if(c<b&&b<o)return!0}return!1}(_)?parseFloat(_):M.test(_)?new Date(_):_===""?null:_):_;var C}function q(l,_,C,F){var b={type:l,code:_,message:C};F!==void 0&&(b.row=F),a.errors.push(b)}this.parse=function(l,_,C){var F=t.quoteChar||'"';if(t.newline||(t.newline=function(I,k){I=I.substring(0,1048576);var X=new RegExp(W(k)+"([^]*?)"+W(k),"gm"),Q=(I=I.replace(X,"")).split("\r"),$=I.split(`
`),te=1<$.length&&$[0].length<Q[0].length;if(Q.length===1||te)return`
`;for(var J=0,x=0;x<Q.length;x++)Q[x][0]===`
`&&J++;return J>=Q.length/2?`\r
`:"\r"}(l,F)),s=!1,t.delimiter)y(t.delimiter)&&(t.delimiter=t.delimiter(l),a.meta.delimiter=t.delimiter);else{var b=function(I,k,X,Q,$){var te,J,x,D;$=$||[",","	","|",";",f.RECORD_SEP,f.UNIT_SEP];for(var ue=0;ue<$.length;ue++){var v=$[ue],he=0,re=0,le=0;x=void 0;for(var ie=new ye({comments:Q,delimiter:v,newline:k,preview:10}).parse(I),se=0;se<ie.data.length;se++)if(X&&j(ie.data[se]))le++;else{var ae=ie.data[se].length;re+=ae,x!==void 0?0<ae&&(he+=Math.abs(ae-x),x=ae):x=ae}0<ie.data.length&&(re/=ie.data.length-le),(J===void 0||he<=J)&&(D===void 0||D<re)&&1.99<re&&(J=he,te=v,D=re)}return{successful:!!(t.delimiter=te),bestDelimiter:te}}(l,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);b.successful?t.delimiter=b.bestDelimiter:(s=!0,t.delimiter=f.DefaultDelimiter),a.meta.delimiter=t.delimiter}var B=be(t);return t.preview&&t.header&&B.preview++,e=l,i=new ye(B),a=i.parse(e,_,C),T(),h?{meta:{paused:!0}}:a||{meta:{paused:!1}}},this.paused=function(){return h},this.pause=function(){h=!0,i.abort(),e=y(t.chunk)?"":e.substring(i.getCharIndex())},this.resume=function(){S.streamer._halted?(h=!1,S.streamer.parseChunk(e,!0)):setTimeout(S.resume,3)},this.aborted=function(){return Y},this.abort=function(){Y=!0,i.abort(),a.meta.aborted=!0,y(t.complete)&&t.complete(a),e=""}}function W(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ye(t){var e,i=(t=t||{}).delimiter,s=t.newline,o=t.comments,c=t.step,p=t.preview,M=t.fastMode,S=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(S=t.escapeChar),(typeof i!="string"||-1<f.BAD_DELIMITERS.indexOf(i))&&(i=","),o===i)throw new Error("Comment character same as delimiter");o===!0?o="#":(typeof o!="string"||-1<f.BAD_DELIMITERS.indexOf(o))&&(o=!1),s!==`
`&&s!=="\r"&&s!==`\r
`&&(s=`
`);var u=0,A=!1;this.parse=function(h,Y,P){if(typeof h!="string")throw new Error("Input must be a string");var a=h.length,w=i.length,j=s.length,T=o.length,z=y(c),U=[],q=[],l=[],_=u=0;if(!h)return G();if(t.header&&!Y){var C=h.split(s)[0].split(i),F=[],b={},B=!1;for(var I in C){var k=C[I];y(t.transformHeader)&&(k=t.transformHeader(k,I));var X=k,Q=b[k]||0;for(0<Q&&(B=!0,X=k+"_"+Q),b[k]=Q+1;F.includes(X);)X=X+"_"+Q;F.push(X)}if(B){var $=h.split(s);$[0]=F.join(i),h=$.join(s)}}if(M||M!==!1&&h.indexOf(e)===-1){for(var te=h.split(s),J=0;J<te.length;J++){if(l=te[J],u+=l.length,J!==te.length-1)u+=s.length;else if(P)return G();if(!o||l.substring(0,T)!==o){if(z){if(U=[],le(l.split(i)),ge(),A)return G()}else le(l.split(i));if(p&&p<=J)return U=U.slice(0,p),G(!0)}}return G()}for(var x=h.indexOf(i,u),D=h.indexOf(s,u),ue=new RegExp(W(S)+W(e),"g"),v=h.indexOf(e,u);;)if(h[u]!==e)if(o&&l.length===0&&h.substring(u,u+T)===o){if(D===-1)return G();u=D+j,D=h.indexOf(s,u),x=h.indexOf(i,u)}else if(x!==-1&&(x<D||D===-1))l.push(h.substring(u,x)),u=x+w,x=h.indexOf(i,u);else{if(D===-1)break;if(l.push(h.substring(u,D)),ae(D+j),z&&(ge(),A))return G();if(p&&U.length>=p)return G(!0)}else for(v=u,u++;;){if((v=h.indexOf(e,v+1))===-1)return P||q.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:U.length,index:u}),se();if(v===a-1)return se(h.substring(u,v).replace(ue,e));if(e!==S||h[v+1]!==S){if(e===S||v===0||h[v-1]!==S){x!==-1&&x<v+1&&(x=h.indexOf(i,v+1)),D!==-1&&D<v+1&&(D=h.indexOf(s,v+1));var he=ie(D===-1?x:Math.min(x,D));if(h.substr(v+1+he,w)===i){l.push(h.substring(u,v).replace(ue,e)),h[u=v+1+he+w]!==e&&(v=h.indexOf(e,u)),x=h.indexOf(i,u),D=h.indexOf(s,u);break}var re=ie(D);if(h.substring(v+1+re,v+1+re+j)===s){if(l.push(h.substring(u,v).replace(ue,e)),ae(v+1+re+j),x=h.indexOf(i,u),v=h.indexOf(e,u),z&&(ge(),A))return G();if(p&&U.length>=p)return G(!0);break}q.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:U.length,index:u}),v++}}else v++}return se();function le(V){U.push(V),_=u}function ie(V){var Oe=0;if(V!==-1){var ke=h.substring(v+1,V);ke&&ke.trim()===""&&(Oe=ke.length)}return Oe}function se(V){return P||(V===void 0&&(V=h.substring(u)),l.push(V),u=a,le(l),z&&ge()),G()}function ae(V){u=V,le(l),l=[],D=h.indexOf(s,u)}function G(V){return{data:U,errors:q,meta:{delimiter:i,linebreak:s,aborted:A,truncated:!!V,cursor:_+(Y||0)}}}function ge(){c(G()),U=[],q=[]}},this.abort=function(){A=!0},this.getCharIndex=function(){return u}}function De(t){var e=t.data,i=L[e.workerId],s=!1;if(e.error)i.userError(e.error,e.file);else if(e.results&&e.results.data){var o={abort:function(){s=!0,Ce(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:xe,resume:xe};if(y(i.userStep)){for(var c=0;c<e.results.data.length&&(i.userStep({data:e.results.data[c],errors:e.results.errors,meta:e.results.meta},o),!s);c++);delete e.results}else y(i.userChunk)&&(i.userChunk(e.results,o,e.file),delete e.results)}e.finished&&!s&&Ce(e.workerId,e.results)}function Ce(t,e){var i=L[t];y(i.userComplete)&&i.userComplete(e),i.terminate(),delete L[t]}function xe(){throw new Error("Not implemented.")}function be(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var i in t)e[i]=be(t[i]);return e}function ne(t,e){return function(){t.apply(e,arguments)}}function y(t){return typeof t=="function"}return H&&(d.onmessage=function(t){var e=t.data;if(f.WORKER_ID===void 0&&e&&(f.WORKER_ID=e.workerId),typeof e.input=="string")d.postMessage({workerId:f.WORKER_ID,results:f.parse(e.input,e.config),finished:!0});else if(d.File&&e.input instanceof File||e.input instanceof Object){var i=f.parse(e.input,e.config);i&&d.postMessage({workerId:f.WORKER_ID,results:i,finished:!0})}}),(m.prototype=Object.create(Z.prototype)).constructor=m,(E.prototype=Object.create(Z.prototype)).constructor=E,(R.prototype=Object.create(R.prototype)).constructor=R,(N.prototype=Object.create(Z.prototype)).constructor=N,f})})(Ie);var dt=Ie.exports;const pt=Le("entries",()=>{let r=[];try{r=JSON.parse(localStorage.getItem("entries")??"[]")}catch(m){console.error(m)}const n=Fe(r);Ue(n,m=>{localStorage.setItem("entries",JSON.stringify(m))});function g(){n.value=n.value.concat([{name:"",event:"",people:"",percentage:""}])}function d(m){n.value=n.value.slice(0,m).concat(n.value.slice(m+1))}function O(m,E){n.value=n.value.map((R,N)=>m===N?{...R,name:E}:{...R})}function H(m,E){n.value=n.value.map((R,N)=>m===N?{...R,event:E}:{...R})}function L(m,E){n.value=n.value.map((R,N)=>m===N?{...R,people:E}:{...R})}function oe(m,E){n.value=n.value.map((R,N)=>m===N?{...R,percentage:E}:{...R})}function f(){return n.value.map(m=>{let E=null;try{E=parseFloat(m.percentage),isNaN(E)&&(E=null)}catch{}return{name:m.name.trim(),event:m.event.trim(),people:m.people.split(",").map(R=>R.trim()),percentage:E}})}function ee(){const m=ve({useKeysAsHeaders:!0,filename:"entries"}),E=ut(m)(n.value);ht(m)(E)}async function Z(m){const E=m.target;if(E&&E.files){const R=await E.files[0].text(),{data:N,errors:ce}=dt.parse(R,{header:!0,dynamicTyping:!0,skipEmptyLines:!0});ce.length>0?(alert("Issue processing CSV!"),console.error(ce)):n.value=N.map(W=>({name:W.name??"",event:W.event??"",people:W.people??"",percentage:W.percentage??""}))}}return{entries:n,addEntry:g,removeEntry:d,updateName:O,updateEvent:H,updatePeople:L,updatePercentage:oe,getProcessedValue:f,downloadCsv:ee,uploadCsv:Z}}),gt=qe({__name:"TabReference",props:{to:{}},setup(r){return(n,g)=>{const d=je("RouterLink");return Me(),ze(d,{to:n.to,class:"rounded-md bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"},{default:Pe(()=>[Be(n.$slots,"default")]),_:3},8,["to"])}}});export{gt as _,pt as u};
