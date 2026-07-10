let editPeminjamanId = null;
let editPengembalianId = null;

function renderTabelPeminjaman() {
  const tbody = document.getElementById("hasilPeminjamanBody");
  updateStatusPeminjaman();
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
      <td>${renderActionButtons("peminjaman", item.id)}</td>
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
      <td>${renderActionButtons("pengembalian", item.id)}</td>
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
    getBuku().filter((item) => item.stok > 0),
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

function resetFormPeminjaman() {
  editPeminjamanId = null;
  const form = document.getElementById("formPeminjaman");
  form?.reset();
  document.getElementById("btnSubmitPeminjaman").textContent = "Simpan Peminjaman";
  document.getElementById("pinjam-id").readOnly = false;
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("pinjam-tanggal").value = today;
}

function resetFormPengembalian() {
  editPengembalianId = null;
  const form = document.getElementById("formPengembalian");
  form?.reset();
  document.getElementById("btnSubmitPengembalian").textContent = "Simpan Pengembalian";
  document.getElementById("kembali-id").readOnly = false;
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("kembali-tanggal").value = today;
  document.getElementById("kembali-denda").value = "0";
}

function fillFormPeminjaman(item) {
  document.getElementById("pinjam-id").value = item.id;
  document.getElementById("pinjam-id").readOnly = true;
  document.getElementById("pinjam-tanggal").value = item.tanggalPeminjaman;
  document.getElementById("pinjam-anggota").value = item.idAnggota;
  document.getElementById("pinjam-buku").value = item.idBuku;
  document.getElementById("pinjam-jatuh-tempo").value = item.tanggalJatuhTempo;
  document.getElementById("pinjam-petugas").value = item.petugas;
  document.getElementById("btnSubmitPeminjaman").textContent = "Update Peminjaman";
}

function fillFormPengembalian(item) {
  document.getElementById("kembali-id").value = item.id;
  document.getElementById("kembali-id").readOnly = true;
  document.getElementById("kembali-tanggal").value = item.tanggalPengembalian;
  document.getElementById("kembali-transaksi").value = item.idPeminjaman;
  document.getElementById("kembali-kondisi").value = item.kondisi;
  document.getElementById("kembali-denda").value = item.denda;
  document.getElementById("kembali-status").value = item.status;
  document.getElementById("btnSubmitPengembalian").textContent = "Update Pengembalian";
}

document.addEventListener("DOMContentLoaded", () => {
  updateStatusPeminjaman();
  populateTransaksiSelects();
  renderTabelPeminjaman();
  renderTabelPengembalian();
  resetFormPeminjaman();
  resetFormPengembalian();

  const tbodyPeminjaman = document.getElementById("hasilPeminjamanBody");
  const tbodyPengembalian = document.getElementById("hasilPengembalianBody");

  tbodyPeminjaman?.addEventListener("click", (event) => {
    const editBtn = event.target.closest(".btn-edit");
    const deleteBtn = event.target.closest(".btn-delete");
    if (editBtn && editBtn.dataset.type === "peminjaman") {
      const item = getPeminjamanById(editBtn.dataset.id);
      if (item) {
        editPeminjamanId = item.id;
        populateTransaksiSelects();
        fillFormPeminjaman(item);
      }
      return;
    }
    if (deleteBtn && deleteBtn.dataset.type === "peminjaman") {
      if (confirm("Yakin ingin menghapus peminjaman ini?")) {
        deletePeminjaman(deleteBtn.dataset.id);
        resetFormPeminjaman();
        populateTransaksiSelects();
        renderTabelPeminjaman();
        renderTabelPengembalian();
      }
    }
  });

  tbodyPengembalian?.addEventListener("click", (event) => {
    const editBtn = event.target.closest(".btn-edit");
    const deleteBtn = event.target.closest(".btn-delete");
    if (editBtn && editBtn.dataset.type === "pengembalian") {
      const item = getPengembalianById(editBtn.dataset.id);
      if (item) {
        editPengembalianId = item.id;
        populateTransaksiSelects();
        fillFormPengembalian(item);
      }
      return;
    }
    if (deleteBtn && deleteBtn.dataset.type === "pengembalian") {
      if (confirm("Yakin ingin menghapus pengembalian ini?")) {
        deletePengembalian(deleteBtn.dataset.id);
        resetFormPengembalian();
        populateTransaksiSelects();
        renderTabelPeminjaman();
        renderTabelPengembalian();
      }
    }
  });

  document.getElementById("btnBatalPeminjaman")?.addEventListener("click", () => {
    resetFormPeminjaman();
    populateTransaksiSelects();
  });

  document.getElementById("btnBatalPengembalian")?.addEventListener("click", () => {
    resetFormPengembalian();
    populateTransaksiSelects();
  });

  document.getElementById("formPeminjaman")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      id: document.getElementById("pinjam-id").value.trim() || generateId("TRX-PJM"),
      idAnggota: document.getElementById("pinjam-anggota").value,
      idBuku: document.getElementById("pinjam-buku").value,
      tanggalPeminjaman: document.getElementById("pinjam-tanggal").value,
      tanggalJatuhTempo: document.getElementById("pinjam-jatuh-tempo").value,
      petugas: document.getElementById("pinjam-petugas").value.trim(),
    };

    if (editPeminjamanId) {
      updatePeminjaman(editPeminjamanId, data);
    } else {
      addPeminjaman(data);
    }

    resetFormPeminjaman();
    populateTransaksiSelects();
    renderTabelPeminjaman();
  });

  document.getElementById("formPengembalian")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      id: document.getElementById("kembali-id").value.trim() || generateId("TRX-KBL"),
      idPeminjaman: document.getElementById("kembali-transaksi").value,
      tanggalPengembalian: document.getElementById("kembali-tanggal").value,
      kondisi: document.getElementById("kembali-kondisi").value,
      denda: document.getElementById("kembali-denda").value,
      status: document.getElementById("kembali-status").value,
    };

    if (editPengembalianId) {
      updatePengembalian(editPengembalianId, data);
    } else {
      addPengembalian(data);
    }

    resetFormPengembalian();
    populateTransaksiSelects();
    renderTabelPeminjaman();
    renderTabelPengembalian();
  });
});
