import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const threadId = process.env.NEXT_PUBLIC_THREAD_ID || "";
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
      <h1 className="text-4xl font-bold">Welcome to SNR Assistant</h1>
      <p>I am a friendly Bot to assist you with your works.</p>
      <Link href={`/chat?threadId=${threadId}`}>
        <Button>Start Chatting</Button>
      </Link>
    </main>
  );
}
