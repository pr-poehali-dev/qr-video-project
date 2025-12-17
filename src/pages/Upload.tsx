import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isVideo && !isImage) {
      toast({
        title: 'Ошибка',
        description: 'Выберите видео или изображение',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 50;
          setProgress(percentComplete);
        }
      };

      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const base64Data = base64.split(',')[1];

        setProgress(50);

        const response = await fetch('https://functions.poehali.dev/e447398d-5aad-4491-a7ef-d37946d4c231', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            video: base64Data,
            filename: file.name,
          }),
        });

        setProgress(100);

        if (response.ok) {
          const data = await response.json();
          toast({
            title: 'Успешно!',
            description: data.type === 'image' ? 'Изображение загружено' : 'Видео загружено',
          });
          
          setTimeout(() => {
            navigate('/video?code=secret123');
          }, 1000);
        } else {
          throw new Error('Upload failed');
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файл',
        variant: 'destructive',
      });
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10 py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-medium">Загрузка медиа</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="Home" size={20} />
            Главная
          </button>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/5 mb-4">
              <Icon name="Upload" size={40} className="text-black/60" />
            </div>
            
            <h2 className="text-3xl font-light">
              Загрузите <span className="font-medium">видео или фото</span>
            </h2>
            
            <p className="text-muted-foreground">
              Новый файл заменит предыдущий. QR-код останется прежним.
            </p>
          </div>

          {!uploading ? (
            <div className="pt-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="px-8 py-6 text-base font-normal rounded-full hover:scale-105 transition-transform"
              >
                <Icon name="Upload" size={20} className="mr-2" />
                Выбрать файл
              </Button>
            </div>
          ) : (
            <div className="pt-8 space-y-4">
              <div className="w-full max-w-md mx-auto">
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Загрузка... {Math.round(progress)}%
              </p>
            </div>
          )}

          <div className="pt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Безопасное хранение в облаке</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;