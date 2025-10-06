import CountdownDisplay from "@/components/countdown-display";
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

      <section className="w-full max-w-6xl px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div id="countdown" className="w-full">
            <CountdownDisplay />
          </div>
          <div id="prayer" className="w-full">
            <PrayerTimesCard />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          Data sumber waktu sholat: waktu-sholat.vercel.app
        </footer>
      </section>
    </main>
  );
}
