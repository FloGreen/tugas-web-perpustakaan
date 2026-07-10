document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const buku = getBukuById(id);
  const container = document.getElementById("detail-buku");

  if (!container) return;

  if (!buku) {
    container.innerHTML = `
      <div class="alert alert-warning">
        Buku tidak ditemukan. <a href="index.html">Kembali ke beranda</a>
      </div>`;
    return;
  }

  const badge = buku.ketersediaan
    ? `<span class="badge text-success rounded-pill px-3 py-2" style="background:#dcfce7;border:1px solid #bbf7d0;">Tersedia</span>`
    : `<span class="badge text-danger rounded-pill px-3 py-2" style="background:#fee2e2;border:1px solid #fecaca;">Tidak Tersedia</span>`;

  container.innerHTML = `
    <div class="row g-4 align-items-start">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm overflow-hidden rounded-4">
          <img src="${buku.gambar}" alt="Cover ${buku.judul}" class="w-100 object-fit-cover" style="height:420px;" />
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
            <h1 class="h3 fw-bold text-primary-custom mb-0">${buku.judul}</h1>
            ${badge}
          </div>
          <p class="text-muted-custom mb-4">${buku.deskripsi || "Tidak ada deskripsi."}</p>
          <div class="row g-3">
            <div class="col-sm-6"><strong>Penulis:</strong> ${buku.penulis}</div>
            <div class="col-sm-6"><strong>Kategori:</strong> ${buku.kategori}</div>
            <div class="col-sm-6"><strong>Stok:</strong> ${buku.stok}</div>
            <div class="col-sm-6"><strong>ID Buku:</strong> ${buku.id}</div>
          </div>
          <div class="mt-4">
            <a href="index.html#koleksi" class="btn btn-outline-secondary rounded-pill px-4">Kembali</a>
          </div>
        </div>
      </div>
    </div>`;

  document.title = `${buku.judul} - Perpustakaan Universitas`;
});
