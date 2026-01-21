function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not defined`);
    }
    return value;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export function getMongoDbUri(): string {
    return getEnvVar("MONGODB_URI");
}