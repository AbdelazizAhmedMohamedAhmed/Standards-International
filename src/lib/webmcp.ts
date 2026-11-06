import { executePublicAgentTool, publicAgentTools } from "./public-agent-tools";

export type WebModelContext = {
  registerTool: (
    tool: (typeof publicAgentTools)[number] & {
      execute: (input: unknown) => Promise<{ content: { type: "text"; text: string }[] }>;
    },
    options?: { signal: AbortSignal },
  ) => void | Promise<void>;
  unregisterTool?: (name: string) => void;
};

export function registerPublicWebTools(context: WebModelContext | undefined): () => void {
  if (!context) return () => {};
  const controller = new AbortController();
  const registered = new Set<string>();
  for (const definition of publicAgentTools) {
    try {
      const registration = context.registerTool(
        {
          ...definition,
          async execute(input) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(executePublicAgentTool(definition.name, input), null, 2),
                },
              ],
            };
          },
        },
        { signal: controller.signal },
      );
      void Promise.resolve(registration)
        .then(() => {
          if (controller.signal.aborted) {
            try {
              context.unregisterTool?.(definition.name);
            } catch {
              /* Already removed by the abort signal. */
            }
          } else registered.add(definition.name);
        })
        .catch(() => {
          /* Optional browser capability; ordinary browsing must keep working. */
        });
    } catch {
      /* Older or permission-restricted browsers can decline registration. */
    }
  }
  return () => {
    controller.abort();
    for (const name of registered) {
      try {
        context.unregisterTool?.(name);
      } catch {
        /* Already removed by the abort signal. */
      }
    }
  };
}
