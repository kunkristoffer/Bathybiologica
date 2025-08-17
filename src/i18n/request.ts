import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const cookie = (await cookies()).get("locale")?.value;
  const accept = (await headers()).get("accept-language")?.toLowerCase() || "";
  const locale = cookie === "no" ? "no" : cookie === "en" ? "en" : accept.startsWith("no") ? "no" : "en";

  return {
    locale,
    messages: (await import(`@/data/content/${locale}.json`)).default,
  };
});
