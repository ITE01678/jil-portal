import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ContactEnquiriesService } from "../services/listsService";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig";

/*
 * ── EmailJS setup (one-time, 5 min) ──────────────────────────────────
 *  1. Create a FREE account at https://www.emailjs.com
 *  2. Add a service: Email Services → Add Service → choose Gmail/Outlook
 *     linked to any account (does not have to be it.trainee@jil-jupiter.com)
 *  3. Create a template: Email Templates → Create New
 *     Set "To Email" = it.trainee@jil-jupiter.com
 *     Use variables: {{from_name}}, {{from_email}}, {{company}},
 *                    {{subject}}, {{message}}
 *  4. Copy Service ID, Template ID, and your Public Key below
 * ─────────────────────────────────────────────────────────────────── */
const EJS_SERVICE_ID  = "service_jil_portal";      // ← replace with your Service ID
const EJS_TEMPLATE_ID = "template_contact_form";   // ← replace with your Template ID
const EJS_PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY"; // ← replace with your Public Key
const EMAIL_ENABLED   = EJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const OFFICES = [
  {
    city: "Kolkata",
    country: "West Bengal · Registered Office",
    flag: "🏛️",
    address: "Unnayanam, 20A Ashutosh Chowdhury Avenue\nKolkata – 700 019, West Bengal",
    phone: "+91 33 4015 9000",
    email: "info@jil-jupiter.com",
    grad: "from-navy-700 to-navy-500",
  },
  {
    city: "Baddi",
    country: "Himachal Pradesh · Plant",
    flag: "🏭",
    address: "Industrial Area, Phase II\nBaddi — 173 205, HP",
    phone: "+91 33 4015 9000",
    email: "info@jil-jupiter.com",
    grad: "from-solar-500 to-amber-600",
  },
  {
    city: "Bhubaneswar",
    country: "Odisha · Plant (2025)",
    flag: "🔧",
    address: "Industrial Estate\nBhubaneswar, Odisha",
    phone: "+91 33 4015 9000",
    email: "info@jil-jupiter.com",
    grad: "from-leaf-500 to-teal-600",
  },
];

const SUBJECTS = [
  "Product Enquiry",
  "Bulk / OEM Supply",
  "EPC Project",
  "Career Enquiry",
  "Investor Relations",
  "General Inquiry",
  "Press / Media",
];

/* Contact-form submissions go to SharePoint only when the list ID is configured */
const SHAREPOINT_READY =
  SHAREPOINT_CONFIG.siteId !== "REPLACE_WITH_SITE_ID" &&
  SHAREPOINT_CONFIG.lists.contactEnquiries !== "SKIP";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", subject: SUBJECTS[0], message: "",
  });
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [referenceId, setReferenceId] = useState("");

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const refCode = `JIL-${Date.now().toString(36).toUpperCase()}`;

    /* ── Always attempt email notification ──────────────────────── */
    if (EMAIL_ENABLED) {
      try {
        await emailjs.send(
          EJS_SERVICE_ID,
          EJS_TEMPLATE_ID,
          {
            from_name:  form.name,
            from_email: form.email,
            company:    form.company || "Not provided",
            subject:    form.subject,
            message:    form.message,
            reply_to:   form.email,
            ref_code:   refCode,
          },
          EJS_PUBLIC_KEY
        );
      } catch (ejsErr) {
        console.warn("[Contact] EmailJS notification failed:", ejsErr);
      }
    }

    if (SHAREPOINT_READY) {
      /* ── Live: save to SharePoint List ─────────────────────────── */
      try {
        const { ReferenceCode } = await ContactEnquiriesService.submit(form);
        setReferenceId(ReferenceCode);
        setSubmitted(true);
      } catch (err) {
        console.error("[Contact] SharePoint submission failed:", err);
        setError("Unable to save your message. Please email us directly at info@jil-jupiter.com");
      } finally {
        setLoading(false);
      }
    } else {
      /* ── Fallback: show success with generated ref ───────────────── */
      setReferenceId(refCode);
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[50vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-solar-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-leaf-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              We're here to help
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Get in <span className="solar-text drop-shadow-lg">Touch</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Product enquiries, project partnerships, career opportunities — our team responds within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact form + info ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form — 3 cols */}
            <motion.div {...fadeUp()} className="lg:col-span-3 card p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-leaf-500 to-teal-600 mx-auto shadow-lg">✅</div>
                  <h3 className="text-2xl font-extrabold">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                    Thanks, <strong>{form.name}</strong>. We'll get back to you at{" "}
                    <strong>{form.email}</strong> within one business day.
                  </p>
                  {referenceId && (
                    <div className="bg-solar-50 dark:bg-solar-900/20 border border-solar-200 dark:border-solar-700/50 rounded-xl px-5 py-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Reference number</p>
                      <p className="font-extrabold text-solar-600 dark:text-solar-400 tracking-widest text-sm">{referenceId}</p>
                    </div>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setReferenceId(""); setForm({ name:"", email:"", company:"", subject: SUBJECTS[0], message:"" }); }}
                    className="mt-2 inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold mb-1">Send us a message</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-7">Fill in the form and our team will get back to you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
                      <Field label="Work Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
                    </div>
                    <Field label="Company / Organisation" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your company name" />

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Subject</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-3 px-4 text-sm font-medium focus:border-solar-500 focus:outline-none transition-colors">
                        {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us how we can help…"
                        className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-3 px-4 text-sm resize-none focus:border-solar-500 focus:outline-none transition-colors" />
                    </div>

                    {error && (
                      <p className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-xl px-4 py-2.5">{error}</p>
                    )}
                    <button type="submit" disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
                      ) : "Send Message →"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info — 2 cols */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
              {/* Quick contact */}
              <div className="card">
                <h3 className="font-bold text-base mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  {[
                    { icon: "✉", label: "General",   value: "info@jil-jupiter.com"    },
                    { icon: "📦", label: "Enquiries", value: "enquiry@jil-jupiter.com" },
                    { icon: "💼", label: "Careers",   value: "career@jil-jupiter.com"  },
                    { icon: "📰", label: "Press",     value: "press@jil-jupiter.com"   },
                    { icon: "📞", label: "Phone",     value: "+91 33 4015 9000"         },
                    { icon: "📍", label: "Address",   value: "Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-xl bg-solar-50 dark:bg-solar-900/20 flex items-center justify-center text-solar-500 flex-shrink-0">{c.icon}</span>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{c.label}</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry types */}
              <div className="card">
                <h3 className="font-bold text-base mb-4">What We Can Help With</h3>
                <div className="space-y-3">
                  {[
                    { type: "Product / Cell Enquiry",   desc: "Datasheets, bin specs & samples",        color: "text-solar-500"  },
                    { type: "Bulk / OEM Supply",         desc: "Volume pricing & long-term agreements",  color: "text-leaf-500"   },
                    { type: "EPC Projects",              desc: "Rooftop & ground-mount installations",   color: "text-indigo-500" },
                    { type: "Career Opportunities",      desc: "Open roles at career@jil-jupiter.com",   color: "text-purple-500" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className={`text-lg flex-shrink-0 ${r.color}`}>→</span>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{r.type}</p>
                        <p className="text-[11px] text-slate-400">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Offices ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Locations</span>
            <h2 className="section-title">Find Us <span className="solar-text">Across India</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICES.map((o, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card p-0 overflow-hidden">
                <div className={`h-16 bg-gradient-to-r ${o.grad} flex items-center px-6 gap-3`}>
                  <span className="text-2xl">{o.flag}</span>
                  <div>
                    <h3 className="text-white font-extrabold text-lg leading-tight">{o.city}</h3>
                    <p className="text-white/70 text-xs">{o.country}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: "📍", val: o.address },
                    { icon: "📞", val: o.phone   },
                    { icon: "✉",  val: o.email   },
                  ].map((row, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <span className="text-slate-400 mt-0.5 flex-shrink-0">{row.icon}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">{row.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function Field({ label, name, type, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-3 px-4 text-sm font-medium focus:border-solar-500 focus:outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600" />
    </div>
  );
}
