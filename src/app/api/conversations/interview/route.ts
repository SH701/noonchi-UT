import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = auth.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const {
      companyName,
      jobTitle,
      jobPosting,
      interviewStyle,
      files = [],
    } = body;

    if (!companyName || !jobTitle || !interviewStyle || !jobPosting) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/interview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyName,
          jobTitle,
          jobPosting,
          interviewStyle,
          files,
        }),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Backend request failed" },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
