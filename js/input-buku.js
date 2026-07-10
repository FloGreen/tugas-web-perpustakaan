let editBukuId = null;

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
      <td>${renderActionButtons("buku", item.id)}</td>
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada data buku.");
}

function resetFormBuku() {
  editBukuId = null;
  const form = document.getElementById("formBuku");
  const submitBtn = document.getElementById("btnSubmitBuku");
  form?.reset();
  document.getElementById("stok").value = "1";
  if (submitBtn) submitBtn.textContent = "Simpan Data Buku";
}

function fillFormBuku(item) {
  document.getElementById("judul").value = item.judul;
  document.getElementById("penulis").value = item.penulis;
  document.getElementById("kategori").value = item.kategori;
  document.getElementById("stok").value = item.stok;
  document.getElementById("deskripsi").value = item.deskripsi || "";
  document.getElementById("gambar").value =
    item.gambar && !Object.values(GAMBAR_DEFAULT).includes(item.gambar) ? item.gambar : "";
  document.getElementById("btnSubmitBuku").textContent = "Update Data Buku";
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabelBuku();

  const form = document.getElementById("formBuku");
  const tbody = document.getElementById("hasilBukuBody");
  const btnBatal = document.getElementById("btnBatalBuku");

  setupEditDelete(
    tbody,
    "buku",
    (id) => {
      const item = getBukuById(id);
      if (!item) return;
      editBukuId = id;
      fillFormBuku(item);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    (id) => deleteBuku(id),
    () => {
      resetFormBuku();
      renderTabelBuku();
    }
  );

  btnBatal?.addEventListener("click", resetFormBuku);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      judul: document.getElementById("judul").value.trim(),
      penulis: document.getElementById("penulis").value.trim(),
      kategori: document.getElementById("kategori").value,
      stok: document.getElementById("stok").value,
      deskripsi: document.getElementById("deskripsi").value.trim(),
      gambar: document.getElementById("gambar").value.trim(),
    };

    if (editBukuId) {
      updateBuku(editBukuId, data);
    } else {
      addBuku(data);
    }

    resetFormBuku();
    renderTabelBuku();
  });
});
