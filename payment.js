const p = new URLSearchParams(location.search);

const name = p.get("product") || "Digital Product";
const amount = Number(p.get("amount") || 0);

document.getElementById("product").textContent = name;
document.getElementById("amount").textContent =
  amount > 0 ? "₹" + amount.toFixed(2) : "₹0";

document.getElementById("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText("8609345979@ybl");
    document.getElementById("copy").textContent = "Copied ✓";

    setTimeout(() => {
      document.getElementById("copy").textContent = "Copy UPI ID";
    }, 1800);
  } catch {
    alert("UPI ID: 8609345979@ybl");
  }
};

document.getElementById("paid").onclick = () => {
  const utr = prompt("আপনার Payment UTR / Transaction ID লিখুন:");

  if (!utr || utr.trim().length < 4) {
    alert("দয়া করে সঠিক UTR / Transaction ID দিন।");
    return;
  }

  localStorage.setItem(
    "tanbirPendingPayment",
    JSON.stringify({
      product: name,
      amount: amount,
      utr: utr.trim(),
      status: "Pending manual verification",
      createdAt: new Date().toISOString()
    })
  );

  document.getElementById("status").textContent =
    "Payment submitted. UTR: " + utr.trim() +
    " — Payment will be manually verified.";
};
