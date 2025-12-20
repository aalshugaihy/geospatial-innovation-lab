/**
 * Upload Resource Page - Admin only
 * Features: File upload with preview, S3 storage, metadata input
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, FileText, Video, Link as LinkIcon, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function UploadResource() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resourceType: "document" as "document" | "video" | "link",
    category: "geospatial" as "geospatial" | "business" | "technical" | "legal" | "marketing",
    url: "",
    fileUrl: "",
    thumbnailUrl: "",
    tags: "",
  });

  const createResourceMutation = trpc.resources.create.useMutation({
    onSuccess: () => {
      toast.success("تم رفع المورد بنجاح!");
      setLocation("/resources");
    },
    onError: (error) => {
      toast.error("فشل رفع المورد: " + error.message);
    },
  });

  const uploadMutation = trpc.resources.upload.useMutation({
    onSuccess: (data) => {
      setFormData({ ...formData, fileUrl: data.url });
      setUploading(false);
      toast.success("تم رفع الملف بنجاح!");
    },
    onError: (error) => {
      setUploading(false);
      toast.error("فشل رفع الملف: " + error.message);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = {
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      video: ['video/mp4', 'video/webm', 'video/ogg'],
    };

    if (formData.resourceType === 'document' && !validTypes.document.includes(file.type)) {
      toast.error("نوع الملف غير مدعوم. يرجى رفع ملف PDF أو Word.");
      return;
    }

    if (formData.resourceType === 'video' && !validTypes.video.includes(file.type)) {
      toast.error("نوع الفيديو غير مدعوم. يرجى رفع MP4 أو WebM.");
      return;
    }

    // Validate file size (max 50MB for documents, 100MB for videos)
    const maxSize = formData.resourceType === 'document' ? 50 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`حجم الملف كبير جداً. الحد الأقصى ${maxSize / (1024 * 1024)} ميجابايت.`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to S3 via tRPC
    setUploading(true);
    const dataReader = new FileReader();
    dataReader.onloadend = () => {
      uploadMutation.mutate({
        fileData: dataReader.result as string,
        fileName: file.name,
        resourceType: formData.resourceType as 'document' | 'video',
      });
    };
    dataReader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (formData.resourceType === 'link' && !formData.url) {
      toast.error("يرجى إدخال رابط المورد");
      return;
    }

    if (formData.resourceType !== 'link' && !formData.fileUrl) {
      toast.error("يرجى رفع الملف أولاً");
      return;
    }

    createResourceMutation.mutate({
      title: formData.title,
      description: formData.description,
      resourceType: formData.resourceType,
      category: formData.category,
      url: formData.resourceType === 'link' ? formData.url : formData.fileUrl,
      fileUrl: formData.fileUrl || undefined,
      thumbnailUrl: formData.thumbnailUrl || undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-16 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>غير مصرح</CardTitle>
              <CardDescription>
                هذه الصفحة متاحة فقط للمسؤولين
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">رفع مورد جديد</h1>
          <p className="text-muted-foreground">
            إضافة مورد تعليمي جديد إلى المكتبة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المورد</CardTitle>
                <CardDescription>أدخل تفاصيل المورد الذي تريد رفعه</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان المورد *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="مثال: دليل البيانات الجيومكانية المفتوحة"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">الوصف *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="وصف تفصيلي للمورد ومحتواه..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resourceType">نوع المورد *</Label>
                      <Select
                        value={formData.resourceType}
                        onValueChange={(value: any) => setFormData({ ...formData, resourceType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">مستند (PDF/Word)</SelectItem>
                          <SelectItem value="video">فيديو</SelectItem>
                          <SelectItem value="link">رابط خارجي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="geospatial">جيومكاني</SelectItem>
                          <SelectItem value="business">أعمال</SelectItem>
                          <SelectItem value="technical">تقني</SelectItem>
                          <SelectItem value="legal">قانوني</SelectItem>
                          <SelectItem value="marketing">تسويق</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.resourceType === 'link' ? (
                    <div className="space-y-2">
                      <Label htmlFor="url">رابط المورد *</Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://example.com/resource"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="file">رفع الملف *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        {uploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">جاري رفع الملف...</p>
                          </div>
                        ) : formData.fileUrl ? (
                          <div className="flex flex-col items-center gap-2">
                            {formData.resourceType === 'document' ? (
                              <FileText className="h-12 w-12 text-primary" />
                            ) : (
                              <Video className="h-12 w-12 text-primary" />
                            )}
                            <p className="text-sm font-medium">تم رفع الملف بنجاح</p>
                            <p className="text-xs text-muted-foreground">{formData.fileUrl}</p>
                          </div>
                        ) : (
                          <label htmlFor="file" className="cursor-pointer">
                            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">اضغط لرفع الملف</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formData.resourceType === 'document' ? 'PDF أو Word (حتى 50 ميجابايت)' : 'MP4 أو WebM (حتى 50 ميجابايت)'}
                            </p>
                            <Input
                              id="file"
                              type="file"
                              className="hidden"
                              accept={formData.resourceType === 'document' ? '.pdf,.doc,.docx' : '.mp4,.webm,.ogg'}
                              onChange={handleFileChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="tags">الكلمات المفتاحية (اختياري)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="GIS, خرائط, بيانات مفتوحة (افصل بفاصلة)"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={createResourceMutation.isPending || uploading}
                    >
                      {createResourceMutation.isPending ? (
                        <>
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          جاري النشر...
                        </>
                      ) : (
                        'نشر المورد'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/resources")}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>معاينة</CardTitle>
                <CardDescription>كيف سيظهر المورد للمستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    {formData.resourceType === 'document' && <FileText className="h-16 w-16 text-muted-foreground" />}
                    {formData.resourceType === 'video' && <Video className="h-16 w-16 text-muted-foreground" />}
                    {formData.resourceType === 'link' && <LinkIcon className="h-16 w-16 text-muted-foreground" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {formData.title || "عنوان المورد"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.description || "وصف المورد سيظهر هنا..."}
                    </p>
                  </div>
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
