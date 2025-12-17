import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showQR, setShowQR] = useState(false);
  const videoUrl = 'https://your-domain.com/video?code=secret123';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02),transparent_50%)]" />
      
      <main className="container max-w-5xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center space-y-16 animate-fade-in">
          <div className="space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-black/5 rounded-full blur-2xl animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-black/10 to-black/5 backdrop-blur-sm border border-black/10">
                <Icon name="Scan" size={56} className="text-black/70" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-tight">
                Отсканируй
                <br />
                <span className="font-semibold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  и увидишь
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Эксклюзивный контент скрыт за QR-кодом.
                <br />
                <span className="text-lg opacity-80">Только для избранных.</span>
              </p>
            </div>
          </div>

          <div className="pt-4 flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => setShowQR(!showQR)}
              size="lg"
              className="px-10 py-7 text-lg font-normal rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-2xl bg-black hover:bg-black/90"
            >
              <Icon name={showQR ? "EyeOff" : "Eye"} size={22} className="mr-2" />
              {showQR ? 'Скрыть код' : 'Показать QR-код'}
            </Button>
            <Button
              onClick={() => window.location.href = '/upload'}
              size="lg"
              variant="outline"
              className="px-10 py-7 text-lg font-normal rounded-full hover:scale-105 transition-all border-2 border-black/20 hover:border-black/40 hover:bg-black/5"
            >
              <Icon name="Upload" size={22} className="mr-2" />
              Загрузить файл
            </Button>
          </div>

          {showQR && (
            <div className="pt-12 animate-scale-in">
              <div className="inline-block relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-black/10 via-black/5 to-black/10 rounded-3xl blur-xl" />
                <div className="relative bg-white p-10 rounded-3xl shadow-2xl border-2 border-black/10">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(videoUrl)}&bgcolor=ffffff&color=000000`}
                      alt="QR код для доступа"
                      className="w-72 h-72 mx-auto"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="text-base font-medium">
                      Наведи камеру телефона
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Smartphone" size={16} />
                      <span>iOS / Android</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-16">
            <div className="inline-flex items-center justify-center gap-8 px-8 py-4 rounded-full bg-black/5 backdrop-blur-sm border border-black/10">
              <div className="flex items-center gap-2.5 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <Icon name="Lock" size={18} className="text-black/60" />
                <span className="font-medium">Защищено</span>
              </div>
              <div className="w-px h-6 bg-black/10" />
              <div className="flex items-center gap-2.5 text-sm">
                <Icon name="Zap" size={18} className="text-black/60" />
                <span className="font-medium">Моментальный доступ</span>
              </div>
              <div className="w-px h-6 bg-black/10" />
              <div className="flex items-center gap-2.5 text-sm">
                <Icon name="Sparkles" size={18} className="text-black/60" />
                <span className="font-medium">Уникально</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-black/10 py-10 mt-20 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-light">
            Создано для тех, кто ценит эксклюзивность
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
