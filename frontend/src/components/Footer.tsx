import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-8 border-t border-border/40 bg-background">
            <div className="container mx-auto text-center text-foreground/60">
                <p>&copy; {new Date().getFullYear()} InsightAgent. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <Link href="/privacy" className="hover:text-primary transition-colors text-sm">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors text-sm">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
