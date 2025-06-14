import { Button } from "../ui/button";

const HeroSection = () => {
    const heroImageUrl = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop";

    return (
        <section
            className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-20 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div> {/* Overlay for readability */}
            <div className="relative container mx-auto text-center z-10 px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-cyan-300 mb-6">
                    InsightAgent
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto">
                    Your AI Research Assistant. Upload documents, images, or videos. Get structured summaries, insights, and answers in seconds.
                </p>
                <div className="">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-lg font-semibold">
                        Try For Free
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
