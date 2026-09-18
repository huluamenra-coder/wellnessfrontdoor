import { FOR_PROVIDERS_SPOTS, TemplateBoard } from '../components/TemplateBoard';

export function ForProvidersPage() {
  return (
    <TemplateBoard
      src="/brand/pages/for-providers.jpg"
      alt="For wellness professionals: grow your impact and list your business."
      spots={FOR_PROVIDERS_SPOTS}
    />
  );
}
