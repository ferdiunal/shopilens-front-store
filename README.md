# Shopilens Store

Shopilens Store, Next.js 14+ kullanılarak geliştirilmiş modern bir e-ticaret ön yüz uygulamasıdır. Bu proje, mikro-mimari yaklaşımı ile tasarlanmış olup, performans, ölçeklenebilirlik ve kullanıcı deneyimine odaklanmaktadır.

## İçindekiler

- [Ön Gereksinimler](#ön-gereksinimler)
- [Kurulum](#kurulum)
- [Ortam Değişkenleri (Environment Variables)](#ortam-değişkenleri-environment-variables)
- [Auth0 Entegrasyonu](#auth0-entegrasyonu)
- [Geliştirme (Development)](#geliştirme-development)
- [Deployment (Dağıtım)](#deployment-dağıtım)

## Ön Gereksinimler

Projeyi çalıştırmadan önce aşağıdaki araçların yüklü olduğundan emin olun:

- **Node.js**: v18.17.0 veya üzeri (v20.x önerilir)
- **npm**: v9.x veya üzeri
- **Docker** & **Docker Compose**: Konteyner tabanlı dağıtım için gereklidir.

## Kurulum

Projeyi yerel ortamınıza klonlayın ve bağımlılıkları yükleyin:

```bash
# Projeyi klonlayın
git clone <repo-url>
cd shopilens-store/shopilens-store

# Bağımlılıkları yükleyin
npm install
```

## Ortam Değişkenleri (Environment Variables)

Projenin çalışması için kök dizinde bir `.env` dosyası oluşturmanız gerekmektedir. `.env.example` dosyasını şablon olarak kullanabilirsiniz.

```bash
cp .env.example .env
```

Aşağıdaki tabloda gerekli ortam değişkenleri açıklanmıştır:

| Değişken | Açıklama | Örnek Değer |
|----------|----------|-------------|
| **App Config** | | |
| `NEXT_PUBLIC_APP_URL` | Uygulamanın çalıştığı ana URL. | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API servisi URL'i (örn. FakestoreAPI). | `https://fakestoreapi.com` |
| **Auth0 Config** | | |
| `AUTH0_CLIENT_ID` | Auth0 uygulamanızın Client ID'si. | `your-client-id` |
| `AUTH0_CLIENT_SECRET` | Auth0 uygulamanızın Client Secret'ı. | `your-client-secret` |
| `AUTH0_ISSUER_BASE_URL` | Auth0 Domain URL'iniz. | `https://dev-xxxx.us.auth0.com` |
| `AUTH0_BASE_URL` | Uygulama URL'i (Auth0 için). | `http://localhost:3000` |
| `AUTH0_SECRET` | Oturum şifrelemesi için gizli anahtar. | `openssl rand -hex 32` |
| **NextAuth** | | |
| `NEXTAUTH_URL` | NextAuth için uygulama URL'i. | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth oturum şifrelemesi için gizli anahtar. | `openssl rand -base64 32` |
| **Analytics & SEO** | | |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID. | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID. | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console doğrulama kodu. | `verification-code` |

## Auth0 Entegrasyonu

Bu proje, kimlik doğrulama için **NextAuth.js** ile birlikte **Auth0** provider'ını kullanır. Entegrasyonu etkinleştirmek için aşağıdaki adımları izleyin:

1. **Auth0 Dashboard Ayarları**:
   - Auth0 yönetim panelinde yeni bir "Regular Web Application" oluşturun.
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback/auth0` (Production için domain güncellenmeli)
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

2. **Değişkenlerin Tanımlanması**:
   - `.env` dosyanıza `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET` ve `AUTH0_ISSUER_BASE_URL` değerlerini ekleyin.
   - `AUTH0_SECRET` ve `NEXTAUTH_SECRET` için güvenli, rastgele üretilmiş anahtarlar kullanın.

3. **Kod Yapısı**:
   - `lib/auth/auth.ts` dosyası, Auth0 ve Google provider'larını yapılandırır. Eğer Auth0 ortam değişkenleri tanımlı değilse, provider otomatik olarak devre dışı bırakılır ve sadece "Credentials" girişi aktif olur.

## Geliştirme (Development)

Yerel geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Deployment (Dağıtım)

Proje, Docker kullanılarak kolayca dağıtılabilir. `Dockerfile`, Next.js uygulamasını production modunda çalışacak şekilde optimize edilmiştir (standalone output).

### Docker ile Çalıştırma

1. **İmajı Oluşturun (Build):**

```bash
docker build -t shopilens-store .
```

2. **Konteyneri Başlatın (Run):**

```bash
docker run -p 3000:3000 --env-file .env shopilens-store
```

### Docker Compose ile Çalıştırma

Projede hazır bir `docker-compose.yml` dosyası bulunmaktadır. Bu dosya uygulamayı production modunda ayağa kaldırır ve yeniden başlatma politikalarını içerir.

```bash
docker-compose up -d --build
```

**Not:** `docker-compose.yml` dosyası içindeki ortam değişkenlerinin `.env` dosyanızla uyumlu olduğundan veya `.env` dosyasının Docker tarafından okunduğundan emin olun.
