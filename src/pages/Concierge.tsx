import { CONCIERGE_SPOTS, TemplateBoard } from '../components/TemplateBoard';

export function ConciergePage() {
  return (
    <TemplateBoard
      src="/brand/pages/concierge.jpg"
      alt="Your business has a front door. The Intelligent Concierge is the product being built."
      spots={CONCIERGE_SPOTS}
    />
  );
}
