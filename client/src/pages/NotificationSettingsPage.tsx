/**
 * Notification Settings Page
 * Full page for managing notification preferences
 */

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationSettings from '@/components/NotificationSettings';

export default function NotificationSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              إعدادات <span className="text-accent">الإشعارات</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              تحكم في الإشعارات التي تريد استقبالها
            </p>
          </div>

          <NotificationSettings />
        </div>
      </main>

      <Footer />
    </div>
  );
}
