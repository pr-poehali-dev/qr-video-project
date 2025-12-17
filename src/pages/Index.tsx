import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showQR, setShowQR] = useState(false);
  const videoUrl = 'https://your-domain.com/video?code=secret123';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>
      
      <main className="container max-w-5xl mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="text-center space-y-12 animate-fade-in">
          <div className="space-y-8">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl">
                <Icon name="Sparkles" size={64} className="text-white" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Магия
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  в QR-коде
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                ✨ Отсканируй код и откроешь дверь
                <br />
                <span className="text-lg text-pink-600">в мир эксклюзивного контента</span>
              </p>
            </div>
          </div>

          <div className="pt-6 flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => setShowQR(!showQR)}
              size="lg"
              className="px-12 py-7 text-lg font-semibold rounded-full hover:scale-110 transition-all shadow-xl hover:shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700"
            >
              <Icon name={showQR ? "EyeOff" : "Sparkles"} size={24} className="mr-2" />
              {showQR ? '✖ Скрыть код' : '✨ Показать QR-код'}
            </Button>
            <Button
              onClick={() => window.location.href = '/upload'}
              size="lg"
              className="px-12 py-7 text-lg font-semibold rounded-full hover:scale-110 transition-all shadow-xl hover:shadow-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Icon name="Upload" size={24} className="mr-2" />
              🎨 Загрузить файл
            </Button>
          </div>

          {showQR && (
            <div className="pt-12 animate-scale-in">
              <div className="inline-block relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
                <div className="relative bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-4 border-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 rounded-2xl shadow-inner">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(videoUrl)}&bgcolor=ffffff&color=7c3aed`}
                      alt="QR код для доступа"
                      className="w-80 h-80 mx-auto rounded-xl"
                    />
                  </div>
                  <div className="mt-8 space-y-3">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      📱 Наведи камеру
                    </p>
                    <div className="flex items-center justify-center gap-3 text-base text-purple-700 font-medium">
                      <Icon name="Smartphone" size={20} />
                      <span>iOS • Android</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-16">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-10 py-6 rounded-full bg-white/80 backdrop-blur-xl shadow-2xl border-2 border-purple-200">
              <div className="flex items-center gap-3 text-base">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg" />
                <Icon name="Shield" size={22} className="text-purple-600" />
                <span className="font-bold text-purple-900">🔒 Защищено</span>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-purple-300 to-pink-300" />
              <div className="flex items-center gap-3 text-base">
                <Icon name="Zap" size={22} className="text-pink-600" />
                <span className="font-bold text-pink-900">⚡ Мгновенно</span>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-pink-300 to-blue-300" />
              <div className="flex items-center gap-3 text-base">
                <Icon name="Heart" size={22} className="text-blue-600" />
                <span className="font-bold text-blue-900">💎 Эксклюзив</span>
              </div>
            </div>
          </div>

          <div className="pt-12 space-y-4">
            <div className="flex items-center justify-center gap-4">
              {['🎬', '📸', '🎨', '✨'].map((emoji, i) => (
                <div
                  key={i}
                  className="w-16 h-16 flex items-center justify-center text-3xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-purple-700 font-medium">
              Видео • Фото • И всё, что захочешь
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-purple-200/50 bg-white/30 backdrop-blur-xl py-8 mt-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-base font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            ✨ Создано с любовью для особенных моментов ✨
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;
