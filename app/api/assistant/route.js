import { AssistantResponse } from "ai";
import OpenAI from "openai";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 30;
// export const dynamic = "force-dynamic";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const ASSISTANT_ID = "asst_b9wNV4NqJTqtSFUnYrAWaMb2";
// Allow streaming responses up to 30 seconds

export async function POST(req) {
  // Parse the request body
  const { message, threadId: clientThreadId } = await req.json();
  console.log("Message: ", message);
  // Create a thread if needed
  let threadId = clientThreadId;

  if (!threadId) {
    const threadI = await openai.beta.threads.create({});
    threadId = threadI.id;
    //save in db
    // await db.thread.create({
    //   data: { threadId },
    // });
  }
  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: message,
    },
    { signal: req.signal }
  );

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(
        threadId,
        {
          assistant_id:
            ASSISTANT_ID ??
            (() => {
              throw new Error("ASSISTANT_ID is not set");
            })(),
        },
        { signal: req.signal }
      );

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);
    }
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get("threadId");

  if (!threadId) {
    return new Response(JSON.stringify({ error: "No threadId provided" }), {
      status: 400,
    });
  }

  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    const formattedMessages = messages.data.map((msg) => ({
      id: msg.id,
      createdAt: new Date(msg.created_at * 1000),
      content: msg.content
        .map((contentPart) => contentPart.text.value)
        .join(" "),
      role: msg.role,
    }));

    return new Response(JSON.stringify({ messages: formattedMessages }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
