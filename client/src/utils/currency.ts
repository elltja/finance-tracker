export async function getCurrency() {
  const data = await fetch("https://ipapi.co/json/").then((res) => res.json());
  return data.currency as string;
}
