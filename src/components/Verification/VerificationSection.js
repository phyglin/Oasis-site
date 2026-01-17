import React from "react";
import { ScanFace, CreditCard, Users, Shield } from "lucide-react";
import VerificationMethodCard from "./VerificationMethodCard";

function VerificationSection() {
  const handleSelect = (method) => {
    // Placeholder for actual flow
    console.log("Selected method:", method);
  };

  return (
    <div className="min-h-full bg-white dark:bg-black/20 dark:backdrop-blur-xl">
      <div className="py-8 text-center border-b border-gray-200 dark:border-white/10 mb-8">
        <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
          Get Verified
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto px-4">
          Verify your humanity to unlock voting rights and join the jury pool.
          Choose the method that suits you best.
        </p>
      </div>

      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <VerificationMethodCard
            icon={ScanFace}
            title="Biometric Liveness"
            description="Quick 3D face scan to prove you are a unique human. Privacy-preserving: we only store a cryptographic hash, not your face."
            onSelect={() => handleSelect("biometric")}
            recommended={true}
          />
          <VerificationMethodCard
            icon={CreditCard}
            title="Government ID"
            description="Upload a photo of your passport or driver's license. Standard verification for high-trust roles."
            onSelect={() => handleSelect("gov-id")}
          />
          <VerificationMethodCard
            icon={Users}
            title="Social Vouch"
            description="Get vouched for by 3 existing verified Oasis members who know you in real life. Build your web of trust."
            onSelect={() => handleSelect("social")}
          />
        </div>

        <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-xl p-6 flex gap-4">
          <Shield
            className="text-blue-600 dark:text-blue-400 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
              Your Privacy is Paramount
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200/70 leading-relaxed">
              We use Zero-Knowledge Proofs (ZKP) where possible. This means we
              verify <em>that</em> you are a unique real person without needing
              to know <em>who</em> you are. Your biometric data and ID documents
              are processed securely and are never stored in our main database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationSection;
