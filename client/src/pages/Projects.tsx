/**
 * Projects Kanban Board
 * Features: Drag-and-drop project tracking with stages
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Calendar, User, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Projects() {
  const { user, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });

  const { data: projects = [], refetch } = trpc.projects.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateStageMutation = trpc.projects.updateStage.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث مرحلة المشروع");
      refetch();
    },
    onError: (error) => {
      toast.error("فشل تحديث المشروع: " + error.message);
    },
  });

  const stages = [
    { id: "idea", label: "فكرة", color: "bg-blue-500" },
    { id: "development", label: "تطوير", color: "bg-yellow-500" },
    { id: "testing", label: "اختبار", color: "bg-purple-500" },
    { id: "launch", label: "إطلاق", color: "bg-green-500" },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      low: { label: "منخفضة", variant: "secondary" },
      medium: { label: "متوسطة", variant: "default" },
      high: { label: "عالية", variant: "destructive" },
    };
    return variants[priority] || variants.medium;
  };

  const getProjectsByStage = (stageId: string) => {
    return projects.filter((project: any) => project.stage === stageId);
  };

  const handleStageChange = (projectId: number, newStage: 'idea' | 'development' | 'testing' | 'launch') => {
    updateStageMutation.mutate({ projectId, stage: newStage });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">متابعة المشاريع</h1>
              <p className="text-muted-foreground">
                تتبع تقدم مشاريعك عبر مراحل التطوير المختلفة
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              مشروع جديد
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => {
            const stageProjects = getProjectsByStage(stage.id);
            
            return (
              <div key={stage.id} className="flex flex-col">
                {/* Stage Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-semibold text-lg">{stage.label}</h3>
                    <Badge variant="secondary" className="mr-auto">
                      {stageProjects.length}
                    </Badge>
                  </div>
                  <div className="h-1 bg-muted rounded-full">
                    <div className={`h-full ${stage.color} rounded-full`} style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Project Cards */}
                <div className="flex-1 space-y-3">
                  {stageProjects.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="p-6 text-center text-sm text-muted-foreground">
                        لا توجد مشاريع في هذه المرحلة
                      </CardContent>
                    </Card>
                  ) : (
                    stageProjects.map((project: any) => (
                      <Card key={project.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <Badge {...getPriorityBadge(project.priority)}>
                              {getPriorityBadge(project.priority).label}
                            </Badge>
                          </div>
                          {project.description && (
                            <CardDescription className="text-sm line-clamp-2">
                              {project.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {/* Progress */}
                          {project.progress !== null && (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">التقدم</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          )}

                          {/* Due Date */}
                          {project.dueDate && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.dueDate).toLocaleDateString('ar-SA')}
                            </div>
                          )}

                          {/* Tags */}
                          {project.tags && (
                            <div className="flex flex-wrap gap-1">
                              {JSON.parse(project.tags).map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Stage Actions */}
                          <div className="flex gap-2 pt-2">
                            {stage.id !== "idea" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="flex-1 text-xs"
                                onClick={() => {
                                  const currentIndex = stages.findIndex(s => s.id === stage.id);
                                  if (currentIndex > 0) {
                                    handleStageChange(project.id, stages[currentIndex - 1].id as 'idea' | 'development' | 'testing' | 'launch');
                                  }
                                }}
                              >
                                ←
                              </Button>
                            )}
                            {stage.id !== "launch" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="flex-1 text-xs"
                                onClick={() => {
                                  const currentIndex = stages.findIndex(s => s.id === stage.id);
                                  if (currentIndex < stages.length - 1) {
                                    handleStageChange(project.id, stages[currentIndex + 1].id as 'idea' | 'development' | 'testing' | 'launch');
                                  }
                                }}
                              >
                                →
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد التطوير</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p: any) => p.stage === 'development').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تم الإطلاق</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p: any) => p.stage === 'launch').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
