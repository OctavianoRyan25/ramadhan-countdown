import CountdownDisplay from "@/components/countdown-display";
import HadithCarousel from "@/components/hadist";
import HeaderNav from "@/components/header-nav";
import PrayerTimesCard from "@/components/prayer-time";
import RamadanHero from "@/components/ramadhan-hero";

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-start gap-8 p-0">
      <HeaderNav />

      <section className="w-full">
        <RamadanHero />
      </section>

      <section className="w-full max-w-6xl px-4 md:px-10 pb-10">
        {/* Konten Utama 2 Kolom (Countdown dan Waktu Sholat) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="countdown" className="w-full">
            <CountdownDisplay />
          </div>
          <div id="prayer" className="w-full">
            <PrayerTimesCard />
          </div>
        </div>

        {/* Konten Tambahan 1 Kolom (Hadits Carousel) */}
        {/* Diletakkan di bawah grid utama agar selalu tampil penuh lebar setelah grid */}
        <div id="hadith" className="w-full mt-6">
          <HadithCarousel />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          Data sumber waktu sholat: waktu-sholat.vercel.app
        </footer>
      </section>
    </main>
  );
}
