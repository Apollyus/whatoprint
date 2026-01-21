import { MongoClient } from "mongodb";
import { getMongoDbUri } from "@/app/lib/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const client = new MongoClient(getMongoDbUri());

    try {
        await client.connect();

        const database = client.db("whatoprint_db");

        const collection = database.collection("ideas");
        const allData = await collection.find({}).toArray();

        return NextResponse.json(allData);
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong!" },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
