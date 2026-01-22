import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { getEnvVar } from "@/app/lib/env";
import { ideaSchema, type Idea } from "@/app/lib/schema";
import Papa from "papaparse";

export async function POST(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const expectedPassword = getEnvVar("API_PASSWORD");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Missing or invalid Authorization header" },
            { status: 401 }
        );
    }

    const providedPassword = authHeader.replace("Bearer ", "");
    if (providedPassword !== expectedPassword) {
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 401 }
        );
    }

    let formData;
    try {
        formData = await request.formData();
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to parse form data", error: String(error) },
            { status: 400 }
        );
    }

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return NextResponse.json(
            { message: "No file uploaded or invalid file" },
            { status: 400 }
        );
    }

    const csvText = await file.text();

    const parseResult = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // Automatically convert numbers and booleans
    });

    if (parseResult.errors.length > 0) {
        return NextResponse.json(
            { message: "CSV parsing failed", errors: parseResult.errors },
            { status: 400 }
        );
    }

    const records = parseResult.data as any[];
    const validIdeas: Idea[] = [];
    const errors: any[] = [];

    for (let i = 0; i < records.length; i++) {
        const row = records[i];

        // Transform flat CSV structure to nested Idea structure
        const ideaCandidate = {
            name: row.name,
            description: row.description,
            print_time_hours: row.print_time_hours,
            print_time_minutes: row.print_time_minutes,
            filament_used_meters: row.filament_used_meters,
            labels: {
                "label-1": row.difficulty, // Map difficulty to label-1
                "label-2": row.material,   // Map material to label-2
                "label-3": row.type,       // Map type to label-3
                "label-4": row.theme,      // Map theme to label-4
            },
            multipart: row.multipart,
            needs_support: row.needs_support,
        };

        const validation = ideaSchema.safeParse(ideaCandidate);

        if (validation.success) {
            validIdeas.push(validation.data);
        } else {
            errors.push({
                row: i + 2, // Accounting for header and 0-index
                data: row,
                error: validation.error.flatten().fieldErrors,
            });
        }
    }

    if (validIdeas.length === 0) {
        return NextResponse.json(
            { message: "No valid ideas found to insert", errors },
            { status: 400 }
        );
    }

    const client = new MongoClient(getEnvVar("MONGODB_URI"));

    try {
        await client.connect();

        const dbName = getEnvVar("MONGODB_DB_NAME");
        const database = client.db(dbName);
        const collection = database.collection("ideas");

        const now = new Date().toISOString();
        const documentsToInsert = validIdeas.map((idea) => ({
            ...idea,
            createdAt: now,
            updatedAt: now,
        }));

        const result = await collection.insertMany(documentsToInsert);

        return NextResponse.json(
            {
                message: `Successfully imported ${result.insertedCount} ideas`,
                insertedCount: result.insertedCount,
                errors: errors.length > 0 ? errors : undefined,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Database error", error: String(error) },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
