document.addEventListener("DOMContentLoaded", () => {
    
    const verifyInput = document.getElementById("verify-input");
    const verificationForm = document.getElementById("verification-form");
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const dropzoneText = document.getElementById("dropzone-text");
    const demoTriggers = document.querySelectorAll(".demo-trigger");

    // 1. Tıklanabilir Demo İpuçları Fonksiyonu
    demoTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            // Tıklanan metni temizleyip input içine yazdırır
            const cleanValue = trigger.textContent.replace(/"/g, "");
            verifyInput.value = cleanValue;
            verifyInput.focus();
        });
    });

    // 2. Sürükle Bırak Bölümü
    dropzone.addEventListener("click", () => fileInput.click());

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        dropzoneText.innerHTML = `📄 <span style="color: #00ffcc;">${file.name}</span> yüklendi, doğrulamaya hazır!`;
    }

    // 3. Form Gönderme / Doğrulama Simülasyonu
    verificationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = verifyInput.value.trim();

        if (inputValue === "DEMO" || inputValue === "ITU-2023-BM-047821") {
            alert("✓ BAŞARILI: Bu sertifika İstanbul Teknik Üniversitesi tarafından 2023 yılında onaylanmış olup, Ethereum Akıllı Sözleşmesinde kayıtlıdır ve ÖZGÜNDÜR!");
        } else {
            alert("🔍 Blockchain üzerinde kriptografik kanıt aranıyor... Girdiğiniz hash veya kimlik numarasıyla eşleşen bir kayıt bulunamadı ya da bu belge iptal edilmiş.");
        }
    });
});