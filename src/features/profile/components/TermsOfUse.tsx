"use client";

import { Header } from "@/components/common";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Section {
  title: string;
  titleEn: string;
  paragraphs?: { ko: string; en: string }[];
  items?: { ko: string; en: string }[];
}

const SECTIONS: Section[] = [
  {
    title: "제 1 조 (목적)",
    titleEn: "Article 1 (Purpose)",
    paragraphs: [
      {
        ko: '본 약관은 Junghun Lee(이하 "회사")는(추후 법인 전환 시 해당 법인명으로 승계, 이하 "회사")가 제공하는 AI 기반 실시간 맥락 코칭 서비스 \'NOONCHI\'(이하 "서비스")의 이용과 관련하여, 회사와 이용자 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.',
        en: 'These Terms of Service (the "Terms") define the rights, obligations, and responsibilities between the developer, Junghun Lee (including any successor corporate entity, hereinafter the "Company"), and the user regarding the use of \'NOONCHI\' (the "Service"), an AI-powered real-time social context coaching platform.',
      },
    ],
  },
  {
    title: "제 2 조 (용어의 정의)",
    titleEn: "Article 2 (Definitions)",
    items: [
      {
        ko: '"서비스"란 단순 언어 학습을 넘어 한국어의 뉘앙스와 사회적 맥락을 AI로 분석하여 롤플레잉, 실시간 코칭, 리포트 등을 제공하는 NOONCHI 앱 및 관련 제반 서비스를 의미합니다.',
        en: '"Service" refers to the NOONCHI application and its features, which analyze linguistic nuances and social contexts to provide AI role-playing, real-time coaching, and reports.',
      },
      {
        ko: '"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.',
        en: '"User" refers to any individual, whether a registered member or a guest, who accesses the Service.',
      },
    ],
  },
  {
    title: "제 3 조 (서비스의 내용)",
    titleEn: "Article 3 (Scope of Services)",
    paragraphs: [
      {
        ko: "회사는 이용자에게 아래와 같은 주요 기능을 제공합니다.",
        en: "The Company provides the following core features:",
      },
    ],
    items: [
      {
        ko: "뉘앙스 맥락 해석 엔진: 대화 상황과 관계에 맞는 의도 판단 및 문화 맞춤 표현 코칭 (Ask 기능)",
        en: "Nuance & Context Engine (Ask): Intent analysis and culturally appropriate expression coaching.",
      },
      {
        ko: "맞춤형 롤플레잉: 사용자의 언어 수준과 관심사에 맞춘 대화 시뮬레이션 및 실시간 피드백",
        en: "Customized Role-playing: Conversational simulations and feedback tailored to proficiency and interests.",
      },
      {
        ko: "분석 리포트: 정량적 수치(자연스러움, 정중함 등)로 제공되는 커뮤니케이션 분석 리포트",
        en: "Analytical Reports: Quantitative analysis of communication metrics (naturalness, politeness, etc.).",
      },
      {
        ko: "Live 1:1 코칭: 전문 코치와의 1:1 상담 연결 기능 (추후 제공 예정)",
        en: "Live 1:1 Coaching: Connection to professional coaches (Upcoming).",
      },
      {
        ko: "기타 회사가 추가 개발하거나 제휴 계약 등을 통해 이용자에게 제공하는 일체의 서비스",
        en: "Any other services developed by the Company or provided through partnership agreements.",
      },
    ],
  },
  {
    title: "제 4 조 (이용계약의 체결 및 계정 관리)",
    titleEn: "Article 4 (Contract & Account Management)",
    items: [
      {
        ko: "이용계약은 이용자가 본 약관 및 개인정보 처리방침에 동의하고 서비스 이용을 시작함과 동시에 성립됩니다.",
        en: "An agreement is formed when the User agrees to these Terms and the Privacy Policy and begins using the Service.",
      },
      {
        ko: "이용자는 서비스 이용을 위해 정확한 정보를 제공해야 하며, 회사는 원활한 학습 데이터 관리를 위해 소셜 로그인(Apple 계정 등)을 통한 계정 생성을 요구할 수 있습니다.",
        en: "The User must provide accurate information; the Company may require social login (e.g., Sign in with Apple) for seamless data management.",
      },
    ],
  },
  {
    title: "제 5 조 (인앱 결제 및 구독형 서비스) - 추후 결제 도입 시 적용",
    titleEn: "Article 5 (Payments & Subscriptions) - Applies upon launch of paid plans",
    items: [
      {
        ko: "현재 서비스의 기본 기능은 무료로 제공되나, 회사는 추후 프리미엄 기능(예: Live 1:1 코칭, 무제한 롤플레잉 등)을 유료 구독 형태(Standard Plan 등)로 전환하거나 추가할 수 있습니다.",
        en: "Core features are currently free, but the Company may later convert or add premium features (e.g., Live 1:1 Coaching, unlimited role-playing) as paid subscriptions (e.g., Standard Plan).",
      },
      {
        ko: "앱 내에서 제공되는 모든 결제 및 정기 구독 서비스는 Apple App Store의 결제 시스템(In-App Purchase)을 통해 이루어집니다.",
        en: "All in-app transactions and subscriptions are processed through the Apple App Store IAP system.",
      },
      {
        ko: "구독 갱신 및 해지: 정기 구독의 경우, 현재 구독 기간이 끝나기 최소 24시간 전에 자동 갱신을 해지하지 않으면 동일한 금액으로 자동 갱신됩니다. 구독 관리는 이용자의 Apple 기기 내 '계정 설정'에서 직접 진행해야 합니다.",
        en: "Subscriptions automatically renew at the same price unless canceled at least 24 hours before the period ends. Subscriptions must be managed directly via 'Account Settings' on the User's Apple device.",
      },
      {
        ko: "환불 등 결제와 관련된 규정은 Apple App Store의 정책을 우선적으로 따릅니다.",
        en: "Refunds and other payment-related rules follow Apple App Store policies.",
      },
    ],
  },
  {
    title: "제 6 조 (AI 학습 및 콘텐츠의 활용)",
    titleEn: "Article 6 (AI Training & Data Usage)",
    items: [
      {
        ko: "회사는 이용자가 서비스(롤플레잉, Ask 기능 등)에 입력한 텍스트 및 음성 데이터를 AI 모델의 품질 향상 및 서비스 개선을 위한 연구 목적으로 분석 및 활용할 수 있습니다.",
        en: "The Company may analyze user-input text and voice data (from role-playing, Ask, etc.) for R&D and service improvement.",
      },
      {
        ko: "단, 회사는 이 과정에서 개인을 특정할 수 있는 민감한 정보는 철저히 비식별화(익명화)하여 처리합니다.",
        en: "All data used is strictly de-identified (anonymized) to protect user privacy.",
      },
    ],
  },
  {
    title: "제 7 조 (면책 조항)",
    titleEn: "Article 7 (Limitation of Liability)",
    items: [
      {
        ko: "본 서비스는 커뮤니케이션 향상을 돕는 보조 도구(코칭 솔루션)이며, 회사는 AI가 제안한 답변이나 뉘앙스 분석 결과가 실제 비즈니스, 채용, 협상 등에서 특정 결과(예: 계약 성사, 합격 등)를 반드시 보장한다고 약정하지 않습니다.",
        en: "The Service is a supportive coaching tool; the Company does not guarantee specific real-world outcomes (e.g., contracts, employment) based on the AI's suggestions or nuance analysis.",
      },
      {
        ko: "회사는 천재지변, 서버 장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.",
        en: "The Company is exempt from liability when the Service cannot be provided due to force majeure such as natural disasters or server failures.",
      },
    ],
  },
  {
    title: "제 8 조 (준거법 및 재판관할)",
    titleEn: "Article 8 (Governing Law & Jurisdiction)",
    paragraphs: [
      {
        ko: "본 약관의 해석 및 분쟁에 대해서는 대한민국 법령을 적용하며, 관할 법원은 민사소송법에 따릅니다.",
        en: "These Terms shall be governed by the laws of the Republic of Korea, and jurisdiction shall follow the Korean Civil Procedure Act.",
      },
    ],
  },
];

export default function TermsOfUse() {
  const router = useRouter();

  return (
    <div className="-mx-5 flex flex-1 flex-col bg-white px-5">
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="Terms of Use"
      />
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">NOONCHI 서비스 이용약관</p>
          <p className="text-xs text-gray-400">Terms of Service</p>
        </div>
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{section.title}</p>
              <p className="text-xs font-medium text-gray-400">
                {section.titleEn}
              </p>
            </div>
            {section.paragraphs?.map((p, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <p className="text-sm leading-relaxed text-gray-600">{p.ko}</p>
                <p className="text-xs leading-relaxed text-gray-400">{p.en}</p>
              </div>
            ))}
            {section.items && (
              <ul className="flex flex-col gap-2 pl-4">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-disc text-sm leading-relaxed text-gray-600"
                  >
                    <span>{item.ko}</span>
                    <span className="block text-xs text-gray-400">
                      {item.en}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
