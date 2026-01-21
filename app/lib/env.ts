export function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        if (name === "NEXT_PUBLIC_API_URL") {
            return "http://localhost:3000";
        } else {
            throw new Error(`${name} is not defined`);
        }
    }
    return value;
}