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
                    <a href="edit_buku.html" class="btn btn-warning">Edit</a>
                    <button type="button" class="btn btn-danger">Hapus</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}