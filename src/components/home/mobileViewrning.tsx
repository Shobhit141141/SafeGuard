function WIPinMobileView() {
  return ( 
    <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex items-center justify-center z-50 md:hidden p-8">
        <div className="absolute z-20 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-yellow-400/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="flex items-center space-x-3 absolute top-6 left-4 z-30">
          <img src="/logo.png" alt="Logo" className=" h-6" />
          <span className="text-xl text-white">MANDLAC<p className="font-bold inline">X</p></span>
        </div>
        <p className="text-center text-lg font-semibold">
          Not Supported in small screens yet, please use a desktop browser.
          <br />
          <span className=" text-yellow-500 italic">
          Responsiveness across all devices is a work in progress...
          </span>
        </p>
      </div>
   );
}

export default WIPinMobileView;