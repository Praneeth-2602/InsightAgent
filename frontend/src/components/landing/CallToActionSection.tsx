import { Button } from "../ui/button";

const CallToActionSection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-primary/80 to-sky-500/80 text-primary-foreground">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your Research?</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                    Join InsightAgent today and transform the way you discover knowledge.
                </p>
                <div className="">
                    <Button variant="secondary" size="lg" className="bg-background text-primary hover:bg-slate-100 text-lg px-10 py-7 rounded-lg font-semibold">
                        Sign Up Now
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
