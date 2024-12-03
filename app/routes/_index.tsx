import { useState, useEffect } from "react";
import { usePayment } from "../hooks/usePayment";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "EduPay - SMKN 6 Malang - Layanan Pembayaran Sekolah Digital" },
    {
      name: "description",
      content:
        "EduPay adalah platform pembayaran digital resmi untuk SMKN 6 Malang. Mudahkan proses pembayaran SPP, uang kegiatan, dan layanan lainnya dengan transaksi yang aman, cepat, dan efisien.",
    },
  ];
};

export default function Home() {
  const [nisn, setNisn] = useState("");
  const { siswa, message, paymentMonths, handleSubmit, handleMidtransPayment, resetData } = usePayment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalMonths, setAdditionalMonths] = useState(1);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(nisn);
  };

  useEffect(() => {
    setIsModalOpen(!!siswa);
  }, [siswa]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetData();
  };

  const handleAddPayment = (months: number) => {
    const totalPrice = months * 100000;
    const totalTax = 2500 * months;
    const totalAmount = totalPrice + totalTax;
    handleMidtransPayment(nisn, months, totalAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-extrabold text-blue-700">
              EduPay
              <span className="block text-gray-900">Layanan Pembayaran Digital</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              EduPay mempermudah pembayaran sekolah dengan aman dan cepat untuk orang tua dan sekolah.
            </p>
            <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col space-y-4 lg:max-w-sm">
              <input
                type="text"
                id="nisn"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="Masukkan NISN"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
              >
                Cek Pembayaran
              </button>
              {message && <p className="text-sm text-gray-500">{message}</p>}
            </form>
          </div>
          <div className="mt-12 lg:mt-0 lg:ml-16 lg:w-1/2">
            <img
              src="/logo.jpg"
              alt="EduPay Illustration"
              className="mx-auto max-w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 shadow-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Mengapa Memilih EduPay?</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[

              {
                title: "Transaksi Aman",
                description: "Gunakan teknologi enkripsi terkini untuk keamanan Anda.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                ),
              }
              ,
              {
                title: "Proses Cepat",
                description: "Bayar dengan cepat tanpa antri.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Pengingat Otomatis",
                description: "Dapatkan pengingat pembayaran bulanan.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                ),
              },
              {
                title: "Dukungan 24/7",
                description: "Tim kami siap membantu Anda kapan saja.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                ),
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center rounded-lg bg-gray-50 p-6 shadow-md"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <span className="text-blue-600 material-icons">{feature.icon}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-center text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900">Detail Siswa</h2>
            {siswa ? (
              <>

                {paymentMonths.length == 0 ? (
                  <div className="mt-6">
                    <label htmlFor="additionalMonths" className="block text-sm font-medium text-gray-700 mt-5">
                      Tambah Pembayaran Bulan:
                    </label>
                    <input
                      type="number"
                      id="additionalMonths"
                      value={additionalMonths}
                      onChange={(e) => setAdditionalMonths(Number(e.target.value))}
                      min={1}
                      max={12 - paymentMonths.length}
                      className="w-full rounded-md border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-center"
                    />
                    <button
                      onClick={() => handleAddPayment(additionalMonths)}
                      className="mt-4 w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Bayar {additionalMonths} Bulan
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="text-lg text-gray-500">Pembayaran telah selesai untuk semua bulan!</p>
                  </div>
                )}

              </>
            ) : (
              <p className="mt-4 text-gray-700">Tidak ada data siswa yang ditemukan.</p>
            )}

            <button
              onClick={handleModalClose}
              className="mt-6 w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

