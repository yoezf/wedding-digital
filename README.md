# Wedding Digital Mira & Arif - Update Yoezarsif

Update yang sudah ditambahkan:

1. Google Maps langsung tampil di halaman undangan menggunakan iframe embed.
2. Watermark halus "Dibuat oleh Yoezarsif" pada cover/pop-up undangan.
3. Footer credit dengan icon/link sosial media.
4. Form RSVP mengirim data ke Google Sheets melalui Google Apps Script.
5. Apps Script sudah disiapkan di folder `apps-script/Code.gs`.

## File yang perlu diedit

### 1. assets/js/config.js

Ubah bagian berikut:

```js
googleScriptUrl: "ISI_LINK_GOOGLE_APPS_SCRIPT_DI_SINI"
```

menjadi URL Web App dari Google Apps Script.

Ubah juga link sosial media:

```js
creator: {
  primaryLink: "https://instagram.com/username_kamu",
  socialLinks: [
    { label: "Instagram", icon: "IG", url: "https://instagram.com/username_kamu" },
    { label: "TikTok", icon: "TT", url: "https://www.tiktok.com/@username_kamu" },
    { label: "WhatsApp", icon: "WA", url: "https://wa.me/6280000000000" }
  ]
}
```

### 2. Google Sheets dan Apps Script

1. Buat Google Sheets baru.
2. Buka `Extensions > Apps Script`.
3. Tempel kode dari `apps-script/Code.gs`.
4. Klik `Deploy > New deployment`.
5. Pilih tipe `Web app`.
6. Execute as: `Me`.
7. Who has access: `Anyone`.
8. Klik Deploy.
9. Salin Web App URL.
10. Tempel URL ke `googleScriptUrl` di `assets/js/config.js`.

## Kolom Google Sheets RSVP

Apps Script otomatis membuat sheet bernama `RSVP` dengan kolom:

- Timestamp
- Nama Tamu
- Kehadiran
- Jumlah Tamu
- Ucapan
- Link Undangan
- Acara
- User Agent

## File gambar yang perlu disediakan

Simpan ke folder `assets/img/`:

- `cover.webp`
- `couple.webp`
- `bride.webp`
- `groom.webp`
- `qris.webp`
- `gallery-1.webp`
- `gallery-2.webp`
- `gallery-3.webp`



## Update Terbaru

- Favicon `assets/img/favicon.svg` sudah ditambahkan dan dipanggil dari `index.html`.
- Link tombol Google Maps sudah diganti ke `https://goo.gl/maps/YNY4UDBjfbshjvUp7?g_st=aw`.
- Embed maps tetap memakai URL embed berbasis alamat agar peta bisa tampil langsung di halaman.
- Watermark cover `Dibuat oleh Yoezarsif` dipindahkan ke bagian bawah cover agar tidak menghalangi tombol **Buka Undangan**.
- Konfigurasi Apps Script tidak diubah pada update ini.

## Update responsive + icon sosial media

Update terbaru:

1. Layout diperhalus untuk desktop, tablet, mobile, dan mobile kecil.
2. Cover memakai `100dvh` agar lebih stabil di browser mobile.
3. Ukuran judul, tombol, card, countdown, dan maps otomatis menyesuaikan layar.
4. Social media footer memakai Font Awesome CDN.
5. Watermark cover tetap berada di bawah dan memakai icon dari Font Awesome.

### Mengubah icon sosial media

Edit file `assets/js/config.js`, bagian:

```js
creator: {
  socialLinks: [
    {
      label: "Instagram",
      iconClass: "fa-brands fa-instagram",
      url: "https://instagram.com/username_kamu"
    }
  ]
}
```

Contoh icon Font Awesome yang bisa dipakai:

- Instagram: `fa-brands fa-instagram`
- TikTok: `fa-brands fa-tiktok`
- WhatsApp: `fa-brands fa-whatsapp`
- Facebook: `fa-brands fa-facebook-f`
- YouTube: `fa-brands fa-youtube`
- Website/link: `fa-solid fa-link`


## Update Wedding Gift

Bagian hadiah online menggunakan DANA:

- DANA: 0838-7526-0529
- A/n Arif Rifaldi

## Update Sistem Undangan General

Sistem nama tamu otomatis melalui link `?to=NamaTamu` sudah tidak digunakan sebagai alur utama.

Perubahan terbaru:

1. Undangan bersifat general, sehingga link bisa dibagikan tanpa parameter nama.
2. Tampilan cover tidak lagi menampilkan nama tamu personal.
3. Form RSVP sekarang meminta tamu mengisi nama lengkap secara manual.
4. Field nama pada RSVP tidak lagi `readonly`.
5. Data yang masuk ke Google Sheets tetap menggunakan kolom `Nama Tamu`, tetapi nilainya berasal dari input tamu di web.

Link undangan cukup menggunakan:

```text
https://yoezf.github.io/wedding-digital/
```

Boleh juga tetap memakai link dengan parameter `?to=...`, tetapi parameter tersebut tidak lagi otomatis mengisi nama tamu.


## Update Mobile + Maps + Favicon CDN

- Layout mobile diperhalus untuk cover, hero photo, countdown 2 kolom di HP, form RSVP, map, dan wedding gift.
- Lokasi acara diganti menjadi: `2H22+9JJ Lapangan Sepak Bola Andika Fc, Katapang, Kec. Katapang, Kabupaten Bandung, Jawa Barat 40921`.
- Tombol Google Maps memakai Google Maps Search URL, sedangkan peta langsung memakai embed URL dari alamat tersebut.
- Favicon sekarang memakai CDN Twemoji ring: `https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/svg/1f48d.svg`.

## Rekomendasi Musik

Format paling aman: `MP3`.

Saran teknis:

- Nama file: `assets/music/wedding.mp3`
- Format: MP3
- Bitrate: 128 kbps atau 160 kbps
- Durasi: 30–90 detik, dibuat loop halus
- Ukuran file: idealnya di bawah 2 MB, maksimal sekitar 3 MB
- Hindari musik berhak cipta jika undangan dibagikan publik

Catatan: browser biasanya tidak mengizinkan musik autoplay sebelum ada interaksi pengguna. Musik sebaiknya dimulai setelah tombol **Buka Undangan** diklik.


## Update terbaru: mobile, favicon, musik, dan resepsi

- Ukuran font mobile diperkecil agar lebih proporsional di layar HP.
- Favicon CDN diganti ke Twemoji PNG via jsDelivr agar lebih mudah tampil di browser.
- Musik latar akan mulai setelah tombol **Buka Undangan** diklik. Simpan file musik sebagai `assets/music/wedding.mp3`.
- Jam resepsi diubah menjadi `11.00 WIB - Selesai`.

### Format musik yang disarankan

- Format utama: MP3
- Bitrate: 128 kbps atau 160 kbps
- Durasi: 30–90 detik, bisa loop
- Ukuran file: idealnya di bawah 2 MB
- Nama file: `assets/music/wedding.mp3`


## Update Tailwind Mobile Responsive

- Card undangan general di bagian hero dibuat lebih responsif dengan utility Tailwind CDN.
- Teks `Bapak/Ibu/Saudara/i` dipecah menjadi dua baris di mobile agar tidak melebar.
- Ukuran judul section dan judul pasangan dibuat memakai `clamp()` melalui class Tailwind arbitrary value.
- Tambahan CSS hanya sebagai fallback untuk layar kecil di bawah 420px.


## Update Toast RSVP + WhatsApp Preview

- Ditambahkan Open Graph meta tag agar link undangan memiliki preview yang lebih rapi saat dibagikan ke WhatsApp/Facebook.
- Ditambahkan toast notifikasi untuk RSVP: validasi nama, validasi kehadiran, status mengirim, sukses, dan gagal.
- Preview image menggunakan: `https://yoezf.github.io/wedding-digital/assets/img/cover.webp`. Pastikan file `assets/img/cover.webp` sudah tersedia di repository GitHub Pages.
