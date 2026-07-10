document.addEventListener("DOMContentLoaded", () => {
  updateStatusPeminjaman();

  const tanggalEl = document.getElementById("tanggal");
  if (tanggalEl) {
    tanggalEl.textContent = new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  const stats = getStatistikHariIni();
  const totalPeminjaman = document.getElementById("total-peminjaman");
  const totalPengembalian = document.getElementById("total-pengembalian");
  const totalTerlambat = document.getElementById("total-terlambat");

  if (totalPeminjaman) totalPeminjaman.textContent = stats.peminjaman;
  if (totalPengembalian) totalPengembalian.textContent = stats.pengembalian;
  if (totalTerlambat) totalTerlambat.textContent = stats.terlambat;

  const tabelPeminjaman = document.getElementById("tabel-peminjaman");
  if (tabelPeminjaman) {
    const data = getLatest(getPeminjaman(), 5);
    const rows = data.map(
      (item) => `
      <tr>
        <td>${item.id}</td>
        <td class="fw-semibold">${item.anggota}</td>
        <td>${item.buku}</td>
        <td>${formatTanggal(item.tanggalPeminjaman)}</td>
        <td>${formatTanggal(item.tanggalJatuhTempo)}</td>
        <td>${renderStatusBadge(item.status)}</td>
      </tr>`
    );
    renderTableRows(tabelPeminjaman, rows, "Belum ada transaksi peminjaman.");
  }
});
