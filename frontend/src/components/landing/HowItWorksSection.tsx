import { LayoutGrid, Search, LayoutDashboard } from "lucide-react"; // Using allowed icons

const steps = [
    {
        icon: <LayoutGrid className="w-10 h-10 text-primary" />, // Representing various inputs
        title: "1. Upload Content",
        description: "Securely upload your documents, images, or video files to our platform.",
    },
    {
        icon: <Search className="w-10 h-10 text-primary" />,
        title: "2. AI Analysis",
        description: "Our advanced AI engine processes and understands your content in-depth.",
    },
    {
        icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
        title: "3. Discover Insights",
        description: "Receive structured summaries, key insights, and answers to your questions.",
    },
];

const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-background/70 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-primary">Simple Steps to Insight</h2>
                <div className="grid md:grid-cols-3 gap-10 relative">
                    {/* Connecting line (decorative) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
                        <svg width="100%" height="2">
                            <line x1="0" y1="1" x2="100%" y2="1" strokeDasharray="5,5" className="stroke-border" strokeWidth="2" />
                        </svg>
                    </div>

                    {steps.map((step, index) => (
                        <div key={step.title} className={`relative bg-card p-8 rounded-xl shadow-2xl text-center transition-all duration-300 hover:shadow-primary/30 hover:-translate-y-2`}>
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 ring-4 ring-primary/20">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                            <p className="text-foreground/70">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
