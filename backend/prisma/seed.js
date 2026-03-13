require("dotenv").config();
const bcrypt = require("bcrypt");
const prisma = require("../src/db");

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const users = [
    { name: "Demo Admin", email: "admin@demo.com", password, role: "ADMIN" },
    { name: "Demo Editor", email: "editor@demo.com", password, role: "EDITOR" },
    { name: "Alice Editor", email: "alice@demo.com", password, role: "EDITOR" },
    { name: "Bob Editor", email: "bob@demo.com", password, role: "EDITOR" },
    { name: "Demo Viewer", email: "viewer@demo.com", password, role: "VIEWER" },
    {
      name: "Charlie Viewer",
      email: "charlie@demo.com",
      password,
      role: "VIEWER",
    },
    { name: "Dana Viewer", email: "dana@demo.com", password, role: "VIEWER" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  const editor = await prisma.user.findFirst({
    where: { email: "editor@demo.com" },
  });
  const alice = await prisma.user.findFirst({
    where: { email: "alice@demo.com" },
  });
  const bob = await prisma.user.findFirst({ where: { email: "bob@demo.com" } });
  const admin = await prisma.user.findFirst({
    where: { email: "admin@demo.com" },
  });

  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "Dogs",
          content:
            "The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of wolves. Also called the domestic dog, it was selectively bred during the Late Pleistocene by hunter-gatherers. Dogs and the modern gray wolf share a common ancestor.[4] Dogs were the first species to be domesticated over 14,000 years ago, before the development of agriculture, though genetic studies suggest the domestication process may have begun over 25,000 years ago. Due to their long association with humans, dogs have gained the ability to thrive on a starch-rich diet that would be inadequate for other canids.",
          authorId: alice.id,
        },
        {
          title: "California Polytechnic State University, San Luis Obispo",
          content:
            "California Polytechnic State University, San Luis Obispo[7] (Cal Poly)[8] is a public university in San Luis Obispo County, California, United States,[9] outside of the city limits of San Luis Obispo.[10][11] Founded in 1901, it is the oldest of three polytechnic universities within the California State University system.[12] Cal Poly emphasizes a 'learn by doing' philosophy, integrating hands-on, practical experiences into its curriculum.[13] As of fall 2025, Cal Poly had approximately 22,000 undergraduate and 900 graduate students",
          authorId: alice.id,
        },
        {
          title: "1901 Kitchen",
          content:
            "This dining hall has chick fil a, panda express, pom & honey, and other options.",
          authorId: editor.id,
        },
        {
          title: "CSC 321",
          content: "Intro to security has a new topic every week",
          authorId: editor.id,
        },
        {
          title: "Lorem Ipsum",
          content: "Lorem Ipsum Dolor Sit Amet",
          authorId: admin.id,
        },
        {
          title: "Wikipedia",
          content:
            "Initially available only in English, Wikipedia exists in over 340 languages and is one of the world's most visited websites. The English Wikipedia, with over 7 million articles, remains the largest of the editions, which together comprise more than 66 million articles and attract more than 1.5 billion unique device visits and 13 million edits per month (about five edits per second on average) as of April 2024.[W 1] As of December 2025, over 25% of Wikipedia's traffic comes from the United States, while Japan accounts for nearly 7%, and the United Kingdom, Germany, and Russia each represent around 5%.[4]",
          authorId: bob.id,
        },
        {
          title:
            "Abnormally high temperatures to hit San Luis Obispo this week",
          content:
            "A heat wave and advisory was issued in San Luis Obispo County. It will start at 10 a.m. Thursday and end at 8 p.m. Friday. Temperatures of 85 to 95 are expected, 20 to 30 degrees higher than typical temperatures for this time of year, according to the National Weather Service (NWS).",
          authorId: bob.id,
        },
      ],
    });
  }

  console.log("Seeded demo accounts and posts");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
