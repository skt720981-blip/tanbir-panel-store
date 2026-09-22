function showTab(name){document.getElementById('login').classList.toggle('hidden',name!=='login');document.getElementById('register').classList.toggle('hidden',name!=='register');document.querySelectorAll('.tab').forEach((b,i)=>b.classList.toggle('active',(name==='login'&&i===0)||(name==='register'&&i===1)));document.querySelectorAll('.msg').forEach(x=>x.textContent='')}

function register(e){
 e.preventDefault();
 const u=document.getElementById('regUser').value.trim();
 const email=document.getElementById('regEmail').value.trim();
 const p=document.getElementById('regPass').value;
 const c=document.getElementById('regConfirm').value;
 const msg=document.getElementById('regMsg');
 if(p!==c){msg.textContent='Passwords do not match.';return}
 const users=JSON.parse(localStorage.getItem('tanbir_demo_users')||'[]');
 if(users.some(x=>x.username.toLowerCase()===u.toLowerCase())){msg.textContent='Username already exists.';return}
 users.push({username:u,email:email,password:p});
 localStorage.setItem('tanbir_demo_users',JSON.stringify(users));
 msg.textContent='Account created. You can login now.';
 e.target.reset();
}

function login(e){
 e.preventDefault();
 const u=document.getElementById('loginUser').value.trim();
 const p=document.getElementById('loginPass').value;
 const users=JSON.parse(localStorage.getItem('tanbir_demo_users')||'[]');
 const found=users.find(x=>(x.username.toLowerCase()===u.toLowerCase()||x.email.toLowerCase()===u.toLowerCase())&&x.password===p);
 const msg=document.getElementById('loginMsg');
 if(!found){msg.textContent='Invalid username/email or password.';return}
 localStorage.setItem('tanbir_demo_session',JSON.stringify({username:found.username,email:found.email}));
 msg.textContent=window.location.href='dashboard.html';
}
