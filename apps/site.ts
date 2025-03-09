import { AnthropicProvider, createAnthropic } from "@ai-sdk/anthropic";
import { type App, type AppContext as AC } from "@deco/deco";
import { Agent } from "@mastra/core";
import { Secret } from "apps/website/loaders/secret.ts";
import website, { Props as WebsiteProps } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
type WebsiteApp = ReturnType<typeof website>;

type AnthropicMessagesModelId =
  | "claude-3-7-sonnet-20250219"
  | "claude-3-5-sonnet-latest"
  | "claude-3-5-sonnet-20241022"
  | "claude-3-5-sonnet-20240620"
  | "claude-3-5-haiku-latest"
  | "claude-3-5-haiku-20241022"
  | "claude-3-opus-latest"
  | "claude-3-opus-20240229"
  | "claude-3-sonnet-20240229"
  | "claude-3-haiku-20240307";

export interface Props extends WebsiteProps {
  anthropicApiKey?: Secret;
  model?: AnthropicMessagesModelId;
}
export interface State extends Props {
  anthropicClient: AnthropicProvider;
  agent: Agent;
}
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): App<Manifest, State, [
  WebsiteApp,
]> {
  const anthropicClient = createAnthropic({
    apiKey: state.anthropicApiKey?.get() ?? undefined,
  });
  return {
    state: {
      ...state,
      // Create a Mastra Agent for random number generation - also as a singleton
      agent: new Agent({
        name: "Deco site agent",
        instructions:
          "You are a helpful assistant that helps using tools, you can list if the user wants to.",
        model: anthropicClient(state.model ?? "claude-3-7-sonnet-20250219"),
      }),
      anthropicClient,
    },
    manifest,
    dependencies: [
      website(state),
    ],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
