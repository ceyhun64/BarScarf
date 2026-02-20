# BarScarf – Eşarp Modelleri

Zarif ve modern eşarp modellerinin satışa sunulduğu şık ve güvenilir alışveriş platformu.

BarScarf, şık, modern ve kaliteli eşarp modellerinin satışına özel hazırlanmış bir e-ticaret platformudur. Kullanıcı dostu arayüzü ile ziyaretçilerin aradıkları ürünü kolayca bulmasını sağlar. Geniş ürün yelpazesi; desenli, düz, ipek, pamuk ve günlük kullanım için tasarlanmış çeşitli eşarp seçeneklerini kapsar. Yüksek çözünürlüklü ürün görselleri, detaylı açıklamalar ve renk seçenekleri sayesinde alışveriş süreci hem keyifli hem de pratik hale getirilmiştir.

## Özellikler

- 🧣 **Geniş Ürün Kataloğu**: Desen, renk ve kumaş bazlı filtreleme ile kolay ürün keşfi.
- 🖼️ **Yüksek Çözünürlüklü Görsel Galerisi**: Detaylı ürün açıklamaları ve çoklu resim desteği.
- 💳 **Güvenli Ödeme Altyapısı**: Iyzico entegrasyonu ile hızlı ve güvenli ödemeler.
- 📦 **Hızlı Kargo ve İade Yönetimi**: Kolay iade süreci ve müşteri destek yönetimi.
- 📱 **Mobil Öncelikli Tasarım**: Responsive tasarım ile her cihazda sorunsuz deneyim.
- ⚡ **Optimize Edilmiş Performans**: Hızlı sayfa yükleme süreleri ve güçlü SEO altyapısı.
- 👤 **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi ve şifre sıfırlama.
- 🛒 **Sepet ve Sipariş Yönetimi**: Kolay sepet işlemleri ve sipariş takibi.
- ⭐ **Yorum ve Değerlendirme Sistemi**: Ürün yorumları ve puanlama.
- ❤️ **Favoriler**: Kullanıcıların favori ürünlerini kaydetme.
- 📧 **E-posta Bildirimleri**: Sipariş ve kayıt işlemleri için e-posta gönderimi.
- 🔐 **Admin Paneli**: Ürün, kategori, kullanıcı ve sipariş yönetimi.
- 📊 **İstatistikler ve Raporlar**: Satış ve kullanıcı analizi.

## 🛠️ Teknoloji Yığını

### 💻 Frontend

- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript**: Dinamik ve etkileşimli web uygulamaları için.
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React**: Kullanıcı arayüzü bileşenleri için.
- ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) **Redux Toolkit**: Durum yönetimi için.
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **HTML5**: Yapısal markup.
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS3**: Stil ve düzen.
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) **Bootstrap**: Responsive tasarım framework'ü.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite**: Hızlı geliştirme ve build aracı.
- **Axios**: HTTP istekleri için.
- **JWT Decode**: Token yönetimi için.

### ⚙️ Backend

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js**: Sunucu tarafı JavaScript runtime.
- ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express.js**: Web framework.
- ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**: Veritabanı.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) **Sequelize**: ORM (Object-Relational Mapping).
- **JWT**: Kimlik doğrulama için.
- **Multer**: Dosya yükleme için.
- **Cloudinary**: Resim yönetimi için.
- **Iyzico**: Ödeme entegrasyonu.
- **Nodemailer**: E-posta gönderimi.
- **Redis**: Önbellekleme.
- **Bcrypt**: Şifre hashleme.
- **Helmet**: Güvenlik başlıkları.
- **CORS**: Cross-Origin Resource Sharing.
- **Rate Limiting**: İstek sınırlaması.

### 🚀 DevOps & Dağıtım

- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) **Docker**: Konteynerleştirme.
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) **Vercel**: Frontend dağıtımı.
- ![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white) **Railway**: Backend ve veritabanı dağıtımı.
- ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) **Render**: Alternatif dağıtım platformu.

## Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- MySQL
- Git

### Adımlar

1. **Depoyu Klonlayın:**

   ```bash
   git clone https://github.com/your-username/barscarf.git
   cd barscarf
   ```

2. **Backend Kurulumu:**

   ```bash
   cd server
   npm install
   ```

3. **Veritabanı Kurulumu:**
   - MySQL'i kurun ve bir veritabanı oluşturun.
   - `server/config/config.json` dosyasındaki veritabanı bilgilerini güncelleyin.
   - Migration'ları çalıştırın (eğer varsa):
     ```bash
     npx sequelize-cli db:migrate
     ```

4. **Environment Variables:**
   - `server/.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:
     ```
     NODE_ENV=development
     PORT=3000
     FRONTEND_URL=http://localhost:5173
     ADMIN_NAME=Admin
     ADMIN_EMAIL=admin@example.com
     ADMIN_PASSWORD=securepassword
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     IYZICO_API_KEY=your_iyzico_key
     IYZICO_SECRET_KEY=your_iyzico_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     REDIS_URL=redis://localhost:6379
     ```

5. **Backend'i Başlatın:**

   ```bash
   npm run dev
   ```

   Backend `http://localhost:3000` adresinde çalışacaktır.

6. **Frontend Kurulumu:**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

   Frontend `http://localhost:5173` adresinde çalışacaktır.

7. **Admin Kullanıcı:**
   - Uygulama ilk kez çalıştırıldığında otomatik olarak admin kullanıcısı oluşturulur.
   - Admin paneline erişmek için `/admin` yolunu kullanın.

## Kullanım

### Kullanıcı İşlemleri

- Ana sayfada ürünleri görüntüleyin ve kategorilere göre filtreleyin.
- Ürün detaylarına bakın, sepete ekleyin veya favorilere kaydedin.
- Sepetinizde ürünleri düzenleyin ve sipariş verin.
- Ödeme sayfasında Iyzico ile güvenli ödeme yapın.
- Profilinizde sipariş geçmişinizi görüntüleyin.

### Admin İşlemleri

- `/admin` yolundan giriş yapın.
- Ürün, kategori ve kullanıcıları yönetin.
- Siparişleri görüntüleyin ve durumlarını güncelleyin.
- İstatistikleri inceleyin.

## API Dokümantasyonu

API uç noktaları `/api` altında bulunur. Ana kategoriler:

- **Ürünler** (`/api/product`): Ürün listeleme, ekleme, güncelleme, silme.
- **Kategoriler** (`/api/category`): Kategori yönetimi.
- **Kullanıcılar** (`/api/user`): Kullanıcı profili.
- **Kimlik Doğrulama** (`/api/auth`): Giriş, kayıt, şifre sıfırlama.
- **Sepet** (`/api/cart`): Sepet işlemleri.
- **Siparişler** (`/api/order`): Sipariş yönetimi.
- **Yorumlar** (`/api/review`): Ürün yorumları.
- **Favoriler** (`/api/favorite`): Favori ürünler.
- **Ödemeler** (`/api/payment`): Ödeme işlemleri.
- **Kargo** (`/api/cargo`): Kargo bilgileri.
- **Abonelik** (`/api/subscribe`): E-posta aboneliği.
- **Slider** (`/api/slider`): Ana sayfa slider'ları.

Detaylı API dokümantasyonu için Postman koleksiyonunu inceleyin veya Swagger dokümantasyonuna bakın (gelecekte eklenecek).

## Veritabanı Şeması

Ana modeller:

- **User**: Kullanıcı bilgileri.
- **Product**: Ürün detayları.
- **Category/SubCategory**: Kategori hiyerarşisi.
- **Cart/CartProduct**: Sepet ve sepet ürünleri.
- **Order/OrderProduct**: Siparişler ve sipariş ürünleri.
- **Review**: Ürün yorumları.
- **Favorite**: Favori ürünler.
- **Banner/Slider**: Görsel içerikler.

## Test

Şu anda testler tanımlanmamış. Gelecek sürümlerde birim ve entegrasyon testleri eklenecek.

## Katkıda Bulunma

1. Bu depoyu fork edin.
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`).
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`).
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`).
5. Pull Request açın.

## Lisans

Bu proje ISC lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

- Proje Sahibi: [Ceyhun Türkmen]
- E-posta: [ctrkmn64@gmail.com]

## Teşekkürler

Bu projede kullanılan açık kaynak kütüphanelere ve katkıda bulunanlara teşekkür ederiz.

## Dağıtım

Proje Docker ile containerize edilmiş olup Railway / Render üzerinden deploy edilmiştir.

---

> Estetik tasarım ve güvenilir altyapıyla her zevke uygun eşarp alışverişi. 🧣
