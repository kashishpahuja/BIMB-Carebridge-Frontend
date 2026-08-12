export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/80 dark:bg-black/90 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-xs space-y-2">
        <p className="font-bold text-[#0B192C] dark:text-white text-sm">BIMB CAREBRIDGE LTD.</p>
        <p>Connecting Care, Creating Opportunities across Ontario, Canada.</p>
        <p className="pt-4 text-gray-400">© {new Date().getFullYear()} Bimb Carebridge Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}