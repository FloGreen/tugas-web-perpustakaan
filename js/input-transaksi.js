function renderTabelPeminjaman() {
  const tbody = document.getElementById("hasilPeminjamanBody");
  const data = getLatest(getPeminjaman(), 5);
  const rows = data.map(
    (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.anggota}</td>
      <td>${item.buku}</td>
      <td>${formatTanggal(item.tanggalPeminjaman)}</td>
      <td>${formatTanggal(item.tanggalJatuhTempo)}</td>
      <td>${renderStatusBadge(item.status)}</td>
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada transaksi peminjaman.");
}

function renderTabelPengembalian() {
  const tbody = document.getElementById("hasilPengembalianBody");
  const data = getLatest(getPengembalian(), 5);
  const rows = data.map(
    (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.idPeminjaman}</td>
      <td>${formatTanggal(item.tanggalPengembalian)}</td>
      <td>${item.status}</td>
      <td>Rp ${item.denda.toLocaleString("id-ID")}</td>
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada transaksi pengembalian.");
}

function populateTransaksiSelects() {
  fillSelectOptions(
    document.getElementById("pinjam-anggota"),
    getAnggota(),
    "id",
    (item) => `${item.nama} (${item.id})`,
    "Pilih anggota"
  );

  fillSelectOptions(
    document.getElementById("pinjam-buku"),
    getBuku().filter((item) => item.ketersediaan && item.stok > 0),
    "id",
    (item) => `${item.judul} (${item.id})`,
    "Pilih buku"
  );

  fillSelectOptions(
    document.getElementById("kembali-transaksi"),
    getPeminjaman().filter((item) => item.status !== "Dikembalikan"),
    "id",
    (item) => `${item.id} - ${item.buku}`,
    "Pilih transaksi peminjaman"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  updateStatusPeminjaman();
  populateTransaksiSelects();
  renderTabelPeminjaman();
  renderTabelPengembalian();

  const today = new Date().toISOString().slice(0, 10);
  const pinjamTanggal = document.getElementById("pinjam-tanggal");
  const kembaliTanggal = document.getElementById("kembali-tanggal");
  if (pinjamTanggal) pinjamTanggal.value = today;
  if (kembaliTanggal) kembaliTanggal.value = today;

  const formPeminjaman = document.getElementById("formPeminjaman");
  if (formPeminjaman) {
    formPeminjaman.addEventListener("submit", (event) => {
      event.preventDefault();

      addPeminjaman({
        id: document.getElementById("pinjam-id").value.trim() || generateId("TRX-PJM"),
        idAnggota: document.getElementById("pinjam-anggota").value,
        idBuku: document.getElementById("pinjam-buku").value,
        tanggalPeminjaman: document.getElementById("pinjam-tanggal").value,
        tanggalJatuhTempo: document.getElementById("pinjam-jatuh-tempo").value,
        petugas: document.getElementById("pinjam-petugas").value.trim(),
      });

      formPeminjaman.reset();
      if (pinjamTanggal) pinjamTanggal.value = today;
      populateTransaksiSelects();
      renderTabelPeminjaman();
    });
  }

  const formPengembalian = document.getElementById("formPengembalian");
  if (formPengembalian) {
    formPengembalian.addEventListener("submit", (event) => {
      event.preventDefault();

      addPengembalian({
        id: document.getElementById("kembali-id").value.trim() || generateId("TRX-KBL"),
        idPeminjaman: document.getElementById("kembali-transaksi").value,
        tanggalPengembalian: document.getElementById("kembali-tanggal").value,
        kondisi: document.getElementById("kembali-kondisi").value,
        denda: document.getElementById("kembali-denda").value,
        status: document.getElementById("kembali-status").value,
      });

      formPengembalian.reset();
      if (kembaliTanggal) kembaliTanggal.value = today;
      populateTransaksiSelects();
      renderTabelPeminjaman();
      renderTabelPengembalian();
    });
  }
});
