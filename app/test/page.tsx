import axios from "axios";
import { API_URL } from "../lib/env";

async function getData() {
    const response = await axios.get(`${API_URL}/api/v1/test`);
    return response.data;
}

export default async function Test() {
    const data = await getData();
    console.log(data);
    return (
        <div>
            <h1>Test</h1>
            {data.map((item: any) => (
                <div key={item._id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}