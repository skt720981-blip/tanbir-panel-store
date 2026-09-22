const p=new URLSearchParams(location.search);
const name=p.get("product")||"Digital Product";
const amount=Number(p.get("amount")||0);
document.getElementById("product").textContent=name;
document.getElementById("amount").textContent=amount>0?"₹"+amount.toFixed(2):"₹0";
document.getElementById("copy").onclick=async()=>{try{await navigator.clipboard.writeText("8609345979@ybl");document.getElementById("copy").textContent="Copied ✓";setTimeout(()=>document.getElementById("copy").textContent="Copy UPI ID",1800)}catch{alert("UPI ID: 8609345979@ybl")}};
document.getElementById("paid").onclick=()=>{localStorage.setItem("tanbirPendingPayment",JSON.stringify({product:name,amount,status:"Pending manual verification",createdAt:new Date().toISOString()}));document.getElementById("status").textContent="Payment marked as pending. Please keep your payment screenshot/UTR ready for verification.";};