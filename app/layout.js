export const metadata = {
  title: '불국사 대모험 🏯',
  description: '신라 시대로 떠나는 신비한 여행! 퀴즈, 퍼즐, 어드벤처가 결합된 교육용 게임',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet" />
        <style>{`
          * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
          body { margin: 0; padding: 0; overflow-x: hidden; }
          @keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }
          @keyframes floatUp { from { opacity: 1; transform: translate(-50%, -50%); } to { opacity: 0; transform: translate(-50%, -120%); } }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
