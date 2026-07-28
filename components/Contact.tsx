"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { profile } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Method = "email" | "whatsapp";

/* Sección de contacto sobre superficie espresso — el bloque de "presencia"
   que cierra el sitio. Toggle Email | WhatsApp con iconos de marca reales. */
export default function Contact() {
  const { locale } = useLocale();
  const [method, setMethod] = useState<Method>("email");
  const [form, setForm] = useState({ name: "", email: "", message: "", _hp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("contact.errName", locale);
    if (method === "email") {
      if (!form.email.trim()) e.email = t("contact.errEmail", locale);
      else if (!emailRegex.test(form.email)) e.email = t("contact.errEmailInvalid", locale);
    }
    if (!form.message.trim()) e.message = t("contact.errMessage", locale);
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (form._hp) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // WhatsApp: abre el chat con el mensaje ya redactado.
    if (method === "whatsapp") {
      const text = `${t("contact.waGreeting", locale)}\n\n${form.name}\n${form.message}`;
      window.open(
        `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 503) {
        const subject = encodeURIComponent(`Contacto de ${form.name}`);
        const body = encodeURIComponent(
          `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        return;
      }
      if (!res.ok) setSubmitError(data.message || t("contact.errConnection", locale));
      else setSubmitted(true);
    } catch {
      setSubmitError(t("contact.errConnection", locale));
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setSubmitError("");
    setForm({ name: "", email: "", message: "", _hp: "" });
    setErrors({});
  }

  function copyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const field =
    "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-chalk placeholder:text-chalk-500 transition focus:border-accent-lime/60 focus:outline-none focus:ring-2 focus:ring-accent-lime/20";

  return (
    <section id="contact" className="relative overflow-hidden bg-espresso px-6 py-28 md:py-36">
      {/* textura sutil de la superficie oscura */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_20%_10%,rgba(184,137,63,0.14),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(156,61,46,0.18),transparent_50%)]" />

      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-orange">
            {t("contact.kicker", locale)}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-chalk">
            {t("contact.title1", locale)}{" "}
            <span className="text-accent-lime">{t("contact.title2", locale)}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-chalk-600">{t("contact.subtitle", locale)}</p>

          {/* Email directo + copiar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm text-chalk underline decoration-accent-orange/50 underline-offset-4 transition hover:decoration-accent-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
            >
              {profile.email}
            </a>
            <button
              onClick={copyEmail}
              aria-label={t("contact.copyEmail", locale)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-chalk-600 transition hover:border-accent-lime/50 hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-accent-lime" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? t("contact.copied", locale) : t("contact.copyEmail", locale)}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-white/12 bg-white/[0.04] p-10 text-center"
              >
                <p className="font-display text-2xl font-medium text-chalk">
                  {t("contact.formSent", locale)}
                </p>
                <p className="mt-3 text-chalk-600">{t("contact.formThanks", locale)}</p>
                <button
                  onClick={resetForm}
                  className="mt-6 rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-chalk-600 transition hover:border-accent-lime/50 hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
                >
                  {t("contact.formAnother", locale)}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                {/* Selector de método */}
                <div className="mb-8 text-center">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-chalk-500">
                    {t("contact.methodLabel", locale)}
                  </p>
                  <div className="inline-flex rounded-full border border-white/12 bg-white/[0.03] p-1">
                    {(
                      [
                        { id: "email" as Method, icon: "/icons/gmail.webp", label: t("contact.methodEmail", locale) },
                        { id: "whatsapp" as Method, icon: "/icons/whatsapp.webp", label: t("contact.methodWhatsapp", locale) },
                      ]
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        aria-pressed={method === m.id}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
                          method === m.id
                            ? "bg-chalk font-medium text-espresso"
                            : "text-chalk-600 hover:text-chalk"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="_hp"
                  value={form._hp}
                  onChange={(e) => setForm({ ...form, _hp: e.target.value })}
                  className="absolute -left-[9999px] opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <input
                    type="text"
                    placeholder={t("contact.formName", locale)}
                    aria-label={t("contact.formName", locale)}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                  {errors.name && (
                    <p className="mt-1 font-mono text-xs text-accent-orange">{errors.name}</p>
                  )}
                </div>

                {method === "email" && (
                  <div>
                    <input
                      type="email"
                      placeholder={t("contact.formEmail", locale)}
                      aria-label={t("contact.formEmail", locale)}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={field}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-xs text-accent-orange">{errors.email}</p>
                    )}
                  </div>
                )}

                <div>
                  <textarea
                    placeholder={t("contact.formMessage", locale)}
                    aria-label={t("contact.formMessage", locale)}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-xs text-accent-orange">{errors.message}</p>
                  )}
                </div>

                {submitError && (
                  <div className="rounded-2xl border border-accent-orange/30 bg-accent-orange/10 p-4 text-center">
                    <p className="text-sm text-accent-orange">{submitError}</p>
                    <button
                      type="button"
                      onClick={() => setSubmitError("")}
                      className="mt-2 font-mono text-xs uppercase text-chalk-500 underline transition hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
                    >
                      {t("contact.formRetry", locale)}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-chalk px-6 py-4 text-sm font-semibold text-espresso transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={method === "whatsapp" ? "/icons/whatsapp.webp" : "/icons/gmail.webp"}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 object-contain"
                  />
                  {loading
                    ? t("contact.formSending", locale)
                    : method === "whatsapp"
                      ? t("contact.waSubmit", locale)
                      : t("contact.emailSubmit", locale)}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
