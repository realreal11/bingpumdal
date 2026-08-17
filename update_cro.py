import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Popup with Progress Bar
new_popup = '''      <AnimatePresence>
        {showSalesPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-none sm:rounded-lg shadow-2xl overflow-hidden max-w-[380px] w-full flex flex-col"
            >
              <div className="flex flex-col relative">
                <div className="bg-[#D32F2F] pt-8 pb-10 px-6 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><LaurelIcon /></div>
                  <div className="absolute bottom-0 left-0 p-4 opacity-20 -scale-x-100"><LaurelIcon /></div>
                  
                  <div className="inline-block bg-white text-[#D32F2F] text-[11px] font-extrabold px-3 py-1 rounded-full mb-4 tracking-widest">
                    피자덕 & 빙품달 창업지원금 프로모션
                  </div>
                  
                  <h3 className="text-[28px] font-black leading-[1.1] mb-2 tracking-tight break-keep">
                    가맹비·교육비 등<br/>
                    <span className="text-[#FFEB3B] text-[32px]">2,400만원</span> 전액 면제!
                  </h3>
                  
                  <p className="text-white/90 text-sm font-medium mt-3">
                    * 지역별 선착순 3명 한정, 조기 마감 임박
                  </p>
                </div>
                
                <div className="p-6 text-center bg-white border-b border-gray-100">
                  <h4 className="text-[#1A1A1C] text-[17px] font-bold mb-3 leading-snug break-keep">
                    배달 매장 하나로 <span className="text-[#D32F2F] font-black">월 매출 1억 돌파!</span>
                  </h4>
                  
                  {/* URGENCY PROGRESS BAR */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200 shadow-inner">
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-bold text-gray-700 tracking-tight">창업지원금 신청 현황</span>
                       <span className="text-[13px] font-black text-[#D32F2F] animate-pulse">마감 임박 (1자리 남음!)</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-gradient-to-r from-[#D32F2F] to-[#FF5252] w-[85%] rounded-full relative">
                          <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                       </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-[13px] mb-5 leading-relaxed break-keep">
                    우리 동네 A급 상권은 먼저 찜하는 사람이 임자입니다.<br/>
                    지금 바로 <strong className="text-[#D32F2F]">2,400만원 혜택</strong>을 선점하세요!
                  </p>
                  
                  <button 
                    onClick={() => {
                      handleCloseSalesPopup();
                      scrollToForm();
                    }}
                    className="w-full bg-[#1A1A1C] hover:bg-black text-[#FFEB3B] font-black py-4 rounded-lg shadow-xl transition duration-200 text-lg animate-pulse"
                  >
                    👉 혜택받고 가맹상담 신청하기
                  </button>
                </div>
              </div>
              
              {/* Standard Korean Popup Footer */}
              <div className="flex bg-gray-50 text-[13px] border-t border-gray-200 font-medium text-gray-600">
                <button 
                  onClick={() => handleCloseSalesPopup(true)} 
                  className="flex-1 py-3.5 px-4 text-left hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded-sm flex items-center justify-center"></div>
                  오늘 하루 보지 않기
                </button>
                <div className="w-px bg-gray-200"></div>
                <button 
                  onClick={() => handleCloseSalesPopup()} 
                  className="py-3.5 px-6 hover:bg-gray-100 transition font-bold text-gray-800"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>'''

pattern = r'<AnimatePresence>.*?showSalesPopup &&.*?</AnimatePresence>'
content = re.sub(pattern, new_popup, content, flags=re.DOTALL)

# 2. Add Top Urgency Banner below nav
urgency_banner = '''      <div className="fixed top-16 inset-x-0 z-[49] bg-[#D32F2F] text-white text-[13px] sm:text-sm font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-md">
         <span className="animate-pulse text-base">🚨</span>
         <span className="break-keep tracking-tight">[긴급] 현재 <span className="text-[#FFEB3B] font-black">창업지원금 2400만원</span> 선착순 3명 중 <strong>2명 마감!</strong> (1자리 남음)</span>
      </div>
      <main className="pt-[104px]">'''
content = content.replace('<main className="pt-16">', urgency_banner)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
