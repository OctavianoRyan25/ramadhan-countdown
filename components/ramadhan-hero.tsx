import { Button } from "@/components/ui/button";
import RamadanDecor from "./ramadhan-decor";

export default function RamadanHero() {
  return (
    <div
      className="w-full bg-primary text-primary-foreground relative overflow-hidden" // Tambahkan relative & overflow-hidden
      style={{
        backgroundImage: "url('/mosque-silhouette1.jpg')", // Ganti dengan path gambar siluet Anda
        backgroundSize: "cover", // Atau 'contain', '100% 100%'
        backgroundPosition: "center bottom", // Posisikan di tengah bawah
        backgroundRepeat: "no-repeat", // Agar gambar tidak diulang
      }}
    >
      {/* Opsi: Overlay untuk membuat teks lebih mudah dibaca jika gambar background terlalu ramai */}
      <div className="absolute inset-0 bg-primary/70 z-0"></div>

      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14 relative z-10">
        {" "}
        {/* Tambahkan relative z-10 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-balance text-3xl md:text-5xl font-semibold">
              Hitung Mundur Ramadhan & Idul Fitri
            </h1>
            <p className="mt-3 text-pretty text-sm md:text-base opacity-90">
              Countdown berdasarkan kalender Islam, dan jadwal sholat harian
              untuk lokasi Anda di seluruh Indonesia.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#countdown">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:opacity-90"
                >
                  Lihat Countdown
                </Button>
              </a>
              <a href="#prayer">
                <Button size="lg" variant="secondary">
                  Waktu Sholat Hari Ini
                </Button>
              </a>
            </div>
          </div>
          <div>
            <RamadanDecor />
          </div>
        </div>
      </div>
    </div>
  );
}
