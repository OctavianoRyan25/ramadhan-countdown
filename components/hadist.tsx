"use client";
import React, { useState, useEffect } from "react";
import { RefreshCcw, Loader2, BookOpen } from "lucide-react";

// URL API Hadits Acak (Endpoint yang mengembalikan daftar hadits berhalaman)
const HADITH_API_BASE_URL = "https://hadith-api-go.vercel.app/api/v1/hadis";
// Total halaman Hadits dari API (ditemukan dari response sample: 4419 items / 10 per page = 442 pages)
const TOTAL_HADITH_PAGES = 442;

// --- UTILITY FUNCTIONS FOR ROBUST API FETCHING ---

/**
 * Menunggu (delay) selama waktu yang ditentukan.
 * @param {number} ms - Milidetik untuk menunggu.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Melakukan fetch ke API dengan logika retry (exponential backoff).
 * @param {string} url - URL API yang sudah mengandung parameter halaman.
 * @param {number} maxRetries - Jumlah maksimum percobaan ulang.
 * @returns {Promise<Object>} Data JSON dari respons API.
 */
async function fetchHadithWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} saat memuat halaman.`
        );
      }
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error("Gagal mengambil Hadits setelah semua percobaan:", error);
        throw new Error("Gagal memuat Hadits. Silakan coba lagi nanti.");
      }
      const waitTime = Math.pow(2, i) * 1000;
      await delay(waitTime);
    }
  }
}

// --- HADITH CAROUSEL COMPONENT ---

/**
 * Komponen yang menampilkan Hadits acak (diacak secara client-side) dan memungkinkan pengguna memuat Hadits baru.
 */
// Tipe untuk data Hadits yang digunakan di state
interface HadithData {
  chapterTitle: string;
  bookTitle: string;
  hadithNo: number | string;
  arab: string;
  id: string;
}

export default function HadithCarousel() {
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Mengambil Hadits acak dari keseluruhan koleksi API.
   * Langkah: 1. Pilih halaman acak. 2. Ambil data halaman tersebut. 3. Pilih hadits acak dari array data.
   */
  const loadRandomHadith = async () => {
    setIsLoading(true);
    setError("");
    setHadith(null);
    try {
      // 1. Pilih nomor halaman acak
      const randomPage = Math.floor(Math.random() * TOTAL_HADITH_PAGES) + 1;
      const fetchUrl = `${HADITH_API_BASE_URL}?page=${randomPage}`;

      // 2. Ambil data halaman tersebut
      const result = await fetchHadithWithRetry(fetchUrl);

      // 3. Pilih hadits acak dari array data
      if (result && Array.isArray(result.data) && result.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * result.data.length);
        const selectedHadith = result.data[randomIndex];

        // Restrukturisasi data agar sesuai dengan tampilan komponen
        setHadith({
          chapterTitle: "Hadits Acak (Dikutip dari Jilid Hadits)", // Label baru
          bookTitle: "Kumpulan Hadits - Halaman " + randomPage, // Menampilkan halaman yang dimuat
          hadithNo: selectedHadith.number,
          arab: selectedHadith.arab,
          id: selectedHadith.id,
        });
      } else {
        setError(
          "Data Hadits kosong atau tidak valid dari halaman yang dimuat."
        );
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengambil Hadits.");
    } finally {
      setIsLoading(false);
    }
  };

  // Muat Hadits pertama kali saat komponen dimuat
  useEffect(() => {
    loadRandomHadith();
  }, []);

  // Konten utama yang ditampilkan di dalam kartu
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
          <p className="mt-4 text-gray-600">Memuat Hadits...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-600">
          <p className="font-semibold">Terjadi Kesalahan</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      );
    }

    if (hadith) {
      return (
        <div className="space-y-6">
          {/* Judul Bab dan Sumber */}
          <div className="border-b pb-4 border-green-200">
            <h3 className="text-lg font-semibold text-green-700 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              {hadith.chapterTitle}
            </h3>
            <p className="text-sm text-green-500 mt-1">
              Sumber: <span className="font-medium">{hadith.bookTitle}</span> -
              No. {hadith.hadithNo}
            </p>
          </div>

          {/* Teks Arab (Konteks) */}
          <div className="text-right">
            <p className="text-3xl font-arabic leading-relaxed text-gray-800">
              {hadith.arab || "Teks Arab tidak tersedia"}
            </p>
          </div>

          {/* Terjemahan Indonesia */}
          <div className="pt-4 border-t border-green-200">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Terjemahan Indonesia:
            </h4>
            <p className="mt-2 text-base text-gray-600 italic">
              "{hadith.id || "Terjemahan tidak tersedia"}"
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 mt-8 mb-12">
      <style>{`
        .font-arabic {
          font-family: 'Amiri', serif; /* Memastikan font yang baik untuk Arab */
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Amiri:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Kartu Hadits */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border-4 border-green-100/50">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
          Hadits Pilihan Hari Ini (Acak)
        </h2>

        {renderContent()}

        {/* Tombol Aksi - Selalu ada (kecuali saat loading awal) */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadRandomHadith}
            disabled={isLoading}
            className={`
              flex items-center px-6 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform 
              ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95 hover:shadow-xl"
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Memuat...
              </>
            ) : (
              <>
                <RefreshCcw className="h-5 w-5 mr-2" />
                Muat Hadits Baru
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">
          Data disediakan oleh hadith-api-go.vercel.app
        </p>
      </div>
    </div>
  );
}
