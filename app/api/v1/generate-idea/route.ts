import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { getEnvVar } from "@/app/lib/env";

function generateSearchUrls(name: string) {
  const query = encodeURIComponent(name);
  return {
    printables: `https://www.printables.com/search/models?q=${query}`,
    makerworld: `https://makerworld.com/en/search/models?keyword=${query}`,
    thingiverse: `https://www.thingiverse.com/search?q=${query}`,
    cults3d: `https://cults3d.com/en/search?q=${query}`,
    yeggi: `https://www.yeggi.com/q/${query}/`,
    google: `https://www.google.com/search?q=${query}+STL+free+download`,
  };
}

export async function GET() {
  const now = new Date().toISOString();

  const client = new MongoClient(getEnvVar("MONGODB_URI"));

  try {
    await client.connect();

    const dbName = getEnvVar("MONGODB_DB_NAME");
    if (!dbName) {
      throw new Error("MONGODB_DB_NAME is not defined");
    }
    const database = client.db(dbName);

    const collection = database.collection("ideas");

    const [selectedIdea] = await collection.aggregate([
      { $sample: { size: 1 } }
    ]).toArray();

    const response = {
      name: "Whatoprint",
      version: "1.0.0",
      description: "Whatoprint API",
      author: "https://vojtechfal.cz",
      payload: {
        ...selectedIdea,
        findSTLs: generateSearchUrls(selectedIdea.name),
      },
      time_created: now,
      time_updated: now,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error: error },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
