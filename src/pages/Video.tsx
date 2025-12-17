import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Video = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code === 'secret123') {
      setIsAuthorized(true);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [code, navigate]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <Icon name="Lock" size={64} className="mx-auto mb-6 text-black/20" />
          <h1 className="text-2xl font-light mb-2">Доступ запрещён</h1>
          <p className="text-muted-foreground">Перенаправление...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-black/10 py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-medium">Эксклюзивное видео</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="Home" size={20} />
            Главная
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video
              controls
              autoPlay
              className="w-full h-full"
              poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Это видео доступно только по QR-коду
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Video;
