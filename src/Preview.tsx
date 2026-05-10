import { useState, useRef } from "react";
import { SiteConfig } from "./types";
import { 
  PenTool, 
  Layout, 
  Cpu, 
  BarChart, 
  RefreshCw, 
  Lightbulb,
  ArrowRight,
  Send,
  Plus,
  X,
  User,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  "pen-tool": PenTool,
  "layout": Layout,
  "cpu": Cpu,
  "bar-chart": BarChart,
  "refresh-cw": RefreshCw,
  "lightbulb": Lightbulb,
};

interface PreviewProps {
  config: SiteConfig;
}

export function Preview({ config }: PreviewProps) {
  const { theme, hero, marquee, about, stats, services, works, blog, contact, footer } = config;
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Contact state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const activeArticle = blog.items.find(item => item.id === selectedArticle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      if (contact.form.formActionUrl) {
        const response = await fetch(contact.form.formActionUrl, {
          method: "POST",
          body: formData, // Formspree prefers FormData
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error("Submission failed");
      } else {
        // Mock success if no endpoint is configured
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setIsSubmitted(true);
      toast.success("メッセージが送信されました。内容を確認次第、ご連絡いたします。");
    } catch (error) {
      toast.error("送信に失敗しました。正しいメールアドレスか確認するか、時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextWithBreaks = (text: string) => {
    if (!text) return null;
    // Replace <br> or <br/> with newline just in case they are in the string
    const processedText = text.replace(/<br\s*\/?>/gi, "\n");
    const lines = processedText.split("\n");
    return lines.map((line, i) => (
      <span key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div 
      className="relative w-full min-h-screen font-sans selection:bg-accent selection:text-navy overflow-x-hidden"
      style={{ 
        backgroundColor: theme.navy,
        color: theme.silver,
        "--accent": theme.accentColor,
      } as any}
    >
      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-navy/95 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-navy2 border border-white/10 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <div className="font-mono text-[10px] text-accent tracking-[.2em] uppercase">
                  {activeArticle.date} · {activeArticle.category}
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-silver3 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <article className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-silver prose-p:leading-loose prose-strong:text-white prose-strong:font-bold prose-code:text-accent">
                  <ReactMarkdown>{activeArticle.content || ""}</ReactMarkdown>
                </article>
              </div>
              <div className="p-6 border-t border-white/10 bg-navy2 shrink-0">
                <p className="text-[10px] text-silver3 font-mono leading-relaxed">
                  ※ 本記事は正確な医療情報の提供を目的としていますが、実際の診断については医療機関にご相談ください。
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid BG */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(200,212,224,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,224,0.14) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-navy/88 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: `${theme.navy}E0` }}>
        <div className="font-mono text-xs tracking-widest uppercase text-silver2">
          {footer.logo}
        </div>
        
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {config.navigation.links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="text-[11px] tracking-widest uppercase text-silver3 hover:text-white transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-silver2 p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <div className="space-y-1.5"><div className="w-5 h-0.5 bg-accent" /><div className="w-5 h-0.5 bg-accent" /></div>}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-[65px] bg-navy z-40 flex flex-col p-8 md:hidden"
            >
              <ul className="flex flex-col gap-8 list-none">
                {config.navigation.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-serif text-white hover:text-accent transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 max-w-5xl mx-auto relative group">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-6"
          >
            <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-7 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              {hero.tag}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end gap-10 mb-10">
              <h1 
                className="font-serif text-5xl md:text-8xl font-normal leading-tight md:leading-[1.0] text-white tracking-tighter"
                dangerouslySetInnerHTML={{ __html: hero.title }}
              />
              <div className="flex flex-col items-center md:items-end gap-4 shrink-0 relative">
                <div className="absolute inset-[-30px] bg-[radial-gradient(circle,rgba(201,169,110,0.09)_0%,transparent_65%)] pointer-events-none" />
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-accent/30 p-1.5 bg-navy2 overflow-hidden relative">
                  {hero.avatar.url ? (
                    <img 
                      src={hero.avatar.url} 
                      alt={hero.avatar.name} 
                      className="w-full h-full rounded-full object-cover" 
                      style={{ objectPosition: hero.avatar.objectPosition || "center" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <User className="w-12 h-12 text-white/20" />
                    </div>
                  )}
                </div>
                <div className="font-mono text-[11px] tracking-widest text-silver3 text-right uppercase">
                  {hero.avatar.name}
                </div>
              </div>
            </div>

            <p className="text-base text-silver max-w-xl mb-10 font-light leading-relaxed">
              {hero.subtext}
            </p>

            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href={hero.ctas.primary.href} className="flex-1 md:flex-none text-center px-8 py-3.5 border border-accent text-accent text-[11px] tracking-widest uppercase hover:bg-accent hover:text-navy transition-all duration-300 font-mono">
                {hero.ctas.primary.label}
              </a>
              <a href={hero.ctas.secondary.href} className="flex-1 md:flex-none text-center font-mono text-[11px] tracking-widest text-silver3 hover:text-silver transition-colors flex items-center justify-center gap-2 uppercase">
                {hero.ctas.secondary.label}
              </a>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-12 flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-silver3 uppercase">
            <div className="w-px h-14 bg-gradient-to-b from-accent/50 to-transparent animate-[scrollPulse_2.2s_ease-in-out_infinite]" />
            scroll
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden py-6 border-y border-white/10 relative z-10">
          <div className="absolute inset-y-0 left-0 w-48 z-20 pointer-events-none bg-gradient-to-r from-navy to-transparent" />
          <div className="absolute inset-y-0 right-0 w-48 z-20 pointer-events-none bg-gradient-to-l from-navy to-transparent" />
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {marquee.map((item, j) => (
                  <span key={j} className="flex items-center px-10 font-serif text-xl italic tracking-wider text-silver2 hover:text-silver transition-colors">
                    {item}
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent ml-10 shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-b border-white/10">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-12 flex items-center gap-3 before:content-[attr(data-label)] before:opacity-70 after:flex-1 after:h-px after:bg-gradient-to-r after:from-white/10 after:to-transparent" data-label={config.labels.about}>
            {config.labels.about}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-20">
            <div>
              <h2 
                className="font-serif text-3xl md:text-6xl text-white mb-6 tracking-tight leading-tight"
                dangerouslySetInnerHTML={{ __html: about.title }}
              />
              <div className="flex flex-wrap gap-2 mt-8">
                {about.tags.map((tag, i) => (
                  <span key={i} className="font-mono text-[10px] px-3 py-1.5 border border-white/14 text-silver3 tracking-wider hover:border-silver3 hover:text-silver2 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {about.textBlocks.map((text, i) => (
                <p key={i} className={cn("text-silver leading-loose text-sm", i > 0 && "mt-5")} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
              <div className="mt-7 p-6 border-l-2 border-accent bg-accent/5">
                <p className="font-mono text-xs text-silver tracking-tight leading-relaxed italic">
                  &ldquo;{about.highlight}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 bg-white/14 border border-white/14 mt-20 gap-px">
            {about.values.map((v, i) => (
              <div key={i} className="bg-navy p-9 hover:bg-navy2 transition-colors relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="font-mono text-[10px] text-silver3 tracking-widest mb-5">{v.num}</div>
                <div className="text-sm font-medium text-white mb-3">{v.title}</div>
                <p className="text-[13px] text-silver leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-x border-white/10 max-w-5xl mx-auto md:my-16">
          {stats.map((stat, i) => (
            <div key={i} className="py-12 px-8 border-b md:border-b-0 border-r-0 md:border-r border-white/10 last:border-0 text-center hover:bg-accent/5 transition-colors relative group">
              <div className="absolute top-0 left-0 hover:w-full h-0.5 bg-transparent group-hover:bg-accent transition-all duration-400" />
              <div className="font-serif text-5xl md:text-7xl text-white mb-3 tracking-tighter tabular-nums">
                {stat.value}{stat.suffix && <span className="text-accent text-[0.65em]">{stat.suffix}</span>}
              </div>
              <div className="font-mono text-[9px] text-silver3 tracking-widest uppercase whitespace-pre-wrap leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* SERVICES */}
        <section id="services" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-12 flex items-center gap-3 before:content-[attr(data-label)] before:opacity-70 after:flex-1 after:h-px after:bg-gradient-to-r after:from-white/10 after:to-transparent" data-label={config.labels.services}>
            {config.labels.services}
          </div>
          <h2 className="font-serif text-3xl md:text-6xl text-white mb-12 tracking-tight">
            {services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white/14 border border-white/14 gap-px">
            {services.items.map((s, i) => {
              const Icon = iconMap[s.icon] || Lightbulb;
              return (
                <div key={i} className="bg-navy p-8 md:p-9 hover:bg-navy2 transition-colors relative group overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  <div className="font-mono text-[10px] text-silver3 tracking-widest mb-6">{s.number}</div>
                  <Icon className="w-5 h-5 text-accent stroke-[1.5] mb-5 opacity-90" />
                  <div className="text-sm font-medium text-white mb-3 leading-snug">{s.title}</div>
                  <p className="text-[13px] text-silver leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* WORKS */}
        <section id="works" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-12 flex items-center gap-3 before:content-[attr(data-label)] before:opacity-70 after:flex-1 after:h-px after:bg-gradient-to-r after:from-white/10 after:to-transparent" data-label={config.labels.works}>
            {config.labels.works}
          </div>
          <h2 className="font-serif text-3xl md:text-6xl text-white mb-12 tracking-tight" dangerouslySetInnerHTML={{ __html: works.title }} />
          
          <div className="mt-12 group/list">
            {works.items.map((item, i) => (
              <div key={i} className={cn(
                "grid grid-cols-1 md:grid-cols-[5rem_11fr_auto] gap-6 md:gap-8 py-8 border-t border-white/10 last:border-b transition-all items-start relative",
                item.isSoon && "opacity-40 grayscale pointer-events-none"
              )}>
                <div className="font-serif text-5xl md:text-[3.5rem] text-accent/15 leading-none tracking-tight pt-1">
                  {item.number}
                </div>
                <div className="space-y-4">
                  <div className="text-xl md:text-base text-white font-medium flex items-center flex-wrap gap-2">
                    {item.name}
                    {item.isSoon && <span className="font-mono text-[9px] tracking-widest text-silver3 border border-white/20 px-2.5 py-0.5 uppercase">Coming Soon</span>}
                  </div>
                  <p className="text-sm md:text-[13px] text-silver leading-loose">{item.description}</p>
                  
                  {item.pipeline && (
                    <div className="flex items-center gap-3 mt-6 flex-wrap">
                      {item.pipeline.map((p, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="font-mono text-[10px] tracking-wider text-silver3 border border-white/10 px-3 py-2 leading-tight text-center bg-white/5">
                            {p.label}<br /><span className="text-[8px] opacity-60">{p.sub}</span>
                          </div>
                          {j < item.pipeline!.length - 1 && <ArrowRight className="w-3 h-3 text-white/20" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-1">
                  <span className="font-mono text-[10px] text-accent tracking-widest border border-accent/20 bg-accent/5 px-3 py-1 uppercase">
                    {item.category}
                  </span>
                  <span className="font-mono text-[11px] text-silver3">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-12 flex items-center gap-3 before:content-[attr(data-label)] before:opacity-70 after:flex-1 after:h-px after:bg-gradient-to-r after:from-white/10 after:to-transparent" data-label={config.labels.blog}>
            {config.labels.blog}
          </div>
          <h2 className="font-serif text-3xl md:text-6xl text-white mb-12 tracking-tight">
            {blog.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white/14 border border-white/14 gap-px">
            {blog.items.map((item, i) => (
              <div 
                key={i} 
                className={cn(
                  "bg-navy p-8 min-h-[220px] flex flex-col group relative overflow-hidden transition-colors cursor-pointer hover:bg-navy2",
                  item.isSoon && "opacity-40 pointer-events-none"
                )}
                onClick={() => setSelectedArticle(item.id)}
              >
                <div className="absolute top-0 left-0 w-0.5 h-0 bg-accent group-hover:h-full transition-all duration-500 origin-top" />
                <div className="font-mono text-[10px] text-silver3 tracking-widest mb-4">{item.date} · {item.category}</div>
                <div className="text-lg md:text-sm font-medium text-white leading-relaxed flex-1 mb-10">{item.title}</div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <span className="font-mono text-[10px] px-3 py-1.5 border border-white/10 text-silver3 tracking-wider group-hover:text-white group-hover:border-white transition-all uppercase">
                    {item.isSoon ? "Coming Soon" : "記事を読む"}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-navy transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6 md:px-12 text-center max-w-4xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mb-12 flex items-center justify-center gap-3 before:content-[attr(data-label)] before:opacity-70 after:flex-1 after:h-px after:bg-gradient-to-r after:from-white/10 after:to-transparent before:flex-1 before:h-px before:bg-gradient-to-l before:from-white/10 before:to-transparent" data-label={config.labels.contact}>
            {config.labels.contact}
          </div>
          <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest text-accent uppercase mb-6 before:content-[''] before:block before:w-6 before:h-px before:bg-accent after:content-[''] after:block after:w-6 after:h-px after:bg-accent">
            {contact.eyebrow}
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
            {contact.title}
          </h2>
          <p className="text-silver2 text-sm max-w-lg mx-auto mb-11 leading-loose">
            {renderTextWithBreaks(contact.description)}
          </p>
          <div className="max-w-[520px] mx-auto">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/10 border border-accent/30 p-12 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-2xl text-white mb-3">Thank you!</h3>
                <p className="text-silver text-sm leading-loose">
                  メッセージを送信しました。<br />内容を確認し、3営業日以内にご連絡いたします。
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 font-mono text-[10px] text-accent tracking-widest uppercase hover:text-white transition-colors"
                >
                  新しいメッセージを送る
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-silver3 tracking-widest uppercase">{contact.form.placeholders.name}</label>
                  <input required name="name" type="text" placeholder={contact.form.placeholders.name} className="w-full bg-navy2 border border-white/15 text-white p-4 px-5 font-sans text-sm focus:border-accent outline-none transition-colors placeholder:text-silver3/30 rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-silver3 tracking-widest uppercase">{contact.form.placeholders.email}</label>
                  <input required name="email" type="email" placeholder={contact.form.placeholders.email} className="w-full bg-navy2 border border-white/15 text-white p-4 px-5 font-sans text-sm focus:border-accent outline-none transition-colors placeholder:text-silver3/30 rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-silver3 tracking-widest uppercase">{contact.form.placeholders.subject}</label>
                  <input required name="subject" type="text" placeholder={contact.form.placeholders.subject} className="w-full bg-navy2 border border-white/15 text-white p-4 px-5 font-sans text-sm focus:border-accent outline-none transition-colors placeholder:text-silver3/30 rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-silver3 tracking-widest uppercase">{contact.form.placeholders.message}</label>
                  <textarea required name="message" placeholder={contact.form.placeholders.message} className="w-full bg-navy2 border border-white/15 text-white p-4 px-5 font-sans text-sm focus:border-accent outline-none transition-colors min-h-[160px] resize-none placeholder:text-silver3/30 rounded-none" />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-accent text-navy border-none font-mono text-[11px] tracking-[0.2em] uppercase font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    contact.form.buttonText
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 py-12 border-t border-white/10 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full max-w-5xl mx-auto">
          <div className="space-y-3">
            <div className="font-serif text-2xl text-white">{footer.logo}</div>
            <div className="font-mono text-[10px] text-silver3 tracking-[0.2em] uppercase">{footer.copy}</div>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
            {footer.links.map((link, i) => (
              <a key={i} href={link.href} className="font-mono text-[10px] text-silver3 hover:text-accent tracking-widest transition-colors uppercase">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="md:text-right space-y-4">
            <div className="font-mono text-[10px] text-silver3 tracking-widest">© 2026 {footer.logo}</div>
            <div className="flex gap-8 justify-center md:justify-end items-center">
              {footer.socials.map((s, i) => (
                <a key={i} href={s.href} className="font-mono text-[10px] text-silver3 hover:text-accent tracking-widest transition-colors uppercase">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
