/**
 * Apply Page - Multi-step application form for initiatives
 * Features: Progress bar, validation, auto-save, preview
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Check, Rocket, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type InitiativeType = "incubator" | "accelerator" | "hackathon" | "bootcamp" | "geosandbox";

interface FormData {
  initiativeType: InitiativeType | "";
  projectName: string;
  projectDescription: string;
  teamSize: number;
  expectedDuration: string;
}

const STORAGE_KEY = "application_draft";

export default function Apply() {
  const { user, isAuthenticated, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    initiativeType: "",
    projectName: "",
    projectDescription: "",
    teamSize: 1,
    expectedDuration: "",
  });

  const createMutation = trpc.applications.create.useMutation({
    onSuccess: () => {
      toast.success("تم تقديم الطلب بنجاح!");
      localStorage.removeItem(STORAGE_KEY);
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء تقديم الطلب: " + error.message);
    },
  });

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        setFormData(draft);
        toast.info("تم استرجاع المسودة المحفوظة");
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.initiativeType || formData.projectName) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.initiativeType !== "";
      case 2:
        return formData.projectName.length >= 3;
      case 3:
        return formData.projectDescription.length >= 10;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!formData.initiativeType) {
      toast.error("الرجاء اختيار نوع المبادرة");
      return;
    }

    try {
      await createMutation.mutateAsync({
        initiativeType: formData.initiativeType as any,
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        teamSize: formData.teamSize || undefined,
        expectedDuration: formData.expectedDuration || undefined,
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    toast.success("تم حفظ المسودة");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const initiativeLabels: Record<string, string> = {
    incubator: "حاضنة الأعمال",
    accelerator: "مسرعة الأعمال",
    hackathon: "الهاكاثون الجيومكاني",
    bootcamp: "المعسكر التدريبي",
    geosandbox: "البيئة التنظيمية الجيومكانية (GeoSandbox)",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">تقديم طلب انضمام</h1>
            <p className="text-muted-foreground">
              املأ النموذج أدناه للتقديم على إحدى مبادراتنا
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">الخطوة {currentStep} من {totalSteps}</span>
              <Button variant="ghost" size="sm" onClick={saveDraft}>
                <Save className="ml-2 h-4 w-4" />
                حفظ المسودة
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "اختر نوع المبادرة"}
                {currentStep === 2 && "معلومات المشروع"}
                {currentStep === 3 && "تفاصيل إضافية"}
                {currentStep === 4 && "مراجعة وتأكيد"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "حدد المبادرة التي ترغب في الانضمام إليها"}
                {currentStep === 2 && "أخبرنا عن مشروعك"}
                {currentStep === 3 && "معلومات تساعدنا في تقييم طلبك"}
                {currentStep === 4 && "راجع معلوماتك قبل الإرسال"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Initiative Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="initiativeType">نوع المبادرة *</Label>
                  <Select
                    value={formData.initiativeType}
                    onValueChange={(value) => updateField("initiativeType", value)}
                  >
                    <SelectTrigger id="initiativeType">
                      <SelectValue placeholder="اختر المبادرة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incubator">حاضنة الأعمال</SelectItem>
                      <SelectItem value="accelerator">مسرعة الأعمال</SelectItem>
                      <SelectItem value="hackathon">الهاكاثون الجيومكاني</SelectItem>
                      <SelectItem value="bootcamp">المعسكر التدريبي</SelectItem>
                      <SelectItem value="geosandbox">البيئة التنظيمية الجيومكانية (GeoSandbox)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {formData.initiativeType && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">{initiativeLabels[formData.initiativeType]}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formData.initiativeType === "incubator" && "برنامج احتضان شامل لتحويل الأفكار إلى شركات ناشئة ناجحة"}
                        {formData.initiativeType === "accelerator" && "تسريع نمو الشركات الناشئة القائمة وتوسيع نطاقها"}
                        {formData.initiativeType === "hackathon" && "مسابقة تقنية مكثفة لحل تحديات جيومكانية"}
                        {formData.initiativeType === "bootcamp" && "برنامج تدريبي مكثف لتطوير المهارات الجيومكانية"}
                        {formData.initiativeType === "geosandbox" && "بيئة آمنة لاختبار الحلول الجيومكانية المبتكرة"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Project Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">اسم المشروع *</Label>
                    <Input
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) => updateField("projectName", e.target.value)}
                      placeholder="مثال: منصة الخرائط الذكية"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.projectName.length}/100 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="projectDescription">وصف المشروع *</Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => updateField("projectDescription", e.target.value)}
                      placeholder="اشرح فكرة مشروعك والمشكلة التي يحلها..."
                      rows={6}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.projectDescription.length}/1000 حرف (الحد الأدنى: 10)
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teamSize">حجم الفريق</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      min="1"
                      max="50"
                      value={formData.teamSize}
                      onChange={(e) => updateField("teamSize", parseInt(e.target.value) || 1)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      عدد أعضاء الفريق المشاركين في المشروع
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="expectedDuration">المدة المتوقعة</Label>
                    <Select
                      value={formData.expectedDuration}
                      onValueChange={(value) => updateField("expectedDuration", value)}
                    >
                      <SelectTrigger id="expectedDuration" className="mt-2">
                        <SelectValue placeholder="اختر المدة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3 months">1-3 أشهر</SelectItem>
                        <SelectItem value="3-6 months">3-6 أشهر</SelectItem>
                        <SelectItem value="6-12 months">6-12 شهر</SelectItem>
                        <SelectItem value="12+ months">أكثر من 12 شهر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">نوع المبادرة</p>
                      <p className="font-semibold">{formData.initiativeType && initiativeLabels[formData.initiativeType]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">اسم المشروع</p>
                      <p className="font-semibold">{formData.projectName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">وصف المشروع</p>
                      <p className="text-sm">{formData.projectDescription}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">حجم الفريق</p>
                        <p className="font-semibold">{formData.teamSize} {formData.teamSize === 1 ? 'عضو' : 'أعضاء'}</p>
                      </div>
                      {formData.expectedDuration && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">المدة المتوقعة</p>
                          <p className="font-semibold">{formData.expectedDuration}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm">
                      <strong>ملاحظة:</strong> بعد تقديم الطلب، سيتم مراجعته من قبل فريقنا وسنتواصل معك خلال 5-7 أيام عمل.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  السابق
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!canProceed()}
                  >
                    التالي
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending || !canProceed()}
                  >
                    {createMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Rocket className="ml-2 h-4 w-4" />
                        تقديم الطلب
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
