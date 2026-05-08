const formBuku = document.getElementById("formBuku");
const formPeminjaman = document.getElementById("formPeminjaman");
const formPengembalian = document.getElementById("formPengembalian");
const formAnggota = document.getElementById("formAnggota");

const hasilBukuBody = document.getElementById("hasilBukuBody");
const hasilPeminjamanBody = document.getElementById("hasilPeminjamanBody");
const hasilPengembalianBody = document.getElementById("hasilPengembalianBody");
const hasilAnggotaBody = document.getElementById("hasilAnggotaBody");

function tambahBaris(tbody, values) {
  const row = document.createElement("tr");
  values.forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value || "-";
    row.appendChild(td);
  });
  tbody.prepend(row);
}

if (formBuku) {
  formBuku.addEventListener("submit", (event) => {
    event.preventDefault();
    const judul = document.getElementById("judul").value.trim();
    const penulis = document.getElementById("penulis").value.trim();
    const kategori = document.getElementById("kategori").value;
    const stok = document.getElementById("stok").value;

    if (!judul || !penulis) return;
    tambahBaris(hasilBukuBody, [judul, penulis, kategori, stok]);
    formBuku.reset();
  });
}

if (formPeminjaman) {
  formPeminjaman.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("pinjam-id").value.trim();
    const tanggal = document.getElementById("pinjam-tanggal").value;
    const anggota = document.getElementById("pinjam-anggota").value.trim();
    const buku = document.getElementById("pinjam-buku").value.trim();
    const jatuhTempo = document.getElementById("pinjam-jatuh-tempo").value;

    if (!id || !anggota || !buku) return;
    tambahBaris(hasilPeminjamanBody, [id, anggota, buku, tanggal, jatuhTempo]);
    formPeminjaman.reset();
  });
}

if (formPengembalian) {
  formPengembalian.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("kembali-id").value.trim();
    const idTransaksi = document.getElementById("kembali-transaksi").value.trim();
    const tanggal = document.getElementById("kembali-tanggal").value;
    const status = document.getElementById("kembali-status").value;
    const denda = document.getElementById("kembali-denda").value || "0";

    if (!id || !idTransaksi) return;
    tambahBaris(hasilPengembalianBody, [id, idTransaksi, tanggal, status, `Rp ${denda}`]);
    formPengembalian.reset();
  });
}

if (formAnggota) {
  formAnggota.addEventListener("submit", (event) => {
    event.preventDefault();
    const idAnggota = document.getElementById("anggota-id").value.trim();
    const nama = document.getElementById("anggota-nama").value.trim();
    const nim = document.getElementById("anggota-nim").value.trim();
    const prodi = document.getElementById("anggota-prodi").value.trim();

    if (!idAnggota || !nama) return;
    tambahBaris(hasilAnggotaBody, [idAnggota, nama, nim, prodi]);
    formAnggota.reset();
  });
}
