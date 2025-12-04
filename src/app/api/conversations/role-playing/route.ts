import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    const { conversationTopic, details } = body;

    if (!conversationTopic || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/role-playing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationTopic,
          details,
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
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
