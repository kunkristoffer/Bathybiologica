import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const cookie = (await cookies()).get("locale")?.value;
  const accept = (await headers()).get("accept-language")?.toLowerCase() || "";
  const locale = cookie === "no" ? "no" : cookie === "en" ? "en" : accept.startsWith("no") ? "no" : "en";

  const layout = (await import(`@/locale/base/layout/${locale}.json`)).default
  const landing = (await import(`@/locale/content/landing/${locale}.json`)).default
  const consent = (await import(`@/locale/legal/consent/${locale}.json`)).default
  const privacy = (await import(`@/locale/legal/privacy/${locale}.json`)).default

  return {
    locale,
    messages: { layout, landing, consent, privacy },
  };
});
