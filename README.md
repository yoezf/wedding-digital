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
