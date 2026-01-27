import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-2 w-full z-50 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold mb-2 inline-block">
              <span className="gradient-text">BF</span>
              <span className="text-foreground">V</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bruno Ferreira Vieira. Todos os direitos reservados.
            </p>
          </div>

          {/* Social Links */}
          
          <div className="flex items-center gap-4">
            {/**
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>x */}
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> e muito café
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
