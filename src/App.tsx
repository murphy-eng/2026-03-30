import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Globe, ChevronDown, Phone, Mail, MapPin, 
  HardHat, ClipboardCheck, Factory, Award, 
  Building2, Users, History, Globe2, FileText, 
  TrendingUp, ShieldCheck, Briefcase, HeartHandshake,
  ExternalLink, ArrowRight, Calendar, Newspaper, Image as ImageIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate
} from "react-router-dom";

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

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12">
    <h2 className={`text-3xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    {subtitle && <p className={`text-sm tracking-widest uppercase font-semibold ${light ? 'text-blue-300' : 'text-blue-700'}`}>{subtitle}</p>}
    <div className={`w-12 h-1 mt-4 ${light ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
  </div>
);

const PageHero = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => (
  <section className="relative h-[40vh] min-h-[300px] flex items-center bg-gray-900 pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-blue-900/40" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-blue-100 text-lg max-w-2xl">{subtitle}</p>
      </motion.div>
    </div>
  </section>
);

// --- Layout Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("繁體中文");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-xl">CYH</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900 leading-tight tracking-tight">騏億鑫科技</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">ChiYiHsin Technology</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group">
              <Link 
                to={item.href} 
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-8 ${
                  location.pathname === item.href ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="opacity-50" />}
              </Link>
              {item.children && (
                <div className="absolute top-full right-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {item.children.map((child) => (
                    <Link 
                      key={child.label} 
                      to={child.href}
                      className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="relative group ml-4">
            <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">
              <Globe size={14} />
              {lang}
              <ChevronDown size={12} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
              {LANGUAGES.map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-700"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="py-4 px-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link to={item.href} className="text-base font-bold text-gray-800 block mb-2">{item.label}</Link>
                  {item.children && (
                    <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-100">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} className="text-sm text-gray-500">{child.label}</Link>
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
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-lg">CYH</span>
            </div>
            <span className="font-bold text-lg tracking-tight">騏億鑫科技</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            高科技廠房廠務系統工程整體評估設計、施作，以及廠務系統工程相關材料之生產、組裝及銷售。
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-gray-200">關於我們</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/about#profile" className="hover:text-white transition-colors">公司簡介</Link></li>
            <li><Link to="/about#org" className="hover:text-white transition-colors">組織架構</Link></li>
            <li><Link to="/about#history" className="hover:text-white transition-colors">沿革與發展</Link></li>
            <li><Link to="/about#operations" className="hover:text-white transition-colors">營運布局</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-gray-200">服務項目</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/services#eng-services" className="hover:text-white transition-colors">工程服務</Link></li>
            <li><Link to="/services#track-record" className="hover:text-white transition-colors">工程實績</Link></li>
            <li><Link to="/services#certs" className="hover:text-white transition-colors">專業證照與認證</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-gray-200">聯絡資訊</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-500 shrink-0" />
              <span>台中市大雅區中清路四段...</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-500 shrink-0" />
              <span>04-25670993</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500 shrink-0" />
              <span>cyh.mis@cyhco.com.tw</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest">
        <p>© 2026 騏億鑫科技股份有限公司 CHIYIHISIN TECHNOLOGY CO., LTD. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const HomePage = () => (
  <main>
    <section className="relative h-[85vh] flex items-center bg-gray-900 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/seed/factory/1920/1080" alt="Hero" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            高科技廠房<br /><span className="text-blue-400">廠務系統工程</span>專家
          </h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed">
            提供整體評估設計、施作，以及廠務系統工程相關材料之生產、組裝及銷售。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-sm font-bold transition-all">了解服務項目</Link>
            <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-4 rounded-sm font-bold border border-white/30 transition-all">關於騏億鑫</Link>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img src="https://picsum.photos/seed/tech/800/600" alt="About" className="rounded-sm shadow-2xl" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-900 hidden md:flex items-center justify-center p-8 text-white text-center">
              <p className="text-sm font-bold tracking-widest uppercase">專業 穩重 創新 誠信</p>
            </div>
          </div>
          <div>
            <SectionHeader title="關於騏億鑫科技" subtitle="ABOUT CHIYIHISIN" />
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              騏億鑫科技股份有限公司致力於高科技廠房廠務系統工程。我們提供從初步評估、細部設計到現場施作的一站式服務。
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-700 shrink-0"><ShieldCheck size={20} /></div>
                <div><h4 className="font-bold text-gray-900">專業技術</h4><p className="text-xs text-gray-500">Professional Tech</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-700 shrink-0"><TrendingUp size={20} /></div>
                <div><h4 className="font-bold text-gray-900">穩健經營</h4><p className="text-xs text-gray-500">Steady Growth</p></div>
              </div>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:gap-4 transition-all">查看更多公司資訊 <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <SectionHeader title="服務項目" subtitle="OUR SERVICES" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "工程服務", icon: <HardHat size={32} />, desc: "高科技廠房整體評估與設計施作" },
            { title: "工程實績", icon: <ClipboardCheck size={32} />, desc: "豐富的產業合作經驗與成功案例" },
            { title: "材料生產", icon: <Factory size={32} />, desc: "廠務系統相關材料之生產與組裝" },
            { title: "專業認證", icon: <Award size={32} />, desc: "具備多項國際專業證照與認證" },
          ].map((s) => (
            <div key={s.title} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-all border-b-4 border-transparent hover:border-blue-700">
              <div className="text-blue-700 mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              <Link to="/services" className="text-xs font-bold text-blue-700 flex items-center gap-1">了解更多 <ArrowRight size={12} /></Link>
            </div>
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
      <PageHero title="關於騏億鑫" subtitle="專業、穩重、創新的高科技廠務工程專家" image="https://picsum.photos/seed/about/1920/600" />
      
      <section id="profile" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title="公司簡介" subtitle="COMPANY PROFILE" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                騏億鑫科技股份有限公司專注於高科技廠房廠務系統工程。我們提供從整體評估、設計、施作，到相關材料的生產與銷售。
                以專業的技術團隊為核心，致力於為半導體、面板、生技等高科技產業提供最可靠的工程服務。
              </p>
              <p className="text-gray-600 leading-relaxed">
                我們秉持著「專業、穩重、創新、誠信」的經營理念，不斷追求技術突破與品質卓越，贏得眾多知名企業的信賴與支持。
              </p>
            </div>
            <div className="bg-gray-50 p-12 rounded-sm">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center"><h4 className="text-4xl font-bold text-blue-900 mb-2">10+</h4><p className="text-xs text-gray-500 uppercase tracking-widest">年工程經驗</p></div>
                <div className="text-center"><h4 className="text-4xl font-bold text-blue-900 mb-2">100+</h4><p className="text-xs text-gray-500 uppercase tracking-widest">成功案例</p></div>
                <div className="text-center"><h4 className="text-4xl font-bold text-blue-900 mb-2">50+</h4><p className="text-xs text-gray-500 uppercase tracking-widest">專業團隊</p></div>
                <div className="text-center"><h4 className="text-4xl font-bold text-blue-900 mb-2">100%</h4><p className="text-xs text-gray-500 uppercase tracking-widest">客戶滿意度</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="org" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeader title="組織架構" subtitle="ORGANIZATION" />
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-blue-900 text-white p-4 rounded-sm mb-8 inline-block px-12 font-bold">董事會</div>
            <div className="w-px h-8 bg-gray-300 mx-auto"></div>
            <div className="bg-blue-700 text-white p-4 rounded-sm mb-8 inline-block px-12 font-bold">總經理</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["工程部", "設計部", "業務部", "行政管理部"].map(dept => (
                <div key={dept} className="bg-white p-6 shadow-sm border border-gray-100 font-bold text-gray-700">{dept}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="history" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="沿革與發展" subtitle="MILESTONES" />
          <div className="mt-12 space-y-12 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:w-px before:h-full before:bg-gray-200">
            {[
              { year: "2025", title: "擴大營運規模", desc: "遷入新辦公大樓，並成立海外事業部。" },
              { year: "2022", title: "技術創新突破", desc: "引進先進廠務監控系統，提升工程自動化程度。" },
              { year: "2018", title: "獲得國際認證", desc: "通過 ISO 9001 品質管理系統認證。" },
              { year: "2015", title: "公司成立", desc: "騏億鑫科技正式成立，專注於廠務工程設計。" },
            ].map((m, i) => (
              <div key={m.year} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-700 border-4 border-white z-10"></div>
                <div className="md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <div className={`bg-gray-50 p-8 rounded-sm ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                    <span className="text-2xl font-bold text-blue-700 mb-2 block">{m.year}</span>
                    <h4 className="text-lg font-bold mb-2">{m.title}</h4>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="operations" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="營運布局" subtitle="OPERATIONS" light />
          <div className="grid md:grid-cols-3 gap-12 mt-12">
            {[
              { region: "台灣總部", city: "台中", desc: "核心研發與行政中心" },
              { region: "北區辦事處", city: "新竹", desc: "半導體產業服務據點" },
              { region: "南區辦事處", city: "台南", desc: "光電與生技產業服務" },
            ].map(op => (
              <div key={op.region} className="border border-white/10 p-10 hover:bg-white/5 transition-all">
                <Globe2 size={40} className="text-blue-400 mb-6" />
                <h4 className="text-xl font-bold mb-2">{op.region}</h4>
                <p className="text-blue-300 text-sm mb-4 font-bold">{op.city}</p>
                <p className="text-gray-400 text-sm">{op.desc}</p>
              </div>
            ))}
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
      <PageHero title="服務項目" subtitle="全方位的高科技廠務工程解決方案" image="https://picsum.photos/seed/services/1920/600" />
      
      <section id="eng-services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="工程服務" subtitle="ENGINEERING SERVICES" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {[
              { title: "系統設計", desc: "專業的廠務系統規劃與細部設計。" },
              { title: "施工管理", desc: "嚴謹的現場施工監控與進度管理。" },
              { title: "設備安裝", desc: "精密設備的定位、安裝與調試。" },
              { title: "管路工程", desc: "各式特殊氣體與化學品管路配置。" },
              { title: "維護保養", desc: "定期的系統巡檢與緊急維修服務。" },
              { title: "節能優化", desc: "既有系統的節能評估與效能提升。" },
            ].map(s => (
              <div key={s.title} className="flex gap-6 p-8 bg-gray-50 hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm text-blue-700 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all"><Briefcase size={24} /></div>
                <div><h4 className="font-bold mb-2">{s.title}</h4><p className="text-sm text-gray-500">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="track-record" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="工程實績" subtitle="TRACK RECORD" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img src={`https://picsum.photos/seed/project${i}/800/600`} alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-2 block">半導體廠區</span>
                  <h4 className="font-bold text-lg mb-4">知名半導體廠特殊氣體系統工程</h4>
                  <p className="text-sm text-gray-500 mb-6">完成高純度氣體管路配置與自動化監控系統安裝，確保製程穩定運行。</p>
                  <button className="text-xs font-bold flex items-center gap-2 hover:gap-4 transition-all">查看案例詳情 <ArrowRight size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeader title="專業證照與認證" subtitle="CERTIFICATIONS" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-12">
            {[
              { title: "ISO 9001", desc: "品質管理系統" },
              { title: "ISO 14001", desc: "環境管理系統" },
              { title: "ISO 45001", desc: "職業安全衛生" },
              { title: "甲級電器承裝", desc: "專業工程執照" },
            ].map(c => (
              <div key={c.title} className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center mb-6 rounded-full"><Award size={48} className="text-blue-700" /></div>
                <h4 className="font-bold mb-1">{c.title}</h4>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const NewsPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main>
      <PageHero title="最新消息" subtitle="掌握騏億鑫科技的最新動態與產業資訊" image="https://picsum.photos/seed/news/1920/600" />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div id="announcements" className="mb-20">
                <SectionHeader title="各項公告" subtitle="ANNOUNCEMENTS" />
                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <div key={i} className="flex gap-8 items-start border-b border-gray-100 pb-8">
                      <div className="text-center min-w-[80px]">
                        <span className="text-3xl font-bold text-gray-200 block">15</span>
                        <span className="text-xs text-gray-400 font-bold uppercase">MAR 2026</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 hover:text-blue-700 cursor-pointer transition-colors">騏億鑫科技 2026 第一季營運報告發布</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">本公司今日公布 2026 年第一季財務報告，營收較去年同期增長 15%，展現穩健成長態勢...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="media" className="mb-20">
                <SectionHeader title="媒體報導" subtitle="MEDIA COVERAGE" />
                <div className="grid md:grid-cols-2 gap-8">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-gray-50 p-8">
                      <Newspaper size={32} className="text-blue-700 mb-6" />
                      <h4 className="font-bold mb-4">深耕高科技廠務工程，騏億鑫獲選年度優良廠商</h4>
                      <p className="text-sm text-gray-500 mb-6">根據最新產業調查報告，騏億鑫科技在半導體廠務工程領域的滿意度名列前茅...</p>
                      <button className="text-xs font-bold text-blue-700 flex items-center gap-2">閱讀全文 <ExternalLink size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div id="events">
                <SectionHeader title="活動花絮" subtitle="EVENT HIGHLIGHTS" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group">
                      <img src={`https://picsum.photos/seed/event${i}/600/600`} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-all" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <ImageIcon className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="w-full md:w-80">
              <div className="bg-gray-50 p-8 sticky top-24">
                <h4 className="font-bold mb-6 border-b border-gray-200 pb-4">分類瀏覽</h4>
                <ul className="space-y-4 text-sm font-medium text-gray-600">
                  <li className="hover:text-blue-700 cursor-pointer flex justify-between"><span>各項公告</span><span className="text-gray-400">(12)</span></li>
                  <li className="hover:text-blue-700 cursor-pointer flex justify-between"><span>媒體報導</span><span className="text-gray-400">(8)</span></li>
                  <li className="hover:text-blue-700 cursor-pointer flex justify-between"><span>活動花絮</span><span className="text-gray-400">(24)</span></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

const InvestorsPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main>
      <PageHero title="投資人專區" subtitle="透明、誠信、永續的投資人溝通平台" image="https://picsum.photos/seed/invest/1920/600" />
      
      <section id="finance" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="財務資訊" subtitle="FINANCIAL INFORMATION" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "公司概況", icon: <Building2 size={32} />, items: ["基本資料", "主要股東", "經營團隊"] },
              { title: "經營成果", icon: <TrendingUp size={32} />, items: ["每月營收報告", "季度財務報告", "年度財務報告"] },
              { title: "財務報告", icon: <FileText size={32} />, items: ["資產負債表", "綜合損益表", "現金流量表"] },
            ].map(f => (
              <div key={f.title} className="bg-gray-50 p-10">
                <div className="text-blue-700 mb-6">{f.icon}</div>
                <h4 className="text-xl font-bold mb-6">{f.title}</h4>
                <ul className="space-y-4">
                  {f.items.map(item => (
                    <li key={item} className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-700 cursor-pointer group">
                      {item} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shareholders" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="股東專欄" subtitle="SHAREHOLDER CORNER" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              "股東服務", "股東會資訊", "股東會年報", "公開說明書", "股利資訊", "股價資訊"
            ].map(s => (
              <div key={s} className="bg-white p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <span className="font-bold text-gray-700">{s}</span>
                <div className="w-8 h-8 bg-blue-50 flex items-center justify-center rounded-full text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all"><FileText size={16} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="公司治理" subtitle="CORPORATE GOVERNANCE" />
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {[
              { title: "規章辦法", desc: "包含公司章程、取得或處分資產處理程序等。" },
              { title: "董事會", desc: "董事會成員簡介、運作情形及決議事項。" },
              { title: "法說會", desc: "歷年法人說明會簡報與影音資訊。" },
              { title: "功能性委員會", desc: "審計委員會與薪酬委員會之運作。" },
              { title: "內部稽核", desc: "內部稽核組織及年度稽核計畫執行情形。" },
              { title: "資訊安全管理", desc: "資安政策、管理架構與推動情形。" },
            ].map(g => (
              <div key={g.title} className="flex gap-8 items-start p-8 border border-gray-100 hover:border-blue-200 transition-all">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><ShieldCheck size={24} /></div>
                <div><h4 className="font-bold mb-2">{g.title}</h4><p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const ContactPage = () => {
  return (
    <main>
      <PageHero title="聯絡我們" subtitle="期待與您的合作，為您提供最專業的服務" image="https://picsum.photos/seed/contact/1920/600" />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeader title="聯絡資訊" subtitle="CONTACT INFO" />
              <div className="space-y-10 mt-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><MapPin size={24} /></div>
                  <div><h4 className="font-bold mb-1">公司地址</h4><p className="text-gray-500">台中市大雅區中清路四段... (範例地址)</p></div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><Phone size={24} /></div>
                  <div><h4 className="font-bold mb-1">電話號碼</h4><p className="text-gray-500">04-25670993</p></div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-700 shrink-0"><Mail size={24} /></div>
                  <div><h4 className="font-bold mb-1">電子郵件</h4><p className="text-gray-500">cyh.mis@cyhco.com.tw</p></div>
                </div>
              </div>
              
              <div className="mt-16 p-8 bg-gray-50 rounded-sm">
                <h4 className="font-bold mb-4 flex items-center gap-2"><Calendar size={20} className="text-blue-700" /> 服務時間</h4>
                <p className="text-sm text-gray-600">週一至週五 08:30 - 17:30</p>
                <p className="text-sm text-gray-600 mt-2">週六、週日及國定假日休息</p>
              </div>
            </div>

            <div>
              <SectionHeader title="線上諮詢" subtitle="ONLINE INQUIRY" />
              <form className="mt-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">聯絡人姓名</label><input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-blue-700 transition-all" placeholder="請輸入姓名" /></div>
                  <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">聯絡電話</label><input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-blue-700 transition-all" placeholder="請輸入電話" /></div>
                </div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">電子郵件</label><input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-blue-700 transition-all" placeholder="請輸入 Email" /></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">諮詢項目</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-blue-700 transition-all">
                    <option>工程服務諮詢</option>
                    <option>材料採購諮詢</option>
                    <option>投資人關係</option>
                    <option>其他</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">訊息內容</label><textarea className="w-full bg-gray-50 border border-gray-200 p-4 h-40 focus:outline-none focus:border-blue-700 transition-all" placeholder="請輸入您的訊息內容"></textarea></div>
                <button type="submit" className="w-full bg-blue-900 text-white font-bold py-5 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">送出訊息 <ArrowRight size={18} /></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

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
          <Route path="/news" element={<NewsSectionPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Helper to fix the missing NewsSectionPage component
const NewsSectionPage = () => <NewsPage />;
