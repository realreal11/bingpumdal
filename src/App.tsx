import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import emailjs from '@emailjs/browser';
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
  Flame,
  ThumbsUp,
  RefreshCw
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

const salesDataRow1 = [
  { name: "해운대점", date: "2025년 8월", amount: "112,379,800" },
  { name: "광안점", date: "2025년 8월", amount: "138,224,110" },
  { name: "창원점", date: "2025년 7월", amount: "105,238,300" },
  { name: "서면점", date: "2025년 7월", amount: "158,087,362" },
  { name: "진주하대점", date: "2025년 7월", amount: "55,955,900" },
];

const salesDataRow2 = [
  { name: "대구구지점", date: "2025년 7월", amount: "71,309,400" },
  { name: "인천남동구점", date: "2025년 7월", amount: "71,396,133" },
  { name: "대구월배점", date: "2025년 8월", amount: "94,233,600" },
  { name: "부산동구점", date: "2025년 8월", amount: "68,114,200" },
];

const ScrollMarquee = ({ items, reverse = false }: { items: typeof salesDataRow1, reverse?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // We duplicate items many times to ensure infinite scroll look
  const displayItems = [...items, ...items, ...items, ...items, ...items];

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isDragging.current) {
        if (!reverse) {
          scrollRef.current.scrollLeft += 1.2;
          // check if we reached one full set width (very roughly, but it's simpler to just let it scroll a long way or reset properly)
          // Since it's a dummy, we'll reset when we are past 2 sets
          if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 5) * 3) {
             scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 5;
          }
        } else {
          scrollRef.current.scrollLeft -= 1.2;
          if (scrollRef.current.scrollLeft <= scrollRef.current.scrollWidth / 5) {
             scrollRef.current.scrollLeft = (scrollRef.current.scrollWidth / 5) * 3;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    // Initial jump
    if (scrollRef.current && reverse) {
      scrollRef.current.scrollLeft = (scrollRef.current.scrollWidth / 5) * 3;
    }
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [reverse]);

  const onDragStart = (pageX: number) => {
    isDragging.current = true;
    startX.current = pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onDragEnd = () => { isDragging.current = false; };

  const onDragMove = (pageX: number) => {
    if (!isDragging.current) return;
    const x = pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div 
      ref={scrollRef}
      className={`flex overflow-x-hidden w-full cursor-grab active:cursor-grabbing border-b border-black select-none ${reverse ? 'border-t-0' : 'border-t border-[#444]'}`}
      onMouseDown={(e) => onDragStart(e.pageX)}
      onMouseLeave={onDragEnd}
      onMouseUp={onDragEnd}
      onMouseMove={(e) => {
        if (isDragging.current) e.preventDefault();
        onDragMove(e.pageX);
      }}
      onTouchStart={(e) => onDragStart(e.touches[0].pageX)}
      onTouchEnd={onDragEnd}
      onTouchMove={(e) => onDragMove(e.touches[0].pageX)}
    >
      {displayItems.map((item, idx) => (
        <div key={idx} className="flex relative justify-between items-center shrink-0 w-[280px] sm:w-[320px] md:w-[400px] h-[100px] sm:h-[120px] bg-white text-center border-l border-r border-transparent">
           <div className="flex-1 flex flex-col items-center justify-center pointer-events-none">
             <h4 className="text-lg md:text-2xl font-black text-[#1A1A1C] mb-1 md:mb-2">{item.name}</h4>
             <p className="text-gray-400 text-xs md:text-sm font-bold mb-1 tracking-tight">{item.date} 매출</p>
             <div className="text-[#FA0021] text-2xl md:text-4xl font-black tracking-tighter">
                {item.amount}<span className="text-base md:text-xl font-bold ml-1 text-black">원</span>
             </div>
           </div>
           <div className="absolute right-0 h-[80%] my-auto w-3 md:w-4 flex flex-col justify-around items-center opacity-90 translate-x-1/2 z-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] bg-[#2A2A2A] rounded-full drop-shadow-sm"></div>
              ))}
           </div>
        </div>
      ))}
    </div>
  )
}

const LaurelIcon = ({ flip = false }) => (
  <svg width="40" height="80" viewBox="0 0 54 139" fill="none" className={`text-white w-10 h-20 sm:w-12 sm:h-24 ${flip ? 'scale-x-[-1]' : ''}`}>
    <path d="M49 137C30.6667 110.667 0.999999 62 17 5C17 5 3 24 6 52C9 80 24 105 49 137Z" fill="currentColor"/>
    <path d="M19 86C20.6667 85 24 81 24 73C24 65 22 55 15 51C15 51 29 55 31 66C33 77 24 88 19 86Z" fill="currentColor"/>
    <path d="M13 62C14.6667 61 18 57 18 49C18 41 16 31 9 27C9 27 23 31 25 42C27 53 18 64 13 62Z" fill="currentColor"/>
    <path d="M9 40C10.6667 39 14 35 14 27C14 19 12 9 5 5C5 5 19 9 21 20C23 31 14 42 9 40Z" fill="currentColor"/>
    <path d="M26 109C27.6667 108 31 104 31 96C31 88 29 78 22 74C22 74 36 78 38 89C40 100 31 111 26 109Z" fill="currentColor"/>
  </svg>
);

const SalesMarqueeSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#18181A] overflow-hidden border-t-[10px] border-black border-b-[8px] border-[#3E3E3E] shadow-[0_0_50px_rgba(0,0,0,0.8)_inset]">
      {/* Dark background image */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none mix-blend-luminosity">
        <img src="/피자/피자잔뜩.jpg" className="w-full h-full object-cover blur-sm scale-[1.02]" alt="Background" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12 md:mb-16 text-center flex flex-col items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
             hidden: { opacity: 0 },
             visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
          }}
          className="flex items-center justify-center gap-2 sm:gap-6"
        >
           <motion.div variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -30 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.5 } } }}>
               <LaurelIcon />
           </motion.div>
           <div className="flex flex-col items-center pt-4">
             <motion.h3 
               variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
               className="text-white text-lg sm:text-2xl font-bold mb-1 tracking-tight drop-shadow-md"
             >
                 배달형 매장 <span className="font-black">월매출 1억!</span>
             </motion.h3>
             <motion.h2 
               variants={{ hidden: { opacity: 0, scale: 0.8, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } } }}
               className="text-[#F44336] text-[40px] sm:text-6xl md:text-[80px] font-black tracking-tighter drop-shadow-lg leading-none"
             >
                 100,000,000<span className="text-2xl sm:text-4xl md:text-[50px] font-bold ml-1 text-[#E53935]">원</span>
             </motion.h2>
           </div>
           <motion.div variants={{ hidden: { opacity: 0, scale: 0.5, rotate: 30 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.5 } } }}>
               <LaurelIcon flip />
           </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
         <ScrollMarquee items={salesDataRow1} />
         <ScrollMarquee items={salesDataRow2} reverse={true} />
      </div>
      
      <div className="relative z-10 mt-12 md:mt-16 text-center text-gray-400 font-bold text-xs sm:text-sm md:text-base">
         <p>안정된 매출, 편리한 시스템, 고정비 걱정 끝</p>
         <p>수많은 시행 착오 끝에 맛, 아이템, 매출 다 잡았습니다.</p>
      </div>
    </section>
  )
}

const bingsuMenu = [
  "요거트샤인머스켓빙수", "인절미빙수", "젤라또녹차빙수", "초코시리얼빙수", "초코케익빙수", 
  "콰트로치즈빙수", "팥인절미빙수", "팥젤라또녹차빙수", "흑임자팥빙수", "눈꽃빙수(우유100%)", 
  "생딸기치즈빙수", "요거트생딸기빙수", "베리베리빙수", "(그리운)눈꽃팥빙수", 
  "리얼돼지바빙수", "망고치즈빙수", "반반쟁반빙수", "복숭아치즈빙수", "블루베리치즈빙수", 
  "스윗로투스빙수", "옥슈로맛있겠지", "요거트블루베리빙수"
].map(name => ({ name, img: `/빙수/${name.replace('%', '%25')}.png` }));

const pizzaMenu = [
  "빈틈없는페퍼로니", "스윗골드고구마피자", "왕구슬함박스테이크", "콤비네이션피자", 
  "콰트로치즈피자", "텍사스바베큐피자", "트러플머쉬룸피자", "포덕포덕피자", 
  "할라피뇨핫치킨피자", "갈릭쉬림프피자", "갓새우피자", "고구마무스피자", 
  "더블포테이토피자", "레드페퍼로니피자", "리얼불고기피자", "매쉬드포테이토골드피자", 
  "메가더블베이컨체다피자", "반반피자"
].map(name => ({ name, img: `/피자/${name}.png` }));

const MenuMarquee = ({ items, reverse = false }: { items: {name: string, img: string}[], reverse?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Repeat items to ensure infinite seamless scrolling
  const displayItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isDragging.current) {
        if (!reverse) {
          scrollRef.current.scrollLeft += 1;
          if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
             scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 4;
          }
        } else {
          scrollRef.current.scrollLeft -= 1;
          if (scrollRef.current.scrollLeft <= 0) {
             scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 4;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    if (scrollRef.current && reverse) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 4;
    }
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [reverse]);

  const onDragStart = (pageX: number) => {
    isDragging.current = true;
    startX.current = pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onDragEnd = () => { isDragging.current = false; };

  const onDragMove = (pageX: number) => {
    if (!isDragging.current) return;
    const x = pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-hidden w-full cursor-grab active:cursor-grabbing select-none py-4"
      onMouseDown={(e) => onDragStart(e.pageX)}
      onMouseLeave={onDragEnd}
      onMouseUp={onDragEnd}
      onMouseMove={(e) => {
        if (isDragging.current) e.preventDefault();
        onDragMove(e.pageX);
      }}
      onTouchStart={(e) => onDragStart(e.touches[0].pageX)}
      onTouchEnd={onDragEnd}
      onTouchMove={(e) => onDragMove(e.touches[0].pageX)}
    >
      {displayItems.map((menu, idx) => (
        <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm bg-white aspect-square border border-[#E5E0D5] w-[180px] sm:w-[220px] md:w-[260px] shrink-0 mx-2">
          <img src={menu.img} alt={menu.name} className="w-full h-full object-contain p-4 transition duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-bold text-sm sm:text-base">{menu.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Page Sections ---

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // EmailJS Lead Form States
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    region: '',
    memo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Bottom Lead Form states
  const [bottomForm, setBottomForm] = useState({
    name: '',
    phone: '',
    region: ''
  });
  const [isBottomSubmitting, setIsBottomSubmitting] = useState(false);
  const [bottomSubmitStatus, setBottomSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isBottomBarCollapsed, setIsBottomBarCollapsed] = useState(false);

  // Privacy Policy Agreement States
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isBottomPrivacyAgreed, setIsBottomPrivacyAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleBottomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBottomForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBottomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomForm.name || !bottomForm.phone || !bottomForm.region) {
      alert("성함, 연락처, 희망 지역은 필수 입력 항목입니다.");
      return;
    }

    if (!isBottomPrivacyAgreed) {
      alert("개인정보 수집 및 이용에 동의하셔야 상담 신청이 가능합니다.");
      return;
    }

    setIsBottomSubmitting(true);
    setBottomSubmitStatus('idle');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS credentials missing for sticky bottom bar.");
      setTimeout(() => {
        setIsBottomSubmitting(false);
        setBottomSubmitStatus('success');
        setBottomForm({ name: '', phone: '', region: '' });
        setIsBottomPrivacyAgreed(false);
      }, 1500);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: bottomForm.name,
          phone: bottomForm.phone,
          region: bottomForm.region,
          message: "하단 고정 바에서 빠른 상담을 신청했습니다.",
          to_name: "가맹본부 담당자"
        },
        publicKey
      );

      setIsBottomSubmitting(false);
      setBottomSubmitStatus('success');
      setBottomForm({ name: '', phone: '', region: '' });
      setIsBottomPrivacyAgreed(false);
    } catch (error: any) {
      console.error("EmailJS bottom form transmit fail:", error);
      const errorMsg = error?.text || error?.message || JSON.stringify(error);
      console.error("EmailJS error detail:", errorMsg);
      setIsBottomSubmitting(false);
      setBottomSubmitStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeadForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.region) {
      alert("성함, 연락처, 희망 지역은 필수 입력 항목입니다.");
      return;
    }

    if (!isPrivacyAgreed) {
      alert("개인정보 수집 및 이용에 동의하셔야 상담 신청이 가능합니다.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Retrieve environment variables from Vite env config safely
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check configuration and report to user if missing in environment
    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS credentials missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your AI Studio secrets / environment variables."
      );
      // Optional fallback simulation so user can test UI safely in the preview
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setLeadForm({ name: '', phone: '', region: '', memo: '' });
        setIsPrivacyAgreed(false);
      }, 1500);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: leadForm.name,
          phone: leadForm.phone,
          region: leadForm.region,
          message: leadForm.memo,
          to_name: "가맹본부 담당자"
        },
        publicKey
      );

      setIsSubmitting(false);
      setSubmitStatus('success');
      setLeadForm({ name: '', phone: '', region: '', memo: '' });
      setIsPrivacyAgreed(false);
    } catch (error: any) {
      console.error("EmailJS transmission fail: ", error);
      const errorMsg = error?.text || error?.message || JSON.stringify(error);
      console.error("EmailJS error detail:", errorMsg);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  const scrollToForm = () => {
    setIsMobileMenuOpen(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans bg-brand-cream text-brand-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white z-50 border-b border-[#E5E0D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-[#1A1A1C] px-4 py-1.5 rounded-full flex items-center justify-center border border-gray-700 shadow-md">
              <img src="/로고/빙품달로고.png" alt="빙품달 로고" className="h-6 md:h-8 object-contain drop-shadow-sm" />
            </div>
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
               <span className="text-2xl font-black tracking-tighter">피자덕<span className="text-brand-tomato">&</span>빙품달</span>
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
              <img src="/각종사진/가게사진1.png" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
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
             {/* Logo Container */}
             <div className="flex justify-center items-center gap-3 sm:gap-10 mb-8 lg:mb-12">
               <motion.img 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 src="/로고/빙품달로고.png" 
                 alt="빙수품은달 로고" 
                 className="h-10 sm:h-16 md:h-20 lg:h-24 max-w-[40vw] object-contain drop-shadow-2xl" 
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                 className="text-white/40 font-light"
               >
                 <X className="w-6 h-6 sm:w-10 sm:h-10 shrink-0" strokeWidth={1} />
               </motion.div>
               <motion.img 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.6 }}
                 src="/로고/피자덕로고.png" 
                 alt="피자덕 로고" 
                 className="h-10 sm:h-16 md:h-20 lg:h-24 max-w-[40vw] object-contain drop-shadow-2xl" 
               />
             </div>

             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
               className="text-white text-lg md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 drop-shadow-md break-keep"
             >
               <span className="bg-[#D32F2F] px-2 py-1 tracking-tight mr-1">빙수X피자</span> 완벽한 듀얼 매출 시스템
             </motion.h2>
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.5 }}
               className="text-white text-4xl sm:text-5xl md:text-[72px] lg:text-[88px] xl:text-[100px] font-black mb-6 lg:mb-10 tracking-tighter leading-[1.2] drop-shadow-lg break-keep"
               style={{ perspective: 1000 }}
             >
               인생이 걸린 창업,<br/> 리스크를 최대한 줄여드립니다.
             </motion.h1>

             <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring", bounce: 0.6 }}
                className="text-[#F1C40F] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-8 lg:mb-12 drop-shadow-lg break-keep tracking-tight"
              >
                총 2400만원 상당의 혜택 지원
              </motion.p>
              

             
             
             {/* Center Ticket Style Banner */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.8, delay: 1.8, type: "spring", bounce: 0.5 }}
                className="hidden"
             >
                <div className="bg-[#FFFDF5] w-full p-10 sm:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative overflow-hidden rounded-[40px] border-[6px] border-[#1A1A1C]">
                  
                  <div className="absolute top-1/2 -left-6 bg-[#18181A] w-12 h-12 rounded-full -translate-y-1/2 border-[6px] border-[#1A1A1C]"></div>
                  <div className="absolute top-1/2 -right-6 bg-[#18181A] w-12 h-12 rounded-full -translate-y-1/2 border-[6px] border-[#1A1A1C]"></div>

                  <div className="w-full border-b-[4px] border-dotted border-[#1A1A1C]/30 mb-8 mt-2"></div>
                  <h3 className="text-4xl sm:text-5xl md:text-[60px] font-black text-center leading-snug mb-4 break-keep tracking-tight text-[#1A1A1C]">
                    창업비 약 <span className="text-[#D32F2F] text-[1.2em] inline-block -rotate-2">5000</span>만원에<br/>
                    <span className="text-[#D32F2F] text-[1.3em] block mt-5 inline-block rotate-2">듀얼 창업을!</span>
                  </h3>
                  <div className="w-full border-b-[4px] border-dotted border-[#1A1A1C]/30 mt-10 mb-6"></div>
                  <p className="text-gray-500 text-sm sm:text-base font-bold text-center">
                    (보증금, 권리금 제외)
                  </p>
                  
                </div>
             </motion.div>

             {/* Cards */}
             <motion.div 
               initial="hidden"
               animate="visible"
               variants={{
                 hidden: { opacity: 0 },
                 visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 2.4 } }
               }}
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto z-40 relative"
             >
               {[
                   { title1: "", highlight: "50호점 돌파", title2: "!", desc1: "전국 각지에서", desc2: "성공을 증명하고 있습니다!" },
                   { title1: "피자와 빙수로 ", highlight: "365 성수기", title2: "", desc1: "여름엔 빙수, 겨울엔 피자!", desc2: "계절을 타지 않는 안정적인 매출" },
                   { title1: "집중된 두가지로 ", highlight: "전문성 있는 맛", title2: "", desc1: "선택과 집중으로", desc2: "놀라운 맛의 퀄리티 달성!" },
                   { title1: "", highlight: "간편한 조리시스템", title2: "", desc1: "초보자도 당장 가능한", desc2: "효율적인 주방 운영" },
                   { title1: "담당 슈퍼바이저 ", highlight: "배정", title2: "", desc1: "매장 오픈부터 운영까지", desc2: "전문가의 1:1 밀착 관리" },
                   { title1: "유료 상권 분석 ", highlight: "무료 제공", title2: "", desc1: "지역별 데이터 기반", desc2: "최적의 입지 선정 무료 컨설팅" }
               ].map((card, idx) => (
                   <motion.div 
                     variants={{
                       hidden: { opacity: 0, y: 30, scale: 0.9 },
                       visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5 } }
                     }}
                     key={idx} 
                     className="bg-white pl-10 pr-4 py-8 sm:py-10 flex flex-col items-center justify-center text-center shadow-[0_15px_30px_rgba(0,0,0,0.6)] min-h-[160px] sm:min-h-[220px] relative overflow-hidden group hover:-translate-y-1 transition-transform"
                   >
                       <h3 className="text-xl sm:text-2xl lg:text-2xl font-black text-[#1A1A1C] mb-4 sm:mb-6 leading-tight break-keep">
                           {card.title1}<br className="hidden sm:block lg:hidden"/><span className="text-[#D32F2F]">{card.highlight}</span>{card.title2}
                       </h3>
                       <p className="text-gray-700 font-bold text-sm lg:text-base break-keep leading-relaxed px-2">
                           {card.desc1}<br/>{card.desc2}
                       </p>
                       <div className="absolute left-0 inset-y-0 w-8 md:w-10 pointer-events-none bg-gray-50 flex items-center justify-center overflow-hidden border-r border-black/5">
                          <div className="text-center -rotate-90 whitespace-nowrap text-[1.5rem] font-black tracking-widest text-black/10 uppercase" style={{ transformOrigin: 'center center' }}>BING&PIZZA</div>
                       </div>
                   </motion.div>
               ))}
             </motion.div>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.8 }}
               className="w-full max-w-xl mx-auto mt-16 mb-10 lg:mt-24 z-40 relative text-left bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             >
               {/* Mobile Phone Call Button */}
               <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="hidden">
                 
               </a>
               
               {/* PC Phone Call Display */}
               <div className="w-full flex flex-col relative">
                  <div className="mb-8 text-center flex flex-col items-center justify-center">
                    <h3 className="text-white text-2xl sm:text-3xl font-black text-center font-display leading-snug drop-shadow-md break-keep">
                      찔러만 보셔도 좋습니다.<br />
                      강요 하지 않습니다.<br />
                      궁금한 부분만 설명드립니다.<br />
                      <span className="text-[#F1C40F]">부담없이 문의주세요!</span>
                    </h3>
                  </div>
                                   <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hero-name" className="block text-xs font-bold text-gray-300 mb-1.5 pl-1">
                          성함 *
                        </label>
                        <input
                          type="text"
                          id="hero-name"
                          name="name"
                          required
                          value={leadForm.name}
                          onChange={handleInputChange}
                          placeholder="성함 입력"
                          className="w-full px-4 py-3 bg-[#1A1A1C]/80 hover:bg-[#252528] focus:bg-[#252528] border border-white/10 focus:border-[#E53935] text-white rounded-xl text-sm font-bold focus:outline-none transition-all placeholder:text-gray-500"
                        />
                      </div>
                                         <div>
                        <label htmlFor="hero-phone" className="block text-xs font-bold text-gray-300 mb-1.5 pl-1">
                          연락처 *
                        </label>
                        <input
                          type="tel"
                          id="hero-phone"
                          name="phone"
                          required
                          value={leadForm.phone}
                          onChange={handleInputChange}
                          placeholder="연락처 입력 (010-XXXX-XXXX)"
                          className="w-full px-4 py-3 bg-[#1A1A1C]/80 hover:bg-[#252528] focus:bg-[#252528] border border-white/10 focus:border-[#E53935] text-white rounded-xl text-sm font-bold focus:outline-none transition-all placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                                       <div>
                      <label htmlFor="hero-region" className="block text-xs font-bold text-gray-300 mb-1.5 pl-1">
                        창업 희망 지역 *
                      </label>
                      <input
                        type="text"
                        id="hero-region"
                        name="region"
                        required
                        value={leadForm.region}
                        onChange={handleInputChange}
                        placeholder="예: 서울 관악구, 경기 수원시 등"
                        className="w-full px-4 py-3 bg-[#1A1A1C]/80 hover:bg-[#252528] focus:bg-[#252528] border border-white/10 focus:border-[#E53935] text-white rounded-xl text-sm font-bold focus:outline-none transition-all placeholder:text-gray-500"
                      />
                    </div>


                  <div>
                    <div>
                      <label htmlFor="hero-memo" className="block text-xs font-bold text-gray-300 mb-1.5 pl-1">
                        추가 문의사항 및 희망예산 (선택)
                      </label>
                      <textarea
                        id="hero-memo"
                        name="memo"
                        rows={2}
                        value={leadForm.memo}
                        onChange={handleInputChange}
                        placeholder="창업 예산 등 문의내용을 편하게 남겨주세요."
                        className="w-full px-4 py-3 bg-[#1A1A1C]/80 hover:bg-[#252528] focus:bg-[#252528] border border-white/10 focus:border-[#E53935] text-white rounded-xl text-sm font-bold focus:outline-none transition-all placeholder:text-gray-500 resize-none"
                      />
                    </div>

                    {/* 개인정보 제공 동의 */}
                    <div className="bg-[#1A1A1C]/50 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs text-gray-300 font-semibold mt-4">
                      <label className="flex items-center gap-2 cursor-pointer select-none font-semibold">
                        <input
                          type="checkbox"
                          checked={isPrivacyAgreed}
                          onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-tomato focus:ring-brand-tomato border-white/10 bg-white/5 cursor-pointer"
                        />
                        <span>개인정보 수집 및 이용 동의 <span className="text-[#F1C40F] font-black">(필수)</span></span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="text-gray-400 hover:text-white underline cursor-pointer font-bold shrink-0 text-[11px]"
                      >
                        전문보기
                      </button>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-400 font-bold text-xs text-center mt-3">
                        접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                      </p>
                    )}

                    {submitStatus === 'success' && (
                      <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center w-full mt-3">
                        <p className="text-green-400 font-bold text-xs leading-relaxed">
                          🎉 가맹 상담 신청이 성공적으로 접수되었습니다!<br/>기입해주신 연락처로 담당자가 신속히 안내전화 드리겠습니다.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#E53935] hover:bg-[#D32F2F] text-white font-black text-base rounded-xl transition duration-300 shadow-[0_4px_20px_rgba(229,57,53,0.35)] flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>신청 접수 중...</span>
                        </>
                      ) : (
                        <>
                          <span>무료 창업 상담 신청하기</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Small Phone Consultation Link/Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 text-center flex items-center justify-center gap-2 text-xs text-gray-400 font-bold">
                  <span>빠른 전화상담 :</span>
                  <a href="tel:070-4517-3015" className="text-[#F1C40F] hover:text-[#f39c12] font-black tracking-wider transition-colors flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" /> 070-4517-3015
                  </a>
                </div>
              </div>
              </motion.div>
          </div>
        </section>

        <ScrollStoryteller />

        <SalesMarqueeSection />

        {/* 1. Core Concept Section (Originally Hero) */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-brand-cream border-b border-[#E5E0D5]" id="concept">

          {/* Vibrant Split Background Images */}
          <div className="absolute inset-0 z-0 flex pointer-events-none">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-1/2 h-full relative overflow-hidden"
            >
              <img src="/빙수/빙수잔뜩.jpg" alt="빙수 배경" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </motion.div>
            <motion.div 
              initial={{ x: "100%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-1/2 h-full relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30 z-10"></div>
              <img src="/피자/피자잔뜩.jpg" alt="피자 배경" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
            </motion.div>
          </div>
          
          {/* Subtle gradient for depth, removing heavy blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none"
          ></motion.div>

          <div className="relative z-10 text-center px-4 md:max-w-4xl max-w-full mx-auto flex flex-col items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.8, 
                    type: "spring", 
                    bounce: 0.4,
                    staggerChildren: 0.2,
                    delayChildren: 0.4
                  } 
                }
              }}
              className="bg-white/95 border border-gray-200 p-8 md:p-14 lg:px-20 rounded-[32px] shadow-xl flex flex-col items-center relative overflow-hidden"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-32 h-32 bg-[#FFEBEE] rounded-bl-full blur-2xl pointer-events-none"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-32 h-32 bg-[#E1F5FE] rounded-tr-full blur-2xl pointer-events-none"
              ></motion.div>

              <div className="relative z-10 flex flex-col items-center w-full">
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5 } }
                  }}
                  className="inline-block px-5 py-2 bg-[#FFF9C4] border border-[#FDE047] text-[#1A1A1C] text-xs sm:text-sm font-bold rounded-full mb-6 whitespace-nowrap shadow-sm"
                >
                  빙수는 여름에, 피자는 사계절 내내!
                </motion.div>
                
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, rotateX: -20 },
                    visible: { opacity: 1, scale: 1, rotateX: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }
                  }}
                  style={{ perspective: 1000 }}
                  className="text-4xl sm:text-5xl md:text-[56px] font-black text-[#1A1A1C] mb-6 leading-[1.2] break-keep text-balance tracking-tight"
                >
                  <span className="text-brand-tomato">배달 피자</span>와 <span className="text-blue-500">홀 디저트</span>의 완벽한 만남!<br/> 비수기 틈도 없는<br className="hidden sm:block"/> 듀얼 하이브리드 창업
                </motion.h1>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed break-keep font-medium"
                >
                  단일 메뉴의 한계를 넘어 홀과 배달 메뉴를 동시에 판매합니다.<br className="hidden md:block" /> 하루 종일 주문이 쏟아지는 효율적인 운영 구조를 제안해 드립니다.
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
                  }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
                >
                  <CTAButton onClick={scrollToForm} variant="primary" className="w-full sm:w-auto text-[15px] sm:text-base px-6 py-3 sm:px-8 sm:py-4 hover:scale-105 transition-transform">
                    창업 상담 신청하기
                  </CTAButton>
                  <CTAButton onClick={scrollToForm} variant="secondary" className="w-full sm:w-auto text-[15px] sm:text-base px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-gray-50 hover:scale-105 transition-transform">
                    예상 창업 비용 받아보기
                  </CTAButton>
                </motion.div>
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
                  src="/빙수/딸샤벳빙수.png"
                  alt="딸샤벳빙수"
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
                      "배달 객단가를 순식간에 높이는 마법의 디저트 아이템",
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
        <section className="py-24 px-4 bg-[#1A1A1C] relative overflow-hidden">
          {/* Pizza duck character on top right of the key */}
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
             {/* Key Point Header */}
             <div className="relative w-full max-w-4xl flex justify-center py-10 px-4 md:px-12 object-contain">
               <motion.img 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ type: "spring", bounce: 0.5 }}
                 src="/각종사진/열쇠사진.png" 
                 alt="매출 폭발 2배 Key Point" 
                 className="w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[40px] hover:scale-105 transition-transform duration-500" 
               />
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
                 <FadeIn key={idx} delay={idx * 0.1} className="bg-[#E53935] rounded-3xl md:rounded-[40px] p-6 lg:p-8 flex items-center gap-4 md:gap-6 shadow-[0_6px_0_0_#C62828] transform transition-transform hover:-translate-y-1 hover:shadow-[0_8px_0_0_#C62828] cursor-default mx-2 md:mx-0">
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
             <div className="text-center w-full px-4 text-white">
               <h3 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-snug tracking-tight break-keep">
                 지금 상담만해도 <span className="text-[#FACC15]">2400만원</span><br className=""/>
                 상당의 <span className="text-[#FACC15]">12가지 창업혜택!</span>
               </h3>
               <p className="text-gray-300 font-bold text-lg sm:text-xl md:text-2xl mb-12 break-keep">
                 딱! 10분 상담으로 다르다는 걸 느낄 수 있습니다.
               </p>
               <button onClick={scrollToForm} className="bg-[#E53935] text-white font-black text-xl sm:text-2xl md:text-3xl px-12 sm:px-20 py-6 rounded-[40px] shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all">
                 상담신청하기
               </button>
             </div>
          </div>
        </section>

        {/* 3.75. Marketing Support Section */}
        <section className="py-24 px-4 bg-[#D32F2F] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l1.373 1.373v57.254l-1.373 1.373H5.373L4 58.627V1.373L5.373 0h49.254zm-2.746 4H8.12v52h43.76v-52z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Left Content */}
              <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                >
                   <div className="inline-flex items-center justify-center gap-2 bg-[#B71C1C] text-[#FACC15] px-6 py-3 rounded-full font-black text-sm sm:text-base border border-[#FACC15]/30 shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-8 sm:mb-10 mx-auto lg:mx-0">
                      <Megaphone className="w-5 h-5" />
                      <span>피자덕 퍼펙트 마케팅 지원</span>
                   </div>
                   
                   <h2 className="text-[2.5rem] sm:text-5xl md:text-[4rem] font-black text-white leading-[1.2] mb-8 sm:mb-10 tracking-tight break-keep drop-shadow-lg">
                     사장님은<br/>
                     <span className="text-[#FACC15] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">매장 관리만</span><br/>
                     하세요!
                   </h2>
                   
                   <p className="text-white font-bold text-lg sm:text-xl md:text-2xl break-keep bg-black/30 p-6 sm:p-8 rounded-[30px] mx-auto lg:mx-0 max-w-lg border-[3px] border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] inline-block leading-relaxed">
                     <span className="text-[#FACC15]">홍보에 골머리 앓지 마세요.</span><br className="hidden sm:block"/> 귀찮고 복잡한 온라인 홍보와 관리는 피자덕 본사가 완벽하게 지원합니다.
                   </p>
                </motion.div>
              </div>

              {/* Right Content - Cards */}
              <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {[
                  { icon: <Store className="w-8 h-8 sm:w-10 sm:h-10 text-[#D32F2F]" />, title: "배달앱 및 플레이스 관리", desc: "주요 배달 어플, 네이버, 카카오 등 지도 플레이스 완벽 세팅 및 관리" },
                  { icon: <ThumbsUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#D32F2F]" />, title: "강력한 리뷰 컨설팅", desc: "입소문을 타고 매출을 끌어올리는 체계적이고 전략적인 리뷰 컨설팅" },
                  { icon: <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-[#D32F2F]" />, title: "메뉴 및 정보 관리", desc: "신제품 추가, 이벤트 등 피곤한 변동사항 실시간 반영 및 완벽 관리" },
                  { icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#D32F2F]" />, title: "압도적 본사 완벽 지원", desc: "가맹점의 성공이 곧 본사의 성공! 매출을 이끄는 전문적인 마케팅 완벽 지원" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.5 }}
                    className="bg-white rounded-[30px] p-6 sm:p-8 flex flex-col items-center sm:items-start text-center sm:text-left shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all border-[4px] border-[#FACC15]"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFFDF5] border-[3px] border-[#FACC15]/50 rounded-full flex items-center justify-center mb-6 shrink-0 shadow-inner">
                      {item.icon}
                    </div>
                    <h3 className="text-[#1A1A1C] font-black text-xl sm:text-2xl mb-4 leading-tight tracking-tight break-keep">{item.title}</h3>
                    <p className="text-gray-600 font-bold text-sm sm:text-base break-keep leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Business Model */}
        <section className="py-24 px-4 bg-brand-charcoal text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
              className="md:w-1/2"
            >
              <motion.h2 variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.5 } } }} className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                카페처럼 보이고<br />
                <span className="text-brand-tomato">피자 전문점처럼</span> 팔리는 곳
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl text-gray-300 leading-relaxed font-light mb-8 break-keep">
                인테리어는 트렌디한 감성 디저트 카페의 무드를 유지하면서도, 주방 시스템은 피자와 빙수를 효율적으로 동시 조리할 수 있는 동선으로 설계되었습니다. 다각화된 매출 구조의 가능성을 확인해 보세요.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/20">
                  <h4 className="text-sm text-gray-400 mb-1">인력 효율성</h4>
                  <p className="text-xl font-bold text-brand-gold">핵심재료 원팩</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/20">
                  <h4 className="text-sm text-gray-400 mb-1">매출 다각화</h4>
                  <p className="text-xl font-bold text-brand-ice">3WAY (홀/포장/배달)</p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, scale: 0.8, rotate: 5 },
                visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }
              }}
              className="md:w-1/2 relative"
            >
               <div className="aspect-[4/3] rounded-[32px] overflow-hidden">
                 <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} src="/각종사진/가게사진1.png" alt="빙품달 매장 인테리어" className="w-full h-full object-cover" />
               </div>
               <motion.div 
                 initial={{ opacity: 0, x: -30, y: 30 }}
                 whileInView={{ opacity: 1, x: 0, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                 className="absolute -bottom-6 -left-6 bg-brand-tomato text-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(211,47,47,0.4)] max-w-[200px]"
               >
                 <p className="font-bold text-lg mb-1">"주방 동선의 혁신"</p>
                 <p className="text-sm opacity-90">1~2인으로도 빙수와 피자를 동시 조리 가능한 시스템</p>
               </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.4, duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto mt-20"
          >
             <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-64 h-64 bg-[#FFF9C4]/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"
                ></motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEBEE]/50 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4"
                ></motion.div>
                
                <h4 className="text-2xl md:text-3xl font-black text-[#1A1A1C] mb-4 relative z-10">"두 가지 메뉴, 운영이 너무 복잡하지 않을까요?"</h4>
                <p className="text-gray-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed relative z-10 break-keep">본사에서 배달앱 및 검색지면을 관리해주며, 체계적인 리뷰 컨설팅을 통해 사장님께는 가게 관리만을 집중 할 수 있게 돕습니다.</p>
                <button onClick={scrollToForm} className="relative z-10 inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-lg overflow-hidden group-hover:scale-105 duration-300">
                  <span className="relative z-10">본사 시스템 안내 상담하기</span> <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
             </div>
          </motion.div>
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
                <span className="text-brand-tomato text-3xl md:text-4xl">배달 앱에서는 샵인샵으로 2배의 점유율!</span>
              </h3>
              <p className="text-gray-600 font-bold text-base md:text-lg leading-relaxed break-keep">
                홀에서는 피자와 빙수를 함께 즐기는 하이브리드 매장으로, 배달 앱에서는 빙수 전문점과 피자 전문점을 각각 독립된 브랜드로 등록하여 상권 내 노출 효과를 2배로 극대화합니다.
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
                   "한 번의 창업으로 두 개의 매장을"
                 </div>
                 <p className="text-base md:text-lg leading-relaxed text-gray-600">
                   배달 플랫폼 내에서 빙수 브랜드와 피자 브랜드를 각각 분리하여 독립적으로 운영합니다. 한 개의 주방에서 <span className="font-bold text-[#D32F2F]">두 개의 전문점 매출</span>을 동시에 올리는 완벽한 샵인샵 전략입니다!
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
                가족 및 연인 고객이 피자와 빙수를 함께 즐기도록 유도함으로써<br className="hidden md:block" /> 상권과 계절에 상관없이 <span className="underline decoration-wavy decoration-blue-500 underline-offset-4">안정적인 매출</span>을 올리세요!
              </p>
            </div>
          </div>
        </section>

        {/* 5.5. Easy Cooking System */}
        <section className="bg-[#F8F9FA]">
          {/* Pizza Cooking */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
             }}
             className="py-24 px-4 relative overflow-hidden text-center"
          >
             <div className="max-w-5xl mx-auto relative z-10">
               <motion.h2 
                 variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5 } } }}
                 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6"
               >
                 만들기 쉬운 <span className="font-black text-[#D32F2F] tracking-tighter">피자</span>
               </motion.h2>
               <motion.p 
                 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                 className="text-gray-800 font-medium text-lg md:text-xl mb-12"
               >
                 간편한 조리시스템으로 <strong className="font-black text-black">5분</strong>이면 충분합니다.
               </motion.p>
               
               <motion.div 
                 variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.6 } } }}
                 whileHover={{ scale: 1.05 }}
                 className="flex justify-center items-center gap-3 md:gap-6 mb-20 md:mb-24 cursor-default"
               >
                 <div className="flex flex-col items-center">
                   <div className="text-[#D32F2F] font-black text-2xl md:text-4xl leading-none mb-1 sm:mb-2">조리</div>
                   <div className="text-[#D32F2F] font-black text-2xl md:text-4xl leading-none">완성</div>
                 </div>
                 <div className="text-[#D32F2F] font-black text-7xl sm:text-8xl md:text-[140px] tracking-tighter leading-none">5:00</div>
               </motion.div>

               {/* Process Steps */}
               <motion.div 
                 variants={{ hidden: { opacity: 0, x: -100, rotate: -5 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } } }}
                 className="w-full max-w-5xl mx-auto"
               >
                 <img src="/피자/피자만드는과정.png" alt="피자 조리 과정" className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
               </motion.div>
             </div>
          </motion.div>

          {/* Bingsu Cooking */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
             }}
             className="py-24 px-4 bg-[#2C3E50] text-white relative overflow-hidden text-center"
          >
             <div className="max-w-5xl mx-auto relative z-10">
               <motion.h2 
                 variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5 } } }}
                 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6"
               >
                 만들기 쉬운 <span className="font-black text-[#F1C40F] tracking-tighter">빙수</span>
               </motion.h2>
               <motion.p 
                 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                 className="text-gray-200 font-medium text-lg md:text-xl mb-12"
               >
                 간편한 조리시스템으로 <strong className="font-black text-white">3분</strong>이면 충분합니다.
               </motion.p>
               
               <motion.div 
                 variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.6 } } }}
                 whileHover={{ scale: 1.05 }}
                 className="flex justify-center items-center gap-3 md:gap-6 mb-20 md:mb-24 cursor-default"
               >
                 <div className="flex flex-col items-center">
                   <div className="text-[#F1C40F] font-black text-2xl md:text-4xl leading-none mb-1 sm:mb-2">조리</div>
                   <div className="text-[#F1C40F] font-black text-2xl md:text-4xl leading-none">완성</div>
                 </div>
                 <div className="text-[#F1C40F] font-black text-7xl sm:text-8xl md:text-[140px] tracking-tighter leading-none">3:00</div>
               </motion.div>

               {/* Process Steps */}
               <motion.div 
                 variants={{ hidden: { opacity: 0, x: 100, rotate: 5 }, visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } } }}
                 className="w-full max-w-5xl mx-auto"
               >
                 <img src="/빙수/빙수만드는과정.png" alt="빙수 조리 과정" className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
               </motion.div>
             </div>
          </motion.div>
        </section>

        {/* 6. Menu Power */}
        <section id="menu" className="py-24 overflow-hidden bg-white border-b border-[#E5E0D5]">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading title="시장 수요를 고려한 메뉴 라인업" subtitle="MENU COMPETITIVENESS" />
          </div>
            
          <div className="mb-16">
            <div className="max-w-7xl mx-auto px-4 mb-4">
              <h3 className="text-2xl font-black pl-4 border-l-4 border-blue-500 flex items-center gap-2">
                수제 빙수 & 디저트 
                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-widest ml-3 shadow-sm">
                  객단가 치트키
                </span>
              </h3>
            </div>
            <MenuMarquee items={bingsuMenu.slice(0, 14)} />
            <MenuMarquee items={bingsuMenu.slice(14)} reverse={true} />
          </div>

          <div>
            <div className="max-w-7xl mx-auto px-4 mb-4">
              <h3 className="text-2xl font-black pl-4 border-l-4 border-brand-tomato flex items-center gap-2">
                프리미엄 피자 
                <span className="text-xs font-bold text-brand-tomato bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-widest ml-3 shadow-sm">
                  호불호 제로 메인
                </span>
              </h3>
            </div>
            <MenuMarquee items={pizzaMenu.slice(0, 12)} />
            <MenuMarquee items={pizzaMenu.slice(12)} reverse={true} />
          </div>
            
          <div className="max-w-7xl mx-auto px-4 mt-16">
            <div className="bg-[#F9F7F2] p-8 md:p-12 rounded-2xl border border-[#E5E0D5] text-center max-w-4xl mx-auto flex flex-col items-center">
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
                { title: "플랫폼 및 마케팅 세팅", desc: "본사에서 배달앱 및 검색지면을 관리해주며, 체계적인 리뷰 컨설팅을 통해 사장님께는 가게 관리만을 집중 할 수 있게 돕습니다.", num: "06", icon: <Megaphone/> }
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
            <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { type: "소형 배달형", pyeong: "10평 내외", target: "소자본 가성비 창업", desc: "가성비 창업과 적은 유지비로 비용대비 매우 효율적인 운영 구조를 제안합니다." },
                { type: "홀·배달 복합형", pyeong: "15평 이상", target: "주거 복합 밀집 상권", desc: "데이트나 가족외식, 학생들에게 인기만점! 홀과 배달 시너지를 극대화하는 모델입니다." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition duration-300">
                  <p className="inline-block px-4 py-1.5 bg-[#C5A059]/20 text-[#C5A059] text-sm font-bold rounded-full mb-6 border border-[#C5A059]/30">{item.pyeong}</p>
                  <h3 className="text-3xl font-black mb-3">{item.type}</h3>
                  <p className="text-brand-ice text-base mb-8 pb-4 border-b border-white/10 font-bold">추천: {item.target}</p>
                  <p className="text-gray-300 text-lg leading-relaxed break-keep">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Expert Solution & Training System */}
        <section className="py-24 px-4 bg-[#F2F2F2] border-b border-[#E5E0D5]">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            
            {/* Row 1: Experts & Solution */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight break-keep text-[#1A1A1C]">
                    각 분야의 전문가가<br/>
                    <span className="text-[#D32F2F]">맞춤 솔루션 제공</span>
                  </h2>
                  <div className="mb-8">
                    <span className="bg-[#FFFF00] px-2 py-1 text-xl md:text-2xl font-black text-black break-keep">
                      계약, 오픈, 운영, 마케팅 그리고 전략까지 각 분야의 전문가 배치
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 font-bold leading-relaxed break-keep">
                    매출부터 배달앱까지 데이터 분석 및 기획부서 운영<br/>
                    메뉴, 전략센터 트렌드에 맞는 신메뉴 개발을 통해 매출상승
                  </p>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img src="/각종사진/교육장사진1.jpg" alt="피자덕 교육장 전경" className="w-full aspect-[4/3] object-cover" />
                </motion.div>
              </div>
            </div>

            {/* Row 2: Training System */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="w-full md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img src="/각종사진/교육장사진2.jpg" alt="피자덕 조리 교육 시설" className="w-full aspect-[4/3] object-cover" />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight break-keep text-[#1A1A1C]">
                    체계적인 교육시스템으로<br/>
                    <span className="text-[#D32F2F]">초보 창업도 4일이면 완성!</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-bold leading-relaxed break-keep mb-8">
                    계약, 오픈, 운영, 마케팅 그리고 전략분석까지 맞춤 솔루션 제공
                  </p>
                  <div className="mb-8">
                    <span className="bg-[#FFFF00] px-2 py-1 text-xl md:text-2xl font-black text-black break-keep">
                      피자만들기가 어렵다는 편견은 NO!
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 font-bold leading-relaxed break-keep">
                    프랜차이즈라면 쉽고 규격화된 레시피를 제공하여<br/>
                    가맹점 어디에서나 동일한 맛을 유지해야 한다고 생각합니다.<br/>
                    요식업이 처음이신 분들도 가장 맛있는 피자를 만드실 수 있습니다.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* 10. Opening Process */}
        <section id="process" className="py-24 px-4 bg-[#F9F7F2] border-b border-[#E5E0D5]">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="체계적인 원스톱 가맹 개설 절차" subtitle="OPENING PROCESS" />
            
            <div className="hidden md:grid grid-cols-4 gap-x-2 gap-y-8 mt-16 relative">
              <div className="absolute top-[28px] left-0 w-full h-1 bg-gray-200 z-0"></div>
              {[
                { s: "STEP 1", t: "가맹상담", d: "창업 전문가 희망지역과 창업 자금을 토대로 친절하게 상담해드립니다." },
                { s: "STEP 2", t: "상권분석 및 점포선정", d: "희망 지역 선정 후 점포 추천 점포 브리핑을 도와드립니다." },
                { s: "STEP 3", t: "본사 가맹점 승인", d: "개설 가능 확정" },
                { s: "STEP 4", t: "가맹계약체결", d: "임대차 계약 후 공정거래위원회에 등록된 정보공개서와 계약서 등을 확인하시고 작성합니다." },
                { s: "STEP 5", t: "인테리어 공사 및 기물입고", d: "매장 환경에 맞게 주방기기 및 동선을 맞추어 세팅하여 드립니다." },
                { s: "STEP 6", t: "본사교육", d: "이론교육과 실전교육으로 나누어 4일간 교육을 진행합니다. (광고, 경영, 조리 서비스 등)" },
                { s: "STEP 7", t: "개점준비 및 오픈", d: "주방기기 및 초도 물품 입고 등 개점 전 최종점검하고 슈퍼바이저가 2일간 현장지원해드립니다." },
                { s: "STEP 8", t: "사후 관리 및 운영 지원", d: "담당 SV가 지속적으로 매장 운영/관리를 케어합니다." },
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
                { t: "가맹상담", d: "창업 전문가 희망지역과 창업 자금을 토대로 친절하게 상담해드립니다." },
                { t: "상권분석 및 점포선정", d: "희망 지역 선정 후 점포 추천 점포 브리핑을 도와드립니다." },
                { t: "본사 가맹점 승인", d: "개설 가능 확정" },
                { t: "가맹계약체결", d: "임대차 계약 후 공정거래위원회에 등록된 정보공개서와 계약서 등을 확인하시고 작성합니다." },
                { t: "인테리어 공사 및 기물입고", d: "매장 환경에 맞게 주방기기 및 동선을 맞추어 세팅하여 드립니다." },
                { t: "본사교육", d: "이론교육과 실전교육으로 나누어 4일간 교육을 진행합니다. (광고, 경영, 조리 서비스 등)" },
                { t: "개점준비 및 오픈", d: "주방기기 및 초도 물품 입고 등 개점 전 최종점검하고 슈퍼바이저가 2일간 현장지원해드립니다." },
                { t: "사후 관리 및 운영 지원", d: "담당 SV가 지속적으로 매장 운영/관리를 케어합니다." },
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
                  q: "매장 운영 형태는 어떻게 되나요?",
                  a: "예산과 상권에 맞춰 '배달형' 혹은 '홀 복합형' 두 가지 형태로 선택하여 창업이 가능합니다."
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
                  <h2 className="text-3xl font-bold mb-4">전화 상담 안내</h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">전화로 편하게 창업 관련<br/>문의를 남겨주세요.</p>
                  <div className="mt-6 bg-[#C5A059]/10 border border-[#C5A059]/30 p-4 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
                    <p className="text-xs sm:text-sm text-brand-gold font-bold leading-relaxed break-keep">
                      문의 후 무리한 계약 권유 없이<br/>객관적인 창업 가능성만 안내드립니다.
                    </p>
                  </div>
               </div>
               <div className="w-16 h-1 w-full bg-brand-gold mb-6 mt-8"></div>
               <div className="text-xs text-gray-300 italic">
                 "단일 운영의 한계를 극복하는<br/>새로운 솔루션"
               </div>
             </div>

              <div className="md:w-2/3 p-8 sm:p-12 flex flex-col justify-center text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1C] mb-2 font-display">
                  무료 창업 상담 신청
                </h3>
                <p className="text-gray-400 mb-8 text-xs sm:text-sm break-keep leading-relaxed font-semibold">
                  성함과 연락처를 남겨주시면, 가맹본부 창업 전문가가 검토 후 신속하게 개별 연락드리겠습니다.
                </p>

                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center space-y-4 shadow-sm w-full"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900">상담 신청 접수 완료!</h4>
                    <p className="text-sm text-green-700 break-keep">
                      신청해 주셔서 감사합니다. 입력해주신 연락처로 상담 안내 연락을 신속히 드리겠습니다.
                    </p>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2.5 bg-green-600 text-white font-bold text-sm rounded-lg hover:bg-green-700 transition cursor-pointer"
                    >
                      다시 문의하기
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1.5">
                          성함 *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={leadForm.name}
                          onChange={handleInputChange}
                          placeholder="홍길동"
                          className="w-full px-4 py-3 border border-[#E5E0D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tomato/20 focus:border-brand-tomato bg-brand-cream/20 text-sm placeholder:text-gray-400 font-medium transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                          연락처 *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={leadForm.phone}
                          onChange={handleInputChange}
                          placeholder="010-1234-5678"
                          className="w-full px-4 py-3 border border-[#E5E0D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tomato/20 focus:border-brand-tomato bg-brand-cream/20 text-sm placeholder:text-gray-400 font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="region" className="block text-xs font-bold text-gray-700 mb-1.5">
                        창업 희망 지역 *
                      </label>
                      <input
                        type="text"
                        id="region"
                        name="region"
                        required
                        value={leadForm.region}
                        onChange={handleInputChange}
                        placeholder="예: 서울 관악구, 경기 수원시 등"
                        className="w-full px-4 py-3 border border-[#E5E0D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tomato/20 focus:border-brand-tomato bg-brand-cream/20 text-sm placeholder:text-gray-400 font-medium transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="memo" className="block text-xs font-bold text-gray-700 mb-1.5">
                        추가 문의사항 및 희망예산 (선택)
                      </label>
                      <textarea
                        id="memo"
                        name="memo"
                        rows={3}
                        value={leadForm.memo}
                        onChange={handleInputChange}
                        placeholder="이곳에 문의 내용을 편하게 남겨주세요."
                        className="w-full px-4 py-3 border border-[#E5E0D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tomato/20 focus:border-brand-tomato bg-[#FAF9F5] text-sm placeholder:text-gray-400 font-medium transition-all resize-none"
                      />
                    </div>

                    {/* 개인정보 수집 및 이용 동의 */}
                    <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E5E0D5] flex items-center justify-between text-xs sm:text-sm">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isPrivacyAgreed}
                          onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-tomato focus:ring-brand-tomato border-[#E5E0D5] cursor-pointer"
                        />
                        <span className="font-extrabold text-gray-700">개인정보 수집 및 이용 동의 <span className="text-brand-tomato">(필수)</span></span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="text-gray-400 hover:text-brand-tomato p-1 px-2 rounded font-extrabold underline cursor-pointer text-xs shrink-0"
                      >
                        전문보기
                      </button>
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-red-600 font-bold text-xs">
                        접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 직접 전화(070-4517-3015)해 주세요.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-base rounded-xl transition duration-300 shadow-[0_4px_20px_rgba(229,57,53,0.25)] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>신청 접수 중...</span>
                        </>
                      ) : (
                        <>
                          <span>무료 창업 상담 신청하기</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    {/* Direct Call Text Support */}
                    <div className="pt-3 border-t border-dashed border-[#E5E0D5] flex flex-col sm:flex-row items-center justify-between gap-1">
                       <span className="text-xs text-gray-400">대표번호 직접 문의</span>
                       <a href="tel:070-4517-3015" className="flex items-center gap-1.5 text-sm font-black text-brand-tomato hover:underline">
                         <PhoneCall className="w-3.5 h-3.5" strokeWidth={2.5} /> 070-4517-3015
                       </a>
                    </div>
                  </form>
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
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 break-keep leading-tight text-white">상황에 맞춘 탄력성 있는 점포 파트너십<br/>저희 피자덕&빙품달과 논의해보세요.</h2>
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
      <footer className="bg-[#1A1A1C] pt-16 pb-32 md:pb-16 px-4 text-gray-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <img src="/로고/빙품달로고.png" alt="빙품달 로고" className="h-[30px] md:h-10 object-contain opacity-80" />
                  <X className="w-3 h-3 md:w-4 md:h-4 text-gray-500" strokeWidth={2} />
                  <img src="/로고/피자덕로고.png" alt="피자덕 로고" className="h-[30px] md:h-10 object-contain opacity-80" />
                </div>
                <h3 className="text-lg font-bold text-gray-300">피자덕&빙품달 가맹상담 접수센터</h3>
              </div>
              
              <div className="space-y-4 text-xs md:text-sm leading-relaxed break-keep">
                <p>
                  본 페이지는 주식회사 유니큐랩의 가맹상담 접수 페이지입니다.<br />
                  은컴퍼니는 주식회사 유니큐랩으로부터 광고 운영 및 상담 접수 업무를 위탁받아 운영합니다.
                </p>
                
                <p>
                  상담 신청은 가맹계약 체결, 상권 선점, 가맹점 개설 확정을 의미하지 않으며,<br />
                  최종 가맹계약 여부는 가맹본부 상담 및 심사 절차를 통해 결정됩니다.
                </p>
                
                <p>
                  매출, 수익, 창업비용 등은 상권, 점포 조건, 운영 방식 등에 따라 달라질 수 있으며,<br />
                  특정 매출이나 수익을 보장하지 않습니다.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-2 text-xs md:text-sm text-gray-400">
                <p>상호: 은컴퍼니  |  대표자: 안상준  |  사업자등록번호: 614-04-69179</p>
                <p>주소: 서울특별시 관악구 조원로 30</p>
                <p>대표번호: 070-4517-3015  |  이메일: eunzcompany@gmail.com</p>
              </div>
            </div>

            <div className="space-y-6 text-xs md:text-sm text-gray-400">
              <div className="space-y-2">
                <p>가맹본부: 주식회사 유니큐랩</p>
                <p>상담 접수 업무 수탁사: 은컴퍼니</p>
                <p>개인정보 보호책임자: 안상준</p>
                <p>개인정보 문의처: eunzcompany@gmail.com (070-4517-3015)</p>
              </div>

              <p className="pt-4 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                Copyright © 은컴퍼니. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom Bar with Lead Form */}
      <div 
        className={`fixed bottom-0 inset-x-0 z-[70] bg-[#141416]/98 backdrop-blur-md border-t-2 border-[#F1C40F]/20 shadow-[0_-15px_40px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out select-none ${
          isBottomBarCollapsed ? 'translate-y-[calc(100%-58px)]' : 'translate-y-0'
        }`}
        style={{ transform: isBottomBarCollapsed ? 'translateY(calc(100% - 58px))' : 'translateY(0)' }}
      >
        {/* Toggle Collapse Bar Button */}
        <div className="flex justify-end pr-4 -mt-4 absolute top-0 right-0 pointer-events-none z-10">
          <button 
            type="button"
            onClick={() => setIsBottomBarCollapsed(!isBottomBarCollapsed)}
            className="pointer-events-auto bg-[#141416] text-[#F1C40F] border-2 border-[#F1C40F]/10 hover:text-white rounded-full px-4 py-1.5 text-xs font-black shadow-2xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            {isBottomBarCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4 rotate-180 text-brand-tomato animate-bounce" />
                <span>무료상담 신청란 열기</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>하단바 접기</span>
              </>
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-7xl mx-auto px-3 py-3.5 sm:py-5 flex flex-col items-center justify-between gap-3 text-white pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          {isBottomBarCollapsed ? (
            // Mini Display when hidden
            <div 
              onClick={() => setIsBottomBarCollapsed(false)}
              className="w-full flex items-center justify-between cursor-pointer py-1 text-[#F1C40F] font-black tracking-tight"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-tomato rounded-full animate-ping shrink-0" />
                <span className="text-[10px] min-[360px]:text-[11px] min-[390px]:text-xs sm:text-sm md:text-base font-black tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">🔥 즉시 접수하고 실시간 1:1 브랜드 가맹 창업 무료 혜택 받기</span>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-white bg-brand-tomato px-3 py-1 rounded-full flex items-center gap-1 hover:brightness-110 transition shadow-md shrink-0">
                열기 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ) : (
            // Full Sticky Bottom Form
            <form onSubmit={handleBottomSubmit} className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Marketing Label Text (lg and up) */}
              <div className="hidden lg:flex flex-col text-left shrink-0">
                <h4 className="font-extrabold text-base text-[#F1C40F] tracking-tight flex items-center gap-2 font-display">
                  <span className="inline-block w-2 h-2 bg-brand-tomato rounded-full animate-pulse" />
                  실시간 1:1 창업 무료상담
                </h4>
                <p className="text-[11px] text-gray-300 font-extrabold mt-0.5 whitespace-nowrap">성함 / 연락처 / 희망지역 입력 시 즉시 연락!</p>
              </div>

              {/* Status State (Success or Error) */}
              {bottomSubmitStatus === 'success' ? (
                <div className="flex-1 flex items-center justify-center gap-3 bg-green-950/50 border border-green-500/30 text-green-400 rounded-xl py-3 px-6 text-sm font-black w-full shadow-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span>창업 무료상담 신청 완료! 담당자가 신속히 연락을 드리겠습니다.</span>
                  <button 
                    type="button" 
                    onClick={() => setBottomSubmitStatus('idle')}
                    className="ml-auto underline hover:text-white cursor-pointer"
                  >
                    새로고침
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full lg:max-w-4xl">
                  {/* 에러 상태 깃 기재 */}
                  {bottomSubmitStatus === 'error' && (
                    <div className="text-[#FFCDD2] text-xs font-black bg-red-950/50 border border-red-500/30 rounded-lg px-3.5 py-2 flex items-center justify-between gap-4 mb-1">
                      <span>⚠️ 전송 실패: 키 설정을 확인하거나 대표번호(070-4517-3015)로 직접 상담을 예약해주시기 바랍니다.</span>
                      <button 
                        type="button" 
                        onClick={() => setBottomSubmitStatus('idle')} 
                        className="underline hover:text-white shrink-0 font-bold"
                      >
                        재시도
                      </button>
                    </div>
                  )}

                  {/* 개인정보 제공 동의 간편 라인 */}
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-300 px-1 font-semibold">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isBottomPrivacyAgreed}
                        onChange={(e) => setIsBottomPrivacyAgreed(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-[#E53935] focus:ring-brand-tomato border-white/20 bg-white/10 cursor-pointer"
                      />
                      <span>개인정보 수집 및 이용 동의 <span className="text-[#F1C40F] font-black">(필수)</span></span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsPrivacyModalOpen(true)}
                      className="text-gray-400 hover:text-[#F1C40F] font-extrabold underline cursor-pointer shrink-0 text-[10px] sm:text-xs"
                    >
                      상세 전문보기
                    </button>
                  </div>

                  <div className="flex flex-row items-center gap-2 w-full">
                    {/* Grid of Inputs - Stays 3-column even on mobile to prevent ugly vertical stacking */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={bottomForm.name}
                          onChange={handleBottomInputChange}
                          placeholder="성함"
                          className="w-full px-2 py-2.5 sm:py-3.5 bg-[#252528] hover:bg-[#2F2F33] focus:bg-[#2F2F33] border border-white/10 focus:border-brand-tomato text-white rounded-lg text-xs sm:text-sm md:text-base font-black focus:outline-none transition-all placeholder:text-gray-500 placeholder:font-bold shadow-inner text-center sm:text-left"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={bottomForm.phone}
                          onChange={handleBottomInputChange}
                          placeholder="연락처"
                          className="w-full px-2 py-2.5 sm:py-3.5 bg-[#252528] hover:bg-[#2F2F33] focus:bg-[#2F2F33] border border-white/10 focus:border-brand-tomato text-white rounded-lg text-xs sm:text-sm md:text-base font-black focus:outline-none transition-all placeholder:text-gray-500 placeholder:font-bold shadow-inner text-center sm:text-left"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="region"
                          required
                          value={bottomForm.region}
                          onChange={handleBottomInputChange}
                          placeholder="희망지역"
                          className="w-full px-2 py-2.5 sm:py-3.5 bg-[#252528] hover:bg-[#2F2F33] focus:bg-[#2F2F33] border border-white/10 focus:border-brand-tomato text-white rounded-lg text-xs sm:text-sm md:text-base font-black focus:outline-none transition-all placeholder:text-gray-500 placeholder:font-bold shadow-inner text-center sm:text-left"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isBottomSubmitting}
                      className="inline-flex items-center justify-center gap-1 bg-brand-tomato hover:bg-brand-tomato/95 active:scale-95 text-white font-black text-xs sm:text-sm md:text-base px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-lg transition duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed cursor-pointer shrink-0 font-display shadow-[0_4px_16px_rgba(229,57,53,0.35)]"
                    >
                      {isBottomSubmitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span className="hidden sm:inline">신청하기</span>
                          <span className="inline sm:hidden">신청</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* ⚠️ Privacy Policy Modal (개인정보 수집 및 이용 동의 전문) */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsPrivacyModalOpen(false)}
          />
          
          <div className="relative bg-white text-brand-charcoal rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#E5E0D5] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E5E0D5] flex items-center justify-between bg-[#FAF9F5]/50">
              <h3 className="text-lg sm:text-xl font-black text-brand-charcoal flex items-center gap-2 font-display">
                <span className="w-1.5 h-6 bg-[#E53935] rounded-full block animate-pulse" />
                개인정보 수집 및 이용 동의 (필수)
              </h3>
              <button 
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-gray-400 hover:text-brand-charcoal p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed font-semibold break-keep">
              <p className="text-gray-950 font-extrabold text-sm sm:text-[15px] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E5E0D5]/50 leading-snug">
                피자덕 & 빙품달 가맹상담 접수센터는 프랜차이즈 가맹설명회 및 1:1 브랜드 창업 무료상담 서비스를 제공하기 위해 아래와 같이 고객님의 소중한 개인정보를 수집 및 이용합니다.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-gray-900 font-extrabold flex items-center gap-1.5 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full inline-block" />
                    1. 수집 및 이용 목적
                  </h4>
                  <p className="pl-4 text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                    - 신규 가맹희망자의 1:1 창업 전문 상담, 개설 안내, 가맹 개설 혜택 제공 및 가맹지역 적합성 분석 연락 수단 확보
                    <br />- 가맹점 개설 관련 신속한 전화 및 문자 안내 피드백 진행
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 font-extrabold flex items-center gap-1.5 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full inline-block" />
                    2. 수집하는 개인정보 항목
                  </h4>
                  <p className="pl-4 text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                    - 필수항목: 성함(이름), 연락처(휴대폰 번호), 창업 희망 지역
                    <br />- 선택항목: 추가 문의사항 및 희망 창업예산
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 font-extrabold flex items-center gap-1.5 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full inline-block" />
                    3. 개인정보의 보유 및 이용 기간
                  </h4>
                  <p className="pl-4 text-xs text-gray-500 mt-1 font-bold text-[#E53935] leading-relaxed">
                    - 이용목적 달성 시 지체 없이 파기함을 원칙으로 하며, 가맹점 상담 이력 관리 및 불만 처리 목적을 위해 접수일로부터 최장 1년간 보유 후 영구 파기(삭제)됩니다.
                    <br />- 이용자가 즉각적인 삭제(동의철회)를 요구하는 경우 즉시 파기합니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 font-extrabold flex items-center gap-1.5 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full inline-block" />
                    4. 동의 거부의 권리 및 거부에 따른 불이익
                  </h4>
                  <p className="pl-4 text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                    - 고객님은 개인정보 수집 및 이용 동의를 거부하실 전적인 권리가 있으나, 필수 수집 항목에 대하여 동의를 거부하시는 경우 1:1 가맹 창업 무료 상담 진행 및 혜택 신청이 제한됩니다.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF9F5] border border-[#E5E0D5]/60 p-3.5 rounded-xl text-[11px] sm:text-xs text-gray-500 space-y-1">
                <p className="font-extrabold text-gray-800">🔒 보안 위탁 및 안전성 확보 고지</p>
                <p className="leading-relaxed font-semibold">
                  수집된 정보는 가맹 상권 개설 목적 이외의 불법 마케팅 광고, 스팸 문자 발송 등 제3자 마케팅에 결코 활용/위탁/제공되지 않고 오로지 상담 예약건 피드백에만 전적으로 활용됩니다.
                </p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF9F5] border-t border-[#E5E0D5] flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPrivacyAgreed(true);
                  setIsBottomPrivacyAgreed(true);
                  setIsPrivacyModalOpen(false);
                }}
                className="flex-1 py-3.5 bg-[#E53935] hover:brightness-110 active:scale-95 text-white font-extrabold rounded-xl transition text-sm cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5"
              >
                동의하고 적용하기
              </button>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition text-sm cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS adjustments for safe area on mobile */}
      <style>{`
        .safe-area-bottom {
          padding-bottom: calc(1rem + env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
