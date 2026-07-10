function renderTabelBuku() {
  const tbody = document.getElementById("hasilBukuBody");
  const data = getLatest(getBuku(), 5);
  const rows = data.map(
    (item) => `
    <tr>
      <td>${item.judul}</td>
      <td>${item.penulis}</td>
      <td>${item.kategori}</td>
      <td>${item.stok}</td>
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada data buku.");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabelBuku();

  const form = document.getElementById("formBuku");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    addBuku({
      judul: document.getElementById("judul").value.trim(),
      penulis: document.getElementById("penulis").value.trim(),
      kategori: document.getElementById("kategori").value,
      stok: document.getElementById("stok").value,
      deskripsi: document.getElementById("deskripsi").value.trim(),
      gambar: document.getElementById("gambar").value.trim(),
    });

    form.reset();
    document.getElementById("stok").value = "1";
    renderTabelBuku();
  });
});
