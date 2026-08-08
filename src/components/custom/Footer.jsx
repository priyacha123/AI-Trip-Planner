import { Twitter, Github, Instagram } from "lucide-react";

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
      className={`w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-primary rounded-[6px] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-[13px] h-[13px] fill-none stroke-primary"
        strokeWidth={1.8}
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border px-6 md:px-10 py-14 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 no-underline mb-3">
              <LogoMark />
              <span className="text-[15px] font-medium text-foreground tracking-tight">
                JOURNI
              </span>
            </a>

            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-[200px]">
              AI-powered travel planning. Built on Claude. Free to start.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" strokeWidth={1.8} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" strokeWidth={1.8} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                {heading}
              </h5>

              <ul className="list-none flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-light text-muted-foreground no-underline hover:text-foreground transition-colors duration-150"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border">
          <span className="text-sm text-muted-foreground">
            © 2026 JOURNI
          </span>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
