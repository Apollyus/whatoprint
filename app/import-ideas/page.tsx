"use client";

import React, { useState } from "react";
import axios from "axios";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function ImportIdeas() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [errors, setErrors] = useState<any[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage({ type: "error", text: "Please select a file" });
            return;
        }

        setLoading(true);
        setMessage(null);
        setErrors([]);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "/api/v1/import-csv",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${password}`,
                    },
                }
            );

            setMessage({ type: "success", text: response.data.message });
            setFile(null);
            // Reset file input visually if needed, though state is null
            const fileInput = document.getElementById("file") as HTMLInputElement;
            if (fileInput) fileInput.value = "";

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage({ type: "error", text: error.response.data.message || "Something went wrong" });
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            } else {
                setMessage({ type: "error", text: "Something went wrong" });
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full p-3 md:p-4 bg-transparent border-2 border-light-black/20 dark:border-creme-white/20 rounded-[12px] text-light-black dark:text-creme-white placeholder:text-light-black/40 dark:placeholder:text-creme-white/40 focus:outline-none focus:border-light-black dark:focus:border-creme-white transition-colors duration-300";
    const labelClass = "block text-light-black/60 dark:text-creme-white/60 font-medium mb-2";

    return (
        <div className="flex min-h-screen flex-col bg-creme-white dark:bg-light-black transition-colors duration-300">
            <Nav />

            <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl">
                    <h1 className="text-[40px] md:text-[50px] lg:text-[60px] text-light-black dark:text-creme-white leading-tight mb-8">
                        Import Ideas
                    </h1>

                    <div className="mb-8 p-6 bg-light-black/5 dark:bg-creme-white/5 rounded-[20px] border border-light-black/10 dark:border-creme-white/10">
                        <h2 className="text-xl font-semibold text-light-black dark:text-creme-white mb-4">Instructions</h2>
                        <p className="text-light-black/80 dark:text-creme-white/80 mb-4 leading-relaxed">
                            Upload a CSV file to bulk import ideas. The CSV should have the following headers:
                            <br />
                            <code className="bg-light-black/10 dark:bg-creme-white/10 px-2 py-1 rounded text-sm mt-2 block w-fit">
                                name, description, print_time_hours, print_time_minutes, filament_used_meters, difficulty, material, type, theme, multipart, needs_support
                            </code>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* File Input */}
                        <div>
                            <label htmlFor="file" className={labelClass}>CSV File *</label>
                            <input
                                id="file"
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                required
                                className={`${inputClass} !p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-light-black file:text-creme-white dark:file:bg-creme-white dark:file:text-light-black hover:file:opacity-90 cursor-pointer`}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className={labelClass}>API Password *</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your API password"
                                required
                                className={inputClass}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-12 py-4 md:py-5 bg-light-black dark:bg-creme-white text-creme-white dark:text-light-black rounded-[20px] text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-100 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Importing..." : "Import CSV"}
                        </button>
                    </form>

                    {/* Messages */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-[12px] text-lg ${message.type === "success"
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : "bg-red-500/20 text-red-700 dark:text-red-400"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Validation Errors */}
                    {errors.length > 0 && (
                        <div className="mt-6 p-4 bg-red-500/10 rounded-[12px] border border-red-500/20">
                            <h3 className="text-red-700 dark:text-red-400 font-semibold mb-2">Validation Errors:</h3>
                            <ul className="list-disc pl-5 space-y-2 text-red-600 dark:text-red-300 text-sm">
                                {errors.map((err, idx) => (
                                    <li key={idx}>
                                        <span className="font-bold">Row {err.row}:</span> {JSON.stringify(err.error)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
