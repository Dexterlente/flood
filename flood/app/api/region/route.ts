// app/api/regions/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  // Collect all params dynamically
  const query = new URLSearchParams();
  searchParams.forEach((value, key) => {
    query.append(key, value);
  });
   try {

  const API_URL = process.env.API_URL;
  const response = await axios.get(`${API_URL}/by-region?${query.toString()}`, {
      params: { page },
    });

  return NextResponse.json(response.data);
   } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
