document.addEventListener("DOMContentLoaded", () => {
    
    const tabs = document.querySelectorAll(".tab-btn");
    const portalInfo = document.querySelector(".portal-info");
    const fieldsContainer = document.getElementById("dynamic-login-fields");
    const submitBtn = document.getElementById("form-submit-btn");
    const loginForm = document.getElementById("main-login-form");

    // Tasarımlarındaki 3 farklı ekrana ait tüm input şablonları
    const templates = {
        universite: {
            info: "Akademik sertifikaları blok zinciri güvencesiyle düzenleyin, iptal edin ve tam denetim kaydıyla yönetin.",
            btnText: "Kurum Paneline Eriş →",
            fields: `
                <div class="form-group">
                    <label>Kurum Kimliği</label>
                    <input type="text" placeholder="örn. UNIV-2024-0042" required>
                </div>
                <div class="form-group">
                    <label>Yönetici E-posta</label>
                    <input type="email" placeholder="yonetici@universite.edu.tr" required>
                </div>
                <div class="form-group">
                    <label>Parola</label>
                    <input type="password" placeholder="Güvenli parolanızı girin" required>
                </div>
            `
        },
        ogrenci: {
            info: "Doğrulanmış akademik sertifikalarınıza erişin, işverenlerle paylaşın ve dijital kimliğinizi kontrol edin.",
            btnText: "Sertifikalarımı Görüntüle →",
            fields: `
                <div class="form-group">
                    <label>Öğrenci No / DID</label>
                    <input type="text" placeholder="did:acaled:ogrenci:0x..." required>
                </div>
                <div class="form-group">
                    <label>E-posta Adresi</label>
                    <input type="email" placeholder="ogrenci@universite.edu.tr" required>
                </div>
                <div class="form-group">
                    <label>Şifre</label>
                    <input type="password" placeholder="Şifrenizi girin" required>
                </div>
            `
        },
        isveren: {
            info: "Akademik sertifikaları zincir üzerinde anında doğrulayın. Kriptografik kanıtlarla sahteciliği ortadan kaldırın.",
            btnText: "Sertifikaları Doğrula →",
            fields: `
                <div class="form-group">
                    <label>Kuruluş Kimliği</label>
                    <input type="text" placeholder="KRK-0x4f2a..." required>
                </div>
                <div class="form-group">
                    <label>İşe Alım E-posta</label>
                    <input type="email" placeholder="ik@sirket.com.tr" required>
                </div>
                <div class="form-group">
                    <label>Erişim Anahtarı</label>
                    <input type="password" placeholder="API erişim anahtarını girin" required>
                </div>
            `
        }
    };

    // Dinamik geçişi sağlayan tetikleyici fonksiyon
    function switchForm(role) {
        portalInfo.innerText = templates[role].info;
        submitBtn.innerText = templates[role].btnText;
        fieldsContainer.innerHTML = templates[role].fields;
    }

    // Sekmelere tıklandığında tetiklenecek event listener
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedTab = tab.getAttribute("data-tab");
            switchForm(selectedTab);
        });
    });

    // İlk yüklemede ana ekranı Üniversite moduna getir
    switchForm("universite");

    // Form Gönderildiğinde Doğru Ekranlara Akıcı Yönlendirme Kontrolü
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const activeTab = document.querySelector(".tab-btn.active").getAttribute("data-tab");
            
            if (activeTab === "universite") {
                alert("Kurum girişi başarılı! Yönetim paneline aktarılıyorsunuz...");
                window.location.href = "admin.html";
            } else if (activeTab === "ogrenci") {
                alert("Öğrenci girişi başarılı! Mezuniyet panelinize aktarılıyorsunuz...");
                window.location.href = "dashboard.html";
            } else if (activeTab === "isveren") {
                alert("İşveren girişi başarılı! Doğrulama merkezine aktarılıyorsunuz...");
                window.location.href = "verify.html";
            }
        });
    }

    // Web3 MetaMask Cüzdan Bağlantısı
    const connectWalletBtn = document.getElementById("connectWalletBtn");
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener("click", async () => {
            if (typeof window.ethereum !== "undefined") {
                try {
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    const walletAddress = accounts[0];
                    const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
                    
                    connectWalletBtn.innerText = `🟣 Bağlandı: ${shortAddress}`;
                    connectWalletBtn.style.borderColor = "#00ffcc";
                    connectWalletBtn.style.color = "#00ffcc";
                    
                    // Cüzdan bağlandığında otomatik olarak öğrenci dashboard'una yönlendir
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1000);
                } catch (error) {
                    console.error("Bağlantı reddedildi:", error);
                }
            } else {
                alert("Lütfen bir Web3 cüzdanı yükleyin!");
                window.open("https://metamask.io/download/", "_blank");
            }
        });
    }
});