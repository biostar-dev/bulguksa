import { useState, useEffect, useCallback, useRef } from "react";

// Font loaded via layout.js

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

const QUIZ_DATA = [
  {
    q: "불국사는 어느 나라 때 만들어졌을까요?",
    opts: ["고구려", "백제", "신라", "고려"], ans: 2,
    hint: "경주는 이 나라의 수도였어요!",
    fact: "불국사는 신라 시대인 751년에 김대성이 짓기 시작했어요.",
    detail: {
      title: "불국사의 탄생 이야기",
      paragraphs: [
        "불국사는 지금부터 약 1,270년 전인 751년, 신라의 재상 김대성이 짓기 시작했어요. 김대성은 현생의 부모를 위해 불국사를, 전생의 부모를 위해 석굴암을 지었다고 전해져요.",
        "불국사라는 이름은 '부처님의 나라에 있는 절'이라는 뜻이에요. 신라 사람들은 이 아름다운 절이 바로 부처님의 나라라고 생각했답니다.",
        "불국사는 1995년에 유네스코 세계문화유산으로 지정되어 전 세계 사람들이 보호하는 소중한 문화재가 되었어요."
      ],
      funFact: "김대성은 어릴 때 매우 가난했지만, 열심히 노력해서 신라에서 가장 높은 관직까지 올라갔어요!",
      illustType: "build"
    }
  },
  {
    q: "불국사에 있는 유명한 석탑의 이름은?",
    opts: ["첨성대", "석가탑", "남대문", "숭례문"], ans: 1,
    hint: "부처님의 이름이 들어가요!",
    fact: "석가탑은 '무영탑'이라고도 불러요.",
    detail: {
      title: "석가탑과 무영탑 전설",
      paragraphs: [
        "석가탑의 정식 이름은 '석가여래상주설법탑'이에요. 부처님(석가여래)이 항상 설법하시는 탑이라는 뜻이죠.",
        "'무영탑(그림자가 없는 탑)'이라는 별명에는 슬픈 전설이 있어요. 석공 아사달이 이 탑을 만들었는데, 아내 아사녀가 남편을 그리워하다가 연못에 비친 탑의 그림자를 보며 눈물을 흘렸대요.",
        "석가탑은 높이 약 8.2m로, 꾸밈이 거의 없어 단순하고 우아한 아름다움을 보여줘요. 옆에 있는 화려한 다보탑과 대비되는 짝꿍이랍니다!"
      ],
      funFact: "1966년, 석가탑을 수리하다가 세계에서 가장 오래된 목판 인쇄물인 '무구정광대다라니경'이 발견되었어요!",
      illustType: "tower"
    }
  },
  {
    q: "신라의 수도는 어디였을까요?",
    opts: ["서울", "부여", "경주", "공주"], ans: 2,
    hint: "불국사가 있는 도시예요!",
    fact: "경주는 약 1000년 동안 신라의 수도였어요.",
    detail: {
      title: "천년 고도 경주",
      paragraphs: [
        "경주는 기원전 57년부터 935년까지, 무려 약 1000년 동안 신라의 수도였어요! 그래서 '천년 고도'라고 불러요.",
        "경주에는 불국사 말고도 첨성대, 안압지(동궁과 월지), 대릉원 등 수많은 신라 유적이 있어요. 도시 전체가 거대한 야외 박물관 같답니다!",
        "신라가 가장 강성했던 시기의 경주는 인구가 100만 명이 넘었다고 해요. 당시 세계에서 가장 큰 도시 중 하나였답니다."
      ],
      funFact: "경주에는 왕과 귀족들의 무덤인 '고분'이 도시 한가운데에 있어서 산책하다가 거대한 무덤을 만날 수 있어요!",
      illustType: "map"
    }
  },
  {
    q: "불국사 근처에 있는 유명한 석굴은?",
    opts: ["고수동굴", "석굴암", "만장굴", "천연동굴"], ans: 1,
    hint: "돌로 만든 굴이에요!",
    fact: "석굴암에는 아름다운 본존불상이 있어요.",
    detail: {
      title: "석굴암의 놀라운 비밀",
      paragraphs: [
        "석굴암은 자연 동굴이 아니라 돌을 하나하나 쌓아서 인공으로 만든 석굴이에요! 약 360개의 큰 돌을 정교하게 조립했답니다.",
        "석굴암의 본존불상은 높이 3.5m의 거대한 불상으로, 동해 바다의 일출을 바라보고 앉아 있어요. 얼굴에 떠오르는 미소가 정말 아름답답니다.",
        "석굴암의 돔(둥근 천장)은 시멘트 없이 돌만으로 만들었는데, 1,200년이 넘도록 무너지지 않았어요!"
      ],
      funFact: "석굴암 안에는 자연 환기 시스템이 있어서 습기를 자동으로 조절해요. 에어컨도 없던 시대에 말이에요!",
      illustType: "build"
    }
  },
  {
    q: "신라의 별을 관측하던 건축물은?",
    opts: ["해시계", "첨성대", "석가탑", "다보탑"], ans: 1,
    hint: "별을 보는 높은 탑이에요!",
    fact: "첨성대는 동아시아에서 가장 오래된 천문대예요.",
    detail: {
      title: "별을 보는 탑, 첨성대",
      paragraphs: [
        "첨성대는 선덕여왕(신라 최초의 여왕!) 때인 633년경에 만들어진 천문 관측대예요.",
        "첨성대는 총 362개의 돌로 만들어졌는데, 이것은 음력 1년의 날수와 비슷해요! 창문은 정확히 남쪽을 향하고 있어서 봄과 가을에 햇빛이 바닥까지 비춘답니다.",
        "높이는 약 9.1m이고, 1,400년 동안 지진에도 끄떡없이 서 있어요!"
      ],
      funFact: "신라 사람들은 별을 보고 농사 시기를 정하거나, 나라의 미래를 점쳤어요. 천문학자는 아주 중요한 직업이었답니다!",
      illustType: "tower"
    }
  },
  {
    q: "불국사의 아름다운 돌다리 이름은?",
    opts: ["청운교·백운교", "무지개다리", "돌다리", "나무다리"], ans: 0,
    hint: "구름 이름이 들어가요!",
    fact: "청운교와 백운교는 33계단으로 부처님 세계로 가는 길이에요.",
    detail: {
      title: "하늘로 올라가는 계단",
      paragraphs: [
        "청운교(푸른 구름 다리)와 백운교(흰 구름 다리)는 불국사 자하문으로 올라가는 돌계단이에요.",
        "33계단은 불교에서 말하는 33개의 하늘을 상징해요. 계단을 올라가면 인간 세계에서 부처님의 세계로 들어간다는 뜻이에요!",
        "다리 아래에는 무지개 모양의 아치가 있어서, 마치 무지개를 건너 하늘나라로 가는 것 같은 느낌을 줘요."
      ],
      funFact: "청운교·백운교 옆에는 연화교·칠보교라는 또 다른 계단이 있어요. 이쪽은 극락세계로 가는 길이래요!",
      illustType: "build"
    }
  },
  {
    q: "신라에서 뛰어난 장군은 누구일까요?",
    opts: ["이순신", "김유신", "을지문덕", "강감찬"], ans: 1,
    hint: "삼국통일의 영웅이에요!",
    fact: "김유신 장군은 삼국통일에 큰 공을 세웠어요.",
    detail: {
      title: "삼국통일의 영웅, 김유신",
      paragraphs: [
        "김유신 장군은 원래 가야국 왕족의 후손이었어요! 가야가 신라에 합쳐진 후 김유신의 집안은 신라의 귀족이 되었답니다.",
        "김유신은 15살 때 화랑이 되었어요. 화랑은 신라의 젊은 무사 모임으로, 무예와 학문을 함께 배우는 엘리트 집단이었어요.",
        "김유신은 김춘추(나중에 태종무열왕)와 힘을 합쳐 백제와 고구려를 차례로 물리치고 한반도 최초의 통일을 이루었어요!"
      ],
      funFact: "전설에 따르면, 김유신은 칼로 바위를 베고, 별에게 기도하면 별이 움직였다고 해요!",
      illustType: "map"
    }
  },
  {
    q: "신라의 왕관은 어떤 모양일까요?",
    opts: ["동그란 모양", "나뭇가지 모양", "네모 모양", "세모 모양"], ans: 1,
    hint: "숲에서 볼 수 있는 것과 비슷해요!",
    fact: "신라 금관은 나뭇가지와 사슴뿔 모양이에요.",
    detail: {
      title: "황금빛 신라 금관의 비밀",
      paragraphs: [
        "신라 금관은 세계에서 가장 많은 순금 왕관이 발견된 나라예요! 현재까지 6개의 금관이 경주에서 발견되었답니다.",
        "금관의 나뭇가지 모양은 '출(出)' 자 모양이라고도 해요. 사슴뿔 모양 장식도 있어서 더 화려하답니다!",
        "금관에는 수많은 곱은옥(곡옥)과 금 방울이 달려 있어서, 왕이 걸을 때마다 짤랑짤랑 아름다운 소리가 났을 거예요."
      ],
      funFact: "신라 금관 하나에 들어간 순금의 무게는 약 1kg이에요. 지금 금값으로 계산하면 약 1억 원이 넘는답니다!",
      illustType: "tower"
    }
  },
];

/* ─── Puzzle SVGs ─── */
function SvgSeokgatap(){return(<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="ps1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3a6a"/><stop offset="100%" stopColor="#2d1b4e"/></linearGradient></defs><rect width="300" height="300" fill="url(#ps1)"/><rect x="0" y="240" width="300" height="60" fill="#2a3a2a"/><ellipse cx="150" cy="248" rx="120" ry="8" fill="#3a4a3a"/><rect x="100" y="220" width="100" height="28" fill="#9e9e9e" rx="3"/><rect x="90" y="238" width="120" height="12" fill="#8a8a8a" rx="2"/><rect x="112" y="170" width="76" height="52" fill="#bdbdbd" rx="2"/><rect x="108" y="165" width="84" height="8" fill="#a0a0a0" rx="2"/><rect x="118" y="125" width="64" height="42" fill="#c8c8c8" rx="2"/><rect x="114" y="120" width="72" height="8" fill="#aaa" rx="2"/><rect x="105" y="108" width="90" height="14" fill="#999" rx="3"/><rect x="115" y="95" width="70" height="15" fill="#b0b0b0" rx="2"/><rect x="140" y="70" width="20" height="27" fill="#bbb" rx="2"/><rect x="135" y="65" width="30" height="7" fill="#aaa" rx="3"/><circle cx="150" cy="58" r="8" fill="#ccc"/><circle cx="150" cy="50" r="4" fill="#ddd"/><circle cx="40" cy="30" r="2" fill="#fff" opacity="0.8"/><circle cx="250" cy="50" r="1.5" fill="#fff" opacity="0.6"/><circle cx="55" cy="45" r="15" fill="#f5c842" opacity="0.8"/><circle cx="60" cy="40" r="12" fill="url(#ps1)"/><text x="150" y="285" textAnchor="middle" fill="#c8c8c8" fontSize="16" fontFamily="sans-serif">석 가 탑</text></svg>);}
function SvgCheomseongdae(){return(<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="ps2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a1628"/><stop offset="100%" stopColor="#1a2a4a"/></linearGradient></defs><rect width="300" height="300" fill="url(#ps2)"/>{[[30,20],[80,40],[200,30],[260,60],[45,90]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={1.5} fill="#fff" opacity="0.6"/>)}<rect x="0" y="240" width="300" height="60" fill="#2a3322"/><rect x="80" y="232" width="140" height="18" fill="#8a7a6a" rx="3"/><path d="M120,232 Q115,180 122,130 Q128,100 135,90 L165,90 Q172,100 178,130 Q185,180 180,232 Z" fill="#b8a88a"/>{[230,215,200,185,170,155,140,125,110,100].map((y,i)=><line key={i} x1={120+(232-y)*0.08} y1={y} x2={180-(232-y)*0.08} y2={y} stroke="#9a8a7a" strokeWidth="0.8" opacity="0.5"/>)}<rect x="140" y="158" width="20" height="16" fill="#1a1a2e" rx="2"/><rect x="125" y="86" width="50" height="8" fill="#a09080" rx="2"/><rect x="135" y="68" width="30" height="20" fill="#c0b0a0" rx="1"/><circle cx="60" cy="50" r="18" fill="#f0e060" opacity="0.85"/><circle cx="66" cy="44" r="15" fill="url(#ps2)"/><text x="150" y="285" textAnchor="middle" fill="#c8c8c8" fontSize="16" fontFamily="sans-serif">첨 성 대</text></svg>);}
function SvgGoldCrown(){return(<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="pgd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFD700"/><stop offset="50%" stopColor="#DAA520"/><stop offset="100%" stopColor="#B8860B"/></linearGradient><linearGradient id="ps3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a0a2e"/><stop offset="100%" stopColor="#2a1a3e"/></linearGradient></defs><rect width="300" height="300" fill="url(#ps3)"/><circle cx="150" cy="160" r="100" fill="#DAA520" opacity="0.06"/><circle cx="150" cy="160" r="60" fill="#FFD700" opacity="0.08"/><rect x="85" y="185" width="130" height="25" fill="url(#pgd)" rx="4"/>{[105,130,150,170,195].map(x=><circle key={x} cx={x} cy="198" r="5" fill="#B8860B" stroke="#FFE44D" strokeWidth="1"/>)}<rect x="145" y="105" width="10" height="82" fill="url(#pgd)" rx="2"/><circle cx="150" cy="100" r="8" fill="#FFD700"/><line x1="150" y1="130" x2="135" y2="115" stroke="#DAA520" strokeWidth="4" strokeLinecap="round"/><circle cx="133" cy="113" r="5" fill="#FFD700"/><line x1="150" y1="130" x2="165" y2="115" stroke="#DAA520" strokeWidth="4" strokeLinecap="round"/><circle cx="167" cy="113" r="5" fill="#FFD700"/><rect x="107" y="120" width="8" height="67" fill="url(#pgd)" rx="2" transform="rotate(-8, 111, 187)"/><circle cx="106" cy="116" r="6" fill="#FFD700"/><rect x="185" y="120" width="8" height="67" fill="url(#pgd)" rx="2" transform="rotate(8, 189, 187)"/><circle cx="194" cy="116" r="6" fill="#FFD700"/>{[[95,210],[120,215],[150,218],[180,215],[205,210]].map(([x,y],i)=>(<g key={i}><line x1={x} y1={208} x2={x} y2={y+8} stroke="#DAA520" strokeWidth="1"/><ellipse cx={x} cy={y+12} rx="4" ry="6" fill="#3CB371" opacity="0.8" transform={`rotate(${(i-2)*10}, ${x}, ${y+12})`}/></g>))}<text x="150" y="275" textAnchor="middle" fill="#DAA520" fontSize="16" fontFamily="sans-serif">신 라 금 관</text></svg>);}
function SvgDabotap(){return(<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="ps4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a4a"/><stop offset="100%" stopColor="#2d1b4e"/></linearGradient></defs><rect width="300" height="300" fill="url(#ps4)"/><rect x="0" y="245" width="300" height="55" fill="#2a3a2a"/><rect x="80" y="225" width="140" height="25" fill="#9e9e9e" rx="2"/><rect x="90" y="210" width="120" height="18" fill="#aaa" rx="2"/><rect x="100" y="180" width="100" height="32" fill="#bbb" rx="2"/>{[110,130,150,170,190].map(x=><rect key={x} x={x-2} y="172" width="4" height="10" fill="#ccc" rx="1"/>)}<rect x="105" y="170" width="90" height="5" fill="#b0b0b0" rx="1"/><rect x="115" y="140" width="70" height="32" fill="#c0c0c0" rx="2"/>{[125,145,165].map(x=><rect key={x} x={x-2} y="132" width="4" height="10" fill="#ccc" rx="1"/>)}<rect x="112" y="130" width="76" height="5" fill="#b5b5b5" rx="1"/><rect x="130" y="105" width="40" height="27" fill="#c8c8c8" rx="2"/><rect x="125" y="100" width="50" height="8" fill="#bbb" rx="2"/><rect x="143" y="75" width="14" height="27" fill="#ccc" rx="2"/><circle cx="150" cy="70" r="7" fill="#ddd"/><circle cx="150" cy="62" r="3" fill="#eee"/><circle cx="40" cy="60" r="15" fill="#f5c842" opacity="0.8"/><circle cx="45" cy="55" r="12" fill="url(#ps4)"/><text x="150" y="285" textAnchor="middle" fill="#c8c8c8" fontSize="16" fontFamily="sans-serif">다 보 탑</text></svg>);}
function SvgAnapji(){return(<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}><defs><linearGradient id="ps5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0a2e"/><stop offset="100%" stopColor="#1a1a3e"/></linearGradient></defs><rect width="300" height="300" fill="url(#ps5)"/>{[[20,15],[80,30],[250,25],[270,55],[50,70]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={1.2} fill="#fff" opacity="0.5"/>)}<rect x="0" y="170" width="300" height="130" fill="#0a2a4a" opacity="0.8"/><rect x="160" y="120" width="80" height="50" fill="#5a3a2a"/><polygon points="150,115 200,90 250,115" fill="#8B2500"/>{[170,190,210,230].map(x=><rect key={x} x={x} y="125" width="5" height="45" fill="#7a5a3a"/>)}<rect x="160" y="170" width="80" height="30" fill="#3a2a1a" opacity="0.3"/><circle cx="200" cy="140" r="4" fill="#ffaa00" opacity="0.8"/><circle cx="200" cy="140" r="12" fill="#ffaa00" opacity="0.15"/><circle cx="60" cy="50" r="22" fill="#f5e060" opacity="0.9"/><circle cx="67" cy="43" r="18" fill="url(#ps5)"/><ellipse cx="60" cy="220" rx="15" ry="5" fill="#f5e060" opacity="0.15"/><text x="150" y="285" textAnchor="middle" fill="#88aacc" fontSize="16" fontFamily="sans-serif">동궁과 월지</text></svg>);}

const SVG_RENDERERS = [SvgSeokgatap, SvgCheomseongdae, SvgGoldCrown, SvgDabotap, SvgAnapji];

const PUZZLE_LEVELS = [
  { name:"석가탑", emoji:"🗼", desc:"신라의 아름다운 석탑", grid:3, svgIdx:0 },
  { name:"첨성대", emoji:"🔭", desc:"별을 관측하던 곳", grid:3, svgIdx:1 },
  { name:"금관", emoji:"👑", desc:"신라 왕의 왕관", grid:3, svgIdx:2 },
  { name:"다보탑", emoji:"🏛️", desc:"화려한 석탑 (4×4)", grid:4, svgIdx:3 },
  { name:"동궁과 월지", emoji:"🌙", desc:"달빛 연못 (5×5)", grid:5, svgIdx:4 },
];

/* ─── Adventure Rooms ─── */
const WM = f => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=600`;
const ADV_ROOMS = [
  { id:"start", name:"불국사 입구", emoji:"⛩️", image:WM("Bulguksa-main-gate.jpg"), imageCredit:"Wikimedia Commons", desc:"오래된 돌계단 앞에 서 있어요. 안개가 자욱하고 새 소리가 들려요. 멀리 지붕 끝에 금빛이 반짝이고 있어요.", bg:"#1a3322",
    items:[{id:"map",emoji:"🗺️",name:"고지도",hint:"경내 지도가 그려져 있어요"}],
    exits:[{to:"bridge",label:"돌다리 건너기 🌉",req:null}] },
  { id:"bridge", name:"청운교·백운교", emoji:"🌉", image:WM("Blue_and_White_Cloud_Bridges_청운교_백운교_佛國寺_靑雲橋_白雲橋_(5281872665).jpg"), imageCredit:"Wikimedia Commons", desc:"33개의 돌계단이 구름 속으로 이어져요. 계단 사이로 고대 문양이 보여요. 수수께끼가 새겨진 돌비석이 있어요!", bg:"#1a2a4a",
    items:[],
    riddle:{q:"33계단은 무엇을 상징할까요?",opts:["33개의 별","33개의 하늘","33명의 왕","33개의 소원"],ans:1,reward:"golden_key",rewardName:"황금 열쇠 🔑"},
    exits:[{to:"courtyard",label:"자하문으로 🚪",req:"golden_key",locked:"수수께끼를 풀어야 문이 열려요!"},{to:"start",label:"뒤로 돌아가기 ↩️",req:null}] },
  { id:"courtyard", name:"불국사 마당", emoji:"🏯", image:WM("Lotus_Flower_Bridge_and_Seven_Treasure_Bridge_at_Bulguksa_in_Gyeongju,_Korea.jpg"), imageCredit:"Wikimedia Commons", desc:"넓은 마당 양쪽에 석가탑과 다보탑이 우뚝 서 있어요! 바닥에 이상한 홈이 파여 있고, 어딘가에서 은은한 종소리가 들려요.", bg:"#2a1a2e",
    items:[{id:"bell_piece",emoji:"🔔",name:"종 조각",hint:"범종의 일부분 같아요"}],
    exits:[{to:"pagoda",label:"석가탑 살펴보기 🗼",req:null},{to:"cave_entrance",label:"뒷산 오솔길 🌲",req:null},{to:"bridge",label:"돌다리로 ↩️",req:null}] },
  { id:"pagoda", name:"석가탑 앞", emoji:"🗼", image:WM("Seokgatap_Pagoda.jpg"), imageCredit:"Wikimedia Commons", desc:"석가탑 앞에 작은 돌상자가 있어요! 열어볼까요? 탑 꼭대기에서 빛이 반짝입니다.", bg:"#1a2a3a",
    items:[{id:"sutra",emoji:"📜",name:"무구정광대다라니경",hint:"세계 최초 인쇄물!"}],
    riddle:{q:"석가탑의 별명 '무영탑'은 무슨 뜻일까요?",opts:["그림자가 없는 탑","소리가 없는 탑","이름이 없는 탑","끝이 없는 탑"],ans:0,reward:"light_gem",rewardName:"빛의 보석 💎"},
    exits:[{to:"courtyard",label:"마당으로 ↩️",req:null}] },
  { id:"cave_entrance", name:"오솔길", emoji:"🌲", image:WM("Korea-Gyeongju-Bulguksa-03.jpg"), imageCredit:"Wikimedia Commons", desc:"소나무 사이로 산길이 나 있어요. 토끼 한 마리가 길을 안내하는 것 같아요! 멀리 동굴 입구가 보여요.", bg:"#1a3a1a",
    items:[{id:"torch",emoji:"🔦",name:"횃불",hint:"어두운 곳을 밝힐 수 있어요"}],
    exits:[{to:"seokguram",label:"석굴암 들어가기 🕳️",req:"torch",locked:"너무 어두워요! 빛이 필요해요."},{to:"courtyard",label:"마당으로 ↩️",req:null}] },
  { id:"seokguram", name:"석굴암", emoji:"🧘", image:WM("Front_view_of_Buddha_at_Seokguram.jpg"), imageCredit:"Wikimedia Commons", desc:"거대한 돌부처님이 부드러운 미소를 짓고 있어요. 천장의 돌 돔이 별처럼 반짝이고, 벽면에 아름다운 조각상들이 늘어서 있어요.", bg:"#2a2a3e",
    items:[{id:"wisdom",emoji:"✨",name:"지혜의 빛",hint:"부처님이 주신 신비한 빛!"}],
    riddle:{q:"석굴암의 돔은 무엇으로 만들었을까요?",opts:["나무","흙","돌","금속"],ans:2,reward:"dragon_scale",rewardName:"용의 비늘 🐉"},
    exits:[{to:"observatory",label:"산 정상으로 ⛰️",req:null},{to:"cave_entrance",label:"오솔길로 ↩️",req:null}] },
  { id:"observatory", name:"첨성대 언덕", emoji:"🔭", image:WM("Cheomseongdae_Observatory_under_blue_sky_in_Gyeongju_South_Korea.jpg"), imageCredit:"Wikimedia Commons", desc:"첨성대가 보이는 언덕 위에요! 밤하늘에 별이 쏟아지고, 첨성대 꼭대기에서 신비한 빛이 올라와요.", bg:"#0a0a2e",
    items:[],
    riddle:{q:"첨성대는 총 몇 개의 돌로 만들어졌을까요?",opts:["100개","200개","362개","500개"],ans:2,reward:"star_crystal",rewardName:"별의 수정 ⭐"},
    exits:[{to:"treasure",label:"보물의 방으로! 🌟",req:"star_crystal",locked:"마지막 수수께끼를 풀어야 해요!"},{to:"seokguram",label:"석굴암으로 ↩️",req:null}] },
  { id:"treasure", name:"신라의 보물 창고", emoji:"👑", image:WM("Divine_Bell_of_King_Seongdeok.jpg"), imageCredit:"Wikimedia Commons", desc:"축하해요! 모든 시련을 통과해서 신라의 비밀 보물 창고를 찾았어요!", bg:"#2a1a0a",
    items:[], exits:[], isEnd:true },
];

/* ═══════════════════════════════════════
   STYLES
   ═══════════════════════════════════════ */
const C = { bg:"#1a1a2e", card:"#16213e", accent:"#e94560", gold:"#f5c842", green:"#2ecc71", blue:"#3498db", purple:"#9b59b6", text:"#eee", dim:"#aab" };
const S = {
  wrap:{fontFamily:"'Gaegu','Noto Sans KR',sans-serif",minHeight:"100vh",background:`linear-gradient(135deg,${C.bg} 0%,#0f3460 50%,${C.bg} 100%)`,color:C.text,display:"flex",flexDirection:"column",alignItems:"center",padding:12,boxSizing:"border-box",overflowX:"hidden"},
  title:{fontSize:"clamp(1.8rem,5vw,3rem)",fontWeight:900,textAlign:"center",margin:"10px 0",background:`linear-gradient(90deg,${C.gold},${C.accent})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  card:{background:C.card,borderRadius:16,padding:20,width:"100%",maxWidth:500,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",marginBottom:16,boxSizing:"border-box"},
  btn:(bg,sz="1rem")=>({background:bg,border:"none",borderRadius:12,color:"#fff",padding:"12px 24px",fontSize:sz,fontFamily:"'Gaegu',sans-serif",fontWeight:700,cursor:"pointer",transition:"transform 0.15s",boxShadow:`0 4px 15px ${bg}55`,textAlign:"center"}),
  badge:{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(245,200,66,0.15)",border:`1px solid ${C.gold}`,borderRadius:20,padding:"4px 12px",fontSize:"0.95rem",color:C.gold},
  home:{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"5px 10px",color:C.text,fontSize:"0.85rem",cursor:"pointer",fontFamily:"'Gaegu',sans-serif"},
};

/* ═══════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════ */
function Stars(){const s=useRef(Array.from({length:25},(_,i)=>({id:i,l:Math.random()*100,t:Math.random()*100,sz:Math.random()*2+1,d:Math.random()*3})));return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.current.map(v=><div key={v.id} style={{position:"absolute",left:`${v.l}%`,top:`${v.t}%`,width:v.sz,height:v.sz,borderRadius:"50%",background:"#fff",opacity:0.6,animation:`twinkle ${2+v.d}s ease-in-out infinite alternate`}}/>)}</div>;}
function Bar({score,stage,onHome}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,gap:8}}><button onClick={onHome} style={S.home}>🏠 홈</button><span style={S.badge}>⭐ {score}점</span><span style={{fontSize:"0.85rem",color:C.dim,flex:"0 0 auto"}}>{stage}</span></div>);}
function TempleScene(){return(<svg viewBox="0 0 400 160" style={{width:"100%",maxWidth:360,margin:"0 auto",display:"block"}}><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f3460"/><stop offset="100%" stopColor="#1a1a2e"/></linearGradient></defs><rect width="400" height="160" fill="url(#sky)"/><circle cx="320" cy="30" r="16" fill="#f5c842" opacity="0.9"/><circle cx="327" cy="25" r="13" fill="url(#sky)"/><polygon points="0,130 80,75 160,130" fill="#1a3a5c"/><polygon points="100,130 200,55 300,130" fill="#162d50"/><rect x="0" y="125" width="400" height="35" fill="#1a3322"/><rect x="120" y="92" width="160" height="36" fill="#8B7355" rx="2"/>{[140,170,230,260].map(x=><rect key={x} x={x} y="80" width="7" height="48" fill="#CD853F"/>)}<polygon points="115,82 200,55 285,82" fill="#c0392b"/><circle cx="200" cy="48" r="3" fill="#f5c842"/></svg>);}

/* ═══════════════════════════════════════
   MAIN MENU
   ═══════════════════════════════════════ */
function MainMenu({onStart,onGoTo,highScore,arcadeHigh}){
  const modes=[{label:"⚡ 아케이드",key:"arcade",c:C.gold,d:"두더지 잡기!"},{label:"❓ 퀴즈",key:"quiz",c:C.blue,d:"신라 역사 퀴즈"},{label:"🧩 퍼즐",key:"puzzle",c:C.purple,d:"그림 맞추기"},{label:"🏰 어드벤처",key:"adventure",c:C.green,d:"불국사 탐험"}];
  return(<div style={{...S.wrap,justifyContent:"center",minHeight:"100vh"}}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500,textAlign:"center"}}><div style={{fontSize:"3.5rem",marginBottom:4}}>🏯</div><h1 style={S.title}>불국사 대모험</h1><p style={{fontSize:"clamp(0.9rem,2.5vw,1.1rem)",color:C.dim,marginBottom:12}}>신라 시대로 떠나는 신비한 여행!</p><TempleScene/><div style={{marginTop:20,display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}><button style={S.btn(C.accent,"1.3rem")} onClick={onStart} onMouseOver={e=>{e.target.style.transform="scale(1.05)"}} onMouseOut={e=>{e.target.style.transform="scale(1)"}}>🚀 모험 시작!</button><div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>{highScore>0&&<div style={{color:C.gold,fontSize:"0.95rem"}}>🏆 모험: {highScore}점</div>}{arcadeHigh>0&&<div style={{color:C.gold,fontSize:"0.95rem"}}>⚡ 아케이드: {arcadeHigh}점</div>}</div></div><div style={{marginTop:18,display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,maxWidth:340,margin:"18px auto 0"}}>{modes.map(m=>(<button key={m.key} onClick={()=>onGoTo(m.key)} style={{background:`${m.c}22`,border:`1px solid ${m.c}66`,borderRadius:12,padding:"10px 12px",cursor:"pointer",color:C.text,fontFamily:"'Gaegu',sans-serif",fontSize:"0.95rem",transition:"all 0.2s",textAlign:"center"}} onMouseOver={e=>{e.target.style.background=`${m.c}44`}} onMouseOut={e=>{e.target.style.background=`${m.c}22`}}><div style={{fontSize:"1.05rem",fontWeight:700}}>{m.label}</div><div style={{fontSize:"0.75rem",color:C.dim,marginTop:2}}>{m.d}</div></button>))}</div></div></div>);
}

/* ═══════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════ */
function DetailIllust({type}){
  const scenes={
    build:<svg viewBox="0 0 280 100" style={{width:"100%",borderRadius:10,marginBottom:10}}><rect width="280" height="100" fill="#1a2a3e" rx="10"/><rect x="90" y="55" width="100" height="38" fill="#8B7355" rx="2"/>{[100,120,160,180].map(x=><rect key={x} x={x} y="48" width="6" height="45" fill="#CD853F"/>)}<polygon points="80,50 140,25 200,50" fill="#c0392b"/><circle cx="140" cy="20" r="3" fill="#f5c842"/><circle cx="50" cy="68" r="7" fill="#e8c170"/><rect x="46" y="75" width="8" height="14" fill="#3498db" rx="2"/><circle cx="230" cy="68" r="7" fill="#e8c170"/><rect x="226" y="75" width="8" height="14" fill="#e74c3c" rx="2"/><text x="140" y="14" textAnchor="middle" fill={C.gold} fontSize="9" fontFamily="sans-serif">🏗️ 건축 시작!</text></svg>,
    tower:<svg viewBox="0 0 280 100" style={{width:"100%",borderRadius:10,marginBottom:10}}><rect width="280" height="100" fill="#1a2a4a" rx="10"/><rect x="110" y="65" width="60" height="25" fill="#9e9e9e" rx="2"/><rect x="115" y="48" width="50" height="19" fill="#bbb" rx="2"/><rect x="120" y="32" width="40" height="18" fill="#ccc" rx="2"/><rect x="130" y="20" width="20" height="14" fill="#ddd" rx="2"/><circle cx="140" cy="15" r="5" fill="#eee"/><line x1="185" y1="15" x2="185" y2="88" stroke="#f5c842" strokeWidth="1" strokeDasharray="3,2"/><text x="195" y="55" fill={C.gold} fontSize="8">8.2m</text></svg>,
    map:<svg viewBox="0 0 280 100" style={{width:"100%",borderRadius:10,marginBottom:10}}><rect width="280" height="100" fill="#1a3a2a" rx="10"/>{[{x:60,y:30,l:"불국사"},{x:160,y:25,l:"석굴암"},{x:110,y:60,l:"첨성대"},{x:45,y:70,l:"대릉원"},{x:220,y:55,l:"안압지"}].map((p,i)=>(<g key={i}><circle cx={p.x} cy={p.y} r="7" fill={C.gold} opacity="0.8"/><text x={p.x} y={p.y+18} textAnchor="middle" fontSize="7" fill="#eee">{p.l}</text></g>))}<line x1="60" y1="30" x2="110" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,2"/><line x1="110" y1="60" x2="160" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,2"/><text x="140" y="14" textAnchor="middle" fill={C.gold} fontSize="9">🗺️ 경주 유적 지도</text></svg>,
  };
  return scenes[type]||scenes.build;
}

function QuizGame({onComplete,score,setScore,onHome}){
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [showHint,setShowHint]=useState(false);
  const [showDetail,setShowDetail]=useState(false);
  const [streak,setStreak]=useState(0);
  const quiz=QUIZ_DATA[idx], total=QUIZ_DATA.length, correct=sel===quiz.ans;

  const pick=i=>{if(sel!==null)return;setSel(i);if(i===quiz.ans){setScore(s=>s+(streak>=2?15:10));setStreak(s=>s+1)}else setStreak(0)};
  const next=()=>{if(idx+1>=total){onComplete();return}setIdx(i=>i+1);setSel(null);setShowHint(false);setShowDetail(false)};

  return(
    <div style={S.wrap}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500}}>
      <Bar score={score} stage={`퀴즈 ${idx+1}/${total}`} onHome={onHome}/>
      {streak>=2&&<div style={{textAlign:"center",color:C.gold,fontSize:"0.9rem",marginBottom:6}}>🔥 {streak}연속 정답!</div>}
      <div style={S.card}>
        <div style={{fontSize:"1.5rem",marginBottom:4}}>❓</div>
        <h2 style={{fontSize:"clamp(1.1rem,3.5vw,1.4rem)",marginBottom:18,lineHeight:1.5,fontWeight:700}}>{quiz.q}</h2>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {quiz.opts.map((o,i)=>{let bg="rgba(255,255,255,0.06)",bd="1px solid rgba(255,255,255,0.1)";if(sel!==null){if(i===quiz.ans){bg="rgba(46,204,113,0.25)";bd=`2px solid ${C.green}`}else if(i===sel&&!correct){bg="rgba(233,69,96,0.25)";bd=`2px solid ${C.accent}`}}return<button key={i} onClick={()=>pick(i)} style={{background:bg,border:bd,borderRadius:12,padding:"14px 16px",color:C.text,fontSize:"clamp(1rem,3vw,1.15rem)",textAlign:"left",cursor:sel!==null?"default":"pointer",fontFamily:"'Gaegu',sans-serif",transition:"all 0.2s"}}>{["①","②","③","④"][i]} {o}{sel!==null&&i===quiz.ans&&" ✅"}{sel===i&&!correct&&" ❌"}</button>})}
        </div>
        {!showHint&&sel===null&&<button onClick={()=>setShowHint(true)} style={{marginTop:12,background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:"0.95rem",fontFamily:"'Gaegu',sans-serif"}}>💡 힌트 보기</button>}
        {showHint&&sel===null&&<div style={{marginTop:12,padding:"10px 14px",background:"rgba(245,200,66,0.1)",borderRadius:10,fontSize:"0.95rem",color:C.gold}}>💡 {quiz.hint}</div>}

        {sel!==null&&!showDetail&&(
          <div style={{marginTop:16,padding:14,borderRadius:12,background:correct?"rgba(46,204,113,0.1)":"rgba(233,69,96,0.1)",border:`1px solid ${correct?C.green:C.accent}44`}}>
            <div style={{fontSize:"1.1rem",fontWeight:700,marginBottom:6}}>{correct?"🎉 정답이에요!":"😅 아쉬워요!"}</div>
            <div style={{fontSize:"0.95rem",lineHeight:1.6,color:C.dim}}>📚 {quiz.fact}</div>
            <button onClick={()=>setShowDetail(true)} style={{...S.btn(C.purple,"0.95rem"),marginTop:12,width:"100%"}}>📖 더 알아보기!</button>
          </div>
        )}

        {showDetail&&quiz.detail&&(
          <div style={{marginTop:16}}>
            <div style={{padding:16,borderRadius:14,background:"linear-gradient(135deg,rgba(155,89,182,0.15),rgba(52,152,219,0.15))",border:"1px solid rgba(155,89,182,0.3)"}}>
              <h3 style={{fontSize:"1.15rem",color:C.gold,marginBottom:10,textAlign:"center"}}>{quiz.detail.title}</h3>
              <DetailIllust type={quiz.detail.illustType}/>
              {quiz.detail.paragraphs.map((p,i)=><p key={i} style={{fontSize:"0.95rem",lineHeight:1.7,color:C.text,marginBottom:10,padding:"0 4px"}}>{p}</p>)}
              <div style={{background:"rgba(245,200,66,0.12)",border:`1px solid ${C.gold}44`,borderRadius:12,padding:"12px 14px",marginTop:8}}>
                <div style={{fontSize:"0.85rem",color:C.gold,fontWeight:700,marginBottom:4}}>🤩 재미있는 사실!</div>
                <div style={{fontSize:"0.9rem",color:C.text,lineHeight:1.6}}>{quiz.detail.funFact}</div>
              </div>
            </div>
            <button onClick={next} style={{...S.btn(C.blue),marginTop:14,width:"100%"}}>{idx+1>=total?"퍼즐로 가기! 🧩":"다음 문제 ➡️"}</button>
          </div>
        )}
        {sel!==null&&!showDetail&&<button onClick={next} style={{...S.btn(C.blue),marginTop:12,width:"100%",opacity:0.7,fontSize:"0.85rem"}}>건너뛰고 {idx+1>=total?"퍼즐로 🧩":"다음 ➡️"}</button>}
      </div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:8,height:8,overflow:"hidden"}}><div style={{width:`${((idx+1)/total)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.purple})`,borderRadius:8,transition:"width 0.5s"}}/></div>
    </div></div>
  );
}

/* ═══════════════════════════════════════
   PUZZLE (3×3, 4×4, 5×5)
   ═══════════════════════════════════════ */
function PuzzleGame({onComplete,score,setScore,onHome}){
  const [li,setLi]=useState(0);
  const [showRef,setShowRef]=useState(false);
  const lvl=PUZZLE_LEVELS[li], gs=lvl.grid, tot=gs*gs, Svg=SVG_RENDERERS[lvl.svgIdx];

  const shuffle=useCallback(()=>{let a;do{a=Array.from({length:tot},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}}while(a.every((v,i)=>v===i));return a},[tot]);

  const [tiles,setTiles]=useState(()=>shuffle());
  const [selT,setSelT]=useState(null);
  const [moves,setMoves]=useState(0);
  const [solved,setSolved]=useState(false);

  useEffect(()=>{setTiles(shuffle());setSelT(null);setMoves(0);setSolved(false);setShowRef(false)},[li,shuffle]);

  const click=idx=>{if(solved)return;if(selT===null){setSelT(idx)}else{const t=[...tiles];[t[selT],t[idx]]=[t[idx],t[selT]];setTiles(t);setMoves(m=>m+1);setSelT(null);if(t.every((v,i)=>v===i)){setSolved(true);setScore(s=>s+(moves<gs*4?30:moves<gs*7?20:10))}}};
  const nextP=()=>{if(li+1>=PUZZLE_LEVELS.length){onComplete();return}setLi(i=>i+1)};

  return(
    <div style={S.wrap}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500}}>
      <Bar score={score} stage={`퍼즐 ${li+1}/${PUZZLE_LEVELS.length} (${gs}×${gs})`} onHome={onHome}/>
      <div style={S.card}>
        <div style={{textAlign:"center",marginBottom:8}}>
          <span style={{fontSize:"1.8rem"}}>{lvl.emoji}</span>
          <h2 style={{fontSize:"1.15rem",margin:"4px 0"}}>"{lvl.name}" 그림 맞추기</h2>
          <p style={{color:C.dim,fontSize:"0.8rem"}}>{lvl.desc} · 조각을 터치해서 자리를 바꿔요!</p>
        </div>
        <div style={{textAlign:"center",marginBottom:6}}>
          <button onClick={()=>setShowRef(r=>!r)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 12px",color:C.gold,fontSize:"0.8rem",cursor:"pointer",fontFamily:"'Gaegu',sans-serif"}}>{showRef?"🙈 숨기기":"👀 원본 (힌트)"}</button>
        </div>
        {showRef&&<div style={{width:"45%",maxWidth:140,margin:"0 auto 8px",borderRadius:8,overflow:"hidden",border:`2px solid ${C.gold}44`}}><Svg/></div>}
        <div style={{display:"grid",gridTemplateColumns:`repeat(${gs},1fr)`,gap:solved?0:3,maxWidth:gs<=3?280:gs===4?320:360,margin:"0 auto",borderRadius:solved?10:0,overflow:"hidden",transition:"gap 0.5s"}}>
          {tiles.map((tile,idx)=>{const sr=Math.floor(tile/gs),sc=tile%gs,ok=tile===idx,isSel=selT===idx;return(
            <div key={idx} onClick={()=>click(idx)} style={{aspectRatio:"1",overflow:"hidden",cursor:solved?"default":"pointer",borderRadius:solved?0:gs<=3?6:4,border:isSel?`3px solid ${C.gold}`:solved?"none":ok?`2px solid ${C.green}55`:"2px solid rgba(255,255,255,0.1)",transform:isSel?"scale(1.06)":"scale(1)",transition:"all 0.2s",boxShadow:isSel?`0 0 14px ${C.gold}55`:"none",position:"relative"}}>
              <div style={{width:`${gs*100}%`,height:`${gs*100}%`,position:"absolute",left:`-${sc*100}%`,top:`-${sr*100}%`}}><Svg/></div>
              {!solved&&ok&&<div style={{position:"absolute",top:1,right:2,fontSize:gs<=3?"0.6rem":"0.45rem",opacity:0.5}}>✓</div>}
            </div>
          )})}
        </div>
        <div style={{textAlign:"center",marginTop:8,color:C.dim,fontSize:"0.85rem"}}>이동: {moves}회</div>
        {solved&&(<div style={{textAlign:"center",marginTop:12}}><div style={{fontSize:"1.2rem",color:C.green,fontWeight:700,marginBottom:6}}>🎊 {lvl.name} 완성!</div><div style={{fontSize:"0.85rem",color:C.dim,marginBottom:10}}>{moves<gs*4?"천재! 🌟":moves<gs*7?"잘했어요! 👏":"완성! 🎉"}</div><button onClick={nextP} style={S.btn(C.purple)} onMouseOver={e=>{e.target.style.transform="scale(1.05)"}} onMouseOut={e=>{e.target.style.transform="scale(1)"}}>{li+1>=PUZZLE_LEVELS.length?"어드벤처로! 🏰":"다음 퍼즐 ➡️"}</button></div>)}
      </div>
    </div></div>
  );
}

/* ═══════════════════════════════════════
   ADVENTURE
   ═══════════════════════════════════════ */
function RoomScene({roomId}){
  const sc={
    start:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#1a3322" rx="10"/><rect x="0" y="62" width="300" height="28" fill="#2a4a2a"/><rect x="120" y="20" width="60" height="45" fill="#8B4513" rx="3"/><rect x="135" y="32" width="30" height="33" fill="#2a1a0a" rx="2"/><polygon points="110,22 150,5 190,22" fill="#c0392b"/><circle cx="40" cy="38" r="16" fill="#2d5a27" opacity="0.8"/><rect x="37" y="48" width="6" height="18" fill="#5a3a2a"/><circle cx="260" cy="38" r="16" fill="#2d5a27" opacity="0.8"/><rect x="257" y="48" width="6" height="18" fill="#5a3a2a"/><ellipse cx="80" cy="68" rx="35" ry="6" fill="rgba(255,255,255,0.06)"/></svg>,
    bridge:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#1a2a4a" rx="10"/>{Array.from({length:8}).map((_,i)=><rect key={i} x={60+i*22} y={68-i*5} width={22} height={4} fill={`rgb(${160+i*5},${150+i*5},${140+i*5})`} rx="1"/>)}<ellipse cx="80" cy="25" rx="28" ry="9" fill="rgba(255,255,255,0.07)"/><rect x="240" y="42" width="14" height="28" fill="#9a8a7a" rx="2"/><text x="247" y="60" textAnchor="middle" fontSize="6" fill="#ddd">?</text></svg>,
    courtyard:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#2a1a2e" rx="10"/><rect x="0" y="62" width="300" height="28" fill="#3a2a1a"/><rect x="55" y="30" width="22" height="34" fill="#bbb" rx="2"/><rect x="50" y="25" width="32" height="6" fill="#aaa" rx="2"/><circle cx="66" cy="20" r="4" fill="#ccc"/><rect x="220" y="22" width="22" height="42" fill="#bbb" rx="2"/><rect x="215" y="17" width="32" height="6" fill="#aaa" rx="2"/><circle cx="150" cy="48" r="3" fill="#f5c842" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></circle></svg>,
    pagoda:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#1a2a3a" rx="10"/><rect x="120" y="32" width="60" height="42" fill="#bbb" rx="2"/><rect x="115" y="27" width="70" height="6" fill="#aaa" rx="2"/><rect x="130" y="15" width="40" height="14" fill="#ccc" rx="2"/><circle cx="150" cy="10" r="5" fill="#ddd"/><circle cx="150" cy="10" r="8" fill={C.gold} opacity="0.12"><animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite"/></circle><rect x="200" y="58" width="18" height="14" fill="#8a7a6a" rx="2"/><text x="209" y="70" textAnchor="middle" fontSize="8" fill={C.gold}>📦</text></svg>,
    cave_entrance:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#1a3a1a" rx="10"/>{[30,80,220,270].map(x=><g key={x}><polygon points={`${x-10},58 ${x},22 ${x+10},58`} fill="#2d5a27" opacity="0.7"/><rect x={x-2} y="52" width="4" height="14" fill="#5a3a2a"/></g>)}<ellipse cx="150" cy="62" rx="22" ry="15" fill="#0a0a0a"/><circle cx="120" cy="52" r="4" fill="#ddd"/><ellipse cx="118" cy="46" rx="2" ry="4" fill="#ddd"/><ellipse cx="122" cy="46" rx="2" ry="4" fill="#ddd"/><circle cx="119" cy="51" r="1" fill="#333"/></svg>,
    seokguram:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#2a2a3e" rx="10"/><path d="M80,78 Q80,15 150,10 Q220,15 220,78 Z" fill="#3a3a4e"/><circle cx="150" cy="38" r="10" fill="#d4a574"/><rect x="142" y="47" width="16" height="22" fill="#d4a574" rx="3"/><circle cx="147" cy="36" r="1.2" fill="#333"/><circle cx="153" cy="36" r="1.2" fill="#333"/><path d="M147,41 Q150,43 153,41" stroke="#333" strokeWidth="0.7" fill="none"/><circle cx="150" cy="38" r="22" fill={C.gold} opacity="0.05"><animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite"/></circle></svg>,
    observatory:<svg viewBox="0 0 300 90" style={{width:"100%",borderRadius:10,marginBottom:8}}><rect width="300" height="90" fill="#0a0a2e" rx="10"/>{[[30,10],[80,20],[200,8],[250,25],[120,5],[270,15]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={1.3} fill="#fff" opacity={0.4+Math.random()*0.5}/>)}<path d="M130,78 Q128,48 133,28 L167,28 Q172,48 170,78 Z" fill="#b8a88a"/><rect x="143" y="48" width="14" height="9" fill="#0a0a2e" rx="1"/><rect x="128" y="24" width="44" height="5" fill="#a09080" rx="1"/><line x1="150" y1="20" x2="150" y2="4" stroke={C.gold} strokeWidth="2" opacity="0.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><circle cx="150" cy="4" r="3" fill={C.gold} opacity="0.6"/></svg>,
  };
  return sc[roomId]||null;
}

function AdventureGame({onComplete,score,setScore,onHome}){
  const [roomId,setRoomId]=useState("start");
  const [inv,setInv]=useState([]);
  const [picked,setPicked]=useState([]);
  const [msg,setMsg]=useState(null);
  const [riddleState,setRiddleState]=useState(null);
  const [riddleSel,setRiddleSel]=useState(null);
  const [visited,setVisited]=useState(["start"]);
  const [endReached,setEndReached]=useState(false);

  const room=ADV_ROOMS.find(r=>r.id===roomId);
  const avail=(room.items||[]).filter(it=>!picked.includes(it.id));

  const pickItem=item=>{setInv(inv=>[...inv,item]);setPicked(p=>[...p,item.id]);setScore(s=>s+5);setMsg(`${item.emoji} ${item.name}을(를) 얻었어요! (+5점)`);setTimeout(()=>setMsg(null),2000)};

  const tryExit=exit=>{
    if(exit.req&&!inv.some(it=>it.id===exit.req)){setMsg(`🔒 ${exit.locked}`);setTimeout(()=>setMsg(null),2500);return}
    setRoomId(exit.to);setRiddleState(null);setRiddleSel(null);
    if(!visited.includes(exit.to)){setVisited(v=>[...v,exit.to]);setScore(s=>s+10)}
    if(ADV_ROOMS.find(r=>r.id===exit.to)?.isEnd)setEndReached(true);
  };

  const ansRiddle=i=>{if(riddleSel!==null)return;setRiddleSel(i);if(i===room.riddle.ans){setRiddleState("correct");setInv(inv=>[...inv,{id:room.riddle.reward,emoji:room.riddle.rewardName.slice(-2),name:room.riddle.rewardName}]);setScore(s=>s+20)}else setRiddleState("wrong")};

  if(endReached)return(
    <div style={{...S.wrap,justifyContent:"center",minHeight:"100vh"}}><Stars/><div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%",maxWidth:500}}>
      <div style={{fontSize:"4rem",marginBottom:8}}>🎊</div>
      <h1 style={{...S.title,fontSize:"clamp(1.6rem,5vw,2.5rem)"}}>탐험 완료!</h1>
      <div style={{fontSize:"2rem",color:C.gold,fontWeight:900,margin:"12px 0"}}>{score}점</div>
      <div style={S.card}>
        <h3 style={{color:C.gold,fontSize:"1rem",marginBottom:8}}>🎒 수집한 보물</h3>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>{inv.map((it,i)=><span key={i} style={{background:"rgba(245,200,66,0.12)",border:`1px solid ${C.gold}44`,borderRadius:8,padding:"4px 8px",fontSize:"0.8rem"}}>{it.emoji||"📦"} {it.name}</span>)}</div>
        <p style={{marginTop:10,fontSize:"0.9rem",color:C.dim}}>{visited.length>=ADV_ROOMS.length-1?"모든 장소를 탐험했어요!":"다시 도전하면 더 많은 곳을 탐험할 수 있어요!"}</p>
      </div>
      <button onClick={onComplete} style={{...S.btn(C.accent,"1.1rem"),marginTop:8}}>결과 보기 🏆</button>
    </div></div>
  );

  return(
    <div style={S.wrap}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500}}>
      <Bar score={score} stage={`탐험: ${room.name}`} onHome={onHome}/>
      {inv.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8,padding:"5px 8px",background:"rgba(0,0,0,0.2)",borderRadius:8}}><span style={{fontSize:"0.75rem",color:C.dim,marginRight:3}}>🎒</span>{inv.map((it,i)=><span key={i} style={{fontSize:"0.8rem"}} title={it.name}>{it.emoji||"📦"}</span>)}</div>}
      <div style={{...S.card,background:`linear-gradient(180deg,${room.bg},${C.card})`}}>
        <div style={{textAlign:"center",marginBottom:10}}>{room.image?<div style={{position:"relative",width:"100%",maxWidth:320,margin:"0 auto 6px",borderRadius:12,overflow:"hidden",aspectRatio:"4/3",background:"rgba(255,255,255,0.05)"}}><img src={room.image} alt={room.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/><div style={{position:"absolute",top:6,left:6,fontSize:"1.4rem",filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.7))"}}>{room.emoji}</div>{room.imageCredit&&<div style={{position:"absolute",bottom:2,right:6,fontSize:"0.6rem",color:"rgba(255,255,255,0.7)",textShadow:"0 1px 2px rgba(0,0,0,0.9)"}}>© {room.imageCredit}</div>}</div>:<div style={{fontSize:"2.2rem",marginBottom:2}}>{room.emoji}</div>}<h2 style={{fontSize:"1.2rem",color:C.gold,margin:"2px 0"}}>{room.name}</h2></div>
        <RoomScene roomId={roomId}/>
        <p style={{fontSize:"1rem",lineHeight:1.7,color:C.text,marginBottom:12,padding:"0 4px"}}>{room.desc}</p>
        {msg&&<div style={{background:"rgba(245,200,66,0.15)",border:`1px solid ${C.gold}55`,borderRadius:10,padding:"8px 12px",marginBottom:10,textAlign:"center",fontSize:"0.9rem",color:C.gold}}>{msg}</div>}
        {avail.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:"0.8rem",color:C.dim,marginBottom:5}}>💡 발견한 물건:</div>{avail.map(it=><button key={it.id} onClick={()=>pickItem(it)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",background:"rgba(46,204,113,0.1)",border:`1px solid ${C.green}44`,borderRadius:10,padding:"8px 12px",marginBottom:5,cursor:"pointer",color:C.text,fontFamily:"'Gaegu',sans-serif",fontSize:"0.95rem",textAlign:"left"}}><span style={{fontSize:"1.3rem"}}>{it.emoji}</span><div><div style={{fontWeight:700}}>{it.name}</div><div style={{fontSize:"0.75rem",color:C.dim}}>{it.hint}</div></div></button>)}</div>}

        {room.riddle&&riddleState===null&&<div style={{marginBottom:12}}><button onClick={()=>setRiddleState("showing")} style={{...S.btn("rgba(155,89,182,0.6)","0.9rem"),width:"100%"}}>🧩 수수께끼에 도전!</button></div>}
        {riddleState==="showing"&&room.riddle&&<div style={{background:"rgba(155,89,182,0.1)",border:`1px solid ${C.purple}44`,borderRadius:12,padding:12,marginBottom:12}}><div style={{fontSize:"0.95rem",fontWeight:700,marginBottom:8}}>🧩 {room.riddle.q}</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{room.riddle.opts.map((o,i)=><button key={i} onClick={()=>ansRiddle(i)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 10px",color:C.text,fontSize:"0.9rem",cursor:"pointer",fontFamily:"'Gaegu',sans-serif",textAlign:"left"}}>{["①","②","③","④"][i]} {o}</button>)}</div></div>}
        {riddleState==="correct"&&<div style={{background:"rgba(46,204,113,0.12)",border:`1px solid ${C.green}44`,borderRadius:12,padding:12,marginBottom:12,textAlign:"center"}}><div style={{fontSize:"1.1rem",fontWeight:700,color:C.green}}>🎉 정답! +20점</div><div style={{fontSize:"0.9rem",color:C.text,marginTop:4}}>{room.riddle.rewardName}을(를) 얻었어요!</div></div>}
        {riddleState==="wrong"&&<div style={{background:"rgba(233,69,96,0.12)",border:`1px solid ${C.accent}44`,borderRadius:12,padding:12,marginBottom:12}}><div style={{fontSize:"0.95rem",color:C.accent,fontWeight:700}}>😅 아쉬워요!</div><div style={{fontSize:"0.85rem",color:C.dim,marginTop:2}}>다시 잘 생각해보고 도전해 보세요!</div><button onClick={()=>{setRiddleState("showing");setRiddleSel(null)}} style={{...S.btn(C.purple,"0.8rem"),marginTop:6}}>🔄 다시 풀어보기</button></div>}

        {room.exits.length>0&&<div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>{room.exits.map((ex,i)=><button key={i} onClick={()=>tryExit(ex)} style={{background:"rgba(52,152,219,0.12)",border:`1px solid ${C.blue}55`,borderRadius:12,padding:"10px 14px",color:C.text,fontSize:"0.95rem",cursor:"pointer",fontFamily:"'Gaegu',sans-serif",textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"space-between"}} onMouseOver={e=>{e.target.style.background="rgba(52,152,219,0.25)"}} onMouseOut={e=>{e.target.style.background="rgba(52,152,219,0.12)"}}><span>{ex.label}</span>{ex.req&&!inv.some(it=>it.id===ex.req)&&<span style={{fontSize:"0.8rem"}}>🔒</span>}</button>)}</div>}
      </div>
      <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",marginTop:2}}>{ADV_ROOMS.filter(r=>!r.isEnd).map(r=><div key={r.id} style={{width:9,height:9,borderRadius:"50%",background:r.id===roomId?C.gold:visited.includes(r.id)?C.green:"rgba(255,255,255,0.15)",transition:"all 0.3s"}} title={r.name}/>)}</div>
    </div></div>
  );
}

/* ═══════════════════════════════════════
   ARCADE (Silla Whack-a-Mole)
   ═══════════════════════════════════════ */
const ARCADE_CHARS = [
  {e:"🐰",pts:10,w:32,t:1400,n:"토끼"},
  {e:"🦊",pts:20,w:16,t:1200,n:"여우"},
  {e:"🐉",pts:30,w:8,t:1000,n:"용",rare:true},
  {e:"💎",pts:50,w:4,t:850,n:"보물",rare:true},
  {e:"💣",pts:-15,w:22,t:1500,n:"폭탄",bad:true},
  {e:"🐛",pts:-5,w:18,t:1600,n:"벌레",bad:true},
];
const ARCADE_WSUM = ARCADE_CHARS.reduce((a,c)=>a+c.w,0);
const ARCADE_ROUND_MS = 60000;
const ARCADE_HOLES = 9;

function ArcadeGame({onHome,arcadeHigh,setArcadeHigh}){
  const [phase,setPhase]=useState("ready");
  const [score,setScore]=useState(0);
  const [remain,setRemain]=useState(ARCADE_ROUND_MS);
  const [holes,setHoles]=useState(Array(ARCADE_HOLES).fill(null));
  const [floats,setFloats]=useState([]);
  const [combo,setCombo]=useState(0);
  const [flash,setFlash]=useState(null);
  const startRef=useRef(0);
  const comboRef=useRef(0);

  const start=()=>{setScore(0);setCombo(0);comboRef.current=0;setRemain(ARCADE_ROUND_MS);setHoles(Array(ARCADE_HOLES).fill(null));setFloats([]);setFlash(null);startRef.current=Date.now();setPhase("play")};

  useEffect(()=>{
    if(phase!=="play")return;
    const loop=setInterval(()=>{
      const now=Date.now();
      const elapsed=now-startRef.current;
      const rem=Math.max(0,ARCADE_ROUND_MS-elapsed);
      setRemain(rem);
      if(rem===0){clearInterval(loop);setPhase("over");return}
      const diff=elapsed/ARCADE_ROUND_MS;
      setHoles(hs=>{
        const out=hs.map(h=>(h&&h.exp<now)?null:h);
        const spawnP=0.16+diff*0.28;
        const empty=[];for(let i=0;i<out.length;i++)if(!out[i])empty.push(i);
        if(empty.length>0&&Math.random()<spawnP){
          const slot=empty[Math.floor(Math.random()*empty.length)];
          let r=Math.random()*ARCADE_WSUM,pick=ARCADE_CHARS[0];
          for(const c of ARCADE_CHARS){r-=c.w;if(r<=0){pick=c;break}}
          const lifetime=Math.max(650,pick.t-diff*450);
          out[slot]={...pick,exp:now+lifetime,id:now+slot+Math.random()};
        }
        return out;
      });
    },80);
    return ()=>clearInterval(loop);
  },[phase]);

  useEffect(()=>{if(phase==="over")setArcadeHigh(h=>Math.max(h,score))},[phase,score,setArcadeHigh]);

  const tap=idx=>{
    if(phase!=="play")return;
    const h=holes[idx];if(!h)return;
    setHoles(hs=>{const o=[...hs];o[idx]=null;return o});
    let gain=h.pts;
    if(!h.bad){comboRef.current+=1;if(comboRef.current>=3)gain=Math.round(gain*1.5);setCombo(comboRef.current)}
    else{comboRef.current=0;setCombo(0);setFlash("bad");setTimeout(()=>setFlash(null),250)}
    setScore(s=>Math.max(0,s+gain));
    const fid=Math.random();
    setFloats(f=>[...f,{id:fid,idx,pts:gain,bad:h.bad,rare:h.rare}]);
    setTimeout(()=>setFloats(f=>f.filter(x=>x.id!==fid)),700);
  };

  const pct=(remain/ARCADE_ROUND_MS)*100;
  const timeColor=remain<10000?C.accent:remain<20000?C.gold:C.green;

  if(phase==="ready")return(
    <div style={S.wrap}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500}}>
      <Bar score={0} stage="아케이드" onHome={onHome}/>
      <div style={S.card}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:"3.2rem"}}>⚡</div>
          <h2 style={{fontSize:"1.5rem",color:C.gold,margin:"4px 0"}}>신라 두더지 잡기!</h2>
          <p style={{color:C.dim,fontSize:"0.9rem",marginTop:4}}>60초 안에 점수를 모아요!<br/>3번 연속 맞히면 <span style={{color:C.gold}}>1.5배 콤보!</span></p>
        </div>
        <div style={{background:"rgba(0,0,0,0.25)",borderRadius:12,padding:12,marginBottom:12}}>
          <div style={{fontSize:"0.85rem",color:C.green,fontWeight:700,marginBottom:6}}>✅ 잡아요!</div>
          {ARCADE_CHARS.filter(c=>!c.bad).map(c=>(<div key={c.e} style={{display:"flex",alignItems:"center",gap:10,fontSize:"0.95rem",padding:"3px 0"}}><span style={{fontSize:"1.6rem"}}>{c.e}</span><span>{c.n}{c.rare&&" ✨"}</span><span style={{marginLeft:"auto",color:C.green,fontWeight:700}}>+{c.pts}점</span></div>))}
          <div style={{fontSize:"0.85rem",color:C.accent,fontWeight:700,margin:"10px 0 6px"}}>❌ 피해요!</div>
          {ARCADE_CHARS.filter(c=>c.bad).map(c=>(<div key={c.e} style={{display:"flex",alignItems:"center",gap:10,fontSize:"0.95rem",padding:"3px 0"}}><span style={{fontSize:"1.6rem"}}>{c.e}</span><span>{c.n}</span><span style={{marginLeft:"auto",color:C.accent,fontWeight:700}}>{c.pts}점</span></div>))}
        </div>
        {arcadeHigh>0&&<div style={{textAlign:"center",color:C.gold,fontSize:"0.95rem",marginBottom:12}}>🏆 최고 기록: {arcadeHigh}점</div>}
        <button onClick={start} style={{...S.btn(C.accent,"1.25rem"),width:"100%"}}>🎮 시작!</button>
      </div>
    </div></div>
  );

  if(phase==="over"){
    const isNew=score>=arcadeHigh&&score>0;
    return(
      <div style={S.wrap}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500,textAlign:"center"}}>
        <Bar score={score} stage="끝!" onHome={onHome}/>
        <div style={S.card}>
          <div style={{fontSize:"3.5rem"}}>{isNew?"🏆":"⏱️"}</div>
          <h2 style={{fontSize:"1.5rem",color:C.gold,margin:"4px 0"}}>{isNew?"신기록!":"게임 끝!"}</h2>
          <div style={{fontSize:"2.8rem",color:C.gold,fontWeight:900,margin:"10px 0"}}>{score}점</div>
          {arcadeHigh>0&&!isNew&&<p style={{color:C.dim,fontSize:"0.9rem"}}>🏆 최고 기록: {arcadeHigh}점</p>}
          <div style={{display:"flex",gap:8,marginTop:18}}>
            <button onClick={start} style={{...S.btn(C.accent),flex:1}}>🔄 다시!</button>
            <button onClick={onHome} style={{...S.btn(C.blue),flex:1}}>🏠 홈</button>
          </div>
        </div>
      </div></div>
    );
  }

  return(
    <div style={{...S.wrap,animation:flash==="bad"?"shake 0.25s":"none"}}><Stars/><div style={{position:"relative",zIndex:1,width:"100%",maxWidth:500}}>
      <Bar score={score} stage={`⏱️ ${Math.ceil(remain/1000)}초`} onHome={onHome}/>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:8,height:10,overflow:"hidden",marginBottom:10,position:"relative"}}>
        <div style={{width:`${pct}%`,height:"100%",background:timeColor,borderRadius:8,transition:"width 0.1s linear,background 0.3s"}}/>
      </div>
      {combo>=3&&<div style={{textAlign:"center",color:C.gold,fontSize:"1rem",fontWeight:700,marginBottom:6}}>🔥 {combo} 콤보! x1.5</div>}
      <div style={{...S.card,padding:16,background:flash==="bad"?"rgba(233,69,96,0.15)":C.card,transition:"background 0.2s"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,maxWidth:360,margin:"0 auto"}}>
          {holes.map((h,i)=>(
            <div key={i} onClick={()=>tap(i)} style={{position:"relative",aspectRatio:"1",background:"radial-gradient(circle at 50% 35%,#6b4a2a,#3a2414 65%,#1a0a00)",borderRadius:"50%",cursor:"pointer",overflow:"hidden",boxShadow:"inset 0 8px 14px rgba(0,0,0,0.6),0 2px 4px rgba(0,0,0,0.3)",border:"2px solid rgba(0,0,0,0.35)",userSelect:"none",WebkitUserSelect:"none",touchAction:"manipulation"}}>
              {h&&<div key={h.id} style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(2rem,9vw,3rem)",animation:"popIn 0.2s ease-out",filter:h.rare?"drop-shadow(0 0 6px #f5c842)":"none"}}>{h.e}</div>}
              {floats.filter(f=>f.idx===i).map(f=>(<div key={f.id} style={{position:"absolute",top:"50%",left:"50%",fontSize:"1.3rem",fontWeight:900,color:f.bad?C.accent:f.rare?C.gold:C.green,pointerEvents:"none",animation:"floatUp 0.7s ease-out forwards",textShadow:"0 2px 4px rgba(0,0,0,0.9)",zIndex:2}}>{f.pts>0?`+${f.pts}`:f.pts}</div>))}
            </div>
          ))}
        </div>
      </div>
    </div></div>
  );
}

/* ═══════════════════════════════════════
   RESULT
   ═══════════════════════════════════════ */
function ResultScreen({score,onRestart}){
  const g=score>=250?{t:"신라의 전설",e:"👑",m:"완벽한 모험이었어요!"}:score>=150?{t:"불국사의 수호자",e:"🏯",m:"대단해요!"}:score>=80?{t:"꼬마 탐험가",e:"🧭",m:"잘했어요!"}:{t:"새내기 여행자",e:"🌱",m:"다시 도전해 볼까요?"};
  return(
    <div style={{...S.wrap,justifyContent:"center",minHeight:"100vh"}}><Stars/><div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%",maxWidth:500}}>
      <div style={{fontSize:"5rem",marginBottom:8}}>{g.e}</div>
      <h1 style={{...S.title,fontSize:"clamp(1.6rem,5vw,2.5rem)"}}>{g.t}</h1>
      <div style={{fontSize:"2.5rem",color:C.gold,fontWeight:900,margin:"16px 0"}}>{score}점</div>
      <p style={{fontSize:"1.1rem",color:C.dim,marginBottom:8}}>{g.m}</p>
      <div style={S.card}>
        <h3 style={{fontSize:"1.1rem",marginBottom:12,color:C.gold}}>📚 오늘 배운 것들</h3>
        <div style={{textAlign:"left",fontSize:"0.95rem",lineHeight:1.8,color:C.dim}}>
          <p>🏯 불국사는 751년에 김대성이 짓기 시작했어요</p>
          <p>🗼 석가탑에서 세계 최초 인쇄물이 발견됐어요</p>
          <p>🔭 첨성대는 362개의 돌로 만든 천문대예요</p>
          <p>👑 신라 금관은 나뭇가지와 사슴뿔 모양이에요</p>
          <p>🧘 석굴암은 360개의 돌로 만든 인공 석굴이에요</p>
          <p>⚔️ 김유신 장군은 삼국통일의 영웅이에요</p>
        </div>
      </div>
      <button onClick={onRestart} style={{...S.btn(C.accent,"1.2rem"),marginTop:8}} onMouseOver={e=>{e.target.style.transform="scale(1.05)"}} onMouseOut={e=>{e.target.style.transform="scale(1)"}}>처음으로 🔄</button>
    </div></div>
  );
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */
export default function App(){
  const [screen,setScreen]=useState("menu");
  const [score,setScore]=useState(0);
  const [highScore,setHighScore]=useState(0);
  const [arcadeHigh,setArcadeHigh]=useState(0);

  useEffect(()=>{
    try{
      const h=parseInt(localStorage.getItem("bulguksa_high")||"0",10);
      const a=parseInt(localStorage.getItem("bulguksa_arcade_high")||"0",10);
      if(h)setHighScore(h);
      if(a)setArcadeHigh(a);
    }catch{}
  },[]);
  useEffect(()=>{try{localStorage.setItem("bulguksa_high",String(highScore))}catch{}},[highScore]);
  useEffect(()=>{try{localStorage.setItem("bulguksa_arcade_high",String(arcadeHigh))}catch{}},[arcadeHigh]);

  const start=()=>{setScore(0);setScreen("quiz")};
  const goTo=s=>{setScore(0);setScreen(s)};
  const goHome=()=>setScreen("menu");
  const afterQuiz=()=>setScreen("puzzle");
  const afterPuzzle=()=>setScreen("adventure");
  const afterAdv=()=>{setHighScore(h=>Math.max(h,score));setScreen("result")};

  switch(screen){
    case "menu":return<MainMenu onStart={start} onGoTo={goTo} highScore={highScore} arcadeHigh={arcadeHigh}/>;
    case "quiz":return<QuizGame onComplete={afterQuiz} score={score} setScore={setScore} onHome={goHome}/>;
    case "puzzle":return<PuzzleGame onComplete={afterPuzzle} score={score} setScore={setScore} onHome={goHome}/>;
    case "adventure":return<AdventureGame onComplete={afterAdv} score={score} setScore={setScore} onHome={goHome}/>;
    case "arcade":return<ArcadeGame onHome={goHome} arcadeHigh={arcadeHigh} setArcadeHigh={setArcadeHigh}/>;
    case "result":return<ResultScreen score={score} onRestart={goHome}/>;
    default:return<MainMenu onStart={start} onGoTo={goTo} highScore={highScore} arcadeHigh={arcadeHigh}/>;
  }
}
