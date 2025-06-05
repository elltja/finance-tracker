import { useTranslation } from "react-i18next";

export default function Separator() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-5">
      <hr className="border-border flex-1" />
      <p className="text-lg text-gray-700">{t("or")}</p>
      <hr className="border-border flex-1" />
    </div>
  );
}
