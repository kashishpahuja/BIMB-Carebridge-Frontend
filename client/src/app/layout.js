import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import JobDataContext from "./context/JobDataContext";


export const metadata = {
  title: "Bimb Carebridge Ltd. | Job Portal",
  description:
    "Connecting Care, Creating Opportunities in Healthcare & Hospitality Staffing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-lightBg bg-[#fafcf9] text-gray-800 flex flex-col min-h-screen">
        <JobDataContext>

        <Navbar/>

        <main className="">
          {children}
        </main>

        <Footer />

        <BackToTop />
        </JobDataContext>
      </body>
    </html>
  );
}