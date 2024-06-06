import { NextResponse } from "next/server";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req) {
  const uploadDir = path.join(process.cwd(), "uploads");

  try {
    // Create the uploads directory if it doesn't exist
    await fsPromises.mkdir(uploadDir, { recursive: true });

    const data = await req.formData();
    const file = data.get("file");
    const threadId = data.get("threadId");

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, file.name);
    await fsPromises.writeFile(filePath, buffer);

    // Get all files in the vector store
    const vectorStoreFiles = await openai.beta.vectorStores.files.list(
      "vs_WdA3ZGhDANTYUjcdXzT6U2P9"
    );

    // Delete all old files in the vector store
    const deletePromises = vectorStoreFiles.data.map((file) =>
      openai.beta.vectorStores.files.del("vs_WdA3ZGhDANTYUjcdXzT6U2P9", file.id)
    );
    await Promise.all(deletePromises);

    // Upload new file to OpenAI
    const uploadedFile = await openai.files.create({
      purpose: "assistants",
      file: fs.createReadStream(filePath),
    });

    // Attach file to vector store
    const vectorStoreFile = await openai.beta.vectorStores.files.create(
      "vs_WdA3ZGhDANTYUjcdXzT6U2P9", // vector store ID
      { file_id: uploadedFile.id }
    );

    // Clean up
    await fsPromises.unlink(filePath);

    return new NextResponse(
      JSON.stringify({ fileName: file.name, vectorStoreFile }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
