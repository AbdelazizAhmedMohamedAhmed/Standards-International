import { useEffect } from "react";
import { registerPublicWebTools, type WebModelContext } from "@/lib/webmcp";

export function PublicAgentTools() {
  useEffect(() => {
    const context =
      (document as Document & { modelContext?: WebModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: WebModelContext }).modelContext;
    return registerPublicWebTools(context);
  }, []);
  return null;
}
