import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="py-4 px-4 md:px-6 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    InsightAgent
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/features" className="text-foreground/80 hover:text-primary transition-colors">Features</Link>
                    <Link href="/pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</Link>
                    <Button variant="default" size="lg">
                        Sign Up
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
