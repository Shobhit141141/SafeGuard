import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    const incidentCount = await prisma.incident.count();
    if (incidentCount) {
      await prisma.incident.deleteMany();
    }
  } catch (error) {
    console.warn(
      "Incident model not found or inaccessible, skipping deleteMany for incidents."
    );
  }

  try {
    const cameraCount = await prisma.camera.count();
    if (cameraCount) {
      await prisma.camera.deleteMany();
    }
  } catch (error) {
    console.warn(
      "Camera model not found or inaccessible, skipping deleteMany for cameras."
    );
  }

  try {
    await prisma.camera.createMany({
      data: [
        { name: "Shop Floor A", location: "Main Shop Floor" },
        { name: "Vault", location: "Secure Vault" },
        { name: "Entrance", location: "Front Entrance" },
      ],
    });
  } catch (error) {
    console.warn("Camera table might be missing. Skipping camera creation.");
    return;
  }

  let shopFloor, vault, entrance;
  try {
    [shopFloor, vault, entrance] = await prisma.camera.findMany();
  } catch (error) {
    console.warn("Failed to fetch cameras. Skipping incident creation.");
    return;
  }

  const now = new Date();
  const hoursAgo = (h: number) => {
    const d = new Date(now);
    d.setHours(d.getHours() - h);
    return d;
  };

  const incidents = [
    {
      cameraId: shopFloor.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(23),
      tsEnd: hoursAgo(23),
      thumbnailUrl: "/shop_floor_a.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Face Recognised",
      tsStart: hoursAgo(20),
      tsEnd: hoursAgo(20),
      thumbnailUrl: "/shop_floor_a.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Gun Threat",
      tsStart: hoursAgo(18),
      tsEnd: hoursAgo(18),
      thumbnailUrl: "/shop_floor_a.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(15),
      tsEnd: hoursAgo(15),
      thumbnailUrl: "/shop_floor_a.png",
    },

    {
      cameraId: vault.id,
      type: "Gun Threat",
      tsStart: hoursAgo(21),
      tsEnd: hoursAgo(21),
      thumbnailUrl: "/vault.png",
    },
    {
      cameraId: vault.id,
      type: "Face Recognised",
      tsStart: hoursAgo(17),
      tsEnd: hoursAgo(17),
      thumbnailUrl: "/vault.png",
    },
    {
      cameraId: vault.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(12),
      tsEnd: hoursAgo(12),
      thumbnailUrl: "/vault.png",
    },
    {
      cameraId: vault.id,
      type: "Gun Threat",
      tsStart: hoursAgo(8),
      tsEnd: hoursAgo(8),
      thumbnailUrl: "/vault.png",
    },

    {
      cameraId: entrance.id,
      type: "Face Recognised",
      tsStart: hoursAgo(22),
      tsEnd: hoursAgo(22),
      thumbnailUrl: "/entrance.png",
    },
    {
      cameraId: entrance.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(19),
      tsEnd: hoursAgo(19),
      thumbnailUrl: "/entrance.png",
    },
    {
      cameraId: entrance.id,
      type: "Gun Threat",
      tsStart: hoursAgo(10),
      tsEnd: hoursAgo(10),
      thumbnailUrl: "/entrance.png",
    },
    {
      cameraId: entrance.id,
      type: "Face Recognised",
      tsStart: hoursAgo(2),
      tsEnd: hoursAgo(2),
      thumbnailUrl: "/entrance.png",
    },
  ];

  try {
    for (const incident of incidents) {
      await prisma.incident.create({
        data: { ...incident, resolved: false },
      });
    }
  } catch (error) {
    console.warn(
      "Failed to create incidents. Table might be missing or invalid schema."
    );
  }

  console.log("Seeded cameras and incidents.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
