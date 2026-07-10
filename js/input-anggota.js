let editAnggotaId = null;

function renderTabelAnggota() {
  const tbody = document.getElementById("hasilAnggotaBody");
  const data = getLatest(getAnggota(), 5);
  const rows = data.map(
    (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.nama}</td>
      <td>${item.nim}</td>
      <td>${item.prodi}</td>
      <td>${renderActionButtons("anggota", item.id)}</td>
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada data anggota.");
}

function resetFormAnggota() {
  editAnggotaId = null;
  document.getElementById("formAnggota")?.reset();
  document.getElementById("btnSubmitAnggota").textContent = "Simpan Anggota Baru";
  document.getElementById("anggota-id").readOnly = false;
}

function fillFormAnggota(item) {
  document.getElementById("anggota-id").value = item.id;
  document.getElementById("anggota-id").readOnly = true;
  document.getElementById("anggota-nama").value = item.nama;
  document.getElementById("anggota-nim").value = item.nim;
  document.getElementById("anggota-prodi").value = item.prodi;
  document.getElementById("anggota-email").value = item.email;
  document.getElementById("anggota-telepon").value = item.telepon;
  document.getElementById("anggota-alamat").value = item.alamat || "";
  document.getElementById("btnSubmitAnggota").textContent = "Update Anggota";
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabelAnggota();

  const form = document.getElementById("formAnggota");
  const tbody = document.getElementById("hasilAnggotaBody");
  const btnBatal = document.getElementById("btnBatalAnggota");

  setupEditDelete(
    tbody,
    "anggota",
    (id) => {
      const item = getAnggotaById(id);
      if (!item) return;
      editAnggotaId = id;
      fillFormAnggota(item);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    (id) => deleteAnggota(id),
    () => {
      resetFormAnggota();
      renderTabelAnggota();
    }
  );

  btnBatal?.addEventListener("click", resetFormAnggota);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      id: document.getElementById("anggota-id").value.trim(),
      nama: document.getElementById("anggota-nama").value.trim(),
      nim: document.getElementById("anggota-nim").value.trim(),
      prodi: document.getElementById("anggota-prodi").value.trim(),
      email: document.getElementById("anggota-email").value.trim(),
      telepon: document.getElementById("anggota-telepon").value.trim(),
      alamat: document.getElementById("anggota-alamat").value.trim(),
    };

    if (editAnggotaId) {
      updateAnggota(editAnggotaId, data);
    } else {
      addAnggota(data);
    }

    resetFormAnggota();
    renderTabelAnggota();
  });
});
