const FOOTER_COLS = [
  {
    heading: "Product",
    links: ["How it works", "Features", "Pricing", "Changelog", "API"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy policy", "Terms of service", "Cookie settings", "Status"],
  },
];

function LogoMark({ className = "" }) {
  return (
    <div
      className={`w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-stone-900 rounded-[6px] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-[13px] h-[13px] fill-none stroke-stone-900"
        strokeWidth={1.8}
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 pt-10 pb-8 px-10">
      <div className="max-w-4xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 no-underline mb-3">
              <LogoMark />
              <span className="text-[15px] font-medium text-stone-900 tracking-tight">
                Voyara
              </span>
            </a>

            <p className="text-[13px] font-light text-stone-400 leading-[1.6] max-w-[200px]">
              AI-powered travel planning. Built on Claude. Free to start.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              {/* Twitter / X */}
              <a
                href="#"
                className="w-[32px] h-[32px] flex items-center justify-center rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
                aria-label="Twitter"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[13px] h-[13px] stroke-stone-500 fill-none"
                  strokeWidth={1.8}
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="#"
                className="w-[32px] h-[32px] flex items-center justify-center rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[13px] h-[13px] stroke-stone-500 fill-none"
                  strokeWidth={1.8}
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-[32px] h-[32px] flex items-center justify-center rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[13px] h-[13px] stroke-stone-500 fill-none"
                  strokeWidth={1.8}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 className="text-[11px] font-medium text-stone-400 tracking-[0.08em] uppercase mb-3">
                {heading}
              </h5>

              <ul className="list-none flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13.5px] font-light text-stone-500 no-underline hover:text-stone-900 transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-5 border-t border-stone-200">
          <span className="text-[12.5px] text-stone-400">
            © 2026 Voyara
          </span>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[12.5px] text-stone-400 no-underline hover:text-stone-600 transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[12.5px] text-stone-400 no-underline hover:text-stone-600 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}