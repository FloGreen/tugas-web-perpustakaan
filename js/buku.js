function renderTabelBuku() {
    const tbody = document.getElementById('tabel-buku');
    let html = "";

    dataBuku.forEach((buku, index) => {
        html += `
            <tr>
                <td class="text-center align-middle">${index + 1}</td>
                <td class="align-middle">${buku.judul}</td>
                <td class="text-center align-middle">${buku.pengarang}</td>
                <td class="text-center align-middle">${buku.isbn}</td>
                <td class="text-center align-middle">${buku.kategori}</td>
                <td class="text-center align-middle">${buku.tahunTerbit}</td>
                <td class="text-center align-middle">${buku.stok}</td>
                <td class="text-center align-middle">
                    <button type="button" class="btn btn-warning btn-sm btn-edit" data-id="${buku.id}">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm btn-hapus" data-id="${buku.id}">Hapus</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function tambahBuku() {
    const judul = document.getElementById("judul").value.trim();
    const pengarang = document.getElementById("pengarang").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const kategori = document.getElementById("kategori").value;
    const tahunTerbit = document.getElementById("tahunTerbit").value.trim();
    const stok = parseInt(document.getElementById("stok").value);

    dataBuku.push({
        id: dataBuku.length + 1,
        judul,
        pengarang,
        isbn,
        kategori,
        tahunTerbit,
        stok
    });
    renderTabelBuku();
}

function openEditModal(id) {
    const buku = dataBuku.find(b => b.id === id);
    if (!buku) {
        alert("Data buku tidak ditemukan!");
        return;
    }

    document.getElementById("editId").value = buku.id;
    document.getElementById("editJudul").value = buku.judul;
    document.getElementById("editPengarang").value = buku.pengarang;
    document.getElementById("editIsbn").value = buku.isbn;
    document.getElementById("editKategori").value = buku.kategori;
    document.getElementById("editTahunTerbit").value = buku.tahunTerbit;
    document.getElementById("editStok").value = buku.stok;

    const modal = new bootstrap.Modal(document.getElementById('modalEditBuku'));
    modal.show();
}

function simpanEditBuku() {
    const id = parseInt(document.getElementById("editId").value);
    const judul = document.getElementById("editJudul").value.trim();
    const pengarang = document.getElementById("editPengarang").value.trim();
    const isbn = document.getElementById("editIsbn").value.trim();
    const kategori = document.getElementById("editKategori").value;
    const tahunTerbit = document.getElementById("editTahunTerbit").value.trim();
    const stok = parseInt(document.getElementById("editStok").value);

    if (!judul || !pengarang || !isbn || !kategori || !tahunTerbit || !stok) {
        alert("Semua field harus diisi!");
        return;
    }

    const buku = dataBuku.find(b => b.id === id);
    if (buku) {
        buku.judul = judul;
        buku.pengarang = pengarang;
        buku.isbn = isbn;
        buku.kategori = kategori;
        buku.tahunTerbit = tahunTerbit;
        buku.stok = stok;
    }

    renderTabelBuku();
}

function hapusBuku(id) {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
        dataBuku = dataBuku.filter(b => b.id !== id);
        renderTabelBuku();
    }
}