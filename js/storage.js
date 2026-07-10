const STORAGE_KEYS = {
  buku: "perpus_buku",
  anggota: "perpus_anggota",
  peminjaman: "perpus_peminjaman",
  pengembalian: "perpus_pengembalian",
  seedVersion: "perpus_seed_version",
};

const SEED_VERSION = "3";

const GAMBAR_DEFAULT = {
  Informatika:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
  Ekonomi:
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
  Hukum:
    "https://images.unsplash.com/photo-1473755504818-b72b6dfdc226?auto=format&fit=crop&w=600&q=80",
  Umum:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
};

function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getBuku() {
  return loadData(STORAGE_KEYS.buku);
}

function getAnggota() {
  return loadData(STORAGE_KEYS.anggota);
}

function getPeminjaman() {
  return loadData(STORAGE_KEYS.peminjaman);
}

function getPengembalian() {
  return loadData(STORAGE_KEYS.pengembalian);
}

function getBukuById(id) {
  return getBuku().find((item) => item.id === id);
}

function getAnggotaById(id) {
  return getAnggota().find((item) => item.id === id);
}

function getPeminjamanById(id) {
  return getPeminjaman().find((item) => item.id === id);
}

function getPengembalianById(id) {
  return getPengembalian().find((item) => item.id === id);
}

function generateId(prefix) {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}

function formatTanggal(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isToday(dateStr) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function getLatest(items, limit = 5) {
  return [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function updateStatusPeminjaman() {
  const peminjaman = getPeminjaman();
  const pengembalian = getPengembalian();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const returnedIds = new Set(pengembalian.map((item) => item.idPeminjaman));

  peminjaman.forEach((item) => {
    if (returnedIds.has(item.id)) {
      item.status = "Dikembalikan";
      return;
    }

    const due = new Date(item.tanggalJatuhTempo);
    due.setHours(0, 0, 0, 0);
    item.status = due < today ? "Terlambat" : "Dipinjam";
  });

  saveData(STORAGE_KEYS.peminjaman, peminjaman);
}

function getStatistikHariIni() {
  updateStatusPeminjaman();
  const peminjaman = getPeminjaman();
  const pengembalian = getPengembalian();

  return {
    peminjaman: peminjaman.filter((item) => isToday(item.tanggalPeminjaman)).length,
    pengembalian: pengembalian.filter((item) => isToday(item.tanggalPengembalian)).length,
    terlambat: peminjaman.filter((item) => item.status === "Terlambat").length,
  };
}

function addBuku(data) {
  const buku = getBuku();
  const item = {
    id: data.id || generateId("BK"),
    judul: data.judul,
    penulis: data.penulis,
    kategori: data.kategori,
    stok: Number(data.stok) || 1,
    deskripsi: data.deskripsi || "",
    gambar: data.gambar || GAMBAR_DEFAULT[data.kategori] || GAMBAR_DEFAULT.Umum,
    ketersediaan: Number(data.stok) > 0,
    createdAt: new Date().toISOString(),
  };
  buku.unshift(item);
  saveData(STORAGE_KEYS.buku, buku);
  return item;
}

function updateBuku(id, data) {
  const buku = getBuku();
  const index = buku.findIndex((item) => item.id === id);
  if (index === -1) return null;

  buku[index] = {
    ...buku[index],
    judul: data.judul,
    penulis: data.penulis,
    kategori: data.kategori,
    stok: Number(data.stok) || 0,
    deskripsi: data.deskripsi || "",
    gambar: data.gambar || GAMBAR_DEFAULT[data.kategori] || GAMBAR_DEFAULT.Umum,
    ketersediaan: Number(data.stok) > 0,
  };
  saveData(STORAGE_KEYS.buku, buku);
  return buku[index];
}

function deleteBuku(id) {
  saveData(
    STORAGE_KEYS.buku,
    getBuku().filter((item) => item.id !== id)
  );
}

function addAnggota(data) {
  const anggota = getAnggota();
  const item = {
    id: data.id || generateId("AGT"),
    nama: data.nama,
    nim: data.nim,
    prodi: data.prodi,
    email: data.email,
    telepon: data.telepon,
    alamat: data.alamat || "",
    createdAt: new Date().toISOString(),
  };
  anggota.unshift(item);
  saveData(STORAGE_KEYS.anggota, anggota);
  return item;
}

function updateAnggota(id, data) {
  const anggota = getAnggota();
  const index = anggota.findIndex((item) => item.id === id);
  if (index === -1) return null;

  anggota[index] = {
    ...anggota[index],
    nama: data.nama,
    nim: data.nim,
    prodi: data.prodi,
    email: data.email,
    telepon: data.telepon,
    alamat: data.alamat || "",
  };
  saveData(STORAGE_KEYS.anggota, anggota);

  const peminjaman = getPeminjaman();
  peminjaman.forEach((item) => {
    if (item.idAnggota === id) item.anggota = data.nama;
  });
  saveData(STORAGE_KEYS.peminjaman, peminjaman);

  return anggota[index];
}

function deleteAnggota(id) {
  saveData(
    STORAGE_KEYS.anggota,
    getAnggota().filter((item) => item.id !== id)
  );
}

function addPeminjaman(data) {
  const peminjaman = getPeminjaman();
  const buku = getBukuById(data.idBuku);
  const anggota = getAnggotaById(data.idAnggota);

  const item = {
    id: data.id || generateId("TRX-PJM"),
    idAnggota: data.idAnggota,
    idBuku: data.idBuku,
    anggota: anggota ? anggota.nama : data.anggota,
    buku: buku ? buku.judul : data.buku,
    tanggalPeminjaman: data.tanggalPeminjaman,
    tanggalJatuhTempo: data.tanggalJatuhTempo,
    petugas: data.petugas || "",
    status: "Dipinjam",
    createdAt: new Date().toISOString(),
  };

  peminjaman.unshift(item);
  saveData(STORAGE_KEYS.peminjaman, peminjaman);

  if (buku) {
    buku.stok = Math.max(0, buku.stok - 1);
    buku.ketersediaan = buku.stok > 0;
    saveData(
      STORAGE_KEYS.buku,
      getBuku().map((b) => (b.id === buku.id ? buku : b))
    );
  }

  updateStatusPeminjaman();
  return item;
}

function updatePeminjaman(id, data) {
  const peminjaman = getPeminjaman();
  const index = peminjaman.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const anggota = getAnggotaById(data.idAnggota);
  const buku = getBukuById(data.idBuku);

  peminjaman[index] = {
    ...peminjaman[index],
    idAnggota: data.idAnggota,
    idBuku: data.idBuku,
    anggota: anggota ? anggota.nama : data.anggota,
    buku: buku ? buku.judul : data.buku,
    tanggalPeminjaman: data.tanggalPeminjaman,
    tanggalJatuhTempo: data.tanggalJatuhTempo,
    petugas: data.petugas || "",
  };
  saveData(STORAGE_KEYS.peminjaman, peminjaman);
  updateStatusPeminjaman();
  return peminjaman[index];
}

function deletePeminjaman(id) {
  const item = getPeminjamanById(id);
  if (item && item.status !== "Dikembalikan") {
    const buku = getBukuById(item.idBuku);
    if (buku) {
      buku.stok += 1;
      buku.ketersediaan = true;
      saveData(
        STORAGE_KEYS.buku,
        getBuku().map((b) => (b.id === buku.id ? buku : b))
      );
    }
  }

  saveData(
    STORAGE_KEYS.peminjaman,
    getPeminjaman().filter((p) => p.id !== id)
  );
  saveData(
    STORAGE_KEYS.pengembalian,
    getPengembalian().filter((p) => p.idPeminjaman !== id)
  );
  updateStatusPeminjaman();
}

function addPengembalian(data) {
  const pengembalian = getPengembalian();
  const peminjamanItem = getPeminjamanById(data.idPeminjaman);

  const item = {
    id: data.id || generateId("TRX-KBL"),
    idPeminjaman: data.idPeminjaman,
    tanggalPengembalian: data.tanggalPengembalian,
    kondisi: data.kondisi,
    denda: Number(data.denda) || 0,
    status: data.status,
    createdAt: new Date().toISOString(),
  };

  pengembalian.unshift(item);
  saveData(STORAGE_KEYS.pengembalian, pengembalian);

  if (peminjamanItem) {
    peminjamanItem.status = "Dikembalikan";
    saveData(
      STORAGE_KEYS.peminjaman,
      getPeminjaman().map((p) => (p.id === peminjamanItem.id ? peminjamanItem : p))
    );

    const buku = getBukuById(peminjamanItem.idBuku);
    if (buku) {
      buku.stok += 1;
      buku.ketersediaan = true;
      saveData(
        STORAGE_KEYS.buku,
        getBuku().map((b) => (b.id === buku.id ? buku : b))
      );
    }
  }

  updateStatusPeminjaman();
  return item;
}

function updatePengembalian(id, data) {
  const pengembalian = getPengembalian();
  const index = pengembalian.findIndex((item) => item.id === id);
  if (index === -1) return null;

  pengembalian[index] = {
    ...pengembalian[index],
    idPeminjaman: data.idPeminjaman,
    tanggalPengembalian: data.tanggalPengembalian,
    kondisi: data.kondisi,
    denda: Number(data.denda) || 0,
    status: data.status,
  };
  saveData(STORAGE_KEYS.pengembalian, pengembalian);
  updateStatusPeminjaman();
  return pengembalian[index];
}

function deletePengembalian(id) {
  const item = getPengembalianById(id);
  if (item) {
    const peminjamanItem = getPeminjamanById(item.idPeminjaman);
    if (peminjamanItem) {
      const buku = getBukuById(peminjamanItem.idBuku);
      if (buku && buku.stok > 0) {
        buku.stok = Math.max(0, buku.stok - 1);
        buku.ketersediaan = buku.stok > 0;
        saveData(
          STORAGE_KEYS.buku,
          getBuku().map((b) => (b.id === buku.id ? buku : b))
        );
      }
    }
  }

  saveData(
    STORAGE_KEYS.pengembalian,
    getPengembalian().filter((p) => p.id !== id)
  );
  updateStatusPeminjaman();
}

function seedData() {
  const currentVersion = localStorage.getItem(STORAGE_KEYS.seedVersion);
  if (currentVersion === SEED_VERSION && getBuku().length >= 5) return;

  const today = new Date().toISOString().slice(0, 10);

  const bukuSeed = [
    {
      id: "BK-001",
      judul: "Dasar-Dasar Kecerdasan Buatan",
      penulis: "A. Pratama",
      kategori: "Informatika",
      stok: 4,
      deskripsi: "Pengantar konsep AI, machine learning, dan neural network untuk mahasiswa.",
      gambar: GAMBAR_DEFAULT.Informatika,
      ketersediaan: true,
      createdAt: isoDaysAgo(1),
    },
    {
      id: "BK-002",
      judul: "Metodologi Penelitian Ilmiah",
      penulis: "S. Ramadhan",
      kategori: "Umum",
      stok: 3,
      deskripsi: "Panduan metode penelitian kuantitatif dan kualitatif untuk skripsi.",
      gambar: GAMBAR_DEFAULT.Umum,
      ketersediaan: true,
      createdAt: isoDaysAgo(2),
    },
    {
      id: "BK-003",
      judul: "Manajemen Keuangan Modern",
      penulis: "N. Kencana",
      kategori: "Ekonomi",
      stok: 5,
      deskripsi: "Konsep manajemen keuangan perusahaan dan analisis investasi.",
      gambar: GAMBAR_DEFAULT.Ekonomi,
      ketersediaan: true,
      createdAt: isoDaysAgo(3),
    },
    {
      id: "BK-004",
      judul: "Hukum Perdata Indonesia",
      penulis: "R. Prawira",
      kategori: "Hukum",
      stok: 3,
      deskripsi: "Materi hukum perdata dan praktik peradilan di Indonesia.",
      gambar: GAMBAR_DEFAULT.Hukum,
      ketersediaan: true,
      createdAt: isoDaysAgo(4),
    },
    {
      id: "BK-005",
      judul: "Algoritma dan Pemrograman",
      penulis: "D. Wijaya",
      kategori: "Informatika",
      stok: 6,
      deskripsi: "Dasar algoritma, struktur data, dan pemrograman untuk pemula.",
      gambar: GAMBAR_DEFAULT.Informatika,
      ketersediaan: true,
      createdAt: isoDaysAgo(5),
    },
  ];

  const anggotaSeed = [
    {
      id: "AGT-001",
      nama: "Rina Putri",
      nim: "2201001",
      prodi: "Teknik Informatika",
      email: "rina@kampus.ac.id",
      telepon: "081234567890",
      alamat: "Jl. Merdeka No. 12, Kota Akademik",
      createdAt: isoDaysAgo(1),
    },
    {
      id: "AGT-002",
      nama: "Fikri Maulana",
      nim: "2201002",
      prodi: "Manajemen",
      email: "fikri@kampus.ac.id",
      telepon: "081234567891",
      alamat: "Jl. Pendidikan No. 5, Kota Akademik",
      createdAt: isoDaysAgo(2),
    },
    {
      id: "AGT-003",
      nama: "Salma Azzahra",
      nim: "2201003",
      prodi: "Hukum",
      email: "salma@kampus.ac.id",
      telepon: "081234567892",
      alamat: "Jl. Sudirman No. 8, Kota Akademik",
      createdAt: isoDaysAgo(3),
    },
    {
      id: "AGT-004",
      nama: "Dio Prasetyo",
      nim: "2201004",
      prodi: "Teknik Informatika",
      email: "dio@kampus.ac.id",
      telepon: "081234567893",
      alamat: "Jl. Gatot Subroto No. 3, Kota Akademik",
      createdAt: isoDaysAgo(4),
    },
    {
      id: "AGT-005",
      nama: "Ani Lestari",
      nim: "2201005",
      prodi: "Akuntansi",
      email: "ani@kampus.ac.id",
      telepon: "081234567894",
      alamat: "Jl. Ahmad Yani No. 20, Kota Akademik",
      createdAt: isoDaysAgo(5),
    },
  ];

  const peminjamanSeed = [
    {
      id: "TRX-PJM-001",
      idAnggota: "AGT-001",
      idBuku: "BK-001",
      anggota: "Rina Putri",
      buku: "Dasar-Dasar Kecerdasan Buatan",
      tanggalPeminjaman: today,
      tanggalJatuhTempo: daysFromNow(7),
      petugas: "Admin Perpus",
      status: "Dipinjam",
      createdAt: isoDaysAgo(0),
    },
    {
      id: "TRX-PJM-002",
      idAnggota: "AGT-002",
      idBuku: "BK-002",
      anggota: "Fikri Maulana",
      buku: "Metodologi Penelitian Ilmiah",
      tanggalPeminjaman: today,
      tanggalJatuhTempo: daysFromNow(7),
      petugas: "Admin Perpus",
      status: "Dipinjam",
      createdAt: isoDaysAgo(1),
    },
    {
      id: "TRX-PJM-003",
      idAnggota: "AGT-003",
      idBuku: "BK-003",
      anggota: "Salma Azzahra",
      buku: "Manajemen Keuangan Modern",
      tanggalPeminjaman: daysAgo(10),
      tanggalJatuhTempo: daysAgo(3),
      petugas: "Admin Perpus",
      status: "Terlambat",
      createdAt: isoDaysAgo(2),
    },
    {
      id: "TRX-PJM-004",
      idAnggota: "AGT-004",
      idBuku: "BK-004",
      anggota: "Dio Prasetyo",
      buku: "Hukum Perdata Indonesia",
      tanggalPeminjaman: daysAgo(14),
      tanggalJatuhTempo: daysAgo(7),
      petugas: "Admin Perpus",
      status: "Dikembalikan",
      createdAt: isoDaysAgo(3),
    },
    {
      id: "TRX-PJM-005",
      idAnggota: "AGT-005",
      idBuku: "BK-005",
      anggota: "Ani Lestari",
      buku: "Algoritma dan Pemrograman",
      tanggalPeminjaman: daysAgo(12),
      tanggalJatuhTempo: daysAgo(5),
      petugas: "Admin Perpus",
      status: "Dikembalikan",
      createdAt: isoDaysAgo(4),
    },
    {
      id: "TRX-PJM-006",
      idAnggota: "AGT-001",
      idBuku: "BK-003",
      anggota: "Rina Putri",
      buku: "Manajemen Keuangan Modern",
      tanggalPeminjaman: daysAgo(20),
      tanggalJatuhTempo: daysAgo(13),
      petugas: "Admin Perpus",
      status: "Dikembalikan",
      createdAt: isoDaysAgo(10),
    },
    {
      id: "TRX-PJM-007",
      idAnggota: "AGT-002",
      idBuku: "BK-004",
      anggota: "Fikri Maulana",
      buku: "Hukum Perdata Indonesia",
      tanggalPeminjaman: daysAgo(18),
      tanggalJatuhTempo: daysAgo(11),
      petugas: "Admin Perpus",
      status: "Dikembalikan",
      createdAt: isoDaysAgo(11),
    },
    {
      id: "TRX-PJM-008",
      idAnggota: "AGT-003",
      idBuku: "BK-005",
      anggota: "Salma Azzahra",
      buku: "Algoritma dan Pemrograman",
      tanggalPeminjaman: daysAgo(16),
      tanggalJatuhTempo: daysAgo(9),
      petugas: "Admin Perpus",
      status: "Dikembalikan",
      createdAt: isoDaysAgo(12),
    },
  ];

  const pengembalianSeed = [
    {
      id: "TRX-KBL-001",
      idPeminjaman: "TRX-PJM-004",
      tanggalPengembalian: today,
      kondisi: "Baik",
      denda: 0,
      status: "Tepat Waktu",
      createdAt: isoDaysAgo(0),
    },
    {
      id: "TRX-KBL-002",
      idPeminjaman: "TRX-PJM-005",
      tanggalPengembalian: today,
      kondisi: "Baik",
      denda: 5000,
      status: "Terlambat",
      createdAt: isoDaysAgo(1),
    },
    {
      id: "TRX-KBL-003",
      idPeminjaman: "TRX-PJM-006",
      tanggalPengembalian: daysAgo(13),
      kondisi: "Rusak Ringan",
      denda: 10000,
      status: "Terlambat",
      createdAt: isoDaysAgo(2),
    },
    {
      id: "TRX-KBL-004",
      idPeminjaman: "TRX-PJM-007",
      tanggalPengembalian: daysAgo(11),
      kondisi: "Baik",
      denda: 0,
      status: "Tepat Waktu",
      createdAt: isoDaysAgo(3),
    },
    {
      id: "TRX-KBL-005",
      idPeminjaman: "TRX-PJM-008",
      tanggalPengembalian: daysAgo(9),
      kondisi: "Baik",
      denda: 0,
      status: "Tepat Waktu",
      createdAt: isoDaysAgo(4),
    },
  ];

  saveData(STORAGE_KEYS.buku, bukuSeed);
  saveData(STORAGE_KEYS.anggota, anggotaSeed);
  saveData(STORAGE_KEYS.peminjaman, peminjamanSeed);
  saveData(STORAGE_KEYS.pengembalian, pengembalianSeed);
  localStorage.setItem(STORAGE_KEYS.seedVersion, SEED_VERSION);
}

seedData();
updateStatusPeminjaman();
