export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Edu Pay</h1>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold text-indigo-600">Edu Pay</span> adalah solusi pembayaran bulanan digital yang dirancang untuk mempermudah pengelolaan keuangan bagi institusi pendidikan, pelajar, dan wali murid.
        Layanan ini membantu pengguna untuk melakukan pembayaran dengan mudah, aman, dan transparan, baik untuk biaya sekolah, kursus, maupun layanan pendidikan lainnya.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Edu Pay?</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Mempermudah pembayaran bulanan tanpa antrian panjang.</li>
        <li>Memberikan laporan transaksi yang transparan dan mudah diakses.</li>
        <li>Dilengkapi dengan fitur pengingat otomatis untuk pembayaran yang jatuh tempo.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Developer</h2>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg">
        <img
          src="/love.jpg"
          alt="Developer"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800">Ahmad Rafi'i</h3>
          <p className="text-gray-600">Full Stack Developer</p>
          <div className="flex space-x-4 mt-2">

          </div>
        </div>
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg mt-2">
        <img
          src="/arfan.jpg"
          alt="Developer"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800">Arfan Restu Rachmadhani</h3>
          <p className="text-gray-600">Front End Developer</p>
          <div className="flex space-x-4 mt-2">
          </div>
        </div>
      </div>
    </div>
  );
}

