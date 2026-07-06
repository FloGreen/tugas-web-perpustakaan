const buku = [
    {
        idBuku: 1,
        judul: "Laskar Pelangi",
        penulis: "Andrea Hirata",
        kategori: "Fiksi",
        genre: ["Drama", "Pendidikan"],
        penerbit: "Bentang Pustaka",
        tahunTerbit: 2005,
        isbn: "978-979-1227-79-6",
        halaman: 529,
        stok: 5,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/laskar-pelangi/300/450"
    },
    {
        idBuku: 2,
        judul: "Bumi Manusia",
        penulis: "Pramoedya Ananta Toer",
        kategori: "Fiksi",
        genre: ["Sejarah", "Drama"],
        penerbit: "Hasta Mitra",
        tahunTerbit: 1980,
        isbn: "978-979-9731-23-3",
        halaman: 535,
        stok: 3,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/bumi-manusia/300/450"
    },
    {
        idBuku: 3,
        judul: "Atomic Habits",
        penulis: "James Clear",
        kategori: "Non-Fiksi",
        genre: ["Pengembangan Diri", "Psikologi"],
        penerbit: "Gramedia Pustaka Utama",
        tahunTerbit: 2018,
        isbn: "978-602-06-2622-2",
        halaman: 320,
        stok: 8,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/atomic-habits/300/450"
    },
    {
        idBuku: 4,
        judul: "Filosofi Teras",
        penulis: "Henry Manampiring",
        kategori: "Non-Fiksi",
        genre: ["Filsafat", "Pengembangan Diri"],
        penerbit: "Kompas",
        tahunTerbit: 2018,
        isbn: "978-602-412-616-5",
        halaman: 328,
        stok: 6,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/filosofi-teras/300/450"
    },
    {
        idBuku: 5,
        judul: "Harry Potter and the Philosopher's Stone",
        penulis: "J.K. Rowling",
        kategori: "Fiksi",
        genre: ["Fantasi", "Petualangan"],
        penerbit: "Bloomsbury",
        tahunTerbit: 1997,
        isbn: "978-0-7475-3269-9",
        halaman: 223,
        stok: 4,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/harry-potter-1/300/450"
    },
    {
        idBuku: 6,
        judul: "Sapiens: A Brief History of Humankind",
        penulis: "Yuval Noah Harari",
        kategori: "Non-Fiksi",
        genre: ["Sejarah", "Sains"],
        penerbit: "Harper",
        tahunTerbit: 2011,
        isbn: "978-0-06-231609-7",
        halaman: 443,
        stok: 0,
        ketersediaan: false,
        gambar: "https://picsum.photos/seed/sapiens/300/450"
    },
    {
        idBuku: 7,
        judul: "Clean Code",
        penulis: "Robert C. Martin",
        kategori: "Teknologi",
        genre: ["Pemrograman", "Rekayasa Perangkat Lunak"],
        penerbit: "Prentice Hall",
        tahunTerbit: 2008,
        isbn: "978-0-13-235088-4",
        halaman: 464,
        stok: 2,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/clean-code/300/450"
    },
    {
        idBuku: 8,
        judul: "Negeri 5 Menara",
        penulis: "Ahmad Fuadi",
        kategori: "Fiksi",
        genre: ["Drama", "Pendidikan"],
        penerbit: "Gramedia Pustaka Utama",
        tahunTerbit: 2009,
        isbn: "978-979-22-4861-6",
        halaman: 423,
        stok: 7,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/negeri-5-menara/300/450"
    },
    {
        idBuku: 9,
        judul: "The Psychology of Money",
        penulis: "Morgan Housel",
        kategori: "Non-Fiksi",
        genre: ["Keuangan", "Pengembangan Diri"],
        penerbit: "Harriman House",
        tahunTerbit: 2020,
        isbn: "978-0-85719-568-1",
        halaman: 256,
        stok: 5,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/psychology-of-money/300/450"
    },
    {
        idBuku: 10,
        judul: "Perahu Kertas",
        penulis: "Dee Lestari",
        kategori: "Fiksi",
        genre: ["Romansa", "Drama"],
        penerbit: "Bentang Pustaka",
        tahunTerbit: 2009,
        isbn: "978-979-1227-78-9",
        halaman: 444,
        stok: 3,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/perahu-kertas/300/450"
    },
    {
        idBuku: 11,
        judul: "Introduction to Algorithms",
        penulis: "Thomas H. Cormen",
        kategori: "Teknologi",
        genre: ["Ilmu Komputer", "Algoritma"],
        penerbit: "MIT Press",
        tahunTerbit: 2009,
        isbn: "978-0-262-03384-8",
        halaman: 1312,
        stok: 1,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/clrs/300/450"
    },
    {
        idBuku: 12,
        judul: "Cantik Itu Luka",
        penulis: "Eka Kurniawan",
        kategori: "Fiksi",
        genre: ["Sejarah", "Magis Realisme"],
        penerbit: "AKY Press",
        tahunTerbit: 2002,
        isbn: "978-979-9756-04-4",
        halaman: 470,
        stok: 4,
        ketersediaan: true,
        gambar: "https://picsum.photos/seed/cantik-itu-luka/300/450"
    }
];

const daftarKategori = [...new Set(buku.map((b) => b.kategori))];

function cariBuku(kataKunci) {
    const kW = kataKunci.toLowerCase();
    return buku.filter(
        (b) =>
            b.judul.toLowerCase().includes(kataKunci) || b.penulis.toLowerCase().includes(kataKunci)
    );
}

function filterBerdasarkanKategori(kategori) {
    if (kategori === "Semua") return buku;
    return buku.filter((b) => b.kategori === kategori);
}

function detailBuku(idBuku) {
    return buku.find((b) => b.idBuku === idBuku);
}