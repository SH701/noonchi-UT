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
    title: "1. 수집하는 개인정보 항목 및 수집 방법",
    titleEn: "1. Data Collection",
    paragraphs: [
      {
        ko: "회사는 맞춤형 코칭 제공을 위해 최소한의 개인정보를 수집합니다.",
        en: "We collect the minimum personal data required to provide personalized coaching.",
      },
    ],
    items: [
      {
        ko: "필수 수집 항목: 로그인 식별자(소셜 로그인 시 제공되는 이메일 또는 고유 ID), 사용자의 한국어 수준, 관심사 카테고리",
        en: "Required: login identifier (email or unique ID from social login), Korean proficiency, interest categories.",
      },
      {
        ko: "서비스 이용 중 수집 항목: 텍스트 데이터(Ask 및 Role playing 입력 내용), 음성 데이터(음성 인식 및 발음/뉘앙스 분석을 위한 마이크 입력), 기기 정보, OS 버전, 앱 이용 기록(학습 진도 및 리포트 데이터)",
        en: "During use: text data (Ask and Role-playing inputs), voice data (microphone input for speech recognition and pronunciation/nuance analysis), device info, OS version, app usage logs (learning progress and report data).",
      },
      {
        ko: "수집 방법: 앱 실행, 소셜 로그인 연동, 서비스 내 텍스트/음성 직접 입력",
        en: "Methods: app launch, social login integration, direct text/voice input within the service.",
      },
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    titleEn: "2. Purpose of Use",
    items: [
      {
        ko: "개인화된 서비스 제공: 사용자의 관심사와 수준에 맞는 Role playing 시나리오 큐레이션",
        en: "Personalized service: curating role-playing scenarios based on user interests and level.",
      },
      {
        ko: "AI 코칭 및 분석: 입력된 텍스트와 음성을 바탕으로 뉘앙스 파악, 실시간 피드백(View Feedback), 커뮤니케이션 지표(Report) 산출",
        en: "AI coaching and analysis: nuance detection, real-time feedback (View Feedback), and communication metrics (Report) from text and voice inputs.",
      },
      {
        ko: "서비스 개선: AI 분석 엔진 고도화 및 신규 기능 개발",
        en: "Service improvement: enhancing the AI analysis engine and developing new features.",
      },
      {
        ko: "고객 지원: Live 1:1 코칭 연결 및 사용자 문의 응대",
        en: "Customer support: connecting Live 1:1 coaching and responding to user inquiries.",
      },
    ],
  },
  {
    title: "3. 개인정보의 처리위탁 및 국외 이전",
    titleEn: "3. Third-party Processing",
    paragraphs: [
      {
        ko: "회사는 원활한 AI 서비스 제공을 위해 아래와 같이 외부 전문 클라우드 및 인공지능 플랫폼에 데이터 처리를 위탁하고 있습니다.",
        en: "To ensure reliable AI service, we entrust data processing to external cloud and AI platforms as follows.",
      },
    ],
    items: [
      {
        ko: "위탁 대상: Amazon Web Services (AWS), Google Cloud Platform / 위탁 업무: 서버 운영 및 데이터 보관",
        en: "Entrustees: Amazon Web Services (AWS), Google Cloud Platform / Tasks: server operation and data storage.",
      },
      {
        ko: "위탁 대상: Google / 위탁 업무: 텍스트 및 상황 맥락 데이터의 AI 분석 (개인 식별 정보 제외)",
        en: "Entrustee: Google / Tasks: AI analysis of text and contextual data (excluding personally identifiable information).",
      },
    ],
  },
  {
    title: "4. 개인정보의 보유 및 이용 기간",
    titleEn: "4. Retention & Destruction",
    paragraphs: [
      {
        ko: "원칙적으로 이용자의 계정 탈퇴 시 혹은 개인정보 수집 목적 달성 시 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 의하여 보존할 필요가 있는 경우 다음과 같이 보관합니다.",
        en: "Data is destroyed without delay upon account deletion or when the purpose of collection is fulfilled. Records required by law are retained as follows.",
      },
    ],
    items: [
      {
        ko: "소비자의 불만 또는 분쟁 처리에 관한 기록: 3년",
        en: "Records related to consumer complaints or dispute resolution: 3 years.",
      },
    ],
  },
  {
    title: "5. 음성 데이터 처리에 관한 특별 안내",
    titleEn: "5. Voice Data Protection",
    paragraphs: [
      {
        ko: "NOONCHI는 사용자의 자연스러운 발화 연습을 위해 마이크 접근 권한을 요청합니다. 수집된 음성 데이터는 실시간 인식 및 텍스트 변환(STT), 피드백 제공 목적으로만 사용되며, 사용자의 명시적 동의 없이 다른 용도로 판매되거나 무단으로 공유되지 않습니다.",
        en: "NOONCHI requests microphone access to support natural speaking practice. Collected voice data is used solely for real-time recognition, speech-to-text (STT), and feedback. We never sell or share voice data with third parties without the user's explicit consent.",
      },
    ],
  },
  {
    title: "6. 이용자의 권리와 행사 방법",
    titleEn: "6. User Rights",
    paragraphs: [
      {
        ko: "이용자는 언제든지 앱 내 설정(My Page 등)을 통해 자신의 정보를 조회하거나 수정할 수 있으며, '계정 탈퇴(회원 탈퇴)'를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.",
        en: "Users may view or edit their data anytime in app settings (e.g., My Page) or withdraw consent by selecting 'Delete Account' at any time.",
      },
    ],
  },
  {
    title: "7. 개인정보 보호책임자 및 문의처",
    titleEn: "7. Contact",
    paragraphs: [
      {
        ko: "개인정보와 관련된 모든 문의, 불만 처리 등은 아래의 연락처로 부탁드립니다.",
        en: "Please direct all privacy-related inquiries and complaints to the contact below.",
      },
    ],
    items: [
      {
        ko: "책임자: Junghun Lee",
        en: "Officer: Junghun Lee",
      },
      {
        ko: "이메일: noonchi.ai@gmail.com",
        en: "Email: noonchi.ai@gmail.com",
      },
      {
        ko: "웹사이트: https://noonchi.ai.kr",
        en: "Website: https://noonchi.ai.kr",
      },
    ],
  },
  {
    title: "8. 부칙",
    titleEn: "8. Supplementary Provisions",
    paragraphs: [
      {
        ko: "본 방침은 앱스토어 서비스 출시일로부터 적용되며, 추후 회사의 법인 전환 시 모든 개인정보 관리 책임은 신설 법인으로 안전하게 이관 및 승계됩니다.",
        en: "This policy is effective from the app store launch date. Upon future incorporation, all responsibilities for personal data management will be safely transferred to and succeeded by the new entity.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="-mx-5 flex flex-1 flex-col bg-white px-5">
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="Privacy Policy"
      />
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">NOONCHI 개인정보 처리방침</p>
          <p className="text-xs text-gray-400">Privacy Policy</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-relaxed text-gray-600">
            Junghun Lee(이하 &quot;회사&quot;)는 &apos;NOONCHI&apos; 서비스
            이용자의 개인정보를 소중하게 생각하며, 개인정보 보호법 등 관련
            법령을 철저히 준수합니다.
          </p>
          <p className="text-xs leading-relaxed text-gray-400">
            Junghun Lee (the &quot;Company&quot;) values the personal data of
            NOONCHI users and strictly complies with the Personal Information
            Protection Act and other relevant laws.
          </p>
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
