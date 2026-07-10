function renderBukuCards(bukuList) {
  const container = document.getElementById("tempat-buku");
  const pesanKosong = document.getElementById("pesan-kosong");
  if (!container) return;

  if (!bukuList.length) {
    container.innerHTML = "";
    if (pesanKosong) pesanKosong.classList.remove("d-none");
    return;
  }

  if (pesanKosong) pesanKosong.classList.add("d-none");

  container.innerHTML = bukuList
    .map((buku) => {
      const badge = buku.ketersediaan
        ? `<span class="badge text-success rounded-pill px-2 py-1" style="background:#dcfce7;border:1px solid #bbf7d0;">Tersedia</span>`
        : `<span class="badge text-danger rounded-pill px-2 py-1" style="background:#fee2e2;border:1px solid #fecaca;">Dipinjam</span>`;

      return `
        <div class="col">
          <article class="card h-100 shadow-sm border rounded-3 overflow-hidden">
            <div style="height:220px;background:linear-gradient(180deg,#dde7f4,#cfdcee);">
              <img class="w-100 h-100 object-fit-cover" src="${buku.gambar}" alt="Cover ${buku.judul}" />
            </div>
            <div class="card-body p-3 d-flex flex-column justify-content-between">
              <div>
                <h3 class="h6 fw-bold text-primary-custom mb-1">${buku.judul}</h3>
                <p class="small text-muted-custom mb-3">${buku.penulis} • ${buku.kategori}</p>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                ${badge}
                <a href="detail-buku.html?id=${encodeURIComponent(buku.id)}" class="btn btn-sm btn-outline-secondary rounded-pill bg-white px-3">Detail</a>
              </div>
            </div>
          </article>
        </div>`;
    })
    .join("");
}

function updateRingkasan() {
  const buku = getBuku();
  const totalBuku = document.getElementById("total-buku");
  const totalTersedia = document.getElementById("total-tersedia");
  if (totalBuku) totalBuku.textContent = buku.length;
  if (totalTersedia) totalTersedia.textContent = buku.filter((item) => item.ketersediaan).length;
}

function filterBuku() {
  const keyword = document.getElementById("cari-kata").value.trim().toLowerCase();
  const fakultas = document.getElementById("cari-fakultas").value;
  const jenis = document.getElementById("cari-jenis").value;
  const tahun = document.getElementById("cari-tahun").value;

  const mapFakultas = {
    Teknik: "Informatika",
    Ekonomi: "Ekonomi",
    Hukum: "Hukum",
  };

  let result = getBuku();

  if (keyword) {
    result = result.filter(
      (item) =>
        item.judul.toLowerCase().includes(keyword) ||
        item.penulis.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(keyword))
    );
  }

  if (fakultas !== "Semua Fakultas") {
    const kategori = mapFakultas[fakultas] || fakultas;
    result = result.filter((item) => item.kategori === kategori);
  }

  if (jenis === "Jurnal" || jenis === "Skripsi") {
    result = [];
  }

  if (tahun !== "Tahun Terbaru") {
    result = result.filter((item) => {
      const itemYear = new Date(item.createdAt).getFullYear().toString();
      return itemYear === tahun;
    });
  }

  renderBukuCards(result);
}

document.addEventListener("DOMContentLoaded", () => {
  updateStatusPeminjaman();
  updateRingkasan();
  renderBukuCards(getBuku());

  const formCari = document.getElementById("formCari");
  if (formCari) {
    formCari.addEventListener("submit", (event) => {
      event.preventDefault();
      filterBuku();
    });
  }

  document.getElementById("cari-kata")?.addEventListener("input", filterBuku);
  ["cari-fakultas", "cari-jenis", "cari-tahun"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", filterBuku);
  });
});
