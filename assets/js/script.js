document.addEventListener("DOMContentLoaded", function () {
  const config = WEDDING_CONFIG;

  const coupleName = `${config.brideName} & ${config.groomName}`;

  document.title = `Wedding Invitation ${config.brideNickname || config.brideName} & ${config.groomNickname || config.groomName}`;

  // Ambil nama tamu dari URL, contoh: ?to=Budi%20Santoso
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to") || "Tamu Undangan";

  // Set nama pasangan
  setText("cover-couple-name", coupleName);
  setText("main-couple-name", coupleName);
  setText("closing-couple-name", coupleName);

  // Set nama tamu
  setText("guest-name-cover", guestName);
  setText("guest-name-main", guestName);

  const rsvpNameInput = document.getElementById("rsvpName");
  if (rsvpNameInput) {
    rsvpNameInput.value = guestName;
  }

  // Set data mempelai
  setText("bride-name", config.brideName);
  setText("groom-name", config.groomName);
  setText("bride-parent", config.brideParent);
  setText("groom-parent", config.groomParent);

  // Set data acara
  setText("akad-date", config.akad.date);
  setText("akad-time", config.akad.time);
  setText("akad-location", config.akad.location);

  setText("resepsi-date", config.resepsi.date);
  setText("resepsi-time", config.resepsi.time);
  setText("resepsi-location", config.resepsi.location);
  setText("dresscode-text", config.dresscode || "Mahogany");

  // Google Maps
  const mapsLink = document.getElementById("maps-link");
  if (mapsLink) {
    mapsLink.href = config.googleMapsLink;
  }

  const mapsEmbed = document.getElementById("maps-embed");
  if (mapsEmbed) {
    mapsEmbed.src = config.googleMapsEmbedUrl || "";
  }

  // Data bank
  setText("bank-name", config.bank.name);
  setText("account-number", config.bank.accountNumber);
  setText("account-owner", `a.n. ${config.bank.accountOwner}`);

  // Watermark dan sosial media
  setupCreatorCredit(config.creator);

  // Render konten dinamis
  renderExtraEvents(config.acaraTambahan);
  renderRundown(config.rundown);

  // Tombol buka undangan
  const openButton = document.getElementById("openInvitation");
  const cover = document.getElementById("cover");

  if (openButton && cover) {
    openButton.addEventListener("click", function () {
      cover.classList.add("cover-hide");

      setTimeout(function () {
        cover.style.display = "none";
      }, 900);
    });
  }

  // Countdown
  startCountdown(config.weddingDate);

  // RSVP
  const rsvpForm = document.getElementById("rsvpForm");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitRSVP();
    });
  }

  // Salin rekening
  const copyButton = document.getElementById("copyAccount");

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      copyAccountNumber(config.bank.accountNumber);
    });
  }
});

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function startCountdown(dateString) {
  const weddingTime = new Date(dateString).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingTime - now;

    if (distance <= 0) {
      setText("days", "0");
      setText("hours", "0");
      setText("minutes", "0");
      setText("seconds", "0");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setText("days", days);
    setText("hours", hours);
    setText("minutes", minutes);
    setText("seconds", seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function renderExtraEvents(extraEvents) {
  const container = document.getElementById("extra-event-list");

  if (!container || !Array.isArray(extraEvents)) {
    return;
  }

  container.innerHTML = "";

  extraEvents.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "extra-event-card";
    card.innerHTML = `<span class="text-[#C9A227] mr-1">✦</span>${escapeHTML(item)}`;
    container.appendChild(card);
  });
}

function renderRundown(rundownData) {
  const rundownList = document.getElementById("rundown-list");

  if (!rundownList || !Array.isArray(rundownData)) {
    return;
  }

  rundownList.innerHTML = "";

  rundownData.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "rundown-card";

    card.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-start gap-3">
        <div class="md:w-44 shrink-0">
          <span class="rundown-time">${escapeHTML(item.time)}</span>
        </div>

        <div class="flex-1">
          <h3 class="text-xl font-semibold text-mahogany">
            ${escapeHTML(item.title)}
          </h3>

          <p class="text-stone-600 mt-1 leading-relaxed">
            ${escapeHTML(item.description)}
          </p>
        </div>
      </div>
    `;

    rundownList.appendChild(card);
  });
}

function submitRSVP() {
  const config = WEDDING_CONFIG;

  const statusText = document.getElementById("rsvpStatus");
  const submitButton = document.getElementById("submitRsvp");

  const name = document.getElementById("rsvpName").value;
  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;
  const message = document.getElementById("message").value;

  if (!attendance) {
    statusText.textContent = "Silakan pilih status kehadiran.";
    statusText.className = "text-center text-sm mt-3 text-red-600";
    return;
  }

  if (!config.googleScriptUrl || config.googleScriptUrl === "ISI_LINK_GOOGLE_APPS_SCRIPT_DI_SINI") {
    statusText.textContent = "Link Google Apps Script belum diatur.";
    statusText.className = "text-center text-sm mt-3 text-red-600";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Mengirim...";
  statusText.textContent = "";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("attendance", attendance);
  formData.append("guest_count", guestCount);
  formData.append("message", message);
  formData.append("guest_url", window.location.href);
  formData.append("event_name", `${config.brideNickname || config.brideName} & ${config.groomNickname || config.groomName}`);
  formData.append("user_agent", navigator.userAgent);

  fetch(config.googleScriptUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
    .then(function () {
      statusText.textContent = "Terima kasih, konfirmasi Anda berhasil dikirim.";
      statusText.className = "text-center text-sm mt-3 text-[#6B2D2D]";

      document.getElementById("rsvpForm").reset();
      document.getElementById("rsvpName").value = name;
    })
    .catch(function () {
      statusText.textContent = "Maaf, terjadi kesalahan. Silakan coba lagi.";
      statusText.className = "text-center text-sm mt-3 text-red-600";
    })
    .finally(function () {
      submitButton.disabled = false;
      submitButton.textContent = "Kirim Konfirmasi";
    });
}

function copyAccountNumber(accountNumber) {
  const textToCopy = String(accountNumber || "").trim();

  if (!textToCopy) {
    setText("copyStatus", "Nomor DANA belum tersedia.");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy)
      .then(function () {
        setText("copyStatus", "Nomor DANA berhasil disalin.");
      })
      .catch(function () {
        fallbackCopyText(textToCopy);
      });
  } else {
    fallbackCopyText(textToCopy);
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand("copy");

    if (successful) {
      setText("copyStatus", "Nomor DANA berhasil disalin.");
    } else {
      setText("copyStatus", "Gagal menyalin. Silakan salin manual.");
    }
  } catch (err) {
    setText("copyStatus", "Gagal menyalin. Silakan salin manual.");
  }

  document.body.removeChild(textarea);
}

function setupCreatorCredit(creator) {
  if (!creator) {
    return;
  }

  const primaryLink = creator.primaryLink || "#";

  const coverCreditLink = document.getElementById("cover-credit-link");
  const footerCreditLink = document.getElementById("footer-credit-link");

  if (coverCreditLink) {
    coverCreditLink.href = primaryLink;
  }

  if (footerCreditLink) {
    footerCreditLink.href = primaryLink;
  }

  setText("cover-credit-text", creator.creditText || `Dibuat oleh ${creator.name || "Yoezarsif"}`);

  renderSocialLinks(creator.socialLinks || []);
}

function renderSocialLinks(socialLinks) {
  const container = document.getElementById("social-links");

  if (!container || !Array.isArray(socialLinks)) {
    return;
  }

  container.innerHTML = "";

  socialLinks.forEach(function (item) {
    if (!item || !item.url) {
      return;
    }

    const link = document.createElement("a");
    link.className = "social-icon";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", item.label || "Sosial Media");
    link.title = item.label || "Sosial Media";

    if (item.iconClass) {
      const icon = document.createElement("i");
      icon.className = item.iconClass;
      icon.setAttribute("aria-hidden", "true");
      link.appendChild(icon);
    } else {
      link.textContent = item.icon || (item.label || "SM").slice(0, 2).toUpperCase();
    }

    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = item.label || "Sosial Media";
    link.appendChild(srText);

    container.appendChild(link);
  });
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
