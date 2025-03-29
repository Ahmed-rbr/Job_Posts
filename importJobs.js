import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Read jobs.json
const jobsData = await readFile("./jobs.json", "utf8");
const jobs = JSON.parse(jobsData).jobs;

// Initialize Firebase
const serviceAccount = JSON.parse(
  await readFile("./serviceAccountKey.json", "utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function importJobs() {
  for (const job of jobs) {
    await db.collection("jobs").doc(job.id).set(job);
    console.log(`✅ Imported job ${job.id}: ${job.title}`);
  }
  console.log("🎉 All jobs imported!");
}

importJobs().catch(console.error);
