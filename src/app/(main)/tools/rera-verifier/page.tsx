import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import RERAVerifier from "@/components/calculators/RERAVerifier";

export const metadata: Metadata = {
  title: "RERA Project Verifier -- Check RERA Registration Status | SquareMind",
  description:
    "Verify RERA registration status of any real estate project in India. Access state-wise RERA portal directory with search tips and a checklist of what to verify before buying.",
};

export default function RERAVerifierPage() {
  return (
    <ToolPageWrapper
      title="RERA Project Verifier"
      description="Verify any real estate project's RERA registration. Access state portal links and know exactly what to check before investing."
    >
      <RERAVerifier />
    </ToolPageWrapper>
  );
}
