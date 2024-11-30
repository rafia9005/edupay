import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EduPay - SMKN 6 Malang - Layanan Pembayaran Sekolah Digital</title>
        <meta
          name="description"
          content="EduPay adalah platform pembayaran digital resmi untuk SMKN 6 Malang. Mudahkan proses pembayaran SPP, uang kegiatan, dan layanan lainnya dengan transaksi yang aman, cepat, dan efisien."
        />
        <meta property="og:url" content="https://edu-pay.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EduPay - SMKN 6 Malang - Layanan Pembayaran Sekolah Digital"
        />
        <meta
          property="og:description"
          content="EduPay adalah platform pembayaran digital resmi untuk SMKN 6 Malang. Mudahkan proses pembayaran SPP, uang kegiatan, dan layanan lainnya dengan transaksi yang aman, cepat, dan efisien."
        />
        <meta property="og:image" content="https://edu-pay.vercel.app/logo.jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="1280" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="edu-pay.vercel.app" />
        <meta property="twitter:url" content="https://edu-pay.vercel.app/" />
        <meta
          name="twitter:title"
          content="EduPay - SMKN 6 Malang - Layanan Pembayaran Sekolah Digital"
        />
        <meta
          name="twitter:description"
          content="EduPay adalah platform pembayaran digital resmi untuk SMKN 6 Malang. Mudahkan proses pembayaran SPP, uang kegiatan, dan layanan lainnya dengan transaksi yang aman, cepat, dan efisien."
        />
        <meta name="twitter:image" content="https://edu-pay.vercel.app/logo.jpg" />
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
        <meta name="google-site-verification" content="mQypZDiKjPRkmETJBcDSUx3cRhnFcdQaD616a2sL3Dc" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

