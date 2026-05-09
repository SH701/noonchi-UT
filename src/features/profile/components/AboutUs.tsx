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
    title: "눈치란?",
    titleEn: "What is 눈치?",
    paragraphs: [
      {
        ko: "언어는 배웠는데 왜 아직 어색할까요.",
        en: "You learned the language. But something still feels off.",
      },
      {
        ko: "말해지지 않은 것들 — 맥락, 분위기, 관계의 결. 그게 바로 눈치입니다. 그리고 눈치는 배울 수 있어요.",
        en: "The unspoken — context, atmosphere, the texture of relationships. That's 눈치. And 눈치 can be learned.",
      },
    ],
  },
  {
    title: "비전 & 슬로건",
    titleEn: "Vision & Slogan",
    paragraphs: [
      {
        ko: "문화의 문을, 모두에게.",
        en: "Korean culture for everyone.",
      },
      {
        ko: "세종대왕은 누구나 읽고 쓸 수 있는 세상을 꿈꿨습니다. 우리는 누구나 한국을 느낄 수 있는 세상을 만듭니다.",
        en: "King Sejong dreamed of a world where everyone could read and write. We're building a world where everyone can feel Korea.",
      },
      {
        ko: "Noonchi.ai는 한국 문화 지능 플랫폼입니다. 외국인이 언어를 넘어 — 직장 문화, 관계의 층위, 말해지지 않은 규칙들 — 을 자연스럽게 내면화할 수 있도록 돕습니다.",
        en: "Noonchi.ai is a Korean Cultural Intelligence platform — helping foreigners go beyond language to naturally internalize workplace culture, relational dynamics, and the unspoken rules of Korean life.",
      },
    ],
  },
  {
    title: "우리의 가치",
    titleEn: "Our Values",
    items: [
      {
        ko: "진정성 · Authenticity — 한국 문화를 '쉽게' 만드는 게 아닙니다. 진짜를 전합니다. 불편한 맥락도, 미묘한 뉘앙스도 그대로.",
        en: "We don't simplify Korean culture. We deliver it as it is — including the uncomfortable, the nuanced, the real.",
      },
      {
        ko: "연결 · Connection — 앱 안에서 배운 것이 실제 관계로 이어질 때. 그 순간을 위해 만듭니다.",
        en: "We build for the moment when what you learned inside the app becomes a real relationship outside it.",
      },
      {
        ko: "성장 · Growth — 눈치는 하루아침에 생기지 않습니다. 매일 조금씩, 실수해도 괜찮은 공간에서 쌓아가는 것.",
        en: "눈치 doesn't happen overnight. A little every day, naturally — in a space where mistakes are welcome.",
      },
      {
        ko: "홍익 · Hongik · 널리 이롭게 — 문화를 이해하는 사람이 많아질수록 세상은 조금 더 따뜻해집니다. 우리는 그걸 믿습니다.",
        en: "The more people who understand each other across cultures, the warmer the world becomes. We believe that.",
      },
    ],
  },
  {
    title: "눈치가 생기면",
    titleEn: "Before & After",
    paragraphs: [
      {
        ko: "한국어를 안다고 한국이 보이진 않습니다.",
        en: "Knowing Korean ≠ Understanding Koreans.",
      },
    ],
    items: [
      {
        ko: "Before: 한국 친구의 말이 뭔가 달라졌는데, 왜인지 모르겠다.",
        en: "Something shifted in my Korean friend's tone — I have no idea why.",
      },
      {
        ko: "Before: 회식 자리에서 언제 일어나야 할지 타이밍을 못 잡는다.",
        en: "I can never tell when it's okay to leave a 회식.",
      },
      {
        ko: "Before: 상사가 \"그렇군요\"라고 했는데 OK인지 아닌지 알 수가 없다.",
        en: 'My boss said "그렇군요" — was that a yes or a no?',
      },
      {
        ko: "After: 분위기를 읽고, 적절한 순간에 말할 수 있다.",
        en: "I can read the room and speak at the right moment.",
      },
      {
        ko: "After: 상황마다 다른 존댓말과 반말의 결을 본능적으로 안다.",
        en: "I instinctively know when to use 존댓말 and when not to.",
      },
      {
        ko: "After: 한국이 좋아서 온 만큼, 진짜 한국을 경험한다.",
        en: "I came because I love Korea. Now I'm actually experiencing it.",
      },
    ],
  },
  {
    title: "팡팡즈 · The Makers",
    titleEn: "Founding Team",
    paragraphs: [
      {
        ko: "\"팡팡\"은 뭔가 터질 것 같은 그 에너지입니다. 우리 그렇게 만들었어요.",
        en: '"팡팡" is the energy of something about to explode. We built this with that energy.',
      },
    ],
    items: [
      {
        ko: "Jinsung · Founder & CEO",
        en: "Jinsung · Founder & CEO",
      },
      {
        ko: "Junghoon · CTO",
        en: "Junghoon · CTO",
      },
      {
        ko: "Gyuhyun · Sowon · Minchul · Design",
        en: "Gyuhyun · Sowon · Minchul · Design",
      },
      {
        ko: "Hyuna · Marketing",
        en: "Hyuna · Marketing",
      },
      {
        ko: "Suwhan · Frontend",
        en: "Suwhan · Frontend",
      },
      {
        ko: "Gyeongyeon · Backend",
        en: "Gyeongyeon · Backend",
      },
    ],
  },
  {
    title: "눈치 파운더스 클럽",
    titleEn: "Noonchi Founders Club",
    paragraphs: [
      {
        ko: "제품이 완성되기 전, 세상이 알기 전 — 먼저 믿어준 사람들.",
        en: "The first ones who believed — before the product was ready, before the world knew.",
      },
    ],
    items: [
      {
        ko: "🌍 Naz · Valentine · Betul · Noah · Froggy",
        en: "🌍 Naz · Valentine · Betul · Noah · Froggy",
      },
      {
        ko: "…그리고 계속 이어집니다.",
        en: "…and more to come.",
      },
    ],
  },
];

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="-mx-5 flex flex-1 flex-col bg-white px-5">
      <Header
        leftIcon={<ChevronLeft onClick={() => router.back()} />}
        center="About Us"
      />
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Read the Room. In Korean.</p>
          <p className="text-xs text-gray-400">
            한국, 이제 진짜로 이해할 수 있어요.
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
        <p className="pb-6 text-center text-xs text-gray-400">
          세종대왕의 정신을 이어, 모두에게 한국을.
          <br />
          In the spirit of King Sejong — Korean culture, for everyone.
          <br />
          <span className="mt-1 block font-medium text-gray-500">
            Noonchi.ai — Korean Cultural Intelligence Platform
          </span>
        </p>
      </div>
    </div>
  );
}
