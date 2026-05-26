// Force static generation so the HTML is pre-rendered at build time
// This ensures the page loads even when the serverless function is in "pending state"
export const dynamic = 'force-static';
export const revalidate = false;

import PageShell from '@/components/PageShell';

export default function Home() {
  return <PageShell />;
}
