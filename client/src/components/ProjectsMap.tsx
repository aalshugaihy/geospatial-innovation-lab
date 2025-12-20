/**
 * ProjectsMap Component
 * Interactive Google Maps visualization of successful projects
 */

import { useEffect, useRef, useState } from 'react';
import { MapView } from './Map';
import { Card, CardContent } from './ui/card';
import { MapPin, Building2, Calendar } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  founder: string;
  program: string;
  year: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  description: string;
  logo: string;
}

// Sample project locations across Saudi Arabia
const projects: Project[] = [
  {
    id: 1,
    name: 'GeoTech Solutions',
    founder: 'أحمد السعيد',
    program: 'حاضنة الأعمال',
    year: '2023',
    location: {
      lat: 24.7136,
      lng: 46.6753,
      address: 'مقر الهيئة العامة للمساحة',
      city: 'الرياض'
    },
    description: 'منصة ذكية لإدارة البنية التحتية',
    logo: '🗺️'
  },
  {
    id: 2,
    name: 'SkyMap Services',
    founder: 'نورة المطيري',
    program: 'GeoSandbox',
    year: '2024',
    location: {
      lat: 21.3891,
      lng: 39.8579,
      address: 'مركز الابتكار',
      city: 'مكة المكرمة'
    },
    description: 'خدمات مسح جوي متقدمة',
    logo: '🚁'
  },
  {
    id: 3,
    name: 'AgriGeo Analytics',
    founder: 'خالد الدوسري',
    program: 'مسرعة الأعمال',
    year: '2023',
    location: {
      lat: 26.4367,
      lng: 50.1039,
      address: 'مجمع التقنية الزراعية',
      city: 'الدمام'
    },
    description: 'حلول تحليلية للزراعة الذكية',
    logo: '🌾'
  },
  {
    id: 4,
    name: 'Urban Intelligence',
    founder: 'سارة العتيبي',
    program: 'حاضنة الأعمال',
    year: '2024',
    location: {
      lat: 21.4858,
      lng: 39.1925,
      address: 'مركز المدن الذكية',
      city: 'جدة'
    },
    description: 'منصة تحليلات ذكية للمدن',
    logo: '🏙️'
  },
  {
    id: 5,
    name: 'Desert Navigation',
    founder: 'فهد الشمري',
    program: 'مسرعة الأعمال',
    year: '2024',
    location: {
      lat: 27.5114,
      lng: 41.7208,
      address: 'مركز التقنية',
      city: 'حائل'
    },
    description: 'أنظمة ملاحة متقدمة للمناطق الصحراوية',
    logo: '🧭'
  },
  {
    id: 6,
    name: 'Coastal Mapping',
    founder: 'ليلى القحطاني',
    program: 'GeoSandbox',
    year: '2023',
    location: {
      lat: 18.2164,
      lng: 42.5053,
      address: 'مركز البحوث البحرية',
      city: 'جازان'
    },
    description: 'رسم خرائط السواحل والموارد البحرية',
    logo: '🌊'
  }
];

export default function ProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    
    // Create info window
    infoWindowRef.current = new google.maps.InfoWindow();
    
    // Add markers for each project
    projects.forEach((project) => {
      const marker = new google.maps.Marker({
        position: { lat: project.location.lat, lng: project.location.lng },
        map: map,
        title: project.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#46C18F',
          fillOpacity: 1,
          strokeColor: '#002937',
          strokeWeight: 3,
        },
        animation: google.maps.Animation.DROP,
      });

      // Add click listener
      marker.addListener('click', () => {
        setSelectedProject(project);
        
        // Create info window content
        const content = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; padding: 10px; max-width: 300px;">
            <div style="font-size: 24px; margin-bottom: 8px;">${project.logo}</div>
            <h3 style="margin: 0 0 8px 0; color: #002937; font-size: 18px; font-weight: bold;">${project.name}</h3>
            <p style="margin: 0 0 6px 0; color: #46C18F; font-size: 14px; font-weight: 600;">${project.program}</p>
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">${project.description}</p>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 10px;">
              <p style="margin: 0 0 4px 0; color: #374151; font-size: 13px;">
                <strong>المؤسس:</strong> ${project.founder}
              </p>
              <p style="margin: 0 0 4px 0; color: #374151; font-size: 13px;">
                <strong>المدينة:</strong> ${project.location.city}
              </p>
              <p style="margin: 0; color: #374151; font-size: 13px;">
                <strong>السنة:</strong> ${project.year}
              </p>
            </div>
          </div>
        `;
        
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(map, marker);
        }
        
        // Smooth pan to marker
        map.panTo(marker.getPosition()!);
        map.setZoom(10);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    const bounds = new google.maps.LatLngBounds();
    projects.forEach((project) => {
      bounds.extend({ lat: project.location.lat, lng: project.location.lng });
    });
    map.fitBounds(bounds);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    
    if (mapRef.current) {
      const position = { lat: project.location.lat, lng: project.location.lng };
      mapRef.current.panTo(position);
      mapRef.current.setZoom(12);
      
      // Trigger marker click
      const marker = markersRef.current.find(
        (m) => m.getPosition()?.lat() === project.location.lat
      );
      if (marker) {
        google.maps.event.trigger(marker, 'click');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Map Container */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[600px] w-full">
            <MapView
              onMapReady={handleMapReady}
              initialCenter={{ lat: 24.7136, lng: 46.6753 }}
              initialZoom={6}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">
            <span className="text-accent">المشاريع</span> على الخريطة
          </h3>
          <p className="text-muted-foreground">
            انقر على أي مشروع لعرض موقعه على الخريطة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedProject?.id === project.id
                  ? 'border-accent shadow-lg'
                  : 'border-border hover:border-accent/50'
              }`}
              onClick={() => handleProjectClick(project)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{project.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{project.name}</h4>
                    <p className="text-sm text-accent font-semibold mb-2">
                      {project.program}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3" />
                        <span>{project.founder}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {projects.length}
            </div>
            <p className="text-muted-foreground">مشروع ناجح</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {new Set(projects.map(p => p.location.city)).size}
            </div>
            <p className="text-muted-foreground">مدينة</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {new Set(projects.map(p => p.program)).size}
            </div>
            <p className="text-muted-foreground">برنامج</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
