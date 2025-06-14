import { LayoutGrid, Search, LayoutList } from "lucide-react"; // Using allowed icons

const features = [
    {
        icon: <LayoutGrid className="w-12 h-12 text-primary mb-4" />,
        title: "Multimodal Understanding",
        description: "Process diverse file types including documents, images, and videos with ease.",
    },
    {
        icon: <Search className="w-12 h-12 text-primary mb-4" />,
        title: "Instant Insights",
        description: "Leverage AI for rapid, structured summaries and deep analytical insights.",
    },
    {
        icon: <LayoutList className="w-12 h-12 text-primary mb-4" />,
        title: "Intelligent Q&A",
        description: "Ask complex questions about your content and receive precise, context-aware answers.",
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4 text-primary">Why InsightAgent?</h2>
                <p className="text-lg text-center text-foreground/80 mb-16 max-w-2xl mx-auto">
                    Unlock the full potential of your research materials with our cutting-edge AI capabilities.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-card p-8 rounded-xl shadow-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
                            {feature.icon}
                            <h3 className="text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-foreground/70">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
