"use client";

import { useEffect, useMemo, useState } from "react";
// Impor komponen Card dan cn jika Anda menggunakannya di proyek Next.js/shadcn Anda
// Karena komponen Card tidak diimpor di file ini, saya akan menggantikannya dengan div yang memiliki styling card.
import { cn } from "@/lib/utils"; // Asumsi Anda memiliki utilitas untuk menggabungkan class Tailwind

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// --- KOMPONEN SVG LENTERA & BINTANG MERIAH (MENGGUNAKAN SVG BARU DARI USER) ---
const FestiveAccent = ({
  className,
  rotation,
  size = "h-16 w-16",
}: {
  className?: string;
  rotation?: string;
  size?: string;
}) => (
  // SVG baru yang lebih detail, disesuaikan agar warna dapat diatur via Tailwind
  <svg
    className={cn(
      "absolute z-0 transition-opacity duration-300",
      size,
      className,
      rotation
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2122 2122"
    fill="currentColor" // Gunakan fill="currentColor" untuk mengatur warna dengan Tailwind
    aria-hidden="true"
  >
    <g>
      {/* Bagian utama Lentera: warna diatur oleh currentColor (text-yellow-500/80) */}
      <path
        d="M1455.691,1509.988v-676.02v-66.563V716.25h66.125V603.977h-1.625
                c1.723-23.457-4.535-78.656-5.453-82.484c-0.848-3.559-1.816-7.086-2.828-10.594c-0.02,0.004-0.035,0.004-0.051,0.004
                c-19.547-66.898-70.203-124.027-133.629-160.246c-68.23-38.938-152.504-43.316-220.422-82.367
                c-46.043-26.465-77.332-67.152-90.828-114.234c22.637-3.168,40.07-22.551,40.07-46.059c0-25.719-20.844-46.566-46.563-46.566
                s-46.566,20.848-46.566,46.566c0,23.508,17.438,42.894,40.074,46.059c-13.496,47.082-44.785,87.773-90.824,114.234
                c-67.926,39.051-152.203,43.43-220.414,82.367c-66.766,38.117-119.449,99.375-136.523,170.836
                c-0.918,3.828-7.172,59.027-5.449,82.484h-1.277V716.25h66.125v51.156v804.566v51.117h-66.125v112.27h43.594
                c-1.566,15.738,4.117,52.781,4.953,55.348c15.504,47.949,63.359,89.051,124.008,114.629
                c61.957,26.125,138.508,29.066,200.207,55.266c51.527,21.879,82.727,58.254,88.395,99.297c0.273-1.957,0.652-3.902,1.043-5.84
                c0.266-1.27,0.535-2.539,0.84-3.801c8.906-37.055,39.055-69.508,86.512-89.656c61.691-26.199,138.246-29.141,200.211-55.266
                c57.625-24.305,103.633-62.633,121.383-107.523c0.02,0,0.027,0.004,0.047,0.004c0.926-2.355,1.805-4.723,2.574-7.109
                c0.832-2.566,6.52-39.609,4.949-55.348h43.594v-112.27h-66.125v-51.117V1509.988z"
        style={{ fill: "currentColor" }}
      />

      {/* Bagian detail lainnya (kita akan membuatnya hitam agar kontras, tetapi Anda bisa menyesuaikannya) */}
      <g
        style={{
          fill: "rgba(0,0,0,0.3)" /* Detail lebih gelap agar menonjol */,
        }}
      >
        <path
          d="M1521.816,716.25V603.977h-1.625H600.785h-1.277V716.25h66.125v906.84h-66.125v112.27h43.594
                    h835.121h43.594v-112.27h-66.125V716.25H1521.816z M1256.309,1623.09H865.016V716.25h391.293V1623.09z"
        />
        <path
          d="M1470.699,1797.816c-12.867-0.832-25.742-1.629-38.633-2.305
                    c-67.266-3.539-136.059-5.41-203.098,0.645c-54.32,4.902-114.793,15.617-146.391,45.199
                    c-34.254,32.066-37.594,74.719-36.355,111.762c1.082,32.547,7.191,65.02,16.332,97.105c-0.77,3.195-1.441,6.41-1.891,9.676
                    c-5.668-41.043-36.867-77.418-88.395-99.297c-61.699-26.199-138.25-29.141-200.207-55.266
                    c-60.648-25.578-108.504-66.68-124.008-114.629c-0.836-2.566-6.52-39.609-4.953-55.348h835.121
                    c1.57,15.738-4.117,52.781-4.949,55.348C1472.504,1793.094,1471.625,1795.461,1470.699,1797.816z"
        />
        {/* Bagian detail lainnya yang perlu diwarnai berbeda, kita jadikan fill hijau tua agar menonjol pada background hijau muda */}
        <rect
          x="1387.945"
          y="603.977"
          style={{ fill: "rgb(4, 120, 87)" }}
          width="133.871"
          height="112.273"
        />
        <rect
          x="599.508"
          y="603.977"
          style={{ fill: "rgb(4, 120, 87)" }}
          width="434.848"
          height="112.273"
        />
        <rect
          x="1387.945"
          y="1623.09"
          style={{ fill: "rgb(4, 120, 87)" }}
          width="133.871"
          height="112.27"
        />
        <rect
          x="599.508"
          y="1623.09"
          style={{ fill: "rgb(4, 120, 87)" }}
          width="434.848"
          height="112.27"
        />
        {/* Detail Jendela, dihilangkan/disederhanakan karena terlalu kompleks, kita ganti dengan warna putih di sini */}
        <polygon
          points="1198.313,867.285 1060.711,766.91 1060.711,766.84 1060.664,766.871 1060.613,766.84 
                    1060.613,766.91 923.016,867.285 923.016,1479.012 1060.613,1572.473 1060.613,1572.535 1060.664,1572.504 1060.711,1572.535 
                    1060.711,1572.473 1198.313,1479.012"
          style={{ fill: "white" }}
        />
      </g>
    </g>
  </svg>
);

// --- KOMPONEN SILUET ISLAMI BAWAH CARD (PERBAIKAN WAVE) ---
const BottomDecoration = ({ className }: { className?: string }) => (
  <svg
    className={cn(
      "absolute bottom-0 left-0 w-full h-12 text-green-700/60 z-0",
      className
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 10"
    fill="currentColor"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Pola Gerbang Islami atau Dekorasi Melengkung yang diperbaiki */}
    <path d="M0 10 L0 5 Q 10 0 25 5 L 50 10 Q 75 5 100 10 L 100 10 Z" />
  </svg>
);
// --- AKHIR KOMPONEN SVG LENTERA & BINTANG MERIAH ---

function getIslamicParts(d: Date) {
  // Using Intl Islamic calendar to derive Hijri month/day numerically
  const fmt = new Intl.DateTimeFormat("en-u-ca-islamic", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = fmt.formatToParts(d);
  const year = Number(parts.find((p) => p.type === "year")?.value || "0");
  const month = Number(parts.find((p) => p.type === "month")?.value || "0");
  const day = Number(parts.find((p) => p.type === "day")?.value || "0");
  return { year, month, day };
}

function findNextGregorianForIslamic(
  targetMonth: number,
  targetDay: number,
  from: Date
) {
  // Scan forward up to ~450 days to find the next date whose Islamic month/day matches.
  // This leverages the browser's Intl Islamic calendar implementation (typically Umm al-Qura).
  const start = new Date(from);
  // Ensure we search starting from tomorrow if we're already past the target time today
  const probe = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  for (let i = 0; i < 450; i++) {
    const check = new Date(probe);
    check.setDate(probe.getDate() + i);
    const { month, day } = getIslamicParts(check);
    if (month === targetMonth && day === targetDay) {
      // Start of that day at 00:00 local
      return new Date(
        check.getFullYear(),
        check.getMonth(),
        check.getDate(),
        0,
        0,
        0,
        0
      );
    }
  }
  return null;
}

function computeTarget(now: Date) {
  const { month: islamicMonth } = getIslamicParts(now);
  // Ramadan = month 9, Eid al-Fitr (1 Shawwal) = month 10 day 1
  if (islamicMonth === 9) {
    // During Ramadan → countdown to 1 Shawwal
    const eid = findNextGregorianForIslamic(10, 1, now);
    return { label: "Hitung Mundur ke Idul Fitri", target: eid };
  } else {
    // Otherwise → countdown to next 1 Ramadan
    const ramadhan = findNextGregorianForIslamic(9, 1, now);
    return { label: "Hitung Mundur ke Ramadhan", target: ramadhan };
  }
}

function diff(now: number, target: number): TimeLeft {
  const ms = Math.max(0, target - now);
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { days, hours, minutes, seconds: secs };
}

export default function CountdownDisplay() {
  const [now, setNow] = useState<Date>(() => new Date());
  // Ubah label ke Bahasa Indonesia
  const { label, target } = useMemo(() => computeTarget(now), [now]);

  const [remaining, setRemaining] = useState<TimeLeft>(() =>
    target
      ? diff(Date.now(), target.getTime())
      : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
      if (target) setRemaining(diff(Date.now(), target.getTime()));
    }, 1000);
    return () => clearInterval(id);
    // target as dependency to recompute when switching between Ramadan/Eid windows
  }, [target]);

  if (!target) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-md relative overflow-hidden">
        <h2 className="text-xl font-semibold text-green-700">Hitung Mundur</h2>
        <p className="mt-2 text-muted-foreground">
          Gagal menghitung tanggal target. Mohon *refresh* halaman.
        </p>
      </div>
    );
  }

  const reached = target.getTime() - now.getTime() <= 0;

  return (
    // Tambahkan 'relative' dan 'overflow-hidden' untuk posisi absolut
    <div className="rounded-xl border bg-green-50 text-card-foreground p-6 shadow-xl relative overflow-hidden">
      {/* --- AKESN LENTERA MERIAH (POJOK ATAS) --- */}
      {/* LENTERA KIRI ATAS 1 (Besar) */}
      <FestiveAccent
        className="top-0 left-1 -translate-x-1/4 -translate-y-1/4 text-yellow-500/80 mt-6"
        size="h-20 w-20"
        rotation="rotate-[-15deg]"
      />
      {/* LENTERA KIRI ATAS 2 (Kecil, Berdekatan) */}
      <FestiveAccent
        className="top-0 left-10 -translate-y-1/4 text-yellow-500/50 mt-6"
        size="h-12 w-12"
        rotation="rotate-[5deg]"
      />

      {/* LENTERA KANAN ATAS 1 (Besar) */}
      <FestiveAccent
        className="top-0 right-1 translate-x-1/4 -translate-y-1/4 text-yellow-500/80 mt-6"
        size="h-20 w-20"
        rotation="rotate-[15deg]"
      />
      {/* LENTERA KANAN ATAS 2 (Kecil, Berdekatan) */}
      <FestiveAccent
        className="top-0 right-10 -translate-y-1/4 text-yellow-500/50 mt-6"
        size="h-12 w-12"
        rotation="rotate-[-5deg]"
      />

      {/* --- AKESN DEKORASI BAWAH CARD --- */}
      {/* Dekorasi bawah diletakkan di bawah konten card (p-6) sehingga hanya bagian bawahnya yang terlihat */}
      <BottomDecoration className="h-10 text-green-700/60 z-0" />

      {/* Konten Utama diletakkan di atas aksen */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-green-800">{label}</h2>
        <p className="mt-1 text-sm text-gray-600 font-medium">
          Tanggal Target:{" "}
          {target.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {reached ? (
          <div className="mt-6 text-2xl font-bold text-green-700">
            Saatnya Tiba! 🎉
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-lg bg-white border border-green-300 p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-extrabold text-green-700">
                {remaining.days}
              </div>
              <div className="text-xs text-gray-500">Hari</div>
            </div>
            <div className="rounded-lg bg-white border border-green-300 p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-extrabold text-green-700">
                {remaining.hours}
              </div>
              <div className="text-xs text-gray-500">Jam</div>
            </div>
            <div className="rounded-lg bg-white border border-green-300 p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-extrabold text-green-700">
                {remaining.minutes}
              </div>
              <div className="text-xs text-gray-500">Menit</div>
            </div>
            <div className="rounded-lg bg-white border border-green-300 p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-extrabold text-green-700">
                {remaining.seconds}
              </div>
              <div className="text-xs text-gray-500">Detik</div>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-black italic">
          *Tanggal dihitung berdasarkan kalender Islam via Intl dan dapat
          bervariasi sesuai penampakan bulan lokal.
        </p>
      </div>
    </div>
  );
}
