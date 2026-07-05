import { Textarea } from "@/components/ui/textarea";
import { authClient } from "#/lib/auth-client";
import { getSession } from "#/lib/auth.function";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      user: session.user,
    };
  },

  component: App,
});

function App() {
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState({
    content: "",
    slideCount: 8,
    style: "minimal",
    tone: "formal",
    layout: "balanced",
  });

  return (
    <main className="min-h-[calc(100dvh-3.5rem)] px-4 pb-12 pt-8 sm:min-h-[calc(100dvh-4rem)] sm:pt-10 md:min-h-[calc(100dvh-5rem)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
            Hello, {session?.user?.name ?? "World"}!
            <span className="mt-1 block sm:mt-0 sm:inline sm:ml-1">
              What do you want to{" "}
              <span className="text-gradient-peach">create?</span>
            </span>
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg">
            Enter your content and we&apos;ll generate a beautiful presentation
          </p>
        </div>

        <div className="glass col-span-full w-full rounded-3xl p-4 sm:p-6 md:p-8">
          <Textarea
            placeholder="Describe your presentation topic, paste your notes, or outline your key points."
            value={form.content}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                content: e.target.value,
              }))
            }
            className="w-full min-h-[200px] rounded-2xl resize-none border border-white/10 bg-background/35 px-4 py-3 text-base leading-7 shadow-none backdrop-blur-sm placeholder:text-muted-foreground focus-visible:border-lime-400/30 focus-visible:ring-lime-400/20 dark:border-white/10 dark:bg-black/20"
          />

          <div className="mt-4 flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span>{form.content.length.toLocaleString()} characters</span>
            <span>Markdown supported</span>
          </div>
        </div>

      </div>
    </main>
  );
}
