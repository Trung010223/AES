function encryptFile() {
  const fileInput = document.getElementById("encryptFile");
  const key = document.getElementById("encryptKey").value;

  if (!fileInput.files[0] || !key) {
    alert("Vui lòng chọn file và nhập khóa để mã hóa.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    const encrypted = CryptoJS.AES.encrypt(content, key).toString();
    downloadFile(encrypted, fileInput.files[0].name + ".enc");
  };

  reader.readAsText(fileInput.files[0]);
}

function decryptFile() {
  const fileInput = document.getElementById("decryptFile");
  const key = document.getElementById("decryptKey").value;

  if (!fileInput.files[0] || !key) {
    alert("Vui lòng chọn file và nhập khóa để giải mã.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const content = e.target.result;
      const decrypted = CryptoJS.AES.decrypt(content, key);
      const original = decrypted.toString(CryptoJS.enc.Utf8);
      if (!original)
        throw new Error("Giải mã thất bại. Sai khóa hoặc file không hợp lệ.");
      downloadFile(original, fileInput.files[0].name.replace(".enc", ".dec"));
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  reader.readAsText(fileInput.files[0]);
}

function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
