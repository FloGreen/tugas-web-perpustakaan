function populateDropdownPeminjaman() {
    const select = document.getElementById("idPeminjaman");
    select.innerHTML = '<option value="">Pilih peminjaman...</option>';

    dataPeminjaman
        .filter(p => p.status !== "Selesai")
        .forEach(p => {
            const anggota = dataAnggota.find(a => a.id === p.idAnggota);
            const buku    = dataBuku.find(b => b.id === p.idBuku);
            select.innerHTML += `<option value="${p.id}">${anggota ? anggota.nama : "-"} — ${buku ? buku.judul : "-"}</option>`;
        });
}

function hitungBatasKembali(tanggalPinjam) {
    const tgl = new Date(tanggalPinjam);
    tgl.setDate(tgl.getDate() + 7);
    return tgl.toISOString().split("T")[0];
}

function tampilkanInfoDenda() {
    const idPeminjaman = parseInt(document.getElementById("idPeminjaman").value);
    const tanggalAktual = document.getElementById("tanggalKembaliAktual").value;
    const infoBox = document.getElementById("infoPeminjaman");

    if (!idPeminjaman || !tanggalAktual) {
        infoBox.classList.add("d-none");
        return;
    }

    const p = dataPeminjaman.find(p => p.id === idPeminjaman);
    const anggota = dataAnggota.find(a => a.id === p.idAnggota);
    const buku = dataBuku.find(b => b.id === p.idBuku);
    const batasKembali = hitungBatasKembali(p.tanggalPinjam); // tanggalPinjam + 7
    const denda = hitungDenda(batasKembali, tanggalAktual);

    document.getElementById("infoAnggota").textContent    = anggota ? anggota.nama : "-";
    document.getElementById("infoBuku").textContent       = buku ? buku.judul : "-";
    document.getElementById("infoTglKembali").textContent = batasKembali;
    document.getElementById("infoDenda").textContent      = denda > 0 ? `Rp ${denda.toLocaleString()}` : "Tidak ada denda";

    infoBox.classList.remove("d-none");
}

function renderTabelPengembalian() {
    const tbody = document.getElementById("tabel-pengembalian");
    let html = "";

    dataPengembalian.forEach((k, index) => {
        const p = dataPeminjaman.find(p => p.id === k.idPeminjaman);
        const anggota = p ? dataAnggota.find(a => a.id === p.idAnggota) : null;
        const buku = p ? dataBuku.find(b => b.id === p.idBuku) : null;
        const batasKembali = p ? hitungBatasKembali(p.tanggalPinjam) : "-"; // tanggalPinjam + 7

        const badgeColor = k.status === "Tepat Waktu" ? "success" : "danger";

        html += `
            <tr>
                <td class="text-center align-middle">${index + 1}</td>
                <td class="align-middle">${anggota ? anggota.nama : "-"}</td>
                <td class="align-middle">${buku ? buku.judul : "-"}</td>
                <td class="text-center align-middle">${p ? p.tanggalPinjam : "-"}</td>
                <td class="text-center align-middle">${batasKembali}</td>
                <td class="text-center align-middle">${k.dendaTerbayar > 0 ? `Rp ${k.dendaTerbayar.toLocaleString()}` : "-"}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function tambahPengembalian() {
    const idPeminjaman         = parseInt(document.getElementById("idPeminjaman").value);
    const tanggalKembaliAktual = document.getElementById("tanggalKembaliAktual").value;

    if (!idPeminjaman || !tanggalKembaliAktual) {
        alert("Semua field wajib diisi!");
        return;
    }

    const p = dataPeminjaman.find(p => p.id === idPeminjaman);
    const batasKembali = hitungBatasKembali(p.tanggalPinjam); // tanggalPinjam + 7
    const denda = hitungDenda(batasKembali, tanggalKembaliAktual);
    const status = denda > 0 ? "Terlambat" : "Tepat Waktu";

    p.status = "Selesai";

    const id = dataPengembalian.length > 0 ? Math.max(...dataPengembalian.map(k => k.id)) + 1 : 1;
    dataPengembalian.push({ id, idPeminjaman, tanggalKembaliAktual, denda, status });

    renderTabelPengembalian();
    populateDropdownPeminjaman();
}

function hapusPengembalian(id) {
    dataPengembalian = dataPengembalian.filter(k => k.id !== id);
    renderTabelPengembalian();
}