// 🔁 জন্ম তারিখ থেকে বয়স অটো বের করে ইনপুটে বসানো
document.getElementById("dob").addEventListener("change", function () {
  const dob = new Date(this.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  document.getElementById("age").value = age >= 0 ? age : '';
});

// 🔁 সাবমিট হ্যান্ডলিং
function handleSubmit(event) {
  event.preventDefault(); // রিলোড বন্ধ
  const form = event.target;
  const data = new FormData(form);

  // 🔍 ইমেল ইনপুটের ভ্যালু নেই
  const email = form.querySelector("input[name='Email']").value.trim();

  // 🔔 মেসেজ দেখানোর জন্য এলিমেন্ট খুঁজি
  const messageBox = document.getElementById("message");
  messageBox.style.display = "block";
  messageBox.style.backgroundColor = "#f0f0f0"; // হালকা ব্যাকগ্রাউন্ড
  messageBox.style.color = "#0d6efd";
  messageBox.style.padding = "10px";
  messageBox.style.borderRadius = "5px";
  messageBox.style.fontWeight = "bold";
  messageBox.innerText = "🔃 আপনার ডেটা সাবমিট হচ্ছে...";

  const scriptURL = "https://script.google.com/macros/s/AKfycbz7iEtIXb2LfwKqrWxDXSMJJvm42xZ3RXBZFC6GLxDmPbxfnr_QsjF8jj5dGMf_ZSrG/exec";

  fetch(scriptURL, {
    method: "POST",
    body: data
  })
  .then(response => response.json())
  .then(result => {
    if (result.result === "success") {
      form.reset();
      document.getElementById("age").value = "";

      // ✅ যদি ইমেইল দেওয়া থাকে, তাহলে বিশেষ কনফার্মেশন মেসেজ দেখাবে
      if (email && email.includes("@") && email.length > 5) {
        messageBox.style.backgroundColor = "green";
        messageBox.style.color = "white";
        messageBox.innerText = "✅ ডেটা সাবমিট সম্পূর্ণ হয়েছে। আপনার ইমেইলে একটি কনফার্মেশন বার্তা পাঠানো হয়েছে।";
      } else {
        messageBox.style.backgroundColor = "green";
        messageBox.style.color = "white";
        messageBox.innerText = "✅ ডেটা সাবমিট সম্পূর্ণ হয়েছে।";
      }

      // ✅ ৪ সেকেন্ড পরে মেসেজ হাইড হবে
      setTimeout(() => {
        messageBox.style.display = "none";
      }, 4000);
    } else {
      throw new Error(result.error || "Unknown error");
    }
  })
  .catch(error => {
    messageBox.style.backgroundColor = "red";
    messageBox.style.color = "white";
    messageBox.innerText = "❌ ডেটা সাবমিট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
    console.error("Error:", error);

    // ❌ এরর মেসেজও ৪ সেকেন্ড পরে হাইড
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 4000);
  });

  return false;
}
