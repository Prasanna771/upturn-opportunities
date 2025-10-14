// We can import components using the '@/' alias, which points to the 'src' folder.
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

// This is a Server Component by default, which is great for static pages.
export default function AboutPage() {
  return (
    <>
      <main className="pt-20"> {/* Adds padding to account for the fixed navbar */}
        
        {/* Page Header */}
        <div className="bg-gray-100 py-16 text-center">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              About Upturn Opportunities
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Connecting Talent with Opportunity
            </p>
          </div>
        </div>

        {/* Your existing "About" content is rendered here */}
        <AboutSection />

      </main>
      
      <Footer />
    </>
  );
}