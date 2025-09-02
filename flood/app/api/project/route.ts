import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const project_code = searchParams.get("project_code");

  try {

    const API_URL = process.env.API_URL;
    const response = await axios.get(`${API_URL}/by-project-code`, {
      params: { project_code },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
