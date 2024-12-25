import React, { useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Camera, Loader2, XCircle } from 'lucide-react';
import { useDiaries } from '../../hooks/useDiaries';
import { supabase } from '../../lib/supabase';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  catId: string;
}

export function DiaryModal({ isOpen, onClose, catId }: DiaryModalProps) {
  const { addDiary } = useDiaries(catId);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePhotoUpload = useCallback(async (files: FileList) => {
    setIsUploading(true);
    setUploadError(null);
    
    try {
      const newPhotos = await Promise.all(
        Array.from(files).map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${catId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('diary-photos')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('diary-photos')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      setUploadedPhotos(prev => [...prev, ...newPhotos]);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setUploadError('写真のアップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  }, [catId]);

  const removePhoto = useCallback(async (photoUrl: string) => {
    try {
      const path = photoUrl.split('/').pop();
      if (!path) return;

      await supabase.storage
        .from('diary-photos')
        .remove([`${catId}/${path}`]);

      setUploadedPhotos(prev => prev.filter(url => url !== photoUrl));
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  }, [catId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !content) return;

    try {
      setIsSubmitting(true);
      await addDiary({
        cat_id: catId,
        date,
        content,
        photos: uploadedPhotos
      });
      onClose();
    } catch (error) {
      console.error('Error adding diary:', error);
      // TODO: エラー処理を追加
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">
              日記を記録
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                内容
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="今日の様子を記録しましょう..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                写真
              </label>
              <div className="mt-1">
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Camera className="w-5 h-5 mr-2" />
                  写真を選択
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
                    disabled={isUploading}
                  />
                </label>
                {isUploading && (
                  <div className="ml-3 inline-flex items-center text-sm text-gray-600">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    アップロード中...
                  </div>
                )}
                {uploadError && (
                  <p className="mt-2 text-sm text-red-600">{uploadError}</p>
                )}
              </div>

              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt=""
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    保存中...
                  </span>
                ) : (
                  '保存'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}