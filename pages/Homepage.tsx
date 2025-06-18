import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function HomePage() {
    return (
        <div>
        <Navbar />
        <main className="max-w-7xl mx-auto py-4 sm:py-6 px-6 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 p-4 sm:p-8 border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-black text-black mb-2 sm:mb-4">WELCOME TO BRUTESHOP</h1>
            <p className="text-base sm:text-xl font-bold text-black">The most BRUTAL shopping experience online!</p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Sample product cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6"
              >
                <img
                  src={`/hoodie.jpg`}
                  alt="Product"
                  className=" bg-black w-full h-32 sm:h-48 object-cover border-2 border-black mb-3 sm:mb-4"
                />
                <h3 className="text-lg sm:text-xl font-black text-black mb-2">BRUTAL PRODUCT {i}</h3>
                <p className="text-base sm:text-lg font-bold text-black mb-3 sm:mb-4">$99.99</p>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all">
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
  
          {/* Additional sections for better mobile experience */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-lime-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl font-black text-black mb-2 sm:mb-4">FREE SHIPPING</h2>
              <p className="text-sm sm:text-base font-bold text-black">On orders over $50</p>
            </div>
            <div className="bg-pink-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl font-black text-black mb-2 sm:mb-4">24/7 SUPPORT</h2>
              <p className="text-sm sm:text-base font-bold text-black">We are here to help</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
}