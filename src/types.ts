export type Args = string[];
export type TemplateTypeAnswer = "default" | "custom";
export type CustomTemplateChoice = "test" | "story" | "hook";
export interface PromptAnswers {
  componentName: string;
  template: TemplateTypeAnswer;
  templateChoices: CustomTemplateChoice[];
}
