"use client";

import React, { useState } from "react";
import axios from "axios";
import { ideaSchema, type Idea } from "@/app/lib/schema";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"] as const;
const MATERIAL_OPTIONS = ["PLA", "ABS", "PETG", "Nylon"] as const;

export default function CreateIdea() {
    const [formData, setFormData] = useState<Partial<Idea>>({
        name: "",
        description: "",
        print_time_hours: 0,
        print_time_minutes: 0,
        filament_used_meters: 0,
        labels: {
            "label-1": "Easy",
            "label-2": "PLA",
            "label-3": "",
            "label-4": "",
        },
        multipart: false,
        needs_support: false,
    });
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const updateField = <K extends keyof Idea>(field: K, value: Idea[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateLabel = (field: keyof Idea["labels"], value: string) => {
        setFormData(prev => ({
            ...prev,
            labels: { ...prev.labels!, [field]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setErrors({});

        const parseResult = ideaSchema.safeParse(formData);
        if (!parseResult.success) {
            setErrors(parseResult.error.flatten().fieldErrors as Record<string, string[]>);
            setMessage({ type: "error", text: "Please fix the errors in the form" });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "/api/v1/generate-idea",
                parseResult.data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${password}`,
                    },
                }
            );

            setMessage({ type: "success", text: `Idea "${response.data.idea.name}" was created successfully!` });
            setFormData({
                name: "",
                description: "",
                print_time_hours: 0,
                print_time_minutes: 0,
                filament_used_meters: 0,
                labels: { "label-1": "Easy", "label-2": "PLA", "label-3": "", "label-4": "" },
                multipart: false,
                needs_support: false,
            });
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
                        Create Idea
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Basic info */}
                        <div>
                            <label htmlFor="name" className={labelClass}>Name *</label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="Cable Management Clips"
                                required
                                className={inputClass}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name[0]}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className={labelClass}>Description</label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                placeholder="A brief description of the idea..."
                                rows={3}
                                className={inputClass}
                            />
                        </div>

                        {/* Print time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="print_time_hours" className={labelClass}>Print Time (hours)</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateField("print_time_hours", Math.max(0, (formData.print_time_hours || 0) - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                    >
                                        −
                                    </button>
                                    <input
                                        id="print_time_hours"
                                        type="number"
                                        min={0}
                                        value={formData.print_time_hours}
                                        onChange={(e) => updateField("print_time_hours", parseInt(e.target.value) || 0)}
                                        className={`${inputClass} text-center flex-1`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => updateField("print_time_hours", (formData.print_time_hours || 0) + 1)}
                                        className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="print_time_minutes" className={labelClass}>Print Time (minutes)</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateField("print_time_minutes", Math.max(0, (formData.print_time_minutes || 0) - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                    >
                                        −
                                    </button>
                                    <input
                                        id="print_time_minutes"
                                        type="number"
                                        min={0}
                                        max={59}
                                        value={formData.print_time_minutes}
                                        onChange={(e) => updateField("print_time_minutes", Math.min(59, parseInt(e.target.value) || 0))}
                                        className={`${inputClass} text-center flex-1`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => updateField("print_time_minutes", Math.min(59, (formData.print_time_minutes || 0) + 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filament */}
                        <div>
                            <label htmlFor="filament_used_meters" className={labelClass}>Filament Used (meters)</label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => updateField("filament_used_meters", Math.max(0, (formData.filament_used_meters || 0) - 0.5))}
                                    className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                >
                                    −
                                </button>
                                <input
                                    id="filament_used_meters"
                                    type="number"
                                    min={0}
                                    step={0.1}
                                    value={formData.filament_used_meters}
                                    onChange={(e) => updateField("filament_used_meters", parseFloat(e.target.value) || 0)}
                                    className={`${inputClass} text-center flex-1`}
                                />
                                <button
                                    type="button"
                                    onClick={() => updateField("filament_used_meters", (formData.filament_used_meters || 0) + 0.5)}
                                    className="w-12 h-12 flex items-center justify-center bg-light-black/10 dark:bg-creme-white/10 hover:bg-light-black/20 dark:hover:bg-creme-white/20 text-light-black dark:text-creme-white rounded-[12px] text-2xl font-medium transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="border-t-2 border-light-black/10 dark:border-creme-white/10 pt-6">
                            <h2 className="text-2xl font-semibold text-light-black dark:text-creme-white mb-4">Labels</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="label-1" className={labelClass}>Difficulty *</label>
                                    <select
                                        id="label-1"
                                        value={formData.labels?.["label-1"]}
                                        onChange={(e) => updateLabel("label-1", e.target.value)}
                                        className={inputClass}
                                    >
                                        {DIFFICULTY_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="label-2" className={labelClass}>Material *</label>
                                    <select
                                        id="label-2"
                                        value={formData.labels?.["label-2"]}
                                        onChange={(e) => updateLabel("label-2", e.target.value)}
                                        className={inputClass}
                                    >
                                        {MATERIAL_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="label-3" className={labelClass}>Type *</label>
                                    <input
                                        id="label-3"
                                        type="text"
                                        placeholder="Fun, Useful..."
                                        value={formData.labels?.["label-3"]}
                                        onChange={(e) => updateLabel("label-3", e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors["labels.label-3"] && <p className="text-red-500 text-sm mt-2">{errors["labels.label-3"][0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="label-4" className={labelClass}>Theme *</label>
                                    <input
                                        id="label-4"
                                        type="text"
                                        placeholder="Cable Management, Electronics..."
                                        value={formData.labels?.["label-4"]}
                                        onChange={(e) => updateLabel("label-4", e.target.value)}
                                        className={inputClass}
                                    />
                                    {errors["labels.label-4"] && <p className="text-red-500 text-sm mt-2">{errors["labels.label-4"][0]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer text-light-black dark:text-creme-white">
                                <input
                                    type="checkbox"
                                    checked={formData.multipart}
                                    onChange={(e) => updateField("multipart", e.target.checked)}
                                    className="w-5 h-5 accent-light-black dark:accent-creme-white"
                                />
                                <span>Multipart</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-light-black dark:text-creme-white">
                                <input
                                    type="checkbox"
                                    checked={formData.needs_support}
                                    onChange={(e) => updateField("needs_support", e.target.checked)}
                                    className="w-5 h-5 accent-light-black dark:accent-creme-white"
                                />
                                <span>Needs Support</span>
                            </label>
                        </div>

                        {/* Password */}
                        <div className="border-t-2 border-light-black/10 dark:border-creme-white/10 pt-6">
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
                            {loading ? "Creating..." : "Create Idea"}
                        </button>
                    </form>

                    {message && (
                        <div className={`mt-6 p-4 rounded-[12px] text-lg ${message.type === "success"
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : "bg-red-500/20 text-red-700 dark:text-red-400"
                            }`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}