// app/api/regions/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Collect all params dynamically
  const query = new URLSearchParams();
  searchParams.forEach((value, key) => {
    query.append(key, value);
  });

  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/by-region?${query.toString()}`);
  const data = await res.json();

  return NextResponse.json(data);
}
