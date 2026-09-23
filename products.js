const PRODUCTS=[
 {id:"p1",name:"Starter Digital Pack",price:99,tag:"STARTER",desc:"A ready-to-use digital product package."},
 {id:"p2",name:"Premium Digital Pack",price:199,tag:"PREMIUM",desc:"Extended digital resources for your store customers."},
 {id:"p3",name:"Pro Creator Pack",price:299,tag:"PRO",desc:"A larger premium package for advanced users."},
 {id:"p4",name:"Business Pack",price:499,tag:"BUSINESS",desc:"A complete digital package for business use."}
];

function money(n){return Number(n).toFixed(2)}
function getBalance(){return Number(localStorage.getItem("tanbir_wallet_balance")||"0")}
function setBalance(n){localStorage.setItem("tanbir_wallet_balance",String(Number(n).toFixed(2)))}
function getOrders(){try{return JSON.parse(localStorage.getItem("tanbir_orders")||"[]")}catch{return []}}
function saveOrders(x){localStorage.setItem("tanbir_orders",JSON.stringify(x))}

function render(){
 document.getElementById("walletBalance").textContent=money(getBalance());
 document.getElementById("productGrid").innerHTML=PRODUCTS.map(p=>`
  <article class="card">
   <span class="tag">${p.tag}</span>
   <h2>${p.name}</h2>
   <div class="desc">${p.desc}</div>
   <div class="price">₹${money(p.price)}</div>
   <button class="btn" onclick="buy('${p.id}')">Buy Now</button>
  </article>`).join("");
}

let selected=null;
function buy(id){
 selected=PRODUCTS.find(x=>x.id===id);
 document.getElementById("modalTitle").textContent="Confirm order";
 document.getElementById("modalText").textContent=`Buy ${selected.name} for ₹${money(selected.price)}? Your current demo wallet balance is ₹${money(getBalance())}.`;
 document.getElementById("orderMsg").textContent="";
 document.getElementById("confirmBtn").onclick=confirmBuy;
 document.getElementById("modal").classList.remove("hidden");
}
function closeModal(){
  document.getElementById("modal").classList.remove("show");
}

function confirmBuy(){
  if(!selected) return;

  localStorage.setItem("pendingProduct", JSON.stringify(selected));

  window.location.href = "payment.html?product=" + encodeURIComponent(selected.name) + "&amount=" + selected.price;
}

render();
