let dataBuku = [
    {
        id: 1,
        judul: "Pemrograman Web",
        pengarang: "Ahmad Fauzi",
        isbn: "978-001",
        kategori: "Teknologi",
        tahunTerbit: 2023,
        stok: 5
    },
    {
        id: 2,
        judul: "Basis Data",
        pengarang: "Siti Rahayu",
        isbn: "978-002",
        kategori: "Teknologi",
        tahunTerbit: 2022,
        stok: 3
    },
    {
        id: 3,
        judul: "Kalkulus Lanjut",
        pengarang: "Budi Utomo",
        isbn: "978-003",
        kategori: "Matematika",
        tahunTerbit: 2021,
        stok: 7
    },
];

let dataAnggota = [
    {
        id: 1,
        nama: "Andi Saputra",
        email: "andi@mail.com",
        noHp: "081234567890",
        alamat: "Jl. Merdeka No. 1",
    },
    {
        id: 2,
        nama: "Rina Dewi",
        email: "rina@mail.com",
        noHp: "085678901234",
        alamat: "Jl. Sudirman No. 2",
    },
    {
        id: 3,
        nama: "Siti Rahayu",
        email: "siti@mail.com",
        noHp: "089012345678",
        alamat: "Jl. Gatot Subroto No. 4",
    },
    {
        id: 4,
        nama: "Dewi Lestari",
        email: "dewi@mail.com",
        noHp: "082345678901",
        alamat: "Jl. Ahmad Yani No. 5",
    },
];

let dataPeminjaman = [
    {
        id: 1,
        idAnggota: 1,
        idBuku: 1,
        tanggalPinjam: "2026-05-01",
        tanggalKembali: null,
        denda: null, 
        status: "Dipinjam"
    },
    {
        id: 2,
        idAnggota: 2,
        idBuku: 3,
        tanggalPinjam: "2026-04-22",
        tanggalKembali: "2026-05-04",
        denda: 5000, 
        status: "Terlambat"
    },
    {
        id: 3,
        idAnggota: 3,
        idBuku: 2,
        tanggalPinjam: "2026-04-20",
        tanggalKembali: "2026-04-26",
        denda: null, 
        status: "Selesai"
    }
];

let dataPengembalian = [
    {
        id: 1,
        idPeminjaman: 2,
        idAnggota: 2,
        idBuku: 3,
        tanggalKembali: "2026-05-04",
        dendaTerbayar: 5000,
        metodePembayaran: "Tunai",
        kondisiBuku: "Baik",
        keterangan: "Terlambat 8 hari dari batas waktu"
    },
    {
        id: 2,
        idPeminjaman: 3,
        idAnggota: 3,
        idBuku: 2,
        tanggalKembali: "2026-04-26",
        dendaTerbayar: null,
        metodePembayaran: null,
        kondisiBuku: "Baik",
        keterangan: "Dikembalikan tepat waktu"
    }
];