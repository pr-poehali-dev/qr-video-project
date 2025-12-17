import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showQR, setShowQR] = useState(false);
  const videoUrl = `${window.location.origin}/video?code=secret123`;

  return (
    <div className="min-h-screen bg-white">
      <main className="container max-w-4xl mx-auto px-4 py-20">
        <div className="text-center space-y-12 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/5 mb-6">
              <Icon name="Video" size={40} className="text-black/60" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Эксклюзивное
              <br />
              <span className="font-medium">видео</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto font-light">
              Доступ к видео возможен только через QR-код.
              <br />
              Отсканируйте код, чтобы посмотреть.
            </p>
          </div>

          <div className="pt-8">
            <Button
              onClick={() => setShowQR(!showQR)}
              size="lg"
              className="px-8 py-6 text-base font-normal rounded-full hover:scale-105 transition-transform"
            >
              {showQR ? 'Скрыть QR-код' : 'Показать QR-код'}
            </Button>
          </div>

          {showQR && (
            <div className="pt-8 animate-scale-in">
              <div className="inline-block bg-white p-8 rounded-2xl shadow-2xl border border-black/5">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(videoUrl)}&bgcolor=ffffff&color=000000`}
                    alt="QR код для доступа к видео"
                    className="w-64 h-64 mx-auto"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground font-light">
                  Отсканируйте камерой телефона
                </p>
              </div>
            </div>
          )}

          <div className="pt-12 space-y-3">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={16} />
                <span className="text-sm font-light">Защищённый доступ</span>
              </div>
              <span className="text-black/20">•</span>
              <div className="flex items-center gap-2">
                <Icon name="Smartphone" size={16} />
                <span className="text-sm font-light">Только по QR</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/10 py-8 mt-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-light">
            Минималистичный видео-портал
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
