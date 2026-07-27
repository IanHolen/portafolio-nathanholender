"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/lib/data";
import { useLocale } from "./I18nProvider";
import { t } from "@/lib/translations";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { locale } = useLocale();
  const [form, setForm] = useState({ name: "", email: "", message: "", _hp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("contact.errName", locale);
    if (!form.email.trim()) e.email = t("contact.errEmail", locale);
    else if (!emailRegex.test(form.email)) e.email = t("contact.errEmailInvalid", locale);
    if (!form.message.trim()) e.message = t("contact.errMessage", locale);
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (form._hp) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

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
        const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        return;
      }
      if (!res.ok) {
        setSubmitError(data.message || t("contact.errConnection", locale));
      } else {
        setSubmitted(true);
      }
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

  const inputCls =
    "w-full border border-white/10 bg-panel px-5 py-4 text-ink-900 placeholder:text-ink-500 transition focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/20";

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/15 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-green">
            {t("contact.kicker", locale)}
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.95] tracking-poster">
            {t("contact.title1", locale)}{" "}
            <span className="text-gradient">{t("contact.title2", locale)}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-ink-600">
            {t("contact.subtitle", locale)}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 bg-accent-green px-8 py-5 font-mono text-sm font-semibold uppercase tracking-wider text-paper transition hover:bg-accent-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {profile.email}
              <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={copyEmail}
              className="relative inline-flex items-center gap-2 border border-white/15 px-5 py-5 text-sm text-ink-700 transition hover:border-accent-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              aria-label={t("contact.copyEmail", locale)}
            >
              {copied ? <Check className="h-4 w-4 text-accent-up" /> : <Copy className="h-4 w-4" />}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs uppercase text-accent-up"
                  >
                    {t("contact.copied", locale)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-16 max-w-xl"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-white/10 bg-card p-10 text-center"
              >
                <p className="font-display text-2xl font-bold uppercase tracking-poster text-ink-900">
                  {t("contact.formSent", locale)}
                </p>
                <p className="mt-3 text-ink-600">{t("contact.formThanks", locale)}</p>
                <button
                  onClick={resetForm}
                  className="mt-6 border border-white/15 px-6 py-2 font-mono text-xs uppercase tracking-wider text-ink-700 transition hover:border-accent-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {t("contact.formAnother", locale)}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from humans */}
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
                    className={inputCls}
                  />
                  {errors.name && <p className="mt-1 font-mono text-xs text-accent-down">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={t("contact.formEmail", locale)}
                    aria-label={t("contact.formEmail", locale)}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                  {errors.email && <p className="mt-1 font-mono text-xs text-accent-down">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    placeholder={t("contact.formMessage", locale)}
                    aria-label={t("contact.formMessage", locale)}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                  />
                  {errors.message && <p className="mt-1 font-mono text-xs text-accent-down">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="border border-accent-down/30 bg-accent-down/5 p-4 text-center">
                    <p className="text-sm text-accent-down">{submitError}</p>
                    <button
                      type="button"
                      onClick={() => setSubmitError("")}
                      className="mt-2 font-mono text-xs uppercase text-ink-500 underline transition hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                    >
                      {t("contact.formRetry", locale)}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-green px-6 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-paper transition hover:bg-accent-lime disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {loading ? t("contact.formSending", locale) : t("contact.formSubmit", locale)}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
