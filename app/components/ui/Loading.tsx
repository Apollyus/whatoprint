import React from "react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 px-6 py-16">
            <div className="flex gap-2">
                <div className="h-4 w-4 animate-bounce rounded-full bg-light-black dark:bg-creme-white [animation-delay:-0.3s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-light-black dark:bg-creme-white [animation-delay:-0.15s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-light-black dark:bg-creme-white"></div>
            </div>
        </div>
    );
}
