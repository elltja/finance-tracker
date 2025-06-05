const API_URL = "https://ipapi.co/json";

export async function getLocale() {
  const data = await fetch(API_URL).then((res) => res.json());
  return {
    currency: data.currency as string,
    country: data.country as string,
    language: (data.languages ? data.languages.split(",")[0] : undefined) as
      | string
      | undefined,
  };
}

export function parseLocaleCode(code: string) {
  if (code.includes("-")) {
    return code.split("-")[0];
  }
  return code;
}
