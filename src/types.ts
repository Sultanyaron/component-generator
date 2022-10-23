export type Args = string[];
export type TemplateTypeAnswer = 'reuseable' | 'withTest' | 'custom';
export type CustomTemplateChoice = 'test' | 'story' | 'types' | 'style';
export interface PromptAnswers {
  componentName: string;
  template: TemplateTypeAnswer;
  customTemplateChoices: CustomTemplateChoice[];
}
