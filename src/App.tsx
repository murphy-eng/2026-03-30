import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Globe, ChevronDown, Phone, Mail, MapPin, 
  HardHat, ClipboardCheck, Factory, Award, 
  Building2, Users, History, Globe2, FileText, 
  TrendingUp, ShieldCheck, Briefcase, HeartHandshake,
  ExternalLink, ArrowRight, Calendar, Newspaper, Image as ImageIcon,
  BarChart3, Download, Search, Filter, ChevronRight
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate
} from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { cn } from "./lib/utils";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { label: "首頁", href: "/" },
  { 
    label: "關於騏億鑫", 
    href: "/about",
    children: [
      { label: "公司簡介", href: "/about#profile" },
      { label: "組織架構", href: "/about#org" },
      { label: "沿革與發展", href: "/about#history" },
      { label: "營運布局", href: "/about#operations" },
    ]
  },
  { 
    label: "最新消息", 
    href: "/news",
    children: [
      { label: "各項公告", href: "/news#announcements" },
      { label: "媒體報導", href: "/news#media" },
      { label: "活動花絮", href: "/news#events" },
    ]
  },
  { 
    label: "服務項目", 
    href: "/services",
    children: [
      { label: "工程服務", href: "/services#eng-services" },
      { label: "工程實績", href: "/services#track-record" },
      { label: "專業證照與認證", href: "/services#certs" },
    ]
  },
  { 
    label: "投資人專區", 
    href: "/investors",
    children: [
      { label: "財務資訊", href: "/investors#finance" },
      { label: "股東專欄", href: "/investors#shareholders" },
      { label: "公司治理", href: "/investors#governance" },
    ]
  },
  { label: "聯絡我們", href: "/contact" },
];

const LANGUAGES = ["繁體中文", "English", "日本語"];

// --- Helper Components ---

const SectionHeader = ({ title, subtitle, light = false, center = false }: { title: string, subtitle?: string, light?: boolean, center?: boolean }) => (
  <div className={cn("mb-12", center && "text-center")}>
    <p className={cn("text-xs tracking-[0.2em] uppercase font-bold mb-3", light ? 'text-blue-400' : 'text-blue-700')}>
      {subtitle}
    </p>
    <h2 className={cn("text-3xl md:text-4xl font-bold mb-6", light ? 'text-white' : 'text-gray-900')}>
      {title}
    </h2>
    <div className={cn("w-16 h-1", light ? 'bg-blue-400' : 'bg-blue-700', center && "mx-auto")}></div>
  </div>
);

const PageHero = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => (
  <section className="relative h-[45vh] min-h-[350px] flex items-center bg-gray-900 pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-blue-900/20 to-gray-900/80" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{title}</h1>
        <div className="flex items-center gap-4 text-blue-100/80 text-sm font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span>{title}</span>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- Layout Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("繁體中文");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-white/95 backdrop-blur-md h-20 border-gray-100 shadow-sm" : "bg-transparent h-24 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300",
            scrolled ? "bg-blue-900" : "bg-white"
          )}>
            <span className={cn("font-bold text-2xl", scrolled ? "text-white" : "text-blue-900")}>CYH</span>
          </div>
          <div className="flex flex-col">
            <span className={cn("font-bold text-xl leading-tight tracking-tight transition-colors", scrolled ? "text-gray-900" : "text-white")}>騏億鑫科技</span>
            <span className={cn("text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors", scrolled ? "text-gray-500" : "text-white/70")}>ChiYiHsin Technology</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group">
              <Link 
                to={item.href} 
                className={cn(
                  "text-sm font-bold transition-all flex items-center gap-1 py-8 relative after:absolute after:bottom-6 after:left-0 after:w-0 after:h-0.5 after:bg-blue-700 after:transition-all group-hover:after:w-full",
                  scrolled ? "text-gray-700 hover:text-blue-700" : "text-white hover:text-blue-400"
                )}
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="opacity-50" />}
              </Link>
              {item.children && (
                <div className="absolute top-full right-0 w-56 bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 rounded-sm">
                  {item.children.map((child) => (
                    <Link 
                      key={child.label} 
                      to={child.href}
                      className="block px-6 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="relative group ml-4">
            <button className={cn(
              "flex items-center gap-2 text-xs font-bold border px-4 py-2 rounded-full transition-all",
              scrolled ? "text-gray-600 border-gray-200 hover:bg-gray-50" : "text-white border-white/30 hover:bg-white/10"
            )}>
              <Globe size={14} />
              {lang}
              <ChevronDown size={12} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 rounded-sm">
              {LANGUAGES.map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-full text-left px-6 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <button className={cn("lg:hidden p-2 transition-colors", scrolled ? "text-gray-600" : "text-white")} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col"
          >
            <div className="h-24 flex items-center justify-between px-4 border-b border-gray-100">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-sm">
                  <span className="text-white font-bold text-xl">CYH</span>
                </div>
                <span className="font-bold text-xl text-gray-900">騏億鑫科技</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600"><X size={32} /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="mb-8">
                  <Link to={item.href} className="text-2xl font-bold text-gray-900 block mb-4">{item.label}</Link>
                  {item.children && (
                    <div className="pl-6 flex flex-col gap-4 border-l-2 border-blue-100">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} className="text-lg font-medium text-gray-500 hover:text-blue-700">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-950 text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-xl">CYH</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">騏億鑫科技</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            致力於高科技廠房廠務系統工程，提供專業、穩重、創新的全方位解決方案。
          </p>
          <div className="flex gap-4">
            {/* Social icons placeholder */}
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"><Globe size={18} /></div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"><Mail size={18} /></div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative after:absolute after:bottom-[-12px] after:left-0 after:w-8 after:h-0.5 after:bg-blue-700">關於我們</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about#profile" className="hover:text-white transition-colors">公司簡介</Link></li>
            <li><Link to="/about#org" className="hover:text-white transition-colors">組織架構</Link></li>
            <li><Link to="/about#history" className="hover:text-white transition-colors">沿革與發展</Link></li>
            <li><Link to="/about#operations" className="hover:text-white transition-colors">營運布局</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative after:absolute after:bottom-[-12px] after:left-0 after:w-8 after:h-0.5 after:bg-blue-700">服務項目</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/services#eng-services" className="hover:text-white transition-colors">工程服務</Link></li>
            <li><Link to="/services#track-record" className="hover:text-white transition-colors">工程實績</Link></li>
            <li><Link to="/services#certs" className="hover:text-white transition-colors">專業證照與認證</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative after:absolute after:bottom-[-12px] after:left-0 after:w-8 after:h-0.5 after:bg-blue-700">聯絡資訊</h4>
          <ul className="space-y-6 text-sm text-gray-400">
            <li className="flex items-start gap-4">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
              <span>台中市大雅區中清路四段... (範例地址)</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={20} className="text-blue-500 shrink-0" />
              <span>04-25670993</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={20} className="text-blue-500 shrink-0" />
              <span>cyh.mis@cyhco.com.tw</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-gray-500 uppercase tracking-[0.2em] font-bold">
        <p>© 2026 騏億鑫科技股份有限公司 CHIYIHISIN TECHNOLOGY CO., LTD.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const HomePage = () => (
  <main>
    <section className="relative h-screen flex items-center bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/seed/industrial/1920/1080" alt="Hero" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-3xl">
          <p className="text-blue-400 font-bold tracking-[0.4em] uppercase mb-6 text-sm">Professional Engineering Solutions</p>
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            高科技廠房<br /><span className="text-blue-500">廠務系統</span>專家
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl font-medium">
            騏億鑫科技致力於提供整體評估設計、施作，以及廠務系統工程相關材料之生產、組裝及銷售。
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/services" className="group bg-blue-700 hover:bg-blue-600 text-white px-10 py-5 rounded-sm font-bold transition-all flex items-center gap-3">
              了解服務項目 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/about" className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-md px-10 py-5 rounded-sm font-bold border border-white/20 transition-all">
              關於騏億鑫
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
        <ChevronDown size={32} />
      </div>
    </section>

    {/* Acter Style Layout - Clean & Professional */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 -z-10"></div>
            <img src="https://picsum.photos/seed/engineering/1200/800" alt="Engineering" className="rounded-sm shadow-3xl w-full" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-12 -right-12 bg-blue-900 p-12 text-white hidden xl:block rounded-sm">
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Years of Excellence</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionHeader title="致力於卓越工程" subtitle="COMMITMENT TO EXCELLENCE" />
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              我們深知高科技產業對精準與穩定的嚴苛要求。騏億鑫科技以專業的技術團隊為核心，為半導體、面板、生技等產業提供最可靠的廠務工程服務。
            </p>
            <div className="space-y-8 mb-12">
              {[
                { title: "專業技術團隊", desc: "擁有豐富經驗的工程師與技術人員。" },
                { title: "嚴謹品質控管", desc: "符合國際標準的施工作業流程。" },
                { title: "創新解決方案", desc: "針對客戶需求提供客製化優化方案。" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0 font-bold">0{i+1}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="group inline-flex items-center gap-3 text-blue-700 font-bold hover:gap-5 transition-all">
              了解更多公司資訊 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <SectionHeader title="核心服務項目" subtitle="CORE SERVICES" />
          <Link to="/services" className="mb-12 text-sm font-bold text-blue-700 border-b-2 border-blue-700 pb-1 hover:text-blue-900 hover:border-blue-900 transition-colors">查看所有服務</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "工程服務", icon: <HardHat size={40} />, desc: "高科技廠房整體評估與設計施作，包含水、電、氣、化等系統。" },
            { title: "工程實績", icon: <ClipboardCheck size={40} />, desc: "豐富的產業合作經驗，涵蓋國內外知名半導體與光電大廠。" },
            { title: "材料生產", icon: <Factory size={40} />, desc: "自主研發與生產高品質廠務系統相關材料，確保工程品質。" },
            { title: "專業認證", icon: <Award size={40} />, desc: "具備多項國際 ISO 認證與專業工程執照，品質有保障。" },
          ].map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-sm shadow-sm hover:shadow-2xl transition-all group border-t-4 border-transparent hover:border-blue-700"
            >
              <div className="text-blue-700 mb-8 group-hover:scale-110 transition-transform duration-500">{s.icon}</div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{s.desc}</p>
              <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest group-hover:gap-4 transition-all">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const AboutPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main>
      <PageHero title="關於騏億鑫" subtitle="專業、穩重、創新的高科技廠務工程專家" image="https://picsum.photos/seed/about-hero/1920/600" />
      
      <section id="profile" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <SectionHeader title="公司簡介" subtitle="COMPANY PROFILE" />
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  騏億鑫科技股份有限公司（CYH）成立於高科技產業蓬勃發展之際，專注於提供高科技廠房廠務系統工程的全方位解決方案。
                </p>
                <p>
                  我們擁有一支由資深工程師與技術專家組成的核心團隊，在半導體、面板、太陽能及生技產業累積了深厚的工程實務經驗。從前期的規劃設計、材料選用、到現場的施作管理與後期的維護保養，我們始終堅持最高標準。
                </p>
                <p>
                  「專業、穩重、創新、誠信」不僅是我們的經營理念，更是我們對每一位客戶的承諾。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "專業技術", icon: <ShieldCheck size={32} /> },
                { label: "穩健經營", icon: <TrendingUp size={32} /> },
                { label: "創新思維", icon: <Briefcase size={32} /> },
                { label: "誠信合作", icon: <HeartHandshake size={32} /> }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-10 rounded-sm text-center hover:bg-blue-900 hover:text-white transition-all group">
                  <div className="text-blue-700 mb-4 group-hover:text-blue-400 transition-colors flex justify-center">{item.icon}</div>
                  <h4 className="font-bold text-lg">{item.label}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asolid-tek Style Milestones - Vertical Timeline */}
      <section id="history" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="沿革與發展" subtitle="MILESTONES" center />
          <div className="mt-24 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:w-0.5 before:h-full before:bg-blue-100">
            {[
              { year: "2025", title: "營運新篇章", desc: "遷入全新企業總部，擴大研發中心與生產基地，並啟動海外市場布局。" },
              { year: "2022", title: "技術領航", desc: "成功研發新一代智慧廠務監控系統，大幅提升系統穩定性與能源效率。" },
              { year: "2019", title: "產業深耕", desc: "成為多家國際知名半導體大廠之長期合作夥伴，工程實績突破百案。" },
              { year: "2018", title: "品質保證", desc: "通過 ISO 9001:2015 品質管理系統認證，建立標準化作業流程。" },
              { year: "2015", title: "公司創立", desc: "騏億鑫科技正式成立，初期專注於特殊氣體管路工程設計與施作。" },
            ].map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={cn(
                  "relative mb-24 flex flex-col md:flex-row items-center",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-blue-700 z-10 flex items-center justify-center font-bold text-blue-700 shadow-lg">
                  {m.year.slice(2)}
                </div>
                <div className="md:w-1/2 pl-16 md:pl-0 md:px-20">
                  <div className={cn(
                    "bg-white p-10 rounded-sm shadow-xl border-l-4 border-blue-700",
                    i % 2 === 0 ? "text-left" : "md:text-right md:border-l-0 md:border-r-4"
                  )}>
                    <span className="text-3xl font-bold text-blue-900 mb-4 block">{m.year}</span>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">{m.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="org" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeader title="組織架構" subtitle="ORGANIZATION" center />
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-blue-900 text-white p-6 rounded-sm mb-12 inline-block px-16 font-bold text-xl shadow-xl">董事會</div>
            <div className="w-px h-12 bg-blue-200 mx-auto"></div>
            <div className="bg-blue-700 text-white p-6 rounded-sm mb-12 inline-block px-16 font-bold text-xl shadow-xl">總經理室</div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {["工程管理部", "技術研發部", "業務開發部", "品質保證部", "行政財務部"].map(dept => (
                <div key={dept} className="bg-gray-50 p-8 shadow-sm border border-gray-100 font-bold text-gray-800 hover:bg-blue-50 hover:border-blue-200 transition-all">
                  {dept}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ServicesPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main>
      <PageHero title="服務項目" subtitle="全方位的高科技廠務工程解決方案" image="https://picsum.photos/seed/services-hero/1920/600" />
      
      <section id="eng-services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="工程服務" subtitle="ENGINEERING SERVICES" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
            {[
              { title: "特殊氣體系統", desc: "高純度氣體供應系統、氣瓶櫃(GC)及分配盤(VMB)之規劃施作。" },
              { title: "化學供應系統", desc: "各式化學品儲存與輸送系統、自動稀釋與混合設備安裝。" },
              { title: "純水/廢水處理", desc: "超純水系統(UPW)與製程廢水回收處理系統之設計與建造。" },
              { title: "真空/排氣系統", desc: "製程真空系統與酸鹼、有機排氣處理工程。" },
              { title: "自動化監控", desc: "廠務中央監控系統(FMCS)與各項製程監控介面整合。" },
              { title: "無塵室工程", desc: "潔淨室隔間、空調及各項機電二次配工程。" },
            ].map((s, i) => (
              <div key={s.title} className="group p-10 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-2 border-transparent hover:border-blue-700">
                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-sm text-blue-700 shadow-sm mb-8 group-hover:bg-blue-700 group-hover:text-white transition-all">
                  <span className="text-2xl font-bold">0{i+1}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="track-record" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="工程實績" subtitle="TRACK RECORD" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-72 overflow-hidden relative group">
                  <img src={`https://picsum.photos/seed/project-${i}/800/600`} alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button className="bg-white text-blue-900 px-6 py-2 font-bold text-xs uppercase tracking-widest">View Details</button>
                  </div>
                </div>
                <div className="p-10">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-[0.2em] mb-3 block">Semiconductor Plant</span>
                  <h4 className="font-bold text-xl mb-4 leading-tight">知名半導體大廠 12 吋廠特殊氣體系統擴建工程</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">負責全廠特殊氣體管路配置、GC/VMB 安裝及自動化監控系統整合。</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// --- News Page (Asolid-tek Album Style) ---
const NewsPage = () => {
  const [filter, setFilter] = useState("全部消息");
  const categories = ["全部消息", "各項公告", "媒體報導", "活動花絮"];

  const newsItems = [
    { id: 1, category: "各項公告", date: "2026.03.15", title: "騏億鑫科技 2026 第一季營運報告發布", image: "https://picsum.photos/seed/news1/800/600" },
    { id: 2, category: "媒體報導", date: "2026.02.28", title: "深耕高科技廠務工程，騏億鑫獲選年度優良廠商", image: "https://picsum.photos/seed/news2/800/600" },
    { id: 3, category: "活動花絮", date: "2026.01.10", title: "2025 年度尾牙晚會圓滿落幕，感謝全體同仁辛勞", image: "https://picsum.photos/seed/news3/800/600" },
    { id: 4, category: "各項公告", date: "2025.12.20", title: "騏億鑫科技榮獲 ISO 45001 職業安全衛生認證", image: "https://picsum.photos/seed/news4/800/600" },
    { id: 5, category: "媒體報導", date: "2025.11.15", title: "專訪騏億鑫總經理：以創新技術驅動綠色廠務", image: "https://picsum.photos/seed/news5/800/600" },
    { id: 6, category: "活動花絮", date: "2025.10.05", title: "騏億鑫科技年度員工家庭日，凝聚團隊向心力", image: "https://picsum.photos/seed/news6/800/600" },
  ];

  const filteredNews = filter === "全部消息" ? newsItems : newsItems.filter(item => item.category === filter);

  return (
    <main>
      <PageHero title="最新消息" subtitle="掌握騏億鑫科技的最新動態與產業資訊" image="https://picsum.photos/seed/news-hero/1920/600" />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-16 justify-center">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all border",
                  filter === cat ? "bg-blue-700 border-blue-700 text-white shadow-lg" : "bg-white border-gray-200 text-gray-500 hover:border-blue-700 hover:text-blue-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Album Style Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6 shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-blue-700 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      {item.category}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-900">
                        <Search size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <span className="text-xs font-mono text-gray-400 mb-2 block">{item.date}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

// --- Investors Page (Compal Style Charts) ---
const InvestorsPage = () => {
  const revenueData = [
    { month: '2025/07', revenue: 1250, yoy: 12.5 },
    { month: '2025/08', revenue: 1320, yoy: 15.2 },
    { month: '2025/09', revenue: 1450, yoy: 18.1 },
    { month: '2025/10', revenue: 1380, yoy: 10.5 },
    { month: '2025/11', revenue: 1520, yoy: 20.2 },
    { month: '2025/12', revenue: 1680, yoy: 25.4 },
  ];

  return (
    <main>
      <PageHero title="投資人專區" subtitle="透明、誠信、永續的投資人溝通平台" image="https://picsum.photos/seed/investors-hero/1920/600" />
      
      <section id="finance" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="營收概況" subtitle="REVENUE OVERVIEW" />
          
          {/* Compal Style Revenue Chart */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-sm shadow-sm mb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">每月營收報告</h3>
                <p className="text-sm text-gray-500">單位：新台幣百萬元</p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
                  <Download size={14} /> 下載數據 (Excel)
                </button>
                <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 text-xs font-bold hover:bg-blue-800 transition-all">
                  <FileText size={14} /> 財務報告 (PDF)
                </button>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                  <Bar yAxisId="left" dataKey="revenue" name="營收金額" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="yoy" name="年增率 (%)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "公司概況", icon: <Building2 size={32} />, items: ["基本資料", "主要股東", "經營團隊"] },
              { title: "經營成果", icon: <TrendingUp size={32} />, items: ["每月營收報告", "季度財務報告", "年度財務報告"] },
              { title: "財務報告", icon: <FileText size={32} />, items: ["資產負債表", "綜合損益表", "現金流量表"] },
            ].map(f => (
              <div key={f.title} className="bg-white p-10 border border-gray-100 hover:shadow-xl transition-all group">
                <div className="text-blue-700 mb-8 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="text-xl font-bold mb-8 text-gray-900">{f.title}</h4>
                <ul className="space-y-5">
                  {f.items.map(item => (
                    <li key={item} className="flex items-center justify-between text-sm font-medium text-gray-500 hover:text-blue-700 cursor-pointer group/item">
                      {item} <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Re-importing ComposedChart since it was used but not imported
import { ComposedChart } from 'recharts';

const ContactPage = () => (
  <main>
    <PageHero title="聯絡我們" subtitle="期待與您的合作，為您提供最專業的服務" image="https://picsum.photos/seed/contact-hero/1920/600" />
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <SectionHeader title="聯絡資訊" subtitle="CONTACT INFO" />
            <div className="space-y-12 mt-16">
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><MapPin size={28} /></div>
                <div><h4 className="font-bold text-xl mb-2">公司地址</h4><p className="text-gray-500 leading-relaxed">台中市大雅區中清路四段... (範例地址)</p></div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><Phone size={28} /></div>
                <div><h4 className="font-bold text-xl mb-2">電話號碼</h4><p className="text-gray-500 leading-relaxed">04-25670993</p></div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><Mail size={28} /></div>
                <div><h4 className="font-bold text-xl mb-2">電子郵件</h4><p className="text-gray-500 leading-relaxed">cyh.mis@cyhco.com.tw</p></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-12 md:p-16 rounded-sm">
            <SectionHeader title="線上諮詢" subtitle="ONLINE INQUIRY" />
            <form className="mt-12 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Name</label><input type="text" className="w-full bg-white border border-gray-200 p-5 focus:outline-none focus:border-blue-700 transition-all" placeholder="您的姓名" /></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Phone</label><input type="text" className="w-full bg-white border border-gray-200 p-5 focus:outline-none focus:border-blue-700 transition-all" placeholder="您的電話" /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Email</label><input type="email" className="w-full bg-white border border-gray-200 p-5 focus:outline-none focus:border-blue-700 transition-all" placeholder="您的電子郵件" /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Message</label><textarea className="w-full bg-white border border-gray-200 p-5 h-40 focus:outline-none focus:border-blue-700 transition-all" placeholder="請輸入您的訊息內容"></textarea></div>
              <button type="submit" className="w-full bg-blue-900 text-white font-bold py-6 hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                送出訊息 <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
