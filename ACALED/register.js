document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const container = document.getElementById("dynamic-fields-container");
    const registerForm = document.getElementById("register-form");

    // Her rol için ekran görüntülerindeki alan şablonları
    const formTemplates = {
        universite: `
            <div class="form-row">
                <div class="form-group">
                    <label>ÜNİVERSİTE ADI</label>
                    <input type="text" placeholder="İstanbul Teknik Üniversitesi" required>
                </div>
                <div class="form-group">
                    <label>KURUMSAL E-POSTA</label>
                    <input type="email" placeholder="admin@itu.edu.tr" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>TELEFON</label>
                    <input type="tel" placeholder="+90 212 000 00 00" required>
                </div>
                <div class="form-group">
                    <label>ŞEHİR</label>
                    <input type="text" placeholder="İstanbul" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>ŞİFRE</label>
                    <div class="input-wrapper">
                        <input type="password" class="password-field" placeholder="••••••••" required>
                        <span class="toggle-password">👁️</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>ŞİFRE TEKRAR</label>
                    <div class="input-wrapper">
                        <input type="password" class="password-field" placeholder="••••••••" required>
                        <span class="toggle-password">👁️</span>
                    </div>
                </div>
            </div>
        `,
        mezun: `
            <div class="form-row">
                <div class="form-group">
                    <label>AD SOYAD</label>
                    <input type="text" placeholder="Ayşe Kara" required>
                </div>
                <div class="form-group">
                    <label>ÖĞRENCİ NUMARASI</label>
                    <input type="text" placeholder="150120012" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>ÜNİVERSİTE ADI</label>
                    <input type="text" placeholder="Boğaziçi Üniversitesi" required>
                </div>
                <div class="form-group">
                    <label>BÖLÜM</label>
                    <input type="text" placeholder="Bilgisayar Mühendisliği" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>MEZUNİYET YILI</label>
                    <select required>
                        <option value="" disabled selected>Seçiniz</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>E-POSTA</label>
                    <input type="email" placeholder="ayse@email.com" required>
                </div>
            </div>
            <div class="form-group">
                <label>ŞİFRE</label>
                <div class="input-wrapper">
                    <input type="password" class="password-field" placeholder="••••••••" required>
                    <span class="toggle-password">👁️</span>
                </div>
            </div>
        `,
        isveren: `
            <div class="form-row">
                <div class="form-group">
                    <label>ŞİRKET ADI</label>
                    <input type="text" placeholder="TechCorp A.Ş." required>
                </div>
                <div class="form-group">
                    <label>YETKİLİ KİŞİ</label>
                    <input type="text" placeholder="Mehmet Demir" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>İŞ E-POSTASI</label>
                    <input type="email" placeholder="hr@techcorp.com" required>
                </div>
                <div class="form-group">
                    <label>TELEFON</label>
                    <input type="tel" placeholder="+90 212 000 00 00" required>
                </div>
            </div>
            <div class="form-group">
                <label>SEKTÖR</label>
                <select required>
                    <option value="" disabled selected>Seçiniz</option>
                    <option value="teknoloji">Teknoloji / Yazılım</option>
                    <option value="finans">Finans / Bankacılık</option>
                    <option value="saglik">Sağlık</option>
                    <option value="egitim">Eğitim</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>ŞİFRE</label>
                    <div class="input-wrapper">
                        <input type="password" class="password-field" placeholder="••••••••" required>
                        <span class="toggle-password">👁️</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>ŞİFRE TEKRAR</label>
                    <div class="input-wrapper">
                        <input type="password" class="password-field" placeholder="••••••••" required>
                        <span class="toggle-password">👁️</span>
                    </div>
                </div>
            </div>
        `
    };

    // Ekranı render etme fonksiyonu
    function renderForm(role) {
        container.innerHTML = formTemplates[role];
        setupPasswordToggles(); // Şifre gözlerini yeniden bağla
    }

    // Sekme Geçiş Tetikleyicileri
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const role = tab.getAttribute("data-tab");
            renderForm(role);
        });
    });

    // Şifre Göster/Gizle Fonksiyonu (Dinamik elementler için)
    function setupPasswordToggles() {
        const toggles = document.querySelectorAll(".toggle-password");
        toggles.forEach(toggle => {
            toggle.onclick = function() {
                const input = this.previousElementSibling;
                if (input.type === "password") {
                    input.type = "text";
                    this.textContent = "🔒";
                } else {
                    input.type = "password";
                    this.textContent = "👁️";
                }
            };
        });
    }

    // İlk açılışta varsayılan olarak üniversite formunu yükle
    renderForm("universite");

    // Form Gönderim Simülasyonu
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Hesabınız başarıyla oluşturuldu! Akıllı cüzdanınız (DID) oluşturuluyor... Giriş alanına yönlendiriliyorsunuz.");
        window.location.href = "index.html"; // Kayıttan sonra ana sayfaya fırlatır
    });
});