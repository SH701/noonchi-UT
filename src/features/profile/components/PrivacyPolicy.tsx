"use client";

import Header from "@/components/common/Header";
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
    titleEn: "3. Third-party Processing & International Transfer",
    paragraphs: [
      {
        ko: "회사는 원활한 AI 서비스 제공을 위해 아래와 같이 외부 클라우드 및 인공지능(AI) 플랫폼에 데이터 처리를 위탁하며, 일부 데이터는 국외로 이전됩니다. 위탁받는 제3자는 회사와 동등한 수준의 개인정보 보호 의무를 부담합니다.",
        en: "To provide AI services smoothly, we entrust data processing to the external cloud and AI platforms listed below. Some data is transferred internationally. Third-party processors are bound by an equivalent level of personal data protection obligations as the Company.",
      },
    ],
    items: [
      {
        ko: "위탁 대상: Amazon Web Services(AWS), Google Cloud Platform / 위탁 업무: 서버 운영 및 데이터 보관 / 이전 국가: 미국 등",
        en: "Entrustees: Amazon Web Services (AWS), Google Cloud Platform / Tasks: server operation and data storage / Country of transfer: USA, etc.",
      },
      {
        ko: "위탁 대상: Google(Gemini) / 위탁 업무: 사용자가 입력한 텍스트·상황 맥락 및 업로드한 이미지(스크린샷)에 대한 AI 분석 및 응답 생성 / 이전 국가: 미국 등",
        en: "Entrustee: Google (Gemini) / Tasks: AI analysis of user-submitted text, contextual data, and uploaded images (screenshots) for response generation / Country of transfer: USA, etc.",
      },
      {
        ko: "위탁 대상: Google(Cloud Text-to-Speech) / 위탁 업무: 텍스트의 음성 합성(TTS) / 이전 국가: 미국 등",
        en: "Entrustee: Google (Cloud Text-to-Speech) / Tasks: text-to-speech synthesis (TTS) / Country of transfer: USA, etc.",
      },
      {
        ko: "위탁 대상: Naver(CLOVA Speech) / 위탁 업무: 사용자 음성의 텍스트 변환(STT) / 이전 국가: 대한민국",
        en: "Entrustee: Naver (CLOVA Speech) / Tasks: speech-to-text conversion (STT) of user voice input / Country of transfer: Republic of Korea.",
      },
      {
        ko: "위탁 대상: Naver(Papago) / 위탁 업무: 메시지 번역 / 이전 국가: 대한민국",
        en: "Entrustee: Naver (Papago) / Tasks: message translation / Country of transfer: Republic of Korea.",
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
        ko: "NOONCHI는 자연스러운 발화 연습을 위해 마이크 접근 권한을 요청합니다. 수집된 음성 데이터는 텍스트 변환(STT)을 위해 외부 인공지능 서비스(Naver CLOVA Speech)로 전송되며, 음성 인식 및 피드백 제공 목적으로만 사용됩니다. 음성 데이터는 사용자의 명시적 동의 없이 다른 용도로 판매되거나 무단으로 공유되지 않습니다.",
        en: "NOONCHI requests microphone access for natural speaking practice. Collected voice data is transmitted to an external AI service (Naver CLOVA Speech) for speech-to-text (STT) conversion and is used solely for voice recognition and feedback. We never sell or share voice data with third parties without the user's explicit consent.",
      },
    ],
  },
  {
    title: "6. 인공지능(AI) 서비스로의 데이터 전송 및 동의",
    titleEn: "6. Data Transfer to AI Services & User Consent",
    paragraphs: [
      {
        ko: "본 서비스의 핵심 기능(Ask, Role playing, 발음·뉘앙스 분석 등)은 외부 인공지능 서비스를 이용하여 제공됩니다. 이를 위해 다음 데이터가 외부 AI로 전송될 수 있습니다.",
        en: "Core features of the service (Ask, Role-playing, pronunciation and nuance analysis, etc.) are powered by external AI services. The following data may be transmitted to external AI providers for these features.",
      },
    ],
    items: [
      {
        ko: "사용자가 입력한 텍스트(질문, 대화 내용, 상황 맥락) → Google",
        en: "User-submitted text (questions, conversation content, contextual data) → Google.",
      },
      {
        ko: "사용자가 업로드한 이미지(스크린샷) → Google",
        en: "User-uploaded images (screenshots) → Google.",
      },
      {
        ko: "사용자의 음성 → Naver",
        en: "User voice input → Naver.",
      },
      {
        ko: "회사는 위 데이터를 외부 AI로 전송하기 전에 사용자에게 그 내용을 고지하고 동의를 받습니다. 사용자는 동의를 거부할 수 있으며, 이 경우 해당 AI 기능의 이용이 제한될 수 있습니다. 동의는 앱 내 설정 또는 회원 탈퇴를 통해 언제든지 철회할 수 있습니다.",
        en: "The Company notifies users and obtains their consent before transmitting the above data to external AI services. Users may decline consent, in which case the related AI features may be restricted. Consent can be withdrawn at any time through in-app settings or account deletion.",
      },
    ],
  },
  {
    title: "7. 이용자의 권리와 행사 방법",
    titleEn: "7. User Rights",
    paragraphs: [
      {
        ko: "이용자는 언제든지 앱 내 설정(My Page 등)을 통해 자신의 정보를 조회하거나 수정할 수 있으며, '계정 탈퇴(회원 탈퇴)'를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.",
        en: "Users may view or edit their data anytime in app settings (e.g., My Page) or withdraw consent by selecting 'Delete Account' at any time.",
      },
    ],
  },
  {
    title: "8. 개인정보 보호책임자 및 문의처",
    titleEn: "8. Contact",
    paragraphs: [
      {
        ko: "개인정보와 관련된 모든 문의, 불만 처리 등은 아래의 연락처로 부탁드립니다.",
        en: "Please direct all privacy-related inquiries and complaints to the contact below.",
      },
    ],
    items: [
      {
        ko: "책임자: Jinsung Kim",
        en: "Officer: Jinsung Kim",
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
    title: "9. 부칙",
    titleEn: "9. Supplementary Provisions",
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
            Jinsung Kim(이하 &quot;회사&quot;)는 &apos;NOONCHI&apos; 서비스
            이용자의 개인정보를 소중하게 생각하며, 개인정보 보호법 등 관련
            법령을 철저히 준수합니다.
          </p>
          <p className="text-xs leading-relaxed text-gray-400">
            Jinsung Kim(the &quot;Company&quot;) values the personal data of
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
