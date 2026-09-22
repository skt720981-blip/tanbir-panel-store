const state={
  wallet:Number(localStorage.getItem('tanbirWallet')||0),
  orders:JSON.parse(localStorage.getItem('tanbirOrders')||'[]'),
  user:localStorage.getItem('tanbirUser')||'Guest'
};

function money(){return state.wallet.toFixed(2)}
function render(){
  document.getElementById('walletTop').textContent=money();
  document.getElementById('walletCard').textContent=money();
  document.getElementById('walletLarge').textContent=money();
  document.getElementById('orderCount').textContent=state.orders.length;
  document.getElementById('userName').textContent=state.user;
  document.getElementById('profileName').textContent=state.user;
  renderOrders();
}
function save(){localStorage.setItem('tanbirWallet',state.wallet);localStorage.setItem('tanbirOrders',JSON.stringify(state.orders));}
function showSection(id){
  document.querySelectorAll('.content-section').forEach(x=>x.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.section===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
function toast(msg){
  const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2200);
}
function addDemoMoney(){
  state.wallet+=500;save();render();toast('₹500 demo balance added');
}
function buyProduct(name,price){
  if(state.wallet<price){toast('Insufficient demo wallet balance');showSection('wallet');return}
  state.wallet-=price;
  state.orders.unshift({name,price,date:new Date().toLocaleString()});
  save();render();toast('Purchase successful — demo order created');showSection('orders');
}
function renderOrders(){
  const box=document.getElementById('ordersList');
  if(!state.orders.length){box.className='orders-empty';box.textContent='No orders yet. Purchase a product to see it here.';return}
  box.className='';
  box.innerHTML=state.orders.map(o=>`<div class="order"><div><b>${escapeHtml(o.name)}</b><div class="muted">${escapeHtml(o.date)}</div></div><strong>₹${Number(o.price).toFixed(2)}</strong></div>`).join('');
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function logout(){location.href='index.html'}
render();
