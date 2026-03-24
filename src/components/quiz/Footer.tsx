import { Linkedin, Github, Mail, Globe, Phone } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/kerolos-sameh-523836247", color: "hover:text-[#0077B5]" },
  { icon: Github, label: "GitHub", href: "https://github.com/Kerosameh2025", color: "hover:text-foreground" },
  { icon: Phone, label: "WhatsApp", href: "https://wa.me/201202539386", color: "hover:text-[#25D366]" },
  { icon: Mail, label: "Gmail", href: "mailto:kero.sameh.2024@gmail.com", color: "hover:text-[#EA4335]" },
  { icon: Globe, label: "Portfolio", href: "https://myportfolio.com", color: "hover:text-secondary" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground font-medium">
          تم التطوير بواسطة Kerolos Sameh Garas ❤️ | تواصل معي
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`p-2.5 rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-md ${link.color}`}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} مسابقة مسيحية — نطلب صلواتكم من أجل أن يستخدمنا الرب لمجده
        </p>
      </div>
    </footer>
  );
};

export default Footer;
