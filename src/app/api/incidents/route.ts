import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handles the GET request to fetch incidents based on their resolved status.
 * @param req - The NextRequest object containing the request data.
 * @returns A JSON response with the list of incidents or an error message if not found.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get("resolved");
  const where = resolved === null ? {} : { resolved: resolved === "true" };
  const incidents = await prisma.incident.findMany({
    where,
    orderBy: { tsStart: "desc" },
    include: { camera: true },
  });
  return NextResponse.json(incidents);
}
