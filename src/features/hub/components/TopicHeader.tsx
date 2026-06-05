'use client'

import { useTranslation } from "react-i18next";

export default function TopicHeader(){
    const { t } = useTranslation();
    return(
        <header className="flex flex-col gap-3 pb-7">
        <h1 className="text-3xl font-medium">
          {t("hub.title")}
        </h1>
        <p className="text-gray-500">
          {t("hub.subtitle")}
        </p>
      </header>
    )
}