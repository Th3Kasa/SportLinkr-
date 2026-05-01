import Header from './Header'
import Footer from './Footer'

/**
 * Shared wrapper for static/utility pages (Privacy, Terms, Request forms).
 * Renders Header (without slider controls), a centred content area, and Footer.
 */
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#06060a] flex flex-col text-[#FAFAFA]">
      <Header hideSlider />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}
