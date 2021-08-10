var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(t,a,o)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,n=(e,n)=>{for(var s in n||(n={}))a.call(n,s)&&r(e,s,n[s]);if(t)for(var s of t(n))o.call(n,s)&&r(e,s,n[s]);return e};import{R as s,m as l,a as d,i,b as c,c as m,o as u,C as p,H as f,d as h,e as b,f as g,g as x,v as y,h as E}from"./vendor.a045db00.js";const N=new class{constructor(){this.todos=[],l(this),d(this,{name:"AppStore",properties:["todos"],storage:window.localStorage,stringify:!0,debugMode:!1},{delay:0})}get isHydrated(){return i(this)}get isPersisting(){return c(this)}async clearPersistedData(){await m(this)}addTodo(e){const t=JSON.parse(JSON.stringify(this.todos));this.todos=[...t,e]}updateTodo(e,t){this.todos=this.todos.filter((t=>t.id!==e)),this.addTodo(t)}deleteTodo(e){this.todos=this.todos.filter((t=>t.id!==e))}},v=s.createContext(N),C=()=>s.useContext(v),w=u((()=>{const[e,t]=p.exports.useState(""),a=C(),o=a.todos.filter((e=>!e.finished)).sort(((e,t)=>t.dateAdded-e.dateAdded)),r=a.todos.filter((e=>e.finished)).sort(((e,t)=>t.dateAdded-e.dateAdded));return s.createElement("div",{className:"max-w-3xl px-4 mx-auto"},s.createElement("div",{className:"flex items-center justify-between my-8"},s.createElement("div",{className:"flex items-center space-x-4"},s.createElement("button",{className:"p-2 bg-gray-800 rounded-2xl"},s.createElement(f,{className:"text-2xl"})),s.createElement("h1",{className:"text-3xl font-bold"},"PERN Todo")),s.createElement("button",null,s.createElement(h,null))),s.createElement("form",{onSubmit:o=>{if(o.preventDefault(),e){const o={id:y(),finished:!1,title:e.trim(),dateAdded:(new Date).getTime()};a.addTodo(o),t("")}},className:"flex items-center p-2 my-8 space-x-4 border-2 border-gray-800 focus-within:border-blue-500 rounded-2xl "},s.createElement("button",{type:"submit",className:"p-1 bg-[#FC76A1] rounded-xl hover:opacity-70 transition-opacity"},s.createElement(b,{className:"text-2xl text-gray-900"})),s.createElement("input",{autoComplete:"off",value:e,onChange:e=>t(e.target.value),className:"flex-1 pr-2 font-semibold bg-transparent border-none outline-none text",placeholder:"Add a task",type:"text",name:"todo-input",id:"todo-input"})),o.length>0&&s.createElement("div",null,s.createElement("h2",null,"Tasks - ",o.length),s.createElement("div",{className:"flex flex-col mt-4 space-y-3"},o.map((e=>s.createElement(A,{key:e.id,todo:e}))))),r.length>0&&s.createElement("div",{className:"mt-5"},s.createElement("h2",null,"Completed- ",r.length),s.createElement("div",{className:"flex flex-col mt-4 space-y-3"},r.map((e=>s.createElement(A,{key:e.id,todo:e}))))))})),A=({todo:e})=>{const t=e.title,[a,o]=p.exports.useState(!1),[r,l]=p.exports.useState(e.title),d=C(),i=()=>{const t=n({},e);t.finished=!t.finished,d.updateTodo(e.id,t)};return s.createElement("div",{className:"flex items-center p-3 space-x-3 bg-gray-800 group rounded-xl focus-within:ring-2 focus-within:ring-blue-500"},e.finished?s.createElement("button",{onClick:i,className:"relative w-5 h-5 rounded-lg bg-[#FC76A1] border-2 border-[#FC76A1]"},s.createElement(g,{className:"text-gray-900"})):s.createElement("button",{onClick:i,className:"relative w-5 h-5 rounded-lg border-2 border-[#FC76A1]"}),a?s.createElement("input",{autoFocus:!0,onBlur:()=>{o(!1),(()=>{if(r.trim()){const t=n({},e);t.title=r.trim(),d.updateTodo(e.id,t)}else l(t)})()},className:"flex-1 bg-transparent border-none outline-none",value:r,onChange:e=>l(e.target.value),type:"text",name:"todo-input",id:"todo-input",autoComplete:"off"}):s.createElement("p",{className:`flex-1 ${e.finished&&"line-through"}`,onClick:()=>o(!0)},e.title),s.createElement("button",{onClick:()=>{d.deleteTodo(e.id)},className:"transition-opacity duration-150 opacity-0 group-hover:opacity-100"},s.createElement(x,{className:"text-red-500"})))};E.render(s.createElement(s.StrictMode,null,s.createElement(w,null)),document.getElementById("root"));
