export default function About() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Developer main profile */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-8">
          {/* Developer photo */}
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-gray-200 overflow-hidden shadow-lg transform transition-all hover:scale-105 mx-auto sm:mx-0">
            <img
              src="love.jpg"
              alt="Foto Pengembang"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Developer information */}
          <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left">
            <h3 className="text-3xl font-semibold text-gray-900">Ahmad Rafi'i</h3>
            <p className="mt-2 text-lg text-gray-600">Full-Stack Developer</p>
            <p className="mt-4 text-lg text-gray-500">
              Saya adalah pengembang perangkat lunak dengan pengalaman dalam membangun aplikasi web.
              Memiliki keahlian dalam menggunakan teknologi seperti Remix, Node.js,Express Js, Midtrans, Firebase dan Tailwind CSS.
              Saya selalu berusaha untuk menciptakan solusi yang efisien dan user-friendly.
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900">Kontak</h4>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>Email: rafia9005@gmail.com</li>
                <li>GitHub: <a href="https://github.com/rafia9005" className="text-blue-500 hover:underline">github.com/rafia9005</a></li>
                <li>LinkedIn: <a href="https://linkedin.com/in/rafia9005" className="text-blue-500 hover:underline">linkedin.com/in/rafia9005</a></li>
              </ul>
            </div>
          </div>
        </div>


      {/* Additional Developers Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-gray-900">Tim Pengembang</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Developer 1 */}
          <div className="flex flex-col items-center text-center p-6  rounded-lg duration-300">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img src="love.jpg" alt="Developer 1" className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Ahmad Rafi'i</h3>
            <p className="mt-2 text-lg text-gray-500">Full Stack Developer</p>
          </div>

          {/* Developer 2 */}
          <div className="flex flex-col items-center text-center p-6  rounded-lg duration-300">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img src="dev2.jpg" alt="Developer 2" className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Developer 2</h3>
            <p className="mt-2 text-lg text-gray-500">Backend Developer</p>
            <a href="https://github.com/dev2" className="text-blue-500 hover:underline mt-2">GitHub</a>
          </div>

          {/* Developer 3 */}
          <div className="flex flex-col items-center text-center p-6  rounded-lg duration-300">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img src="dev3.jpg" alt="Developer 3" className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Developer 3</h3>
            <p className="mt-2 text-lg text-gray-500">UI/UX Designer</p>
            <a href="https://github.com/dev3" className="text-blue-500 hover:underline mt-2">GitHub</a>
          </div>

          {/* Developer 4 */}
          <div className="flex flex-col items-center text-center p-6  rounded-lg duration-300">              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            <img src="dev4.jpg" alt="Developer 4" className="w-full h-full object-cover" />
          </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Developer 4</h3>
            <p className="mt-2 text-lg text-gray-500">Mobile Developer</p>
            <a href="https://github.com/dev4" className="text-blue-500 hover:underline mt-2">GitHub</a>
          </div>

          {/* Developer 5 */}
          <div className="flex flex-col items-center text-center p-6  rounded-lg duration-300">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img src="dev5.jpg" alt="Developer 5" className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Developer 5</h3>
            <p className="mt-2 text-lg text-gray-500">DevOps Engineer</p>
            <a href="https://github.com/dev5" className="text-blue-500 hover:underline mt-2">GitHub</a>
          </div>
        </div>
      </div>
    </div>
    </div >
  );
}

