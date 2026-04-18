import { useState } from "react";
import { motion } from "framer-motion";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function TwitterXIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

const SOCIALS = [
  { Icon: LinkedInIcon,  label: "LinkedIn", href: "https://www.linkedin.com/company/jil-jupiter/",        color: "hover:bg-[#0077b5] hover:text-white" },
  { Icon: YouTubeIcon,   label: "YouTube",  href: "https://www.youtube.com/@Jupiter.international",         color: "hover:bg-[#ff0000] hover:text-white" },
  { Icon: FacebookIcon,  label: "Facebook", href: "https://www.facebook.com/people/Jupiter-International-Limited/61565473688219/?mibextid=LQQJ4d&rdid=WuWupAQjGuxWIqT5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FMnNweyQA8r6YwNDT%2F%3Fmibextid%3DLQQJ4d",        color: "hover:bg-[#1877f2] hover:text-white" },
  { Icon: TwitterXIcon,  label: "X",        href: "https://twitter.com",         color: "hover:bg-black hover:text-white"     },
  { Icon: MailIcon,      label: "Email",    href: "mailto:info@jil-jupiter.com", color: "hover:bg-solar-500 hover:text-white" },
];

export default function FloatingSidebar() {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
    >
      {/* Top vertical line */}
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-navy-600/40 dark:to-slate-400/30" />

      {/* Social links container */}
      <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-l-2xl shadow-lg overflow-hidden">

        {/* "Follow Us" vertical label */}
        <div className="py-3 px-2">
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
          >
            Follow Us
          </span>
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-slate-200 dark:bg-slate-700" />

        {/* Icons */}
        {SOCIALS.map(({ Icon, label, href, color }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.15 }}
            className={`relative w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all duration-200 ${color}`}
          >
            <Icon />
            {/* Tooltip */}
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-2 bg-navy-800 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
              >
                {label}
              </motion.span>
            )}
          </motion.a>
        ))}

        {/* Divider */}
        <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 mt-1" />

        {/* Share label */}
        <div className="py-3 px-2">
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Share
          </span>
        </div>
      </div>

      {/* Bottom vertical line */}
      <div className="w-px h-12 bg-gradient-to-b from-navy-600/40 to-transparent dark:from-slate-400/30" />
    </motion.div>
  );
}
