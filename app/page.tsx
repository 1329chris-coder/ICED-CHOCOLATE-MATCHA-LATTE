import Navbar from '@/components/Navbar';
import HeroCanvas from '@/components/HeroCanvas';
import TextOverlays from '@/components/TextOverlays';
import ParallaxLeaf from '@/components/ParallaxLeaf';          // ← NEW
import PostSequenceContent from '@/components/PostSequenceContent';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Phase 1: Canvas Sequence (192 frames) with Text Overlays */}
      <div className="relative">
        <HeroCanvas />
        <ParallaxLeaf />        {/* ← PARALLAX DECORATION */}
        <TextOverlays />
      </div>

      {/* Phase 2: Content Sections */}
      <div className="relative bg-warmWhite">
        <PostSequenceContent />
      </div>

      {/* Phase 3: Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="bg-chocolateBrown text-cream py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-2xl md:text-3xl mb-4">
            ICED CHOCOLATE MATCHA LATTE
          </div>
          <div className="font-body text-sm text-cream/60 mb-8">
            Energy Meets Harmony. The Perfect Blend.
          </div>
          <div className="flex justify-center gap-8 font-body text-sm">
            <a href="#" className="hover:text-matchaLight transition-colors">About</a>
            <a href="#" className="hover:text-matchaLight transition-colors">Ingredients</a>
            <a href="#" className="hover:text-matchaLight transition-colors">Contact</a>
            <a href="#" className="hover:text-matchaLight transition-colors">FAQ</a>
          </div>
          <div className="mt-8 text-xs text-cream/40">
            © 2024 Iced Chocolate Matcha Latte. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
