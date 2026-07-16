# BarScarf – Eşarp E-Ticaret Platformu

Zarif ve modern eşarp modellerinin satışa sunulduğu bir e-ticaret web uygulaması. Proje bir **monorepo** olarak `client/` (Vite + React 18 SPA) ve `server/` (Express 4 REST API) klasörlerinden oluşur.

> Bu README, depodaki kaynak kod (`server/` ve `client/`) taranarak hazırlanmıştır. Doğrulanamayan hiçbir özellik, uç nokta, ortam değişkeni veya dağıtım adımı eklenmemiştir; belirsiz noktalar ilgili bölümde açıkça "doğrulanamadı" olarak işaretlenmiştir.

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Özellikler](#özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Mimari](#mimari)
- [Klasör Yapısı](#klasör-yapısı)
- [Kurulum](#kurulum)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Kullanılabilir Komutlar](#kullanılabilir-komutlar)
- [Geliştirme](#geliştirme)
- [Build](#build)
- [Dağıtım](#dağıtım)
- [API](#api)
- [Veritabanı](#veritabanı)
- [Kimlik Doğrulama](#kimlik-doğrulama)
- [Yapılandırma ve Güvenlik Notları](#yapılandırma-ve-güvenlik-notları)
- [Sorun Giderme](#sorun-giderme)
- [Lisans](#lisans)

## Genel Bakış

BarScarf, kullanıcıların ürün kataloğuna göz atabildiği, sepete ürün ekleyebildiği, Iyzico ile ödeme yapabildiği ve sipariş geçmişini görüntüleyebildiği bir eşarp satış platformudur. Bir admin paneli üzerinden ürün, kategori, kullanıcı, sipariş, slider/banner ve abone yönetimi yapılabilir.

- **Client**: `client/` — Vite ile derlenen React 18 tek sayfa uygulaması (SPA), Redux Toolkit ile durum yönetimi, React Router v7 ile sayfa yönlendirme, Bootstrap/react-bootstrap ile arayüz, TinyMCE ile zengin metin editörü (ürün açıklamaları için), axios ile API çağrıları.
- **Server**: `server/` — Express 4 tabanlı REST API, Sequelize ORM (MySQL, `mysql2` sürücüsü ile), JWT tabanlı kimlik doğrulama (`jsonwebtoken` + `bcrypt`), Cloudinary üzerinde görsel depolama (`multer-storage-cloudinary`), Iyzico ödeme entegrasyonu, Redis (oturum kapatmada token kara listesi için), Nodemailer (e-posta bildirimleri), `express-rate-limit` ve `helmet` ile temel güvenlik önlemleri.

## Özellikler

Aşağıdaki liste yalnızca kaynak kodda (route/controller/component düzeyinde) doğrulanmış işlevleri içerir:

- Kullanıcı kaydı, girişi, çıkışı ve JWT tabanlı oturum yönetimi (`server/controllers/auth.js`)
- E-posta ile şifre sıfırlama akışı (sıfırlama linki e-posta ile gönderilir, token doğrulanır) (`server/controllers/auth.js`, `client/src/pages/passwordEmail.jsx`, `client/src/pages/updatePassword.jsx`)
- Ürün listeleme; kategoriye, alt kategoriye, isme ve renge göre filtreleme (`server/routes/product.js`)
- Kategori / alt kategori yönetimi, popüler alt kategori işaretleme (`server/routes/category.js`)
- Sepete ürün ekleme, miktar artırma/azaltma, ürün güncelleme/silme, sepeti temizleme, toplam fiyat hesaplama (`server/routes/cart.js`)
- Sipariş oluşturma (sepetten), kullanıcının kendi siparişlerini görüntüleme, sipariş iptali; admin için tüm siparişleri görüntüleme/güncelleme/silme (`server/routes/order.js`)
- Iyzico ile ödeme oluşturma; ödeme başarılıysa ilgili siparişin otomatik tamamlanması (`server/controllers/payment.js`)
- Ürün yorumları: ekleme, listeleme, güncelleme, silme (kullanıcı ve admin için ayrı silme uç noktaları) (`server/routes/review.js`)
- Favori ürün ekleme/listeleme/silme (`server/routes/favorite.js`)
- Kullanıcı adres/iletişim bilgilerinin (`UserDetails`) oluşturulması, güncellenmesi, silinmesi (`server/routes/userDetails.js`)
- Cloudinary üzerine çoklu görsel yükleme (ürün, slider, banner, hero görselleri için, en fazla 5 dosya, 5 MB sınırı) (`server/middlewares/upload.js`)
- Ana sayfa slider, banner ve hero görsellerinin admin tarafından yönetimi (`server/routes/slider.js`)
- E-posta bülteni aboneliği ve admin panelinden abonelere toplu mail gönderimi (`server/routes/subscribe.js`)
- Admin kullanıcı yönetimi: listeleme, isme göre arama, güncelleme, silme (`server/routes/user.js`)
- Uygulama ilk kez ayağa kalktığında `.env` içindeki bilgilerle otomatik admin kullanıcısı oluşturma (`server/server.js`)
- MNG Kargo test API'sine kargo gönderimi ve token alma uç noktaları (`server/controllers/cargo.js`) — bkz. [Sorun Giderme](#sorun-giderme), bu controller içindeki `create_order` fonksiyonu tanımsız bir `request` bağımlılığı çağırdığından çalışmaz durumdadır.
- WhatsApp iletişim butonu, sayfa başına kaydırma (scroll-to-top) ve responsive Bootstrap tabanlı arayüz (`client/src/layout`)

## Teknoloji Yığını

### Client

| Kategori | Teknoloji | Sürüm (package.json) |
|---|---|---|
| Framework | React | ^18.3.1 |
| Build aracı | Vite | ^6.2.0 |
| Durum yönetimi | Redux Toolkit / React Redux | ^2.6.1 / ^9.2.0 |
| Yönlendirme | React Router DOM | ^7.2.0 |
| UI | Bootstrap / react-bootstrap | ^5.3.3 / ^2.10.9 |
| Zengin metin editörü | @tinymce/tinymce-react | ^6.1.0 |
| HTTP istemcisi | axios | ^1.8.1 |
| JWT çözümleme | jwt-decode | ^4.0.0 |
| Linting | ESLint (flat config) | ^9.21.0 |

### Server

| Kategori | Teknoloji | Sürüm (package.json) |
|---|---|---|
| Web çatısı | Express | ^4.21.2 |
| ORM | Sequelize | ^6.37.5 |
| Veritabanı sürücüsü | mysql2 | ^3.12.0 |
| Kimlik doğrulama | jsonwebtoken, bcrypt | ^9.0.2, ^5.1.1 |
| Dosya yükleme | multer, multer-storage-cloudinary | ^1.4.5-lts.1, ^4.0.0 |
| Görsel depolama | cloudinary | ^1.30.0 |
| Ödeme | iyzipay | ^2.0.64 |
| E-posta | nodemailer | ^6.10.0 |
| Önbellekleme / kara liste | redis | ^4.7.0 |
| Güvenlik | helmet, express-rate-limit, cors | ^8.1.0, ^7.5.0, ^2.8.5 |
| Geliştirme | nodemon, cross-env | ^3.1.10, ^7.0.3 |

> `joi`, `body-parser`, `compression` ve `config` paketleri `server/package.json` içinde bağımlılık olarak tanımlıdır ancak yapılan tarama sırasında (`.js` dosyalarında `require`) uygulama kodunda kullanıldıkları tespit edilemedi.

## Mimari

- Client, tüm API isteklerini `client/src/features/services/axiosInstance.js` üzerinden tek bir axios örneği ile yapar. Taban URL `import.meta.env.VITE_API_URL` değişkeninden okunur (bkz. `client/.env.development` → `http://localhost:3000/api`, `client/.env.production` → `https://barscarf-11.onrender.com/api`).
- Kimlik doğrulama: Giriş/kayıt sonrası sunucudan dönen JWT, client tarafında `localStorage` içine kaydedilir; sonraki her istekte axios interceptor bu token'ı `x-auth-token` header'ı olarak ekler (`axiosInstance.js`). Sunucu tarafında `server/middlewares/verifyToken.js` bu header'ı doğrular ve `req.user` içine `id`, `isAdmin`, `iat` bilgilerini koyar. Admin'e özel uç noktalar ayrıca `server/middlewares/isAdmin.js` ile korunur.
- Redux store (`client/src/store/store.js`) 11 slice içerir: `auth`, `product`, `category`, `favorite`, `cart`, `userDetails`, `user`, `payment`, `order`, `subscribe`, `slider`. Her slice için ayrı bir `features/services/*Service.js` (axios çağrıları) ve `features/thunks/*Thunk.js` (createAsyncThunk) dosyası bulunur.
- Sunucu tarafında istekler `server/server.js` → `routes/*.js` → `controllers/*.js` → `models/*.js` (Sequelize) sırasıyla işlenir. Statik dosyalar `/uploads` yolu altında `express.static` ile sunulur (yerel depolama; yüklenen ürün görselleri gerçek ortamda Cloudinary'ye gider).

## Klasör Yapısı

```
BarScarf/
├── readme.md
├── client/
│   ├── src/
│   │   ├── pages/          # Rota bileşenleri (login, products, cart, admin/* vb.)
│   │   ├── components/     # admin, auth, cart, favorites, home, order, payment, product, user
│   │   ├── layout/         # navbar, footer, banner, heroes, whatsapp, scroll yardımcıları
│   │   ├── features/
│   │   │   ├── services/   # axiosInstance.js + her modül için *Service.js
│   │   │   ├── slices/     # Redux Toolkit slice'ları
│   │   │   └── thunks/     # createAsyncThunk tanımları
│   │   ├── store/store.js  # Redux store yapılandırması
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── App.jsx, main.jsx
│   ├── public/              # statik dosyalar (favicon, _redirects)
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
└── server/
    ├── config/config.json   # Sequelize CLI ortam bazlı DB yapılandırması (bkz. Güvenlik Notları)
    ├── controllers/         # İş mantığı (auth, products, category, cart, order, payment, review, favorite, user, userDetails, slider, subscribe, cargo)
    ├── routes/               # Express route tanımları (controllers ile bire bir eşleşir)
    ├── models/               # Sequelize modelleri (bkz. Veritabanı)
    ├── middlewares/          # verifyToken.js, isAdmin.js, upload.js (Cloudinary/multer)
    ├── helpers/              # sendMail.js (nodemailer), slugField.js (slugify)
    ├── data/db.js             # Gerçek çalışma zamanı Sequelize bağlantısı (env değişkenlerinden)
    ├── migrations/           # Sequelize CLI migration'ları
    ├── seeders/               # Sequelize CLI seeder klasörü (boş)
    ├── uploads/               # Yerel olarak yüklenen görseller (statik servis edilir)
    ├── server.js
    └── package.json
```

## Kurulum

### Ön Koşullar

- Node.js ve npm
- Çalışan bir MySQL sunucusu (yerel geliştirme için)
- (Opsiyonel, `logout` uç noktası için) çalışan bir Redis sunucusu

### Server Kurulumu

```bash
cd server
npm install
```

`server/.env` (production) ve `server/.env.development` (development) dosyalarını oluşturun/güncelleyin — gerekli değişkenler için [Ortam Değişkenleri](#ortam-değişkenleri) bölümüne bakın. `NODE_ENV=development` iken `server/data/db.js`, `.env.development` dosyasını da yükler.

```bash
npm run dev
```

### Client Kurulumu

```bash
cd client
npm install
npm run dev
```

`client/.env.development` dosyasında `VITE_API_URL=http://localhost:3000/api` tanımlıdır; sunucuyu farklı bir portta çalıştırıyorsanız bu değeri güncelleyin.

## Ortam Değişkenleri

Aşağıdaki isimler `server/.env`, `server/.env.development` dosyalarında bulunan anahtarlardan ve `process.env.X` şeklinde kodda referans verilen değişkenlerden derlenmiştir. **Gerçek değerler bu dosyaya kasıtlı olarak eklenmemiştir** — sadece isim ve amaç belirtilmiştir; kendi değerlerinizle doldurun.

### Server (`server/.env` / `server/.env.development`)

| Değişken | Amaç |
|---|---|
| `NODE_ENV` | `development` / `production` — hangi `.env` dosyasının ve hangi DB bağlantı stratejisinin kullanılacağını belirler (`server/data/db.js`, `server/server.js`) |
| `PORT` | Express sunucusunun dinleyeceği port (varsayılan: `3000`) |
| `FRONTEND_URL` | CORS için izin verilen origin (`server/server.js`) |
| `DB_URL` | Production modunda tam MySQL bağlantı dizesi (Sequelize `new Sequelize(process.env.DB_URL, ...)`) |
| `DB_HOST` | Development modunda MySQL host adresi |
| `DB_USER` | Development modunda MySQL kullanıcı adı |
| `DB_NAME` | Development modunda veritabanı adı |
| `DB_PASSWORD` | Development modunda MySQL şifresi |
| `ADMIN_NAME` | İlk açılışta otomatik oluşturulan admin kullanıcısının adı |
| `ADMIN_EMAIL` | Otomatik admin kullanıcısının e-postası |
| `ADMIN_PASSWORD` | Otomatik admin kullanıcısının şifresi |
| `JWT_PRIVATE_KEY` | JWT imzalama/doğrulama anahtarı (`verifyToken.js`, `models/user.js`, şifre sıfırlama token'ları) |
| `GMAIL_USER` | Nodemailer SMTP (Gmail) gönderen hesabı (`helpers/sendMail.js`) |
| `GMAIL_PASSWORD` | Nodemailer SMTP şifresi/uygulama parolası |
| `IYZICO_API_KEY` | Iyzipay API anahtarı (`controllers/payment.js`) |
| `IYZICO_SECRET_KEY` | Iyzipay gizli anahtarı |
| `IYZICO_BASE_URL` | Iyzipay API taban URL'i (sandbox/production) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary hesap adı (`middlewares/upload.js`) |
| `CLOUDINARY_API_KEY` | Cloudinary API anahtarı |
| `CLOUDINARY_API_SECRET` | Cloudinary API gizli anahtarı |
| `CLOUDINARY_BASE_URL` | `.env` dosyasında tanımlı; kodda doğrudan `process.env.CLOUDINARY_BASE_URL` kullanımı tespit edilemedi |
| `MNG_ANAHTAR` | MNG Kargo API anahtarı (`controllers/cargo.js` → `get_token`) |
| `MNG_GUVENLIK_DIZGISI` | MNG Kargo güvenlik dizgisi (`controllers/cargo.js` → `get_token`) |
| `BASE_URL` | `.env` dosyalarında tanımlı; kodda doğrudan kullanımı tespit edilemedi |

> `controllers/cargo.js` içindeki `send_cargo` ve `create_order` fonksiyonları ayrıca `MNG_JWT_TOKEN`, `MNG_CLIENT_ID`, `MNG_CLIENT_SECRET`, `JWT_TOKEN`, `CLIENT_ID`, `CLIENT_SECRET` isimli değişkenleri okur; bunlar `.env` dosyalarında **tanımlı değildir** ve muhtemelen eksik/tamamlanmamış bir entegrasyona aittir (bkz. [Sorun Giderme](#sorun-giderme)).
> Redis bağlantısı (`controllers/auth.js` → `logout`) `redis.createClient()` çağrısını parametresiz yapar; `.env` dosyalarında bir `REDIS_URL` değişkeni bulunmamaktadır, bağlantı bilgisi kodda görünmemektedir.

### Client (`client/.env.development` / `client/.env.production`)

| Değişken | Amaç |
|---|---|
| `VITE_API_URL` | Server API'sinin taban URL'i (axios `baseURL`) — development: `http://localhost:3000/api`, production: `https://barscarf-11.onrender.com/api` |

## Kullanılabilir Komutlar

### Server (`server/package.json`)

| Komut | Davranış |
|---|---|
| `npm run dev` | `NODE_ENV=development` ile `nodemon server.js` çalıştırır (otomatik yeniden başlatma) |
| `npm start` | `NODE_ENV=production` ile `node server.js` çalıştırır |
| `npm test` | Tanımlı değil; `echo "Error: no test specified" && exit 1` çalıştırır ve hata koduyla çıkar |

### Client (`client/package.json`)

| Komut | Davranış |
|---|---|
| `npm run dev` | Vite geliştirme sunucusunu başlatır (HMR ile) |
| `npm run build` | Vite ile production build'i `client/dist` altına üretir |
| `npm run lint` | ESLint'i proje kök dizininde çalıştırır (`eslint.config.js`) |
| `npm run preview` | `dist` klasöründeki production build'i yerel olarak önizler |

Hiçbir script veritabanı silme veya sıfırlama işlemi yapmaz; ancak sunucu her açılışta `sequelize.sync()` çağırır (bkz. [Sorun Giderme](#sorun-giderme)).

## Geliştirme

İki servisi birlikte çalıştırmak için iki ayrı terminal gereklidir (repoda ikisini birlikte başlatan bir script/araç — örn. `concurrently` — bulunmamaktadır):

```bash
# Terminal 1
cd server
npm run dev      # http://localhost:3000

# Terminal 2
cd client
npm run dev      # Vite varsayılan portu (genellikle http://localhost:5173)
```

## Build

```bash
cd client
npm run build     # client/dist içine statik production build'i üretir
```

Server için ayrı bir build adımı yoktur; `npm start` doğrudan kaynak dosyaları çalıştırır.

## Dağıtım

Doğrulanabilen tek dağıtım ipucu `client/vercel.json` dosyasıdır:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Bu, SPA yönlendirmesinin (React Router) Vercel üzerinde çalışması için tüm yolları `index.html`'e yönlendiren standart bir kuraldır — client'ın Vercel'de barındırıldığını gösterir. Ayrıca `client/public/_redirects` dosyası (`/* /index.html 200`) Netlify/Render tarzı statik barındırma için aynı amaca hizmet eder.

`server.js` içindeki CORS izinli origin listesi (`https://www.barscarf.com`, `https://barscarf-11.onrender.com`, `https://bar-scarf-iqzh.vercel.app`) ve client production `.env`'indeki `VITE_API_URL=https://barscarf-11.onrender.com/api` değeri, uygulamanın canlıda Render (server) ve Vercel (client) üzerinde çalıştığına işaret etmektedir; ancak bir Dockerfile, CI/CD pipeline dosyası veya resmi dağıtım betiği depoda bulunmadığından, gerçek dağıtım süreci **doğrulanamamıştır**.

## API

Taban yol: `/api`. Aşağıdaki tablo `server/routes/*.js` dosyalarındaki gerçek tanımlardan çıkarılmıştır. **Auth** sütunu: `Genel` = middleware yok, `JWT` = `verifyToken`, `JWT+Admin` = `verifyToken` + `isAdmin`.

### Auth — `/api/auth`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/register` | Genel | Kullanıcı kaydı, kayıt e-postası gönderir, token döner |
| POST | `/login` | Genel | Giriş, sepet yoksa oluşturur, giriş e-postası gönderir, token döner |
| POST | `/logout` | JWT | Token'ı Redis'te kara listeye alır |
| POST | `/password-email` | Genel | Şifre sıfırlama linki e-postası gönderir |
| PUT | `/update-password/:token` | Genel | Token doğrulanır, şifre günceller |

### Ürünler — `/api/product`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/` | Genel | Tüm ürünleri listeler |
| GET | `/category/:categoryId` | Genel | Kategoriye göre ürün listeler |
| GET | `/sub/:subCategoryId` | Genel | Alt kategoriye göre ürün listeler |
| GET | `/name/:name` | Genel | İsme göre ürün arar |
| GET | `/color/:color` | Genel | Renge göre ürün listeler |
| GET | `/:id` | Genel | Ürün detayını getirir |
| POST | `/` | JWT+Admin | Ürün ekler (Cloudinary'ye çoklu görsel yükler) |
| PUT | `/:id` | JWT+Admin | Ürün günceller |
| DELETE | `/:id` | JWT+Admin | Ürün siler |

### Kategoriler — `/api/category`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/` | Genel | Kategorileri listeler |
| GET | `/sub` | Genel | Tüm alt kategorileri listeler |
| GET | `/pop` | Genel | Popüler alt kategorileri listeler |
| GET | `/:id` | Genel | ID'ye göre kategori getirir |
| POST | `/` | JWT+Admin | Kategori oluşturur |
| PUT | `/:id` | JWT+Admin | Kategori günceller |
| PUT | `/pop/:id` | JWT+Admin | Alt kategorinin popüler durumunu günceller |
| DELETE | `/:id` | JWT+Admin | Kategori siler |
| GET | `/sub/:id` | Genel | Ana kategoriye göre alt kategorileri listeler |
| POST | `/sub` | JWT+Admin | Alt kategori oluşturur |
| PUT | `/sub/:id` | JWT+Admin | Alt kategori günceller |
| DELETE | `/sub/:id` | JWT+Admin | Alt kategori siler |

### Sepet — `/api/cart`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/add` | JWT | Sepete ürün ekler |
| GET | `/` | JWT | Sepeti getirir |
| GET | `/:productId` | JWT | Sepetteki bir ürünün detayını getirir |
| PUT | `/increase/:productId/:colorId` | JWT | Ürün miktarını artırır |
| PUT | `/decrease/:productId/:colorId` | JWT | Ürün miktarını azaltır |
| DELETE | `/clear` | JWT | Sepeti tamamen temizler |
| DELETE | `/:productId` | JWT | Sepetten ürün kaldırır |
| PUT | `/update/:productId` | JWT | Sepetteki ürünü günceller |
| GET | `/total` | JWT | Sepet toplam fiyatını hesaplar |

### Kullanıcı Detayları — `/api/user-details`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/user` | JWT | Giriş yapan kullanıcının detaylarını getirir |
| GET | `/:id` | JWT+Admin | Belirli bir kullanıcının detaylarını getirir |
| GET | `/` | JWT+Admin | Tüm kullanıcı detaylarını listeler |
| POST | `/` | JWT | Kullanıcı detayı (adres vb.) oluşturur |
| PUT | `/` | JWT | Kullanıcı detayını günceller |
| DELETE | `/` | JWT | Kullanıcı detayını siler |

### Siparişler — `/api/order`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/my-orders/:id` | JWT | Kullanıcının kendi sipariş detayını getirir |
| GET | `/my-orders` | JWT | Kullanıcının kendi siparişlerini listeler |
| GET | `/` | JWT+Admin | Tüm siparişleri listeler |
| GET | `/:id` | JWT+Admin | ID'ye göre sipariş getirir |
| GET | `/details/:id` | JWT+Admin | Sipariş ürün detaylarını getirir |
| POST | `/` | JWT | Sepetten sipariş oluşturur |
| PUT | `/:id` | JWT | Sipariş durumunu günceller |
| DELETE | `/:id` | JWT+Admin | Siparişi siler |
| PUT | `/:id/cancel` | JWT | Siparişi iptal eder |

### Yorumlar — `/api/review`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/:productId` | JWT | Ürüne yorum ekler |
| GET | `/:productId` | Genel | Ürünün yorumlarını listeler |
| DELETE | `/:reviewId` | JWT | Kullanıcının kendi yorumunu siler |
| DELETE | `/admin/:reviewId` | JWT+Admin | Admin, herhangi bir yorumu siler |
| PUT | `/:reviewId` | JWT | Yorumu günceller |

### Favoriler — `/api/favorite`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/` | JWT | Favorileri listeler |
| POST | `/` | JWT | Favori ekler |
| DELETE | `/:productId` | JWT | Favori siler |

### Ödeme — `/api/payment`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/` | JWT | Iyzico ile ödeme oluşturur, başarılıysa ilgili siparişi tamamlar |

### Kargo — `/api/cargo`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/send` | Genel | MNG Kargo'ya gönderim isteği yapar |
| POST | `/token` | Genel | MNG Kargo API token'ı alır |
| POST | `/create-order` | JWT | MNG Kargo'da sipariş oluşturur — **kodda tanımsız bir `request` bağımlılığına dayandığı için çalışma zamanında hata verir** |

### Abonelik — `/api/subscribe`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| POST | `/` | Genel | E-posta bültenine abone olur |
| GET | `/` | JWT+Admin | Aboneleri listeler |
| POST | `/send-mail` | JWT+Admin | Abonelere toplu e-posta gönderir |

### Slider / Banner / Hero — `/api/slider`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/` | Genel | Slider görsellerini getirir |
| POST | `/` | JWT+Admin | Slider ekler |
| DELETE | `/:id` | JWT+Admin | Slider siler |
| GET | `/banner` | Genel | Banner getirir |
| POST | `/banner` | JWT+Admin | Banner ekler |
| DELETE | `/banner/:id` | JWT+Admin | Banner siler |
| GET | `/heroes` | Genel | Hero görsellerini getirir |
| POST | `/heroes` | JWT+Admin | Hero görseli ekler |
| DELETE | `/heroes/:id` | JWT+Admin | Hero görseli siler |

### Kullanıcılar — `/api/user`

| Metot | Yol | Auth | Açıklama |
|---|---|---|---|
| GET | `/` | JWT+Admin | Kullanıcıları listeler |
| GET | `/:id` | JWT+Admin | ID'ye göre kullanıcı getirir |
| GET | `/name/:name` | JWT+Admin | İsme göre kullanıcı arar |
| PUT | `/:id` | JWT+Admin | Kullanıcı günceller |
| DELETE | `/:id` | JWT+Admin | Kullanıcı siler |

## Veritabanı

MySQL üzerinde Sequelize modelleriyle tanımlanan gerçek şema (`server/models/*.js`). Çalışma zamanında kullanılan tek Sequelize bağlantısı `server/data/db.js`'dir (env değişkenlerinden); `server/models/index.js` ve `server/config/config.json` ise Sequelize CLI için ayrı, standart bir scaffold'dur ve migration çalıştırmak dışında uygulama tarafından kullanılmaz (bkz. [Yapılandırma ve Güvenlik Notları](#yapılandırma-ve-güvenlik-notları)).

| Model / Tablo | Önemli alanlar | İlişkiler |
|---|---|---|
| `User` (`users`) | name, email, password (bcrypt ile hash'lenir), isAdmin | `hasOne Cart`, `hasOne UserDetails`, `hasMany Order` |
| `UserDetails` (`userDetails`) | firstName, lastName, phoneNumber, email, address, city, district, zipCode | `belongsTo User` (üzerinden) |
| `Product` (`products`) | name, price, stock, color, description, group | `hasMany ProductImage as images`, `belongsToMany Category` (through `ProductCategory`), `belongsToMany SubCategory` (through `ProductSubCategory`) |
| `ProductImage` (`productImages`) | imageUrl | `belongsTo Product` |
| `Category` (`categories`) | name | `hasMany SubCategory`, `belongsToMany Product` |
| `SubCategory` (`subCategories`) | name, categoryId, isPopular | `belongsTo Category`, `belongsToMany Product` |
| `Cart` (`carts`) | price | `belongsTo User` (üzerinden, 1:1) |
| `CartProduct` (`cartProducts`) | cartId, productId, quantity, price | `belongsTo Cart`, `belongsTo Product` |
| `Order` (`orders`) | userId, totalPrice, status (`pending`\|`completed`\|`cancelled`) | `hasMany OrderProduct` (dolaylı, foreignKey ile) |
| `OrderProduct` (`orderProducts`) | orderId, productId, quantity, priceAtPurchase | `belongsTo Order`, `belongsTo Product` |
| `Review` (`reviews`) | userId, productId, comment, rating (1–5) | `belongsTo Product`, `belongsTo User` |
| `Favorite` | userId, productId | `belongsTo Product`, `belongsTo User` |
| `Slider` (`sliders`) | imageUrl, title, description | — |
| `Banner` (`banners`) | imageUrl | — |
| `Heroes` (`heroeses`) | imageUrl | — |
| `Subscribe` (`subscribers`) | email | — |

Sunucu her başlangıçta `sequelize.sync()` çağırır ve `isAdmin: true` olan bir kullanıcı yoksa `.env`'deki `ADMIN_NAME`/`ADMIN_EMAIL`/`ADMIN_PASSWORD` ile otomatik bir admin kullanıcısı oluşturur (`server/server.js`).

Bulunan tek migration dosyası: `server/migrations/20250430121837-add-group-code-to-products.js` (Product tablosuna `group` alanı ekler). `server/seeders/` klasörü mevcut ancak boştur; `server/data/dummy-data.js` deneme amaçlı statik veri içerir ve uygulama tarafından import edilip edilmediği doğrulanamamıştır.

## Kimlik Doğrulama

1. Kullanıcı `/api/auth/register` veya `/api/auth/login` ile kimlik doğrular. Şifreler `bcrypt` ile (`User.beforeCreate` / `beforeUpdate` hook'ları, salt round 10) hash'lenir.
2. Sunucu `User.prototype.createAuthToken()` ile `{ id, isAdmin, name }` payload'ını `JWT_PRIVATE_KEY` ile imzalar (`expiresIn: "24h"`) ve hem `x-auth-token` response header'ında hem de gövdede döner.
3. Client, token'ı `localStorage`'a kaydeder ve her sonraki isteğe axios interceptor aracılığıyla `x-auth-token` header'ı olarak ekler (`client/src/features/services/axiosInstance.js`).
4. Sunucu tarafında `server/middlewares/verifyToken.js`, `x-auth-token` header'ını `jwt.verify` ile doğrular; geçersiz/eksikse `400`/`401` döner, geçerliyse `req.user` içine decode edilmiş payload'ı koyar.
5. Admin'e özel uç noktalar ayrıca `server/middlewares/isAdmin.js` ile `req.user.isAdmin` kontrolü yapar; değilse `403` döner.
6. Çıkış (`/api/auth/logout`) token'ı Redis'e `setEx` ile 1 saatliğine "blacklisted" olarak yazar; **ancak hiçbir route bu kara listeyi `verifyToken` içinde kontrol etmemektedir** — yani teoride, çıkış yapılmış bir token süresi dolana kadar diğer korumalı uç noktalarda kullanılabilir olabilir (bkz. Sorun Giderme).
7. Şifre sıfırlama: `/api/auth/password-email` ayrı, kısa ömürlü (`1h`) bir JWT üretip e-posta ile bir link olarak gönderir; `/api/auth/update-password/:token` bu token'ı doğrulayıp şifreyi günceller.

## Yapılandırma ve Güvenlik Notları

- **`server/config/config.json` Git'e dahil edilmiş durumda ve gerçek/geçerli görünen MySQL kimlik bilgileri (kullanıcı adı, şifre, host, port ve tam bağlantı dizesi) içeriyor.** Bu dosya `.gitignore` tarafından hariç tutulmamıştır (`git ls-files` ile takip edildiği doğrulanmıştır). Bu bir güvenlik açığıdır: dosyanın derhal Git geçmişinden temizlenmesi, ilgili veritabanı kimlik bilgilerinin **rotasyona tabi tutulması (değiştirilmesi)** ve dosyanın `.gitignore`'a eklenerek yerine `config.json.example` gibi placeholder değerler içeren bir şablonun konulması önerilir. (Bu README, kural gereği bu dosyadaki gerçek değerleri içermez.)
- `server/.env` ve `server/.env.development` dosyaları `.gitignore` içinde listelenmiştir ve takip edilmemektedir — bu haliyle doğru yapılandırılmıştır.
- Gerçek çalışma zamanı DB bağlantısı `server/data/db.js`'den env değişkenleriyle kurulur; `server/config/config.json` ve `server/models/index.js` yalnızca Sequelize CLI (migration) akışı için mevcuttur ve uygulamanın kendisi tarafından çalışma zamanında kullanılmaz.
- CORS: `server/server.js` içinde hem elle yazılmış bir CORS header middleware'i hem de `cors` paketi (`corsOptions` ile, izinli origin listesi kod içinde sabit) birlikte kullanılmaktadır.
- Rate limiting: `express-rate-limit` ile 15 dakikada IP başına 1000 istek sınırı tüm uygulamaya (route bazlı değil, global) uygulanır.
- Güvenlik başlıkları: `helmet` global olarak eklenmiştir (`crossOriginResourcePolicy` devre dışı bırakılmıştır, muhtemelen Cloudinary/uploads görsellerinin farklı origin'lerden yüklenebilmesi için).

## Sorun Giderme

Bu bölüm, kaynak kodda gözlemlenen gerçek davranışlara dayanır:

- **"Veritabanı bağlantısı kurulamadı" logu**: `server/data/db.js` bağlanamazsa hatayı konsola yazar ama süreci sonlandırmaz; `DB_HOST`/`DB_USER`/`DB_NAME`/`DB_PASSWORD` (development) veya `DB_URL` (production) değerlerini kontrol edin.
- **Kargo API'si her zaman hata dönüyor**: `server/controllers/cargo.js` içindeki `create_order` fonksiyonu, hiçbir yerde `require` edilmemiş bir `request` fonksiyonunu çağırır (proje `request` paketine bağımlı değildir) — bu uç nokta çalışma zamanında `ReferenceError` ile başarısız olur. `send_cargo` ve `get_token` fonksiyonları da `.env` dosyalarında tanımlı olmayan (`MNG_JWT_TOKEN`, `MNG_CLIENT_ID`, `MNG_CLIENT_SECRET`, `JWT_TOKEN`, `CLIENT_ID`, `CLIENT_SECRET`) değişkenlere dayanır ve bu değişkenler tanımlanmadan test API'sine karşı da başarısız olacaktır.
- **Çıkış yapıldıktan sonra token hâlâ çalışıyor**: `verifyToken.js` middleware'i Redis kara listesini kontrol etmez; yalnızca imza/süre doğrular. Bu davranış tasarım gereği midir yoksa eksik bir entegrasyon mudur doğrulanamamıştır.
- **`redis.createClient()` bağlantı hatası**: Kod, `client.connect()` çağrısı yapmadan (redis v4 API'sinde açıkça gereklidir) doğrudan `setEx` çağırıyor ve `.env` dosyalarında bir `REDIS_URL` tanımlı değil; yerel/varsayılan bir Redis sunucusu (localhost:6379) çalışmıyorsa `/api/auth/logout` uç noktası hata dönebilir.
- **Cloudinary yüklemeleri başarısız oluyor**: `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` eksikse `middlewares/upload.js` görselleri kabul etmez; `server.js` başlangıçta `CLOUDINARY_API_KEY` değerini console'a yazdırır (üretimde bu log satırının kaldırılması önerilir, anahtar production loglarına sızabilir).
- **CORS hatası**: İzinli origin listesi `server/server.js` içinde koda sabitlenmiştir; yeni bir frontend domaini eklemek için kaynak kodun güncellenmesi gerekir (env değişkeni ile yönetilmiyor — `FRONTEND_URL` yalnızca elle eklenen ilk middleware'de kullanılır, `cors` paketinin `corsOptions.origin` listesinde kullanılmaz).
- **Admin otomatik oluşturulmuyor**: `ADMIN_NAME`/`ADMIN_EMAIL`/`ADMIN_PASSWORD` `.env`'de tanımlı değilse veya zaten `isAdmin: 1` olan bir kullanıcı varsa yeni admin oluşturulmaz (`server.js`, `findOrCreate`).
- **Vite `dev` sunucusu API'ye ulaşamıyor**: `client/.env.development` içindeki `VITE_API_URL` sunucunun gerçekte dinlediği port ile eşleşmiyorsa (varsayılan `3000`) istekler başarısız olur.

## Lisans

Depoda bir `LICENSE` dosyası bulunmamaktadır; `server/package.json` içindeki `license` alanı `"ISC"` olarak belirtilmiştir ancak bu, ayrı bir lisans metniyle doğrulanmamıştır. Lisans koşulları netleştirilene kadar bu bilgiye güvenilmemelidir.
