document.addEventListener("DOMContentLoaded", () => {

    // 1. TEK SAYFA (SPA) EKRAN GEÇİŞ MANTIĞI
    const navItems = document.querySelectorAll(".nav-item");
    const contentViews = document.querySelectorAll(".content-view");
    const breadcrumbActive = document.getElementById("current-breadcrumb");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            // Aktif menü stilini güncelle
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            // Hedef ekran id'sini al
            const targetId = item.getAttribute("data-target");

            // İlgili ekranı göster, diğerlerini gizle
            contentViews.forEach(view => {
                if (view.id === targetId) {
                    view.classList.add("active");
                } else {
                    view.classList.remove("active");
                }
            });

            // Breadcrumb (Sayfa yolunu) dinamik olarak güncelle
            const pageTitle = item.textContent.replace('›', '').trim();
            breadcrumbActive.textContent = pageTitle;
        });
    });

    // 2. SÜRÜKLE & BIRAK (DROPZONE) SİMÜLASYONU
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const dropzoneText = document.getElementById("dropzone-text");

    // Click eventi ile gizli inputu tetikleme
    dropzone.addEventListener("click", () => fileInput.click());

    // Sürükleme efektleri
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
            const file = e.dataTransfer.files[0];
            handleFileSelect(file);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            handleFileSelect(file);
        }
    });

    function handleFileSelect(file) {
        // Dosya seçildiğinde arayüzü güncelleme simülasyonu
        dropzoneText.innerHTML = `📄 <span style="color: #00ffcc;">${file.name}</span> Hazır!`;
    }

    // 3. FORM GÖNDERME SİMÜLASYONU
    const uploadForm = document.getElementById("upload-form");
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Diploma verileri şifreleniyor ve Akıllı Sözleşme (Smart Contract) tetiklenerek Blockchain ağına madenleniyor! 🚀");
        uploadForm.reset();
        dropzoneText.innerText = "Dosyayı buraya sürükleyin";
    });

    const settingsForm = document.getElementById("settings-form");
    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Sistem ve ağ yapılandırmaları başarıyla güncellendi.");
    });
});