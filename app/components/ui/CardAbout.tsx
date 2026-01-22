import { ComponentType } from "react";
import { Sparkles, Lightbulb, Printer } from "lucide-react";

interface Item {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const items: Item[] = [
    {
        icon: Sparkles,
        title: "Generate",
        description: "Click the button to get a random, hand-picked 3D printing idea instantly."
    },
    {
        icon: Lightbulb,
        title: "Discover",
        description: "View key details like print time, materials needed, difficulty, and theme."
    },
    {
        icon: Printer,
        title: "Print",
        description: "Get direct links to STL files and start printing your next masterpiece."
    }
];

export default function CardAbout() {
    return (
        <>
            {items.map((item, index) => (
                <div key={index} className="group flex flex-col items-center text-center p-8 rounded-2xl bg-creme-white dark:bg-light-black shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-light-black/5 dark:hover:border-creme-white/10">
                    <div className="p-4 rounded-full bg-light-black/5 dark:bg-creme-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-8 h-8 text-light-black dark:text-creme-white" />
                    </div>
                    <h4 className="text-xl font-bold text-light-black dark:text-creme-white mb-3">{item.title}</h4>
                    <p className="text-light-black/70 dark:text-creme-white/70 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            ))}
        </>
    );
}