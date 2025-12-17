import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Video = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const code = searchParams.get('code');

  useEffect(() => {
    const checkAuth = async () => {
      if (code === 'secret123') {
        setIsAuthorized(true);
        
        try {
          const response = await fetch('https://functions.poehali.dev/e447398d-5aad-4491-a7ef-d37946d4c231');
          const data = await response.json();
          
          if (data.url) {
            setVideoUrl(data.url);
          } else {
            toast({
              title: 'Видео не найдено',
              description: 'Сначала загрузите видео через /upload',
              variant: 'destructive',
            });
          }
        } catch (error) {
          console.error('Error loading video:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };
    
    checkAuth();
  }, [code, navigate, toast]);

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
          {loading ? (
            <div className="text-center py-20">
              <Icon name="Loader2" size={48} className="mx-auto mb-4 text-black/20 animate-spin" />
              <p className="text-muted-foreground">Загрузка видео...</p>
            </div>
          ) : videoUrl ? (
            <>
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  <source
                    src={videoUrl}
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
            </>
          ) : (
            <div className="text-center py-20">
              <Icon name="Video" size={48} className="mx-auto mb-4 text-black/20" />
              <p className="text-muted-foreground mb-4">Видео ещё не загружено</p>
              <button
                onClick={() => navigate('/upload')}
                className="text-sm text-foreground hover:underline"
              >
                Загрузить видео
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Video;