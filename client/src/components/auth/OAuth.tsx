import { getLocale } from "@/utils/locale";
import { useTranslation } from "react-i18next";

type Provider = "github" | "google";

export default function OAuth() {
  const { t } = useTranslation();

  async function handleOAuthLogin(provider: Provider) {
    const { currency, language } = await getLocale();
    const state = encodeURIComponent(
      JSON.stringify({
        preferred_currency: currency,
        preferred_language: language,
      })
    );
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/auth/${provider}?state=${state}`;
  }
  return (
    <div className="h-fit flex flex-col gap-3">
      <button
        className="p-2 rounded-md cursor-pointer border border-border w-full flex justify-center gap-3"
        onClick={() => handleOAuthLogin("google")}
      >
        <img src="/google.png" alt="Google's logo" className="w-5 h-5" />
        {t("auth.continueWithOAuth", { provider: "Google" })}
      </button>
      <button
        className="p-2 rounded-md cursor-pointer border border-border w-full flex justify-center gap-3"
        onClick={() => handleOAuthLogin("github")}
      >
        <img src="/github.png" alt="Github's logo" className="w-5 h-5" />
        {t("auth.continueWithOAuth", { provider: "Github" })}
      </button>
    </div>
  );
}
