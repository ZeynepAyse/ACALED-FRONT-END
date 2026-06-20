document.addEventListener("DOMContentLoaded", () => {

    // 1. BAĞLANTIYI KOPYALA BUTONU
    const copyLinkBtn = document.getElementById("copyLinkBtn");
    const profileLink = "acaled.io/verify/ayse-yilmaz-2xk9p";

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(profileLink).then(() => {
                const originalText = copyLinkBtn.innerText;
                copyLinkBtn.innerText = "✓ Kopyalandı!";
                copyLinkBtn.style.color = "#00ffcc";
                
                setTimeout(() => {
                    copyLinkBtn.innerText = originalText;
                    copyLinkBtn.style.color = "white";
                }, 2000);
            });
        });
    }

    // 2. DİNAMİK SEKME VE GÖRÜNÜM DEĞİŞTİRME MANTIĞI (SPA)
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    const views = document.querySelectorAll(".dashboard-view");
    const headerTitle = document.querySelector(".content-header h1");
    const headerDesc = document.querySelector(".content-header p");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            const targetViewId = item.getAttribute("data-target");
            
            if (targetViewId) {
                e.preventDefault();

                // Sol menü aktif çizgisini kaydır
                navItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                // Ekrana basılacak ilgili view alanını göster, diğerlerini gizle
                views.forEach(view => {
                    if (view.id === targetViewId) {
                        view.classList.add("active-view");
                    } else {
                        view.classList.remove("active-view");
                    }
                });

                // Başlıkları tıklanan sekmeye göre eş zamanlı güncelle
                if (targetViewId === "diplomalarim-view") {
                    headerTitle.innerText = "Mezuniyet Paneli";
                    headerDesc.innerText = "Diplomalarınızı yönetin ve paylaşın";
                } else if (targetViewId === "belgelerim-view") {
                    headerTitle.innerText = "Dijital Dosya Kütüphanesi";
                    headerDesc.innerText = "IPFS üzerinde şifrelenmiş kişisel başarı sertifikalarınız";
                } else if (targetViewId === "dogrulamalar-view") {
                    headerTitle.innerText = "Doğrulama Analitiği";
                    headerDesc.innerText = "Belgelerinize yapılan kurumsal erişim talepleri ve raporlar";
                } else if (targetViewId === "ayarlar-view") {
                    headerTitle.innerText = "Profil ve Web3 Ayarları";
                    headerDesc.innerText = "Merkeziyetsiz kimlik (DID) anahtarlarınızı ve gizliliğinizi yönetin";
                }
            }
        });
    });
});