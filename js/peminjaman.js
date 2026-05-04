function populateDropdown() {
    const selectAnggota = document.getElementById("idAnggota");
    const selectBuku = document.getElementById("idBuku");
    const editSelectAnggota = document.getElementById("editIdAnggota");
    const editSelectBuku = document.getElementById("editIdBuku");

    // Reset dulu
    selectAnggota.innerHTML = '<option value="">Pilih anggota...</option>';
    selectBuku.innerHTML = '<option value="">Pilih buku...</option>';
    editSelectAnggota.innerHTML = '<option value="">Pilih anggota...</option>';
    editSelectBuku.innerHTML = '<option value="">Pilih buku...</option>';

    dataAnggota.forEach(a => {
        const opt = `<option value="${a.id}">${a.nama}</option>`;
        selectAnggota.innerHTML += opt;
        editSelectAnggota.innerHTML += opt;
    });

    dataBuku.forEach(b => {
        const opt = `<option value="${b.id}">${b.judul}</option>`;
        selectBuku.innerHTML += opt;
        editSelectBuku.innerHTML += opt;
    });
}

function renderTabelPeminjaman() {
    const tbody = document.getElementById("tabel-peminjaman");
    let html = "";

    dataPeminjaman.forEach((p, index) => {
        const anggota = dataAnggota.find(a => a.id === p.idAnggota);
        const buku    = dataBuku.find(b => b.id === p.idBuku);

        const badgeColor = p.status === "Dipinjam" ? "warning"
                         : p.status === "Terlambat" ? "danger"
                         : "success";

        html += `
            <tr>
                <td class="text-center align-middle">${index + 1}</td>
                <td class="align-middle">${anggota ? anggota.nama : "-"}</td>
                <td class="align-middle">${buku ? buku.judul : "-"}</td>
                <td class="text-center align-middle">${p.tanggalPinjam}</td>
                <td class="text-center align-middle">${p.tanggalKembali}</td>
                <td class="text-center align-middle">
                    <span class="badge bg-${badgeColor}">${p.status}</span>
                </td>
                <td class="text-center align-middle">
                    <button class="btn btn-warning btn-sm btn-edit" data-id="${p.id}">Edit</button>
                    <button class="btn btn-danger btn-sm btn-hapus" data-id="${p.id}">Hapus</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function tambahPeminjaman() {
    const idAnggota = parseInt(document.getElementById("idAnggota").value);
    const idBuku = parseInt(document.getElementById("idBuku").value);
    const tanggalPinjam  = document.getElementById("tanggalPinjam").value;
    const tanggalKembali = document.getElementById("tanggalKembali").value;

    if (!idAnggota || !idBuku || !tanggalPinjam || !tanggalKembali) {
        alert("Semua field wajib diisi!");
        return;
    }

    const id = dataPeminjaman.length > 0 ? Math.max(...dataPeminjaman.map(p => p.id)) + 1 : 1;
    dataPeminjaman.push({ id, idAnggota, idBuku, tanggalPinjam, tanggalKembali, status: "Dipinjam" });

    renderTabelPeminjaman();
}

function openEditModal(id) {
    const p = dataPeminjaman.find(p => p.id === id);
    if (!p) return;

    populateDropdown();

    document.getElementById("editId").value = p.id;
    document.getElementById("editIdAnggota").value = p.idAnggota;
    document.getElementById("editIdBuku").value = p.idBuku;
    document.getElementById("editTanggalPinjam").value = p.tanggalPinjam;
    document.getElementById("editTanggalKembali").value = p.tanggalKembali;
    document.getElementById("editStatus").value = p.status;

    const modal = new bootstrap.Modal(document.getElementById("modalEditPeminjaman"));
    modal.show();
}

function simpanEditPeminjaman() {
    const id = parseInt(document.getElementById("editId").value);
    const idAnggota = parseInt(document.getElementById("editIdAnggota").value);
    const idBuku = parseInt(document.getElementById("editIdBuku").value);
    const tanggalPinjam = document.getElementById("editTanggalPinjam").value;
    const tanggalKembali = document.getElementById("editTanggalKembali").value;
    const status = document.getElementById("editStatus").value;

    const index = dataPeminjaman.findIndex(p => p.id === id);
    if (index === -1) return;

    dataPeminjaman[index] = { id, idAnggota, idBuku, tanggalPinjam, tanggalKembali, status };

    renderTabelPeminjaman();
}

function hapusPeminjaman(id) {
    dataPeminjaman = dataPeminjaman.filter(p => p.id !== id);
    renderTabelPeminjaman();
}