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
    </tr>`
  );
  renderTableRows(tbody, rows, "Belum ada data anggota.");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabelAnggota();

  const form = document.getElementById("formAnggota");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    addAnggota({
      id: document.getElementById("anggota-id").value.trim(),
      nama: document.getElementById("anggota-nama").value.trim(),
      nim: document.getElementById("anggota-nim").value.trim(),
      prodi: document.getElementById("anggota-prodi").value.trim(),
      email: document.getElementById("anggota-email").value.trim(),
      telepon: document.getElementById("anggota-telepon").value.trim(),
      alamat: document.getElementById("anggota-alamat").value.trim(),
    });

    form.reset();
    renderTabelAnggota();
  });
});
