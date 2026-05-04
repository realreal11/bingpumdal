import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Pizza, 
  IceCream2, 
  ChevronDown, 
  Clock, 
  TrendingUp, 
  Zap,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Store,
  BookOpen,
  Headphones,
  ChefHat,
  MonitorPlay,
  Megaphone,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  Sun,
  Coffee,
  MessageCircle,
  Sparkles,
  Star,
  Utensils,
  Percent,
  Truck,
  Trophy,
  Snowflake,
  Flame
} from 'lucide-react';

// --- Components ---

const FadeIn: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <FadeIn className="text-center mb-16">
    {subtitle && <p className="text-brand-tomato font-semibold text-sm sm:text-base tracking-widest uppercase mb-3">{subtitle}</p>}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-charcoal break-keep">
      {title}
    </h2>
  </FadeIn>
);

const CTAButton = ({ onClick, children, variant = 'primary', className = "" }: any) => {
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 group";
  const variants = {
    primary: "bg-[#D32F2F] text-white hover:bg-[#B71C1C] shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md px-8 py-4 sm:px-10 sm:py-5 text-base font-semibold",
    secondary: "bg-[#E1F5FE] text-[#1A1A1C] border border-gray-100 shadow-lg hover:bg-[#B3E5FC] hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md px-8 py-4 sm:px-10 sm:py-5 text-base font-semibold",
    gold: "bg-[#FACC15] text-[#1A1A1C] hover:bg-[#FDE047] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all",
    outlineWhite: "bg-white text-[#1A1A1C] border border-gray-200 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md px-8 py-4 sm:px-10 sm:py-5 text-base font-semibold",
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

const texts = [
  "한 아이템에만 올인하는 창업을 하고 싶으신가요?",
  "여러가지 중구난방 전문성 없는 창업을 하고 싶으신가요?",
  "그런 창업, 저희는 하지 않습니다.\n전문성과 안정성 두마리를 동시에 잡은 창업!"
];

const ScrollStoryteller = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollProgress =
        Math.min(
          Math.max(-rect.top / (sectionHeight - windowHeight), 0),
          1
        );

      const nextIndex = Math.min(
        texts.length - 1,
        Math.floor(scrollProgress * texts.length)
      );

      setActiveIndex(nextIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="stickyTextSection">
      <div className="stickyInner">
        <div className="backgroundLayer" />

        <div className="textWrapper">
          {texts.map((text, index) => (
            <h2
              key={index}
              className={`scrollText ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {text.split("\n").map((line, i) => (
                <span key={i}>
                  {index === 2 && i === 1 ? (
                    <span className="text-[#FDE047] drop-shadow-[0_0_15px_rgba(253,224,71,0.3)] block mt-4 text-[1.1em]">{line}</span>
                  ) : (
                    line
                  )}
                  {i < text.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Page Sections ---

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToForm = () => {
    setIsMobileMenuOpen(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Normally handle API submisson here
    setFormSubmitted(true);
  };

  return (
    <div className="font-sans bg-brand-cream text-brand-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white z-50 border-b border-[#E5E0D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="/로고/피자덕로고.png" alt="피자덕 로고" className="h-10 object-contain drop-shadow-sm" />
          </div>
          
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <button onClick={() => document.getElementById('solution')?.scrollIntoView({behavior: 'smooth'})} className="font-medium text-gray-600 hover:text-brand-tomato transition">경쟁력</button>
            <button onClick={() => document.getElementById('menu')?.scrollIntoView({behavior: 'smooth'})} className="font-medium text-gray-600 hover:text-brand-tomato transition">메뉴</button>
            <button onClick={() => document.getElementById('process')?.scrollIntoView({behavior: 'smooth'})} className="font-medium text-gray-600 hover:text-brand-tomato transition">창업안내</button>
          </div>

          <div className="hidden md:flex">
            <CTAButton onClick={scrollToForm} variant="gold" className="!px-6 !py-2.5 !text-sm">
              가맹 상담 신청
            </CTAButton>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
               <span className="text-2xl font-black tracking-tighter">빙수<span className="text-brand-tomato">&</span>피자</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col space-y-6 text-2xl font-bold">
              <button onClick={() => { document.getElementById('solution')?.scrollIntoView({behavior: 'smooth'}); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-gray-100">경쟁력</button>
              <button onClick={() => { document.getElementById('menu')?.scrollIntoView({behavior: 'smooth'}); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-gray-100">메뉴</button>
              <button onClick={() => { document.getElementById('process')?.scrollIntoView({behavior: 'smooth'}); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-gray-100">창업안내</button>
              <button onClick={scrollToForm} className="text-left py-2 text-brand-tomato">가맹 상담 신청 &rarr;</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        
        {/* 0. Main Cover Section (Redesigned) */}
        <section className="relative w-full min-h-screen py-32 flex flex-col justify-center overflow-hidden bg-[#111111]">
          {/* Split Background */}
          <div className="absolute inset-0 z-0 flex">
            {/* 빙수쪽 (왼쪽) - 시원한 느낌의 다크 네이비 */}
            <div className="w-1/2 h-full bg-[#0F2027] relative overflow-hidden flex items-center">
              <img src="/빙수/빙수잔뜩.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
              <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/90"></div>
            </div>
            {/* 피자쪽 (오른쪽) - 따뜻한 느낌의 다크 버건디 */}
            <div className="w-1/2 h-full bg-[#3E0000] relative overflow-hidden flex items-center">
              <img src="/각종사진/가게사진.png" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
              <div className="w-full h-full absolute inset-0 bg-gradient-to-l from-transparent to-[#111111]/90"></div>
            </div>
          </div>

          {/* Floating Decorative Elements on edges */}
          <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-10 pointer-events-none opacity-40 hidden sm:flex">
             <div className="text-white flex flex-col items-center gap-4">
                 <motion.div animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                    <Snowflake className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
                 </motion.div>
                 <span className="text-sm md:text-base font-mono tracking-[0.3em] font-bold mt-12 text-blue-200 uppercase [writing-mode:vertical-lr] rotate-180">Ice Dessert</span>
             </div>
          </div>
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-10 pointer-events-none opacity-40 hidden sm:flex">
             <div className="text-white flex flex-col items-center gap-4">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <Flame className="w-8 h-8 md:w-12 md:h-12 text-red-500" />
                 </motion.div>
                 <span className="text-sm md:text-base font-mono tracking-[0.3em] font-bold mt-12 text-red-300 uppercase [writing-mode:vertical-lr]">Hot Pizza</span>
             </div>
          </div>

          <div className="relative z-30 text-center w-full max-w-6xl mx-auto px-4 mt-8 lg:mt-0">
             <h2 className="text-white text-lg md:text-2xl font-bold mb-6 drop-shadow-md break-keep">
               <span className="bg-[#D32F2F] px-2 py-1 tracking-tight mr-1">빙수X피자</span> 완벽한 듀얼 매출 시스템
             </h2>
             <h1 className="text-white text-4xl sm:text-5xl md:text-[64px] font-black mb-6 tracking-tighter leading-[1.2] drop-shadow-lg break-keep">
               인생이 걸린 창업,<br/> 리스크를 최대한 줄여드립니다.
             </h1>
             <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 drop-shadow-md break-keep">
               전문성과 안정성을 동시에 잡은 듀얼 코어 창업
             </p>
             <p className="text-[#F1C40F] text-2xl sm:text-3xl md:text-4xl font-black mb-10 drop-shadow-lg break-keep tracking-tight">
               총 2400만원 상당의 혜택 지원
             </p>
             
             {/* Center Image */}
             <div className="relative w-full max-w-2xl mx-auto h-[250px] sm:h-[300px] md:h-[400px] mb-12 flex items-center justify-center">
                <motion.img 
                  animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  src="/빙수/치즈빙수.png" 
                  alt="치즈빙수" 
                  className="absolute left-[-10%] sm:left-[0%] md:left-[2%] w-48 sm:w-64 md:w-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 hover:scale-105 transition-transform" 
                />
                <motion.img 
                  animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                  src="/피자/포덕포덕피자.png" 
                  alt="포덕포덕피자" 
                  className="absolute right-[-10%] sm:right-[0%] md:right-[2%] w-48 sm:w-64 md:w-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-10 hover:scale-105 transition-transform" 
                />
             </div>

             {/* Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto z-40 relative">
               {[
                   { title1: "", highlight: "45호점 돌파", title2: "!", desc1: "전국 각지에서", desc2: "성공을 증명하고 있습니다!" },
                   { title1: "피자와 빙수로 ", highlight: "365 성수기", title2: "", desc1: "여름엔 빙수, 겨울엔 피자!", desc2: "계절을 타지 않는 안정적인 매출" },
                   { title1: "집중된 두가지로 ", highlight: "전문성 있는 맛", title2: "", desc1: "선택과 집중으로", desc2: "놀라운 맛의 퀄리티 달성!" },
                   { title1: "", highlight: "간편한 조리시스템", title2: "", desc1: "초보자도 당장 가능한", desc2: "효율적인 주방 운영" },
                   { title1: "담당 슈퍼바이저 ", highlight: "배정", title2: "", desc1: "매장 오픈부터 운영까지", desc2: "전문가의 1:1 밀착 관리" },
                   { title1: "유료 상권 분석 ", highlight: "무료 제공", title2: "", desc1: "지역별 데이터 기반", desc2: "최적의 입지 선정 무료 컨설팅" }
               ].map((card, idx) => (
                   <div key={idx} className="bg-white pl-10 pr-4 py-8 sm:py-10 flex flex-col items-center justify-center text-center shadow-[0_15px_30px_rgba(0,0,0,0.6)] min-h-[160px] sm:min-h-[220px] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                       <h3 className="text-xl sm:text-2xl lg:text-2xl font-black text-[#1A1A1C] mb-4 sm:mb-6 leading-tight break-keep">
                           {card.title1}<br className="hidden sm:block lg:hidden"/><span className="text-[#D32F2F]">{card.highlight}</span>{card.title2}
                       </h3>
                       <p className="text-gray-700 font-bold text-sm lg:text-base break-keep leading-relaxed px-2">
                           {card.desc1}<br/>{card.desc2}
                       </p>
                       <div className="absolute left-0 inset-y-0 w-8 md:w-10 pointer-events-none bg-gray-50 flex items-center justify-center overflow-hidden border-r border-black/5">
                          <div className="text-center -rotate-90 whitespace-nowrap text-[1.5rem] font-black tracking-widest text-black/10 uppercase" style={{ transformOrigin: 'center center' }}>BING&PIZZA</div>
                       </div>
                   </div>
               ))}
             </div>
          </div>
        </section>

        <ScrollStoryteller />

        {/* 1. Core Concept Section (Originally Hero) */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-brand-cream border-b border-[#E5E0D5]" id="concept">

          {/* Vibrant Split Background Images */}
          <div className="absolute inset-0 z-0 flex pointer-events-none">
            <div className="w-1/2 h-full relative overflow-hidden">
              <img src="/빙수/빙수잔뜩.jpg" alt="빙수 배경" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </div>
            <div className="w-1/2 h-full relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30 z-10"></div>
              <img src="/피자/피자잔뜩.jpg" alt="피자 배경" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
            </div>
          </div>
          
          {/* Subtle gradient for depth, removing heavy blur */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none"></div>

          <div className="relative z-10 text-center px-4 md:max-w-4xl max-w-full mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 border border-gray-200 p-8 md:p-14 lg:px-20 rounded-[32px] shadow-xl flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEBEE] rounded-bl-full opacity-50 blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E1F5FE] rounded-tr-full opacity-50 blur-2xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-block px-5 py-2 bg-[#FFF9C4] border border-[#FDE047] text-[#1A1A1C] text-xs sm:text-sm font-bold rounded-full mb-6 whitespace-nowrap shadow-sm">
                  빙수는 여름에, 피자는 사계절 내내!
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-black text-[#1A1A1C] mb-6 leading-[1.2] break-keep text-balance tracking-tight">
                  <span className="text-brand-tomato">배달 피자</span>와 <span className="text-blue-500">홀 디저트</span>의 완벽한 만남!<br/> 비수기 틈도 없는<br className="hidden sm:block"/> 듀얼 하이브리드 창업
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed break-keep font-medium">
                  단일 메뉴의 한계를 넘어 홀과 배달 메뉴를 동시에 판매합니다.<br className="hidden md:block" /> 하루 종일 주문이 쏟아지는 효율적인 운영 구조를 제안해 드립니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                  <CTAButton onClick={scrollToForm} variant="primary" className="w-full sm:w-auto text-[15px] sm:text-base px-6 py-3 sm:px-8 sm:py-4">
                    창업 상담 신청하기
                  </CTAButton>
                  <CTAButton onClick={scrollToForm} variant="secondary" className="w-full sm:w-auto text-[15px] sm:text-base px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-gray-50">
                    예상 창업 비용 받아보기
                  </CTAButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Problem Section */}
        <section className="relative py-24 px-4 overflow-hidden border-b border-[#E5E0D5]/20">
          <div className="absolute inset-0 bg-brand-charcoal z-0"></div>
          <div className="absolute inset-0 z-0">
            <img src="/각종사진/주방사진.jpg" alt="주방" className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-brand-charcoal/40"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
               <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2 block">RISK ANALYSIS</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">단일 아이템 창업의 구조적 한계와 리스크</h2>
               <div className="w-12 h-1 bg-brand-gold mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <IceCream2 className="w-8 h-8 text-blue-400" fill="currentColor" />,
                  title: "계절적 제약에 따른 매출 변동성",
                  desc: "아이스 디저트는 특정 계절에 매출이 집중되어, 비수기 발생 시 고정비 대비 수익률 방어가 어렵습니다."
                },
                {
                  icon: <Pizza className="w-8 h-8 text-red-400" fill="currentColor" />,
                  title: "특정 시간대 유휴 공간 발생",
                  desc: "식사 위주의 단일 메뉴는 런치·디너 외의 오후 시간대 유관 수요를 흡수하지 못해 점포 점유 효율이 저하됩니다."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-brand-gold" strokeWidth={2.5} />,
                  title: "지속 상승하는 고정비 부담",
                  desc: "불확실한 단일 메뉴 매출 구조로는 매년 지속적으로 상승하는 인건비, 임대료, 원부자재 리스크를 통제하기 어렵습니다."
                }
              ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.15} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10 text-left hover:bg-white/10 transition duration-300">
                  <div className="w-14 h-14 bg-white/10 border border-white/5 rounded-xl flex items-center justify-center mb-6 text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
            
            <FadeIn delay={0.3} className="mt-12 text-center bg-white/5 backdrop-blur-md border border-brand-gold/30 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-bl-full pointer-events-none blur-2xl"></div>
              <div className="text-left relative z-10">
                <h4 className="text-lg font-bold text-white mb-2">단일 메뉴의 한계를 <span className="text-brand-gold">상호 보완형 듀얼 모델</span>로 극복하세요.</h4>
                <p className="text-gray-300 text-sm">전문가의 데이터 분석을 통해 귀하의 상권에 가장 최적화된 판매 전략을 무상 진단해 드립니다.</p>
              </div>
              <button onClick={scrollToForm} className="shrink-0 relative z-10 inline-flex items-center gap-2 bg-brand-gold hover:bg-yellow-500 text-brand-charcoal px-6 py-3 rounded-xl font-bold transition duration-300 text-sm shadow-[0_4px_20px_rgba(197,160,89,0.3)]">
                무상 상권 진단 신청 <ArrowRight className="w-4 h-4" />
              </button>
            </FadeIn>
          </div>
        </section>

        {/* 3. Solution Section */}
        <section id="solution" className="py-24 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="상호 보완적 듀얼 수익 모델 설계" subtitle="DUAL BUSINESS MODEL" />
            
            <div className="flex flex-col lg:flex-row gap-6 mt-16">
              <FadeIn className="flex-1 bg-white rounded-2xl p-8 lg:p-12 border border-[#E5E0D5] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#E1F5FE] rounded-bl-full opacity-30 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#E1F5FE]/30 rounded-tl-full blur-2xl pointer-events-none"></div>

                <motion.img 
                  animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  src="/빙수/로투스빙수.png"
                  alt="로투스빙수"
                  className="absolute -right-6 -bottom-6 lg:-right-10 lg:-bottom-10 w-40 lg:w-64 object-contain drop-shadow-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0 pointer-events-none"
                />

                <div className="relative z-10 pb-8 sm:pb-0">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#E1F5FE] rounded-full flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm">
                        <IceCream2 className="w-6 h-6" />
                      </div>
                      빙수의 역할
                    </h3>
                    <span className="text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold rounded-full shadow-sm">상시 추가 디저트 & 홀 견인!</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "식사 주문 시 추가 주문 1순위 핵심 디저트",
                      "시원하고 달콤한 특유의 맛으로 감성 홀 매출 견인",
                      "배달 객단가를 순식간에 높이는 마법의 세트 아이템",
                      "시각적 만족도를 극대화하는 트렌디 플래이팅"
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-gray-700 relative z-20 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="break-keep">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center z-10 -mx-6 text-gray-500 font-medium text-xl">
                  +
                </div>
              </div>

              <FadeIn delay={0.2} className="flex-1 bg-white rounded-2xl p-8 lg:p-12 border border-[#E5E0D5] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFEBEE] rounded-bl-full opacity-50 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FFEBEE]/50 rounded-tl-full blur-2xl pointer-events-none"></div>

                <motion.img 
                  animate={{ y: [0, 10, 0], rotate: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  src="/피자/포덕포덕피자.png"
                  alt="포덕포덕피자"
                  className="absolute -right-6 -bottom-6 lg:-right-10 lg:-bottom-10 w-40 lg:w-64 object-contain drop-shadow-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0 pointer-events-none"
                />

                <div className="relative z-10 pb-8 sm:pb-0">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#FFEBEE] rounded-full flex items-center justify-center text-brand-tomato border border-red-100 shadow-sm">
                        <Pizza className="w-6 h-6" />
                      </div>
                      피자의 역할
                    </h3>
                    <span className="text-brand-tomato bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold rounded-full shadow-sm">든든한 메인 배달 강자!</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "남녀노소 호불호 없는 강력한 식사 대용 메뉴",
                      "야식, 배달 앱 상단 노출 메뉴로 배달 플랫폼 강자",
                      "가족, 친구 모임의 핵심 메인 요리로 높은 수요 안착",
                      "안정적이고 빠른 조리 원팩 시스템으로 초보도 뚝딱"
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-gray-700 relative z-20 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-brand-tomato shrink-0 mt-0.5" />
                        <span className="break-keep">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3.5. Key Point Section */}
        <section className="py-24 px-4 bg-[#FACC15] relative overflow-hidden">
          {/* Pizza duck character on top right of the key */}
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
             {/* Key Point Header */}
             <div className="relative w-full max-w-4xl flex justify-center mb-24 px-4 md:px-12 mt-12">
               {/* 
                 A graphical element that looks like a key
                 Inside the head of the key: "매출 2배" 
                 On the body: PIZZA DUCK, KEY POINT 
               */}
               <div className="relative flex items-center justify-center w-full mt-10">
                 <div className="absolute right-0 -top-20 md:-top-32 w-32 md:w-48 z-20">
                   <img src="/피자덕캐릭/3d9afafce9235.png" alt="피자덕 라이더" className="w-full h-auto drop-shadow-xl" />
                 </div>
                 <div className="absolute left-1/2 -translate-x-1/2 -top-12 md:-top-16 w-56 md:w-72 z-20 flex justify-center">
                   <img src="/로고/피자덕로고.png" alt="피자덕 로고" className="h-16 md:h-20 w-auto object-contain drop-shadow-xl" />
                 </div>
                 
                 {/* Key Graphic */}
                 <div className="relative flex items-center w-full">
                    {/* Key Head */}
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[20px] md:border-[32px] border-[#fbbf24] bg-[#FACC15] shadow-[inset_0_-10px_0_rgba(0,0,0,0.1),_0_10px_0_rgba(0,0,0,0.1)] flex flex-col items-center justify-center z-10 shrink-0 relative">
                      <span className="text-[#E53935] font-black text-2xl md:text-3xl leading-none md:mb-1">매출</span>
                      <span className="text-[#E53935] font-black text-5xl md:text-[5.5rem] leading-none tracking-tighter">2배</span>
                    </div>
                    {/* Key Body */}
                    <div className="h-20 md:h-28 bg-[#fbbf24] flex-1 -ml-8 rounded-r-[40px] flex items-center pl-16 shadow-[0_10px_0_rgba(0,0,0,0.1)] relative">
                       <span className="text-[#E53935] font-black   text-3xl sm:text-4xl md:text-6xl tracking-widest pl-2">KEY POINT</span>
                       {/* Key Teeth */}
                       <div className="absolute -bottom-10 md:-bottom-14 right-12 md:right-24 w-12 md:w-16 h-16 md:h-24 bg-[#fbbf24] rounded-b-xl shadow-[0_10px_0_rgba(0,0,0,0.1)]"></div>
                       <div className="absolute -bottom-10 md:-bottom-14 right-32 md:right-56 w-12 md:w-16 h-16 md:h-24 bg-[#fbbf24] rounded-b-xl shadow-[0_10px_0_rgba(0,0,0,0.1)]"></div>
                    </div>
                 </div>
               </div>
             </div>

             {/* Grid */}
             <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-24 lg:px-0">
               {/* Cards */}
               {[
                 { title: "맛, 창업시스템 완벽!", desc: "맛, 가격, 창업비용, 창업혜택까지 완벽", icon: <Utensils className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> },
                 { title: "4년간 200% 성장!", desc: "이제 전국! 50개이상 매장 오픈!", icon: <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> },
                 { title: "피자&빙수로 2배 매출", desc: "최강의 조합으로 1매장 2배 매출가능!", icon: <Percent className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> },
                 { title: "최소 기간 빠른 오픈 가능!", desc: "교육기간, 인테리어 공사 단기로 가능!", icon: <Clock className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> },
                 { title: "안정적인 전국 물류", desc: "물류비 최소화! 안정적인 전국 물류!", icon: <Truck className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> },
                 { title: "4년 연속 브랜드 대상", desc: "언론사 주최 우수브랜드 대상 1위 수상", icon: <Trophy className="w-10 h-10 md:w-12 md:h-12 text-[#F2C94C]" /> }
               ].map((item, idx) => (
                 <FadeIn key={idx} delay={idx * 0.1} className="bg-[#E53935] rounded-3xl md:rounded-[40px] p-6 lg:p-8 flex items-center gap-4 md:gap-6 shadow-[0_6px_0_0_#C62828] transform transition-transform hover:-translate-y-1 hover:shadow-[0_8px_0_0_#C62828] cursor-default   mx-2 md:mx-0">
                    <div className="shrink-0 flex items-center justify-center border-r-2 border-dotted border-[#FFCDD2] pr-4 md:pr-6">
                       {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#F2C94C] font-black text-[1.1rem] sm:text-xl lg:text-2xl mb-1 tracking-tight break-keep">{item.title}</h4>
                      <p className="text-white font-medium text-xs sm:text-sm lg:text-base break-keep opacity-90">{item.desc}</p>
                    </div>
                 </FadeIn>
               ))}
             </div>

             {/* Bottom Text and CTA */}
             <div className="text-center w-full px-4 text-[#E53935]">
               <h3 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-snug tracking-tight break-keep">
                 지금 상담만해도 <span className="text-[#E53935] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]">2400만원</span><br className=""/>
                 상당의 <span className="text-[#E53935] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]">12가지 창업혜택!</span>
               </h3>
               <p className="text-black font-black text-lg sm:text-xl md:text-2xl mb-12 break-keep">
                 딱! 10분 상담으로 다르다는 걸 느낄 수 있습니다.
               </p>
               <button onClick={scrollToForm} className="bg-white text-[#1A1A1C] font-black text-xl sm:text-2xl md:text-3xl px-12 sm:px-20 py-6 border border-gray-200 rounded-[40px] shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all">
                 상담신청하기
               </button>
             </div>
          </div>
        </section>

        {/* 4. Business Model */}
        <section className="py-24 px-4 bg-brand-charcoal text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <FadeIn className="md:w-1/2">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                카페처럼 보이고<br />
                <span className="text-brand-tomato">피자 전문점처럼</span> 팔리는 곳
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-8 break-keep">
                인테리어는 트렌디한 감성 디저트 카페의 무드를 유지하면서도, 주방 시스템은 피자와 빙수를 효율적으로 동시 조리할 수 있는 동선으로 설계되었습니다. 다각화된 매출 구조의 가능성을 확인해 보세요.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/20">
                  <h4 className="text-sm text-gray-400 mb-1">인력 효율성</h4>
                  <p className="text-xl font-bold text-brand-gold">핵심재료 원팩</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/20">
                  <h4 className="text-sm text-gray-400 mb-1">매출 다각화</h4>
                  <p className="text-xl font-bold text-brand-ice">3WAY (홀/포장/배달)</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="md:w-1/2 relative">
               <div className="aspect-[4/3] rounded-[32px] overflow-hidden">
                 <img src="/각종사진/가게사진.png" alt="빙품달 매장 인테리어" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-6 -left-6 bg-brand-tomato text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                 <p className="font-bold text-lg mb-1">"주방 동선의 혁신"</p>
                 <p className="text-sm opacity-90">1~2인으로도 빙수와 피자를 동시 조리 가능한 시스템</p>
               </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="max-w-4xl mx-auto mt-20">
             <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF9C4]/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEBEE]/30 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
                
                <h4 className="text-2xl md:text-3xl font-black text-[#1A1A1C] mb-4 relative z-10">"두 가지 메뉴, 운영이 너무 복잡하지 않을까요?"</h4>
                <p className="text-gray-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed relative z-10 break-keep">본사의 체계적인 원팩 시스템과 반자동에 가까운 효율화된 조리 동선을 통해 1인 창업자나 초보 점주님도 전혀 무리 없이 매장을 운영할 수 있습니다.</p>
                <button onClick={scrollToForm} className="relative z-10 inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-lg">
                  본사 시스템 안내 상담하기 <ArrowRight className="w-6 h-6" />
                </button>
             </div>
          </FadeIn>
        </section>

        {/* 5. Dual Strategy (Delivery & Dine-in) */}
        <section className="py-24 px-4 bg-[#FEFCF8] relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-10 w-24 h-24 bg-[#FFEBEE] rounded-full filter blur-xl opacity-60"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#E1F5FE] rounded-full filter blur-xl opacity-60"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading title="배달도 홀도 완벽하게, 동시 매출 시스템" subtitle="DUAL SALES CHANNELS" />
            
            <div className="mt-12 text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1C] mb-6 leading-[1.3] break-keep">
                오전 오후 수익 모델이 따로 있나요?<br/>
                <span className="text-brand-tomato text-3xl md:text-4xl">빙품달은 하루 종일 쉼없이 팔립니다.</span>
              </h3>
              <p className="text-gray-600 font-bold text-base md:text-lg leading-relaxed break-keep">
                특정 시간에만 팔리는 메뉴는 없습니다. 홀에서는 피자와 빙수를 함께 즐기고, 배달 앱에서는 끊임없이 듀얼 주문이 들어오는 진짜 하이브리드 매장입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-12">
               {/* Delivery Card */}
               <FadeIn delay={0.1} className="p-8 md:p-10 rounded-2xl border border-gray-200 bg-white shadow-lg flex flex-col h-full transform transition-transform hover:-translate-y-2">
                 <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-8 bg-[#FFF9C4] text-[#1A1A1C]">
                   <span className="text-3xl">🛵</span>
                 </div>
                 <h3 className="text-3xl font-bold mb-4 text-[#1A1A1C]">강력한 배달 수익</h3>
                 <div className="inline-block px-4 py-2 bg-[#FFEBEE] rounded-lg text-[#D32F2F] font-semibold text-sm mb-4 self-start">
                   "객단가를 확 높이는 마법의 세트"
                 </div>
                 <p className="text-base md:text-lg leading-relaxed text-gray-600">
                   식사 주문 시 디저트까지 원스톱으로! 배달비에 민감한 요즘, 식사와 디저트를 한 매장에서 배달시킬 수 있어 고객은 배달비를 절약하고 점주님은 <span className="font-bold text-[#D32F2F]">압도적으로 높은 객단가</span>를 달성합니다.
                 </p>
               </FadeIn>
               
               {/* Dine-in Card */}
               <FadeIn delay={0.2} className="p-8 md:p-10 rounded-2xl border border-gray-200 bg-white shadow-lg flex flex-col h-full transform transition-transform hover:-translate-y-2 lg:translate-y-4">
                 <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-8 bg-[#E1F5FE] text-[#1A1A1C]">
                   <span className="text-3xl">🍕</span>
                 </div>
                 <h3 className="text-3xl font-bold mb-4 text-[#1A1A1C]">탄탄한 홀 매출</h3>
                 <div className="inline-block px-4 py-2 bg-[#E1F5FE] rounded-lg text-blue-600 font-semibold text-sm mb-4 self-start">
                   "입과 눈이 즐거운 테이블 시너지"
                 </div>
                 <p className="text-base md:text-lg leading-relaxed text-gray-600">
                   감성 카페에 온 듯 시원한 빙수를 드시러 온 고객이 고소한 피자 냄새에 추가 주문을 하고, 피자를 드시러 온 고객이 빙수로 입가심을 하는 <span className="font-bold text-blue-600">완벽한 선순환</span>이 매일 일어납니다!
                 </p>
               </FadeIn>
            </div>

            <div className="mt-20 text-center bg-[#FFF9C4] border border-[#FDE047] p-8 md:p-10 rounded-3xl shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 cursor-default transition-transform hover:-translate-y-1">
              <Zap className="w-12 h-12 text-brand-tomato fill-current shrink-0" />
              <p className="text-lg sm:text-xl font-black text-[#1A1A1C] text-left break-keep leading-snug">
                가족 및 연인 고객을 위한 <span className="underline decoration-wavy decoration-blue-500 underline-offset-4">"빙수 + 피자 혼합 세트"</span>를 통해<br className="hidden md:block" /> 상권과 계절에 상관없이 언제나 강력한 매출을 올리세요!
              </p>
            </div>
          </div>
        </section>

        {/* 5.5. Easy Cooking System */}
        <section className="bg-[#F8F9FA]">
          {/* Pizza Cooking */}
          <div className="py-24 px-4 relative overflow-hidden text-center">
             <div className="max-w-5xl mx-auto relative z-10">
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6">만들기 쉬운 <span className="font-black text-[#D32F2F] tracking-tighter">피자</span></h2>
               <p className="text-gray-800 font-medium text-lg md:text-xl mb-12">간편한 조리시스템으로 <strong className="font-black text-black">5분</strong>이면 충분합니다.</p>
               
               <div className="flex justify-center items-center gap-3 md:gap-6 mb-20 md:mb-24">
                 <div className="flex flex-col items-center">
                   <div className="text-[#D32F2F] font-black text-2xl md:text-4xl leading-none mb-1 sm:mb-2">조리</div>
                   <div className="text-[#D32F2F] font-black text-2xl md:text-4xl leading-none">완성</div>
                 </div>
                 <div className="text-[#D32F2F] font-black text-7xl sm:text-8xl md:text-[140px] tracking-tighter leading-none">5:00</div>
               </div>

               {/* Process Steps */}
               <div className="flex flex-row flex-wrap justify-center md:justify-between items-center max-w-5xl mx-auto gap-y-12">
                 {[
                   { title: "도우 피고", img: "https://images.unsplash.com/photo-1541592106381-87ebc1094f06?auto=format&fit=crop&w=400&q=80" },
                   { title: "토핑 올리고", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
                   { title: "오븐에 굽고", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80" },
                   { title: "포장하면 끝", img: "/각종사진/가게사진.png" },
                 ].map((step, idx) => (
                   <React.Fragment key={idx}>
                     <div className="flex flex-col items-center w-1/2 sm:w-1/4 md:flex-1">
                       <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden mb-6 md:mb-8 border-[6px] border-white z-10 transition-transform hover:-translate-y-2">
                         <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="text-[#D32F2F] font-black text-lg sm:text-xl md:text-2xl drop-shadow-sm">{step.title}</div>
                     </div>
                     {idx < 3 && (
                       <div className="hidden sm:flex text-[#D32F2F] -mx-4 md:-mx-8 z-0 pb-12">
                         <ArrowRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={3} />
                       </div>
                     )}
                   </React.Fragment>
                 ))}
               </div>
             </div>
          </div>

          {/* Bingsu Cooking */}
          <div className="py-24 px-4 bg-[#2C3E50] text-white relative overflow-hidden text-center">
             <div className="max-w-5xl mx-auto relative z-10">
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6">만들기 쉬운 <span className="font-black text-[#F1C40F] tracking-tighter">빙수</span></h2>
               <p className="text-gray-200 font-medium text-lg md:text-xl mb-12">간편한 조리시스템으로 <strong className="font-black text-white">3분</strong>이면 충분합니다.</p>
               
               <div className="flex justify-center items-center gap-3 md:gap-6 mb-20 md:mb-24">
                 <div className="flex flex-col items-center">
                   <div className="text-[#F1C40F] font-black text-2xl md:text-4xl leading-none mb-1 sm:mb-2">조리</div>
                   <div className="text-[#F1C40F] font-black text-2xl md:text-4xl leading-none">완성</div>
                 </div>
                 <div className="text-[#F1C40F] font-black text-7xl sm:text-8xl md:text-[140px] tracking-tighter leading-none">3:00</div>
               </div>

               {/* Process Steps */}
               <div className="flex flex-row flex-wrap justify-center md:justify-between items-center max-w-5xl mx-auto gap-y-12">
                 {[
                   { title: "얼음 넣고", img: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80" },
                   { title: "토핑 올리고", img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=400&q=80" },
                   { title: "소스 뿌리고", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&w=400&q=80" },
                   { title: "포장하면 끝", img: "https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?auto=format&fit=crop&w=400&q=80" },
                 ].map((step, idx) => (
                   <React.Fragment key={idx}>
                     <div className="flex flex-col items-center w-1/2 sm:w-1/4 md:flex-1">
                       <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.3)] overflow-hidden mb-6 md:mb-8 border-[6px] border-[#34495E] z-10 transition-transform hover:-translate-y-2 relative">
                         <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="text-[#F1C40F] font-black text-lg sm:text-xl md:text-2xl drop-shadow-sm">{step.title}</div>
                     </div>
                     {idx < 3 && (
                       <div className="hidden sm:flex text-[#F1C40F] -mx-4 md:-mx-8 z-0 pb-12">
                         <ArrowRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={3} />
                       </div>
                     )}
                   </React.Fragment>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* 6. Menu Power */}
        <section id="menu" className="py-24 px-4 bg-white border-b border-[#E5E0D5]">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="시장 수요를 고려한 메뉴 라인업" subtitle="MENU COMPETITIVENESS" />
            
            <div className="mb-16">
              <h3 className="text-2xl font-black mb-8 pl-4 border-l-4 border-blue-500 flex items-center gap-2">
                수제 빙수 & 디저트 
                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-widest ml-3 shadow-sm">
                  객단가 치트키
                </span>
              </h3>
              <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6 sm:pb-0 snap-x -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                  { name: "생딸기 눈꽃빙수", img: "https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?w=500&h=500&fit=crop" },
                  { name: "우유 팥설빙", img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&h=500&fit=crop" },
                  { name: "망고 치즈빙수", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=500&h=500&fit=crop" },
                  { name: "수제 크로플&커피", img: "https://images.unsplash.com/photo-1629851622340-f1db428ab22b?w=500&h=500&fit=crop" }
                ].map((menu, i) => (
                  <motion.div whileHover={{ y: -5 }} key={i} className="group relative rounded-xl overflow-hidden shadow-sm bg-gray-100 aspect-square border border-[#E5E0D5] min-w-[240px] sm:min-w-0 snap-start shrink-0">
                    <img src={menu.img} alt={menu.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 lg:p-6">
                      <span className="text-white font-bold text-base lg:text-lg">{menu.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black mb-8 pl-4 border-l-4 border-brand-tomato flex items-center gap-2">
                프리미엄 피자 
                <span className="text-xs font-bold text-brand-tomato bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-widest ml-3 shadow-sm">
                  호불호 제로 메인
                </span>
              </h3>
              <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6 sm:pb-0 snap-x -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                  { name: "페퍼로니 피자", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=500&fit=crop" },
                  { name: "클래식 콤비네이션", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop" },
                  { name: "콰트로 치즈 피자", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop" },
                  { name: "바베큐 불고기 피자", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop" }
                ].map((menu, i) => (
                  <motion.div whileHover={{ y: -5 }} key={i} className="group relative rounded-xl overflow-hidden shadow-sm bg-gray-100 aspect-square border border-[#E5E0D5] min-w-[240px] sm:min-w-0 snap-start shrink-0">
                    <img src={menu.img} alt={menu.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 lg:p-6">
                      <span className="text-white font-bold text-base lg:text-lg">{menu.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 bg-[#F9F7F2] p-8 md:p-12 rounded-2xl border border-[#E5E0D5] text-center max-w-4xl mx-auto flex flex-col items-center">
               <h4 className="text-xl md:text-2xl font-bold text-brand-charcoal mb-3">가장 중요한 건 <span className="text-brand-tomato">실질적인 마진 비율</span>입니다.</h4>
               <p className="text-gray-500 mb-8 text-sm md:text-base leading-relaxed break-keep max-w-2xl">외형 매출만 크고 점주 수익이 낮은 구조는 지양합니다.<br className="hidden sm:block"/>안정적 구매 물류망을 바탕으로 한 투명한 원가율과 메뉴별 상세 수익 구조를 상담을 통해 직접 확인해 보세요.</p>
               <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-brand-charcoal text-white font-bold rounded-lg hover:bg-black px-8 py-4 transition text-sm">
                 메뉴별 투명 원가율 안내표 받기 <ArrowRight className="w-4 h-4"/>
               </button>
            </div>
          </div>
        </section>

        {/* 7. Franchise Support (Systematic Grid) */}
        <section className="py-24 px-4 bg-[#F9F7F2] border-b border-[#E5E0D5]">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="초기 안착을 위한 본사 지원 안내" subtitle="HEADQUARTERS SUPPORT" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { title: "데이터 기반 상권 분석", desc: "단순 통계를 넘어선 자사만의 상권 분석 툴을 통해 타겟 유동 인구와 배달권역 수요를 입체적으로 교차 분석하여 최적의 입지를 제안합니다.", num: "01", icon: <MapPin/> },
                { title: "표준화 조리·운영 매뉴얼", desc: "외식업 경험이 없는 초보자도 짧은 교육만으로 균일한 맛과 서비스 조작이 가능하도록 정밀하게 계량된 원팩 시스템과 규격화된 매뉴얼북을 제공합니다.", num: "02", icon: <BookOpen/> },
                { title: "체계적인 본사 밀착 교육", desc: "형식적 이론 교육을 배제하고, 직영점 및 본사 아카데미에서의 철저한 현장 실무와 실습을 통해 매장 운영의 즉각적인 자신감을 배양합니다.", num: "03", icon: <ChefHat/> },
                { title: "오픈 전후 전문 SV 파견", desc: "가맹점 오픈 준비 단계부터 그랜드 오픈 직후까지 본사 슈퍼바이저가 현장에 직접 상주하며 기기 세팅 및 초기 운영 리스크를 방어합니다.", num: "04", icon: <Store/> },
                { title: "콜드체인 물류 및 R&D", desc: "안정적인 대단위 물류망을 통해 양질의 식자재를 공급하며, 외식 트렌드를 이끄는 R&D 전담팀이 분기별 핵심 신메뉴를 가맹점에 공급합니다.", num: "05", icon: <IceCream2/> },
                { title: "플랫폼 및 마케팅 세팅", desc: "지역구별 배달 플랫폼 최적화 세팅 전략(리뷰, 깃발 최적화) 지도와 함께 매장 오픈 필수 홍보물을 무상으로 지원하여 초기 단골 유입을 견인합니다.", num: "06", icon: <Megaphone/> }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute -top-4 -right-4 p-6 text-8xl font-black text-gray-50 opacity-50 group-hover:text-gray-100 group-hover:scale-110 transition-colors duration-300">{item.num}</div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gray-50 text-[#1A1A1C] rounded-xl flex items-center justify-center mb-6 shadow-sm">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-[#1A1A1C] flex items-center gap-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed break-keep">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button onClick={scrollToForm} className="text-sm font-bold text-gray-600 hover:text-brand-tomato transition underline underline-offset-4">상세 가맹 지원 정책 및 항목 문의하기</button>
            </div>
          </div>
        </section>

        {/* 8. Store Type */}
        <section className="py-24 px-4 bg-[#2D2D2D] text-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="상권 분석 기반 맞춤형 출점 모델" subtitle="CUSTOMIZED FRANCHISE" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { type: "소형 배달형", pyeong: "10평 내외", target: "소자본 창업 / 개인 창업", desc: "단일 평수 대비 배달 플랫폼 상권에 집중하여 비용 효율적인 운영 구조를 제안합니다." },
                { type: "디저트 듀얼 특화형", pyeong: "15-20평", target: "오피스·대학가 상권", desc: "매장을 방문한 홀 고객의 시선을 끄는 빙수&커피 플레이팅과 피자를 동시 제공해 홀과 배달 시너지를 극대화합니다." },
                { type: "프리미엄 복합형", pyeong: "25평 이상", target: "주거 복합 밀집 상권", desc: "가족 단위 방문을 유도하는 쾌적한 홀 공간과 대형 주방을 갖춘 스탠다드 모델입니다." },
                { type: "소자본 업종 전환형", pyeong: "기존 매장 활용", target: "기존 요식업 운영자", desc: "기존 주방 기물을 최대한 활용하여 인테리어 비용을 줄이고 메뉴와 간판을 갱신합니다." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition duration-300">
                  <p className="inline-block px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] text-xs font-bold rounded-full mb-4 border border-[#C5A059]/30">{item.pyeong}</p>
                  <h3 className="text-2xl font-bold mb-2">{item.type}</h3>
                  <p className="text-brand-ice text-sm mb-6 pb-4 border-b border-white/10 font-medium">추천: {item.target}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Trust */}
        <section className="py-24 px-4 bg-white text-center border-b border-[#E5E0D5] relative">
           <div className="max-w-3xl mx-auto">
             <div className="w-full h-48 sm:h-72 lg:h-96 rounded-2xl overflow-hidden mb-12 shadow-lg border border-gray-100">
                <img src="/각종사진/가게사진.png" alt="빙품달 매장 전경" className="w-full h-full object-cover" />
             </div>
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
               <ShieldCheck className="w-8 h-8" />
             </div>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight break-keep text-[#1A1A1C]">
               검증된 운영 시스템 중심의 신뢰할 수 있는 가맹 본사
             </h2>
             <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep mb-10">
               강의나 보증을 빙자한 무조건적인 고수익 약속으로 현혹하지 않습니다. 저희 본사는 철두철미한 상권 분석 데이터를 바탕으로 점주님께 가장 적합한 운영 구조를 제안하고, 체계적인 교육 및 물류 시스템을 통해 성공적인 창업 가능성을 함께 검토하는 파트너가 되겠습니다.
             </p>
             <button onClick={scrollToForm} className="inline-flex items-center gap-2 border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white px-8 py-3 rounded-lg font-bold text-sm transition">
               본사 시스템 및 구조적 이점 상담하기
             </button>
           </div>
        </section>

        {/* 10. Opening Process */}
        <section id="process" className="py-24 px-4 bg-[#F9F7F2] border-b border-[#E5E0D5]">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="체계적인 원스톱 가맹 개설 절차" subtitle="OPENING PROCESS" />
            
            <div className="hidden md:grid grid-cols-4 gap-x-2 gap-y-8 mt-16 relative">
              <div className="absolute top-[28px] left-0 w-full h-1 bg-gray-200 z-0"></div>
              {[
                { s: "STEP 1", t: "가맹 상담 문의", d: "홈페이지 및 유선 접수" },
                { s: "STEP 2", t: "지역 및 상권 확인", d: "희망 지역 출점 가능 여부" },
                { s: "STEP 3", t: "대면 심층 상담", d: "수익 구조 및 시스템 안내" },
                { s: "STEP 4", t: "점포 선정/계약", d: "본사 상권팀 동행 및 계약" },
                { s: "STEP 5", t: "인테리어 및 시공", d: "표준 매뉴얼 기반 시공" },
                { s: "STEP 6", t: "본사 점주 교육", d: "이론 및 조리 실습 (본사/직영)" },
                { s: "STEP 7", t: "오픈 최종 점검", d: "기기 세팅 및 가오픈 점검" },
                { s: "STEP 8", t: "그랜드 오픈", d: "SV 파견 및 초기운영 지원" },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col px-4 text-center items-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white border-4 border-gray-200 text-gray-400 font-bold mb-4 shadow-sm">
                    {i+1}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{step.t}</h4>
                  <p className="text-xs text-gray-500 break-keep">{step.d}</p>
                </div>
              ))}
            </div>

            <div className="md:hidden flex flex-col gap-6 mt-10">
               {[
                { t: "가맹 상담 문의", d: "홈페이지 및 유선 접수" },
                { t: "지역 및 상권 확인", d: "희망 지역 출점 가능 여부 확인" },
                { t: "대면 심층 상담", d: "수익 구조, 원가, 시스템 안내" },
                { t: "점포 선정/계약", d: "상권팀 동행 및 점포 승인" },
                { t: "인테리어 및 시공", d: "표준 매뉴얼 시공 착수" },
                { t: "본사 점주 교육", d: "레시피 및 매장 운영 교육" },
                { t: "오픈 최종 점검", d: "집기 세팅, 리허설 진행" },
                { t: "그랜드 오픈", d: "SV 파견 및 마케팅 시작" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-[#E5E0D5] items-center">
                  <div className="w-12 h-12 shrink-0 bg-brand-charcoal text-white rounded-xl flex items-center justify-center font-bold text-xl">
                    {i+1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-brand-charcoal mb-0.5">{step.t}</h4>
                    <p className="text-sm text-gray-500">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="py-24 px-4 bg-white border-b border-[#E5E0D5]">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="프랜차이즈 창업 FAQ" subtitle="QUESTIONS & ANSWERS" />
            <div className="space-y-4 mt-12">
              {[
                {
                  q: "빙수와 피자를 같이 운영하면 너무 복잡하지 않나요?",
                  a: "빙수와 피자 모두 핵심 재료의 프리미엄 '원팩 시스템'을 적용했습니다. 복잡한 전처리 과정을 없애고, 동선이 겹치지 않는 효율형 주방 설계로 피크 시간대에도 1~2인으로 충분히 동시 운영이 가능하도록 만들어졌습니다."
                },
                {
                  q: "요식업 경험이 전혀 없는 초보자도 창업이 가능한가요?",
                  a: "네, 절반 이상의 가맹점주님들이 요식업 초보자 분들입니다. 본사의 체계적인 조리 매뉴얼과 이론/실습 교육, 그리고 파견되는 슈퍼바이저의 초기 오픈 지원을 통해 누구나 전문가 수준의 맛을 구현할 수 있습니다."
                },
                {
                  q: "홀 전용 매장인지, 배달도 병행하는지 궁금합니다.",
                  a: "상권 특성에 맞춰 A타입(홀 중심), B타입(배달 포장 중심), C타입(복합형) 등 맞춤 오픈이 가능합니다. 대부분 '홀+포장+배달'의 3WAY 매출 시스템을 적용하여 외부 환경 변화에도 꾸준한 매출을 낼 수 있도록 돕습니다."
                },
                {
                  q: "창업 비용은 대략 어느 정도 필요한가요?",
                  a: "매장의 크기(10평형, 20평형 등)와 기존 요식업 매장을 활용하는 업종 전환 형태인지 여부에 따라 비용 편차가 큽니다. 하단 상담 폼을 통해 희망 지역과 보유 예산을 남겨주시면 가장 최적화된 예상 견적을 안내해 드립니다."
                },
                {
                  q: "예상 매출이나 수익률을 미리 알 수 있나요?",
                  a: "상권의 특성, 매장의 규모, 그리고 점주님의 매장 운영 방식(영업 시간, 배달앱 관리 등)에 따라 매출은 달라질 수 있습니다. 무리한 수익 보장 대신, 상담 시 본사의 메뉴별 구조 기반으로 객관적인 참고 자료를 제공해 드립니다."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-[#F9F7F2] rounded-2xl p-6 open:bg-white open:shadow-sm open:border open:border-[#E5E0D5] transition-all duration-300">
                  <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none">
                    <span className="flex gap-3"><span className="text-brand-tomato">Q.</span> <span className="break-keep pr-4">{faq.q}</span></span>
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </span>
                  </summary>
                  <div className="text-gray-600 mt-4 leading-relaxed pl-[28px] border-t border-[#E5E0D5] pt-4 text-[15px] break-keep">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Lead Form Section (Contact) */}
        <section className="py-24 px-4 bg-brand-cream border-t border-[#E5E0D5] relative" ref={formRef}>
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row bg-white border border-[#E5E0D5] rounded-2xl shadow-sm overflow-hidden">
             
             <div className="md:w-1/3 bg-brand-charcoal p-8 flex flex-col justify-between text-white relative">
               <motion.img 
                 src="/피자덕캐릭/af1dc648bb071.png" 
                 alt="피자덕 열람" 
                 className="absolute -top-16 -right-8 w-28 drop-shadow-xl z-20"
                 animate={{ rotate: [-5, 5, -5] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               />
               <div>
                  <h2 className="text-3xl font-bold mb-4">창업 상담 신청</h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">희망 지역과 예산을 남겨주시면<br/>담당자가 24시간 이내 연락드립니다.</p>
                  <div className="mt-6 bg-[#C5A059]/10 border border-[#C5A059]/30 p-4 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
                    <p className="text-xs sm:text-sm text-brand-gold font-bold leading-relaxed break-keep">
                      상담 신청 후 무리한 계약 권유 없이 객관적인 창업 가능성만 안내드립니다.
                    </p>
                  </div>
               </div>
               <div className="w-16 h-1 w-full bg-brand-gold mb-6 mt-8"></div>
               <div className="text-xs text-gray-300 italic">
                 "단일 운영의 한계를 극복하는<br/>새로운 솔루션"
               </div>
             </div>

             <div className="md:w-2/3 p-8 sm:p-12">
               {!formSubmitted ? (
                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase">성함</label>
                       <input required type="text" placeholder="예) 홍길동" className="w-full p-3 bg-brand-cream border border-[#E5E0D5] rounded-lg text-sm outline-none focus:border-brand-gold transition" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase">연락처</label>
                       <input required type="tel" placeholder="예) 010-1234-5678" className="w-full p-3 bg-brand-cream border border-[#E5E0D5] rounded-lg text-sm outline-none focus:border-brand-gold transition" />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase">희망 지역</label>
                       <input required type="text" placeholder="예) 서울시 마포구" className="w-full p-3 bg-brand-cream border border-[#E5E0D5] rounded-lg text-sm outline-none focus:border-brand-gold transition" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase">창업 예산</label>
                       <select className="w-full p-3 bg-brand-cream border border-[#E5E0D5] rounded-lg text-sm outline-none focus:border-brand-gold transition text-gray-800 appearance-none">
                         <option value="">선택해주세요</option>
                         <option value="3천만 원 이하">3천만 원 이하 (업종변경)</option>
                         <option value="3천~5천만 원">3천 ~ 5천만 원 내외</option>
                         <option value="5천~1억 원">5천 ~ 1억 원 내외</option>
                         <option value="1억 원 이상">1억 원 이상</option>
                       </select>
                     </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase">요식업 운영 경험</label>
                     <div className="flex gap-4 mt-2">
                       <label className="flex items-center text-xs gap-2 cursor-pointer">
                         <input type="radio" name="experience" value="yes" className="accent-brand-gold w-4 h-4" /> 경력 있음
                       </label>
                       <label className="flex items-center text-xs gap-2 cursor-pointer">
                         <input type="radio" name="experience" value="no" defaultChecked className="accent-brand-gold w-4 h-4" /> 처음 시작
                       </label>
                     </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase">기타 문의사항 (선택)</label>
                     <textarea rows={2} placeholder="궁금하신 점을 남겨주시면 꼼꼼히 확인 후 답변드리겠습니다." className="w-full p-3 bg-brand-cream border border-[#E5E0D5] rounded-lg text-sm outline-none focus:border-brand-gold transition resize-none"></textarea>
                   </div>

                   <div className="mt-2 flex items-start gap-2">
                     <input required type="checkbox" className="mt-1 accent-brand-gold w-3 h-3" />
                     <span className="text-[11px] text-gray-500 leading-tight">개인정보 수집 및 이용에 동의합니다. 수집된 정보는 창업 상담 목적으로만 활용되며, 상담 종료 후 안전하게 파기됩니다.</span>
                   </div>

                   <button type="submit" className="mt-4 w-full py-4 bg-brand-tomato text-white font-bold text-sm lg:text-base rounded-xl shadow-lg shadow-red-100 hover:bg-[#D32F2F] transition-all relative overflow-hidden group">
                     <span className="relative z-10 flex items-center justify-center gap-2">무료 창업 상담 신청하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                   </button>
                 </form>
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   className="text-center py-16"
                 >
                   <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">상담 신청이 완료되었습니다</h3>
                   <p className="text-gray-500 text-sm mb-6">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
                   <button onClick={() => setFormSubmitted(false)} className="text-brand-tomato text-sm font-bold underline">다시 입력하기</button>
                 </motion.div>
               )}
             </div>
          </div>
        </section>

        {/* 13. Final CTA */}
        <section className="py-24 px-4 bg-[#1A1A1A] border-t border-brand-charcoal relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-[#E53935] rounded-full mix-blend-screen opacity-10 filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-[#0288D1] rounded-full mix-blend-screen opacity-10 filter blur-[100px]"></div>
          
          {/* Character */}
          <motion.img 
            src="/피자덕캐릭/4df0fb51c5fc9.png" 
            alt="피자덕 따봉" 
            className="absolute bottom-0 md:bottom-10 right-0 md:right-10 w-24 md:w-48 z-10 drop-shadow-2xl opacity-50"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 border border-white/20 bg-white/5 rounded-full mb-8 text-xs font-bold text-white uppercase tracking-widest backdrop-blur-sm">Franchise Partnership</div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 break-keep leading-tight text-white">상황에 맞춘 탄력성 있는 점포 파트너십<br/>저희 빙수앤피자와 논의해보세요.</h2>
            <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-2xl mx-auto break-keep font-medium leading-relaxed">
              본사의 교육 및 물류 시스템을 바탕으로 가맹점주님의 초기 매장 안착과 운영을 위해 힘쓰겠습니다. 희망 출점 지역을 남겨주시면 해당 지역의 실질적인 상황을 참고하여 연락드리겠습니다.
            </p>
            <CTAButton onClick={scrollToForm} variant="primary" className="px-10 py-5 text-base shadow-2xl">
              가맹 출점 가능성 및 혜택 상담하기 &rarr;
            </CTAButton>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-brand-charcoal pt-16 pb-32 md:pb-16 px-4 text-gray-400 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <img src="/로고/빙품달로고.png" alt="빙품달 로고" className="h-16 object-contain mb-6 opacity-90 hover:opacity-100 transition-opacity" />
              <p className="text-sm border-t border-white/20 pt-4 w-full text-center md:text-left max-w-sm">상호: (주)빙수앤피자프랜차이즈 | 대표자: 임대표 | 사업자등록번호: 123-45-67890</p>
              <p className="text-sm mt-1">주소: 서울특별시 강남구 테헤란로 123, 4층 | 대표번호: 1588-0000</p>
              <p className="text-sm mt-4">&copy; 2026 빙품달 듀얼 F&B 창업센터. All rights reserved.</p>
            </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 p-3 bg-white border-t border-[#E5E0D5] z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] safe-area-bottom pb-6">
        <div className="flex gap-2 h-12">
          <a href="https://pf.kakao.com/" target="_blank" rel="noreferrer" className="flex-[1] flex flex-col items-center justify-center gap-0.5 bg-[#F9E000] border border-transparent text-[#1A1A1C] font-bold rounded-xl shadow-[0_2px_8px_rgba(254,229,0,0.3)] hover:brightness-95 transition-all">
            <MessageCircle className="w-4 h-4" fill="currentColor" />
            <span className="text-[10px]">카톡 문의</span>
          </a>
          <button onClick={scrollToForm} className="flex-[2.5] flex items-center justify-center gap-2 bg-brand-tomato text-white font-bold rounded-xl shadow-[0_4px_16px_rgba(229,57,53,0.3)] relative overflow-hidden group active:scale-95 transition-transform">
            <span className="relative z-10 text-[15px]">무료 창업 상담 신청</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </button>
        </div>
      </div>
      
      {/* CSS adjustments for safe area on mobile */}
      <style>{`
        .safe-area-bottom {
          padding-bottom: calc(1rem + env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
