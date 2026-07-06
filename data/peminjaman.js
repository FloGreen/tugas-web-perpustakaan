const peminjaman = [
    {
        id: 1,
        idBuku: 1,
        idAnggota: 1,
        tanggalPeminjaman: "2025-06-01",
        tanggalJatuhTempo: "2025-06-15",
        tanggalKembali: "2025-06-14",
        status: "Dikembalikan",
        denda: 0
    },
    {
        id: 2,
        idBuku: 3,
        idAnggota: 2,
        tanggalPeminjaman: "2025-06-20",
        tanggalJatuhTempo: "2025-07-04",
        tanggalKembali: null,
        status: "Dipinjam",
        denda: 0
    },
    {
        id: 3,
        idBuku: 6,
        idAnggota: 3,
        tanggalPeminjaman: "2025-05-10",
        tanggalJatuhTempo: "2025-05-24",
        tanggalKembali: "2025-06-01",
        status: "Dikembalikan",
        denda: 8000
    },
    {
        id: 4,
        idBuku: 11,
        idAnggota: 3,
        tanggalPeminjaman: "2025-06-25",
        tanggalJatuhTempo: "2025-07-09",
        tanggalKembali: null,
        status: "Dipinjam",
        denda: 0
    },
    {
        id: 5,
        idBuku: 8,
        idAnggota: 5,
        tanggalPeminjaman: "2025-06-01",
        tanggalJatuhTempo: "2025-06-15",
        tanggalKembali: null,
        status: "Terlambat",
        denda: 21000
    }
];

function cariPeminjamanAktif() {
    return peminjaman.filter(
        (p) => p.status !== "Dikembalikan"
    );
}

function cariPeminjamanDariAnggota(idAnggota) {
    return peminjaman.filter(
        (p) => p.idAnggota === idAnggota
    );
}

function cariPeminjamanBerdasarkanBuku(idBuku) {
    return peminjaman.filter(
        (p) => p.idBuku === idBuku
    );
}
