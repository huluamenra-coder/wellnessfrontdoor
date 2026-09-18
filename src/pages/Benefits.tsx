import { BENEFITS_SPOTS, TemplateBoard } from '../components/TemplateBoard';

export function BenefitsPage() {
  return (
    <TemplateBoard
      src="/brand/pages/benefits.jpg"
      alt="Benefits of Wellness Front Door for members and providers."
      spots={BENEFITS_SPOTS}
    />
  );
}
