import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Hello from Next.js 16!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Example validation
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: {
        message: `Hello, ${body.name}!`,
        receivedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
