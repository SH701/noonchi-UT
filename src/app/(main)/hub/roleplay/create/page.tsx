"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import RoleplaySection from "@/features/roleplay/components/createchatroom/roleplay/RoleplaySection";
import AiConsentGuard from "@/components/common/AiConsentGuard";
import { Suspense } from "react";

export default function CreateRolePlayPage() {
  return (
    <AiConsentGuard>
      <Suspense fallback={<div>Loading...</div>}>
        <RoleplaySection />
      </Suspense>
    </AiConsentGuard>
  );
}
