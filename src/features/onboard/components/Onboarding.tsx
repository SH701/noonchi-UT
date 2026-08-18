"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { slides } from "@/data/onboarding";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";
import { Button } from "../../../components/ui/button/button";
import { usePreferenceStore } from "@/store";
import i18n from "@/locales/i18n";

export const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  draggable: true,
  swipe: true,
  dotsClass: "slick-dots custom-dots",
};
export default function Onboarding() {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const lastIndex = slides.length - 1;
  const language = usePreferenceStore((s) => s.language);

  useEffect(() => {
    gtag("event", "onboarding_start");
  }, []);

  const handleNext = async () => {
    if (currentSlide === lastIndex) {
      if (language) {
        localStorage.setItem("language", language);
        await i18n.changeLanguage(language);
      }
      gtag("event", "onboarding_complete");
      router.push("/preview");
    } else {
      sliderRef.current?.slickNext();
    }
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-hidden">
      <div className="relative mx-auto flex h-full w-full flex-col">
        <div className="grow">
          <Slider
            ref={sliderRef}
            {...settings}
            afterChange={(i) => setCurrentSlide(i)}
            className="dots-top"
            appendDots={(dots) => {
              const dotsArray = React.Children.toArray(dots);
              const filtered = dotsArray.slice(0, 3);
              return (
                <div className="dots-wrapper">
                  <ul className="slick-dots custom-dots">{filtered}</ul>
                </div>
              );
            }}
          >
            {slides.map((slide) => {
              const Content = slide.content;
              const isFormSlide =
                slide.id === 1 || slide.id === 2 || slide.id === 3;

              return (
                <div key={slide.id} className="flex h-full flex-col">
                  <div
                    className={
                      isFormSlide
                        ? "relative flex flex-1 items-start overflow-y-auto px-4 pt-20"
                        : "h-100 relative flex items-center justify-center"
                    }
                  >
                    <Content />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="pb-safe-lg flex flex-col items-center justify-center gap-2 px-4">
          {currentSlide !== 4 && (
            <>
              <Button variant="primary" size="lg" onClick={handleNext}>
                {t("onboarding.nextButton")}
              </Button>
              {currentSlide > 0 ? (
                <Button variant="secondary" size="lg" onClick={handlePrev}>
                  {t("onboarding.prevButton")}
                </Button>
              ) : (
                <div className="h-13 w-full" aria-hidden />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
