const anggota = [
    {
        idAnggota: 1,
        nama: "Budi Santoso",
        email: "budi.santoso@mail.com",
        nomorTelepon: "081234567890",
        alamat: "Jl. Merdeka No. 10, Medan",
        tanggalBergabung: "2023-01-15",
        tipeKeanggotaan: "Mahasiswa",
        status: "Aktif"
    },
    {
        idAnggota: 2,
        nama: "Siti Aminah",
        email: "siti.aminah@mail.com",
        nomorTelepon: "081298765432",
        alamat: "Jl. Sudirman No. 25, Medan",
        tanggalBergabung: "2023-03-22",
        tipeKeanggotaan: "Umum",
        status: "Aktif"
    },
    {
        idAnggota: 3,
        nama: "Andi Wijaya",
        email: "andi.wijaya@mail.com",
        nomorTelepon: "081345678901",
        alamat: "Jl. Gatot Subroto No. 5, Medan",
        tanggalBergabung: "2022-11-10",
        tipeKeanggotaan: "Dosen",
        status: "Aktif"
    },
    {
        idAnggota: 4,
        nama: "Dewi Lestari",
        email: "dewi.lestari@mail.com",
        nomorTelepon: "081456789012",
        alamat: "Jl. Diponegoro No. 8, Medan",
        tanggalBergabung: "2024-02-05",
        tipeKeanggotaan: "Mahasiswa",
        status: "Non-Aktif"
    },
    {
        idAnggota: 5,
        nama: "Rian Pratama",
        email: "rian.pratama@mail.com",
        nomorTelepon: "081567890123",
        alamat: "Jl. Ahmad Yani No. 12, Medan",
        tanggalBergabung: "2023-08-30",
        tipeKeanggotaan: "Umum",
        status: "Aktif"
    }
];

function cariAnggota(kataKunci) {
    const kW = kataKunci.toLowerCase();
    return anggota.filter(
        (a) => a.nama.toLowerCase().includes(kW)
    );
}

function cariAnggotaBerdasarkanId(idAnggota) {
    return anggota.find((a) => a.idAnggota === idAnggota);
}