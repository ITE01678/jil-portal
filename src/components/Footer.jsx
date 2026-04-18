import { Link } from "react-router-dom";
import { JupiterLogoIcon } from "./JupiterLogo";

const PUBLIC_LINKS = [
  { label: "Home",               path: "/"                   },
  { label: "About Us",           path: "/about"              },
  { label: "Products",           path: "/products"           },
  { label: "Manufacturing",      path: "/manufacturing"      },
  { label: "Beyond Profit",      path: "/beyond-profit"      },
  { label: "Investor Relations", path: "/investor-relations" },
  { label: "Media",              path: "/media"              },
  { label: "Careers",            path: "/careers"            },
  { label: "Contact Us",         path: "/contact"            },
];

const EMPLOYEE_LINKS = [
  { label: "Dashboard",      path: "/employee/dashboard"      },
  { label: "Forms Hub",      path: "/employee/forms"          },
  { label: "Teams Chat",     path: "/employee/chat"           },
  { label: "Fun Zone",       path: "/employee/fun"            },
  { label: "Infrastructure", path: "/employee/infrastructure" },
];

/* ── Compact footer — employee layout ────────────────────────────── */
function CompactFooter() {
  return (
    <footer className="border-t border-[#7a9fb8]/40 dark:border-[#1a2d42]/80 bg-[#dceef8] dark:bg-[#03080f] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
      <span>© {new Date().getFullYear()} Jupiter International Limited · All rights reserved.</span>
      <div className="flex items-center gap-4">
        {["Privacy", "Terms"].map(t => (
          <a key={t} href="#" className="hover:text-solar-500 transition-colors duration-150">{t}</a>
        ))}
        <Link to="/" className="hover:text-solar-500 transition-colors duration-150">Public Site</Link>
      </div>
    </footer>
  );
}

/* ── Full footer — public layout ─────────────────────────────────── */
function FullFooter() {
  return (
    <footer className="bg-[#0c1e30] dark:bg-[#020810] text-slate-400">
      {/* Solar gradient top bar */}
      <div className="h-0.5 bg-gradient-to-r from-solar-500 via-amber-400 to-leaf-500" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <JupiterLogoIcon size={52} />
            <div>
              <p className="text-white font-extrabold text-base leading-none">Jupiter</p>
              <p className="text-slate-500 text-[10px] tracking-widest uppercase font-medium leading-none mt-0.5">International Limited</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            India's leading Mono PERC solar cell manufacturer. 0.96 GW capacity. 16+ years powering the green energy revolution.
          </p>
          <div className="space-y-1.5 text-xs">
            <p className="flex items-start gap-2"><span className="text-solar-400 flex-shrink-0">✉</span> info@jil-jupiter.com</p>
            <p className="flex items-start gap-2"><span className="text-solar-400 flex-shrink-0">📞</span> +91 33 4015 9000</p>
            <p className="flex items-start gap-2"><span className="text-solar-400 flex-shrink-0">📍</span> Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019, WB</p>
          </div>
        </div>

        {/* Company links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5">
            {PUBLIC_LINKS.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm hover:text-solar-400 transition-colors duration-150">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Employee Portal */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Employee Portal</h4>
          <ul className="space-y-2.5">
            {EMPLOYEE_LINKS.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm hover:text-solar-400 transition-colors duration-150">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-2.5">Certifications</h4>
            <ul className="space-y-1.5 text-xs">
              {["TÜV Rheinland", "Fraunhofer ISE", "SGS Certified", "ISO 9001", "ISO 14001"].map(c => (
                <li key={c} className="flex items-center gap-2">
                  <span className="text-leaf-400">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ESG & Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Sustainability</h4>
          <ul className="space-y-2 text-sm">
            {[
              { icon: "🌱", text: "Zero Liquid Discharge" },
              { icon: "🌳", text: "50,000+ Trees Planted" },
              { icon: "☀️", text: "200+ Solar for Schools" },
              { icon: "💧", text: "Water Conservation" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span>{item.icon}</span>
                <span className="text-xs">{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link to="/beyond-profit" className="inline-block text-xs text-leaf-400 hover:text-leaf-300 font-semibold transition-colors">
              Our ESG Report →
            </Link>
          </div>
          <div className="pt-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-2.5">Career</h4>
            <p className="text-xs leading-relaxed mb-2">
              Join our team at one of our facilities across India.
            </p>
            <a href="mailto:career@jil-jupiter.com" className="text-xs text-solar-400 hover:text-solar-300 font-semibold transition-colors">
              career@jil-jupiter.com →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#162e44] dark:border-[#0d1c2a]/60 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Jupiter International Limited · Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019 · All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use"].map(t => (
              <a key={t} href="#" className="hover:text-solar-400 transition-colors duration-150">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer({ compact = false }) {
  return compact ? <CompactFooter /> : <FullFooter />;
}
