import{u as C,a as y}from"./ButtonSolid-DWKienDH.js";import{o as p,c as g,a as e,d as h,m as k,k as $,l as D,w as i,u as o,e as n,n as v,G as S,V as j,b as r,Y as B,S as E,r as L,h as w,F as _,j as N,t as b}from"./index-CcloLO3_.js";import{_ as V}from"./TabReference.vue_vue_type_script_setup_true_lang-DRT2XkRF.js";function M(f,s){return p(),g("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"})])}function T(f,s){return p(),g("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"})])}const I=["placeholder","value"],x=h({__name:"InputText",props:{placeholder:{},value:{}},emits:["change"],setup(f,{emit:s}){const l=s;return(d,m)=>(p(),g("div",null,[m[1]||(m[1]=e("label",{for:"input",class:"sr-only"},"Input",-1)),e("input",{type:"text",name:"input",id:"input",class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",placeholder:d.placeholder,value:d.value,onChange:m[0]||(m[0]=t=>l("change",t.target.value))},null,40,I)]))}}),P={class:"fixed inset-0 z-10 w-screen overflow-y-auto"},R={class:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"},F={class:"sm:flex sm:items-start"},z={class:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"},A={class:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"},G={class:"mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"},H=h({__name:"DialogDelete",props:{showing:{type:Boolean},showingModifiers:{}},emits:k(["delete"],["update:showing"]),setup(f,{emit:s}){const l=$(f,"showing"),d=s;return(m,t)=>(p(),D(o(E),{as:"template",show:l.value},{default:i(()=>[n(o(B),{class:"relative z-10",onClose:t[2]||(t[2]=a=>l.value=!1)},{default:i(()=>[n(o(v),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0"},{default:i(()=>t[3]||(t[3]=[e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"},null,-1)])),_:1}),e("div",P,[e("div",R,[n(o(v),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to":"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200","leave-from":"opacity-100 translate-y-0 sm:scale-100","leave-to":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:i(()=>[n(o(S),{class:"relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"},{default:i(()=>[e("div",F,[e("div",z,[n(o(M),{class:"h-6 w-6 text-red-600","aria-hidden":"true"})]),e("div",A,[n(o(j),{as:"h3",class:"text-base font-semibold leading-6 text-gray-900"},{default:i(()=>t[4]||(t[4]=[r("Delete row")])),_:1}),t[5]||(t[5]=e("div",{class:"mt-2"},[e("p",{class:"text-sm text-gray-500"},"Are you sure you want to delete this row? It will be permanently removed. This action cannot be undone.")],-1))])]),e("div",G,[e("button",{type:"button",class:"inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",onClick:t[0]||(t[0]=a=>{l.value=!1,d("delete")})},"Delete"),e("button",{type:"button",class:"mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:t[1]||(t[1]=a=>l.value=!1),ref:"cancelButtonRef"},"Cancel",512)])]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"]))}}),U={class:"flex justify-center rounded-md border border-dashed border-gray-900/25 px-6 py-2"},Y={class:"text-center"},Z={class:"flex text-sm leading-6 text-gray-600"},q={for:"file-upload",class:"relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"},W=h({__name:"InputFile",emits:["change"],setup(f,{emit:s}){const l=s;return(d,m)=>(p(),g("div",U,[e("div",Y,[e("div",Z,[e("label",q,[e("span",null,[L(d.$slots,"default")]),e("input",{id:"file-upload",name:"file-upload",type:"file",class:"sr-only",onChange:m[0]||(m[0]=t=>l("change",t))},null,32)])])])]))}}),J={class:"px-4 sm:px-6 lg:px-8"},K={class:"sm:flex sm:items-center"},O={class:"sm:flex-auto"},Q={class:"mt-2 text-sm text-gray-700"},X={class:"mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-2"},ee={class:"mt-8 flow-root"},te={class:"-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},se={class:"inline-block min-w-full py-2 align-middle"},oe={class:"min-w-full divide-y divide-gray-300"},ne={class:"divide-y divide-gray-200 bg-white"},le={class:"whitespace-nowrap py-2 lg:pl-4 lg:pr-3 text-sm font-medium text-gray-900"},ae={class:"whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500"},re={class:"whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500"},ie={class:"whitespace-nowrap lg:px-3 py-2 text-sm text-gray-500"},de={class:"relative whitespace-nowrap lg:pl-3 lg:pr-4 text-right text-sm font-medium"},me=["onClick"],pe={class:"sr-only"},ue={class:"flex flex-row justify-center p-2"},xe=h({__name:"EntriesView",setup(f){const s=C(),l=w(!1),d=w(0);return(m,t)=>(p(),g(_,null,[e("div",J,[e("div",K,[e("div",O,[t[6]||(t[6]=e("h1",{class:"text-base font-semibold leading-6 text-gray-900"},"Entries",-1)),e("p",Q,[t[4]||(t[4]=r("Enter all the entries in your show including their title, event type, and people. These can be in any order. Show Sequence Creator does not save anything for you! Download your entries to get them back later. When you are done adding your entries go to the ")),n(V,{to:"/show"},{default:i(()=>t[3]||(t[3]=[r("Show")])),_:1}),t[5]||(t[5]=r(" tab to generate an order that spaces out items in your show."))])]),e("div",X,[n(W,{onChange:o(s).uploadCsv},{default:i(()=>t[7]||(t[7]=[r("Upload csv file")])),_:1},8,["onChange"]),n(y,{type:"button",onClick:t[0]||(t[0]=a=>o(s).downloadCsv())},{default:i(()=>t[8]||(t[8]=[r("Download")])),_:1})])]),e("div",ee,[e("div",te,[e("div",se,[e("table",oe,[t[9]||(t[9]=e("thead",null,[e("tr",null,[e("th",{scope:"col"},[e("span",{class:"sr-only"},"Number")]),e("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"},[r("Name "),e("span",{class:"text-gray-500 text.sm"},"(optional)")]),e("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},"Event Type"),e("th",{scope:"col",class:"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"},[r("People "),e("span",{class:"text-gray-500 text-sm"},"(Seperated by comma)")]),e("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"},[r("Lock Location Percent "),e("span",{class:"text-gray-500 text-sm"},"(optional)")]),e("th",{scope:"col",class:"relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"},[e("span",{class:"sr-only"},"Remove")])])],-1)),e("tbody",ne,[(p(!0),g(_,null,N(o(s).entries,(a,u)=>(p(),g("tr",{key:u},[e("td",null,b(u+1),1),e("td",le,[n(x,{placeholder:"name",value:a.name,onChange:c=>o(s).updateName(u,c)},null,8,["value","onChange"])]),e("td",ae,[n(x,{placeholder:"event",value:a.event,onChange:c=>o(s).updateEvent(u,c)},null,8,["value","onChange"])]),e("td",re,[n(x,{placeholder:"person, person",value:a.people,onChange:c=>o(s).updatePeople(u,c)},null,8,["value","onChange"])]),e("td",ie,[n(x,{placeholder:"100",value:a.percentage,onChange:c=>o(s).updatePercentage(u,c)},null,8,["value","onChange"])]),e("td",de,[e("button",{onClick:()=>{d.value=u,l.value=!0},tabindex:"-1",class:"text-red-500 hover:text-red-900"},[n(o(T),{class:"w-6 h-6"}),e("span",pe,"Remove, "+b(a.name),1)],8,me)])]))),128))])]),e("div",ue,[n(y,{onClick:o(s).addEntry},{default:i(()=>t[10]||(t[10]=[r("Add entry")])),_:1},8,["onClick"])])])])])]),n(H,{showing:l.value,"onUpdate:showing":t[1]||(t[1]=a=>l.value=a),onDelete:t[2]||(t[2]=()=>o(s).removeEntry(d.value))},null,8,["showing"])],64))}});export{xe as default};
