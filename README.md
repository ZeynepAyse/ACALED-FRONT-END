# ACALED-FRONT-END
index.html & main.js: Ana sayfa ve giriş ekranı. Giriş kartındaki sekmeler tamamen dinamik; kullanıcı rolüne göre input alanları ve butonlar sayfa yenilenmeden değişiyor.

register.html & register.js: Ekran görüntülerine sadık kalarak hazırladığım 3 sekmeli (Üniversite, Mezun, İşveren) sıfırdan Hesap Oluşturma ekranı.

dashboard.html & dashboard.js: Mezun/Öğrenci Paneli. Burayı SPA (Single Page Application) mantığıyla kurdum. Sol menüdeki sekmelere tıklandığında sağ taraftaki içerik (diplomalarim-view, belgelerim-view vb.) sayfa yenilenmeden pürüzsüzce yer değiştiriyor.

verify.html: İşverenlerin sertifika sorguladığı ve on-chain doğrulama simülasyonunun döndüğü panel.

🔄 Sayfalar Arası Mevcut Akış (UX Flow)
"Başlayın" Butonu: Üst menüdeki bu buton doğrudan register.html (Hesap Oluştur) sayfasına yönlendirir.

"Platformu Keşfet" Butonu: Sayfayı terk etmez, smooth scroll (yumuşak kaydırma) ile doğrudan ana sayfadaki giriş portalına (#giris-alani) odaklar.

"Erişim Talep Edin" Linki: Giriş formunun altındaki bu link yine register.html sayfasına fırlatır.

Giriş Butonları (Simülasyon): Giriş formunda rastgele bilgilerle (veri tabanı henüz bağlı olmadığı için boş bırakılmadığı sürece her veri kabul edilir) butonlara basıldığında:

Üniversite seçiliyse ➔ admin.html

Öğrenci seçiliyse ➔ dashboard.html

İşveren seçiliyse ➔ verify.html sayfalarına otomatik yönlendirir.
