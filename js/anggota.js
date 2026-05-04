function renderTabelAnggota() {
    const tbody = document.getElementById("tabel-anggota");
    let html = "";

    dataAnggota.forEach((anggota, index) => {
        html += `
            <tr>
                <td class="text-center align-middle">${index + 1}</td>
                <td class="align-middle">${anggota.nama}</td>
                <td class="align-middle">${anggota.email}</td>
                <td class="align-middle">${anggota.noHp}</td>
                <td class="align-middle">${anggota.alamat}</td>
                <td class="text-center align-middle">
                    <button class="btn btn-warning btn-sm btn-edit" data-id="${anggota.id}">Edit</button>
                    <button class="btn btn-danger btn-sm btn-hapus" data-id="${anggota.id}">Hapus</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function tambahAnggota() {
    const nama   = document.getElementById("nama").value.trim();
    const email  = document.getElementById("email").value.trim();
    const noHp   = document.getElementById("noHp").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !email || !noHp || !alamat) {
        alert("Semua field wajib diisi!");
        return;
    }

    const id = dataAnggota.length > 0 ? Math.max(...dataAnggota.map(a => a.id)) + 1 : 1;
    dataAnggota.push({ id, nama, email, noHp, alamat });

    renderTabelAnggota();
}

function openEditModal(id) {
    const anggota = dataAnggota.find(a => a.id === id);
    if (!anggota) return;

    document.getElementById("editId").value    = anggota.id;
    document.getElementById("editNama").value  = anggota.nama;
    document.getElementById("editEmail").value = anggota.email;
    document.getElementById("editNoHp").value  = anggota.noHp;
    document.getElementById("editAlamat").value = anggota.alamat;

    const modal = new bootstrap.Modal(document.getElementById("modalEditAnggota"));
    modal.show();
}

function simpanEditAnggota() {
    const id     = parseInt(document.getElementById("editId").value);
    const nama   = document.getElementById("editNama").value.trim();
    const email  = document.getElementById("editEmail").value.trim();
    const noHp   = document.getElementById("editNoHp").value.trim();
    const alamat = document.getElementById("editAlamat").value.trim();

    const idx = dataAnggota.findIndex(a => a.id === id);
    if (idx === -1) return;

    dataAnggota[idx] = { id, nama, email, noHp, alamat };

    renderTabelAnggota();
}

function hapusAnggota(id) {
    dataAnggota = dataAnggota.filter(a => a.id !== id);
    renderTabelAnggota();
}