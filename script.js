document.addEventListener("DOMContentLoaded", function () {
    // 1. LOGIKA PROMO & HARGA (Khusus di booking.html)
    if (window.location.pathname.includes("booking.html")) {
        const sectionPromo = document.getElementById("section-promo-booking");
        const inputPromo = document.getElementById("kode-voucher-booking");
        const selectVilla = document.getElementById("booking-villa");
        const hargaAsliEl = document.getElementById("harga-asli");
        const hargaPromoEl = document.getElementById("harga-promo");
        const form = document.getElementById("mainBookingForm");

        const daftarHarga = {
            "Villa Ocean View": 2500000,
            "Villa Sunset Paradise": 2200000,
            "Villa Green Escape": 1800000,
            "Villa Serenity": 2800000
        };

        function updateHarga() {
            let namaVilla = selectVilla.value;
            let hargaDasar = daftarHarga[namaVilla] || 0;
            let urlParams = new URLSearchParams(window.location.search);
            let kode = urlParams.get('promo');

            if (hargaDasar > 0) {
                if (kode === "FIRST20") {
                    let diskon = hargaDasar * 0.20;
                    let hargaAkhir = hargaDasar - diskon;
                    
                    hargaAsliEl.style.display = "block";
                    hargaAsliEl.innerText = "Rp " + hargaDasar.toLocaleString('id-ID');
                    hargaPromoEl.innerText = "Rp " + hargaAkhir.toLocaleString('id-ID');
                } else {
                    hargaAsliEl.style.display = "none";
                    hargaPromoEl.innerText = "Rp " + hargaDasar.toLocaleString('id-ID');
                }
            }
        }

        // Tampilkan voucher jika ada di URL
        if (sectionPromo) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('promo')) {
                sectionPromo.style.display = "block";
                inputPromo.value = urlParams.get('promo').toUpperCase();
            }
        }

        // Update harga saat villa dipilih
        if (selectVilla) {
            selectVilla.addEventListener("change", updateHarga);
        }

        // --- TAMBAHAN PENTING: MENGIRIM HARGA KE BUKTI SEWA ---
        if (form) {
            form.addEventListener("submit", function() {
                // Membuat input hidden secara otomatis jika belum ada di HTML
                let inputTotal = document.getElementById("input-total-hidden");
                if (!inputTotal) {
                    inputTotal = document.createElement("input");
                    inputTotal.type = "hidden";
                    inputTotal.name = "total_harga";
                    inputTotal.id = "input-total-hidden";
                    form.appendChild(inputTotal);
                }
                // Menyalin harga yang tampil ke input hidden
                inputTotal.value = hargaPromoEl.innerText;
            });
        }
    }

    // 2. FITUR KONTAK
    const formKontak = document.getElementById("contactForm");
    if (formKontak) {
        formKontak.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Pesan Anda telah kami terima.");
            formKontak.reset();
        });
    }

    // 3. FITUR FASILITAS (WIFI)
    window.salinWifi = function() {
        alert("Nama WiFi: VillaStay_Guest\nPassword: VillaStayPremium2026");
    };
});