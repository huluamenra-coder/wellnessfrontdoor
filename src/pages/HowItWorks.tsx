import { HOW_IT_WORKS_SPOTS, TemplateBoard } from '../components/TemplateBoard';

export function HowItWorksPage() {
  return (
    <TemplateBoard
      src="/brand/pages/how-it-works.jpg"
      alt="How Wellness Front Door works: start with a need, explore, and connect with local providers."
      spots={HOW_IT_WORKS_SPOTS}
    />
  );
}
