const STORAGE_KEYS = {
  buku: "perpus_buku",
  anggota: "perpus_anggota",
  peminjaman: "perpus_peminjaman",
  pengembalian: "perpus_pengembalian",
};

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
    const allBuku = getBuku().map((b) => (b.id === buku.id ? buku : b));
    saveData(STORAGE_KEYS.buku, allBuku);
  }

  return item;
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
    const allPeminjaman = getPeminjaman().map((p) =>
      p.id === peminjamanItem.id ? peminjamanItem : p
    );
    saveData(STORAGE_KEYS.peminjaman, allPeminjaman);

    const buku = getBukuById(peminjamanItem.idBuku);
    if (buku) {
      buku.stok += 1;
      buku.ketersediaan = true;
      const allBuku = getBuku().map((b) => (b.id === buku.id ? buku : b));
      saveData(STORAGE_KEYS.buku, allBuku);
    }
  }

  updateStatusPeminjaman();
  return item;
}

function seedData() {
  if (getBuku().length > 0) return;

  const bukuSeed = [
    {
      id: "BK-001",
      judul: "Dasar-Dasar Kecerdasan Buatan",
      penulis: "A. Pratama",
      kategori: "Informatika",
      stok: 5,
      deskripsi: "Pengantar konsep AI, machine learning, dan neural network untuk mahasiswa.",
      gambar: GAMBAR_DEFAULT.Informatika,
      ketersediaan: true,
      createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
    },
    {
      id: "BK-003",
      judul: "Manajemen Keuangan Modern",
      penulis: "N. Kencana",
      kategori: "Ekonomi",
      stok: 4,
      deskripsi: "Konsep manajemen keuangan perusahaan dan analisis investasi.",
      gambar: GAMBAR_DEFAULT.Ekonomi,
      ketersediaan: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "BK-004",
      judul: "Hukum Perdata Indonesia",
      penulis: "R. Prawira",
      kategori: "Hukum",
      stok: 2,
      deskripsi: "Materi hukum perdata dan praktik peradilan di Indonesia.",
      gambar: GAMBAR_DEFAULT.Hukum,
      ketersediaan: true,
      createdAt: new Date().toISOString(),
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
      alamat: "Kota Akademik",
      createdAt: new Date().toISOString(),
    },
    {
      id: "AGT-002",
      nama: "Fikri Maulana",
      nim: "2201002",
      prodi: "Manajemen",
      email: "fikri@kampus.ac.id",
      telepon: "081234567891",
      alamat: "Kota Akademik",
      createdAt: new Date().toISOString(),
    },
  ];

  saveData(STORAGE_KEYS.buku, bukuSeed);
  saveData(STORAGE_KEYS.anggota, anggotaSeed);

  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const peminjamanSeed = [
    {
      id: "TRX-PJM-001",
      idAnggota: "AGT-001",
      idBuku: "BK-001",
      anggota: "Rina Putri",
      buku: "Dasar-Dasar Kecerdasan Buatan",
      tanggalPeminjaman: today,
      tanggalJatuhTempo: nextWeek.toISOString().slice(0, 10),
      petugas: "Admin",
      status: "Dipinjam",
      createdAt: new Date().toISOString(),
    },
  ];

  bukuSeed[0].stok = 4;
  bukuSeed[0].ketersediaan = true;
  saveData(STORAGE_KEYS.buku, bukuSeed);
  saveData(STORAGE_KEYS.peminjaman, peminjamanSeed);
}

seedData();
updateStatusPeminjaman();
