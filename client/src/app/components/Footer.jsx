export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">BIMB <span className="text-brand-gold">CAREBRIDGE</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dedicated to connecting healthcare and hospitality organizations with exceptional professionals across Ontario and Canada.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/jobs?sector=Healthcare" className="hover:text-brand-gold">Healthcare Support (RN, PSW)</a></li>
              <li><a href="/jobs?sector=Hospitality" className="hover:text-brand-gold">Hospitality Staffing</a></li>
              <li><a href="/employers" className="hover:text-brand-gold">Facility Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/jobs" className="hover:text-brand-gold">Find Openings</a></li>
              <li><a href="/contact" className="hover:text-brand-gold">Contact Support</a></li>
              <li><a href="/register" className="hover:text-brand-gold">Candidate Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Contact Info</h4>
            <p className="text-sm text-gray-400">Ontario, Canada</p>
            <p className="text-sm text-gray-400 mt-1">Phone: 647-500-3737</p>
            <p className="text-sm text-gray-400 mt-1">Email: office@bimbcarebridge.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Bimb Carebridge Ltd. All rights reserved. Connecting Care, Creating Opportunities.
        </div>
      </div>
    </footer>
  );
}