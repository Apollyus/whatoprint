import CardAbout from "./ui/CardAbout";

export default function About() {

    return (
        <section id="about" className="w-full px-6 py-20 bg-light-black/5 dark:bg-creme-white/5">
            <div className="max-w-4xl mx-auto space-y-16">

                <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-light-black dark:text-creme-white">
                        What is WhatoPrint?
                    </h2>
                    <p className="text-lg md:text-xl text-light-black/80 dark:text-creme-white/80 max-w-2xl mx-auto leading-relaxed">
                        We help 3D printing enthusiasts find their next project.
                        No more scrolling through endless repositories for hours.
                        Just click, discover, and start printing.
                    </p>
                </div>

                <div className="h-0.5 w-full bg-light-black/10 dark:bg-creme-white/10" />

                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-light-black dark:text-creme-white mb-2">
                            How It Works
                        </h3>
                        <p className="text-light-black/70 dark:text-creme-white/70">
                            Three simple steps to your next print
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <CardAbout />
                    </div>
                </div>
            </div>
        </section>
    )
}