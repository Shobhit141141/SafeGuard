import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * Handles the PATCH request to resolve an incident by toggling its resolved status.
 * @param req - The NextRequest object containing the request data.
 * @param params - An object containing the incident ID as a parameter.
 * @returns A JSON response with the updated incident or an error message if not found.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);
  const incident = await prisma.incident.findUnique({ where: { id } });
  if (!incident)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !incident.resolved },
  });
  return NextResponse.json(updated);
}
