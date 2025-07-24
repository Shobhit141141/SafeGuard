import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  const cameras = await prisma.camera.createMany({
    data: [
      { name: "Shop Floor A", location: "Main Shop Floor" },
      { name: "Vault", location: "Secure Vault" },
      { name: "Entrance", location: "Front Entrance" },
    ],
  });

  const [shopFloor, vault, entrance] = await prisma.camera.findMany();

  const now = new Date();
  function hoursAgo(h: number) {
    const d = new Date(now);
    d.setHours(d.getHours() - h);
    return d;
  }

  const incidents = [
    {
      cameraId: shopFloor.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(23),
      tsEnd: hoursAgo(23),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Face Recognised",
      tsStart: hoursAgo(20),
      tsEnd: hoursAgo(20),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Gun Threat",
      tsStart: hoursAgo(18),
      tsEnd: hoursAgo(18),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: shopFloor.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(15),
      tsEnd: hoursAgo(15),
      thumbnailUrl: "/cam_player.png",
    },

    {
      cameraId: vault.id,
      type: "Gun Threat",
      tsStart: hoursAgo(21),
      tsEnd: hoursAgo(21),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: vault.id,
      type: "Face Recognised",
      tsStart: hoursAgo(17),
      tsEnd: hoursAgo(17),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: vault.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(12),
      tsEnd: hoursAgo(12),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: vault.id,
      type: "Gun Threat",
      tsStart: hoursAgo(8),
      tsEnd: hoursAgo(8),
      thumbnailUrl: "/cam_player.png",
    },

    {
      cameraId: entrance.id,
      type: "Face Recognised",
      tsStart: hoursAgo(22),
      tsEnd: hoursAgo(22),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: entrance.id,
      type: "Unauthorised Access",
      tsStart: hoursAgo(19),
      tsEnd: hoursAgo(19),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: entrance.id,
      type: "Gun Threat",
      tsStart: hoursAgo(10),
      tsEnd: hoursAgo(10),
      thumbnailUrl: "/cam_player.png",
    },
    {
      cameraId: entrance.id,
      type: "Face Recognised",
      tsStart: hoursAgo(2),
      tsEnd: hoursAgo(2),
      thumbnailUrl: "/cam_player.png",
    },
  ];

  for (const incident of incidents) {
    await prisma.incident.create({
      data: { ...incident, resolved: false },
    });
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
