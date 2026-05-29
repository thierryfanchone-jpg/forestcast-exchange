import { PricingView } from "@/components/PricingView";
import { PUBLIC_PLANS } from "@/lib/pricing";
import {
  isStripeConfigured,
  isPaypalConfigured,
  isCryptoConfigured,
} from "@/lib/env";

export const dynamic = "force-dynamic";

export default function PricingPage() {
  const available = {
    stripe: isStripeConfigured(),
    paypal: isPaypalConfigured(),
    crypto: isCryptoConfigured(),
  };

  return <PricingView plans={PUBLIC_PLANS} available={available} />;
}
