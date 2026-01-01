/**
 * Enhanced ProjectsMap Component
 * Interactive Google Maps with filters, clustering, and heatmap visualization
 */

import { useEffect, useRef, useState } from 'react';
import { MapView } from './Map';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Building2, Calendar, Filter, Layers, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
    description: 'أنظمة ملاحة متقدمة للصحراء',
    logo: '🧭'
  },
  {
    id: 6,
    name: 'Coastal Mapping',
    founder: 'ليلى القحطاني',
    program: 'GeoSandbox',
    year: '2023',
    location: {
      lat: 16.9031,
      lng: 42.5531,
      address: 'مركز الأبحاث البحرية',
      city: 'جازان'
    },
    description: 'رسم خرائط السواحل والموارد البحرية',
    logo: '🌊'
  },
];

export default function ProjectsMapEnhanced() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const markerClustererRef = useRef<any>(null);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterProgram, setFilterProgram] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showClusters, setShowClusters] = useState(true);

  // Get unique values for filters
  const programs = ['all', ...Array.from(new Set(projects.map(p => p.program)))];
  const years = ['all', ...Array.from(new Set(projects.map(p => p.year)))];
  const cities = ['all', ...Array.from(new Set(projects.map(p => p.location.city)))];

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    if (filterProgram !== 'all' && project.program !== filterProgram) return false;
    if (filterYear !== 'all' && project.year !== filterYear) return false;
    if (filterCity !== 'all' && project.location.city !== filterCity) return false;
    return true;
  });

  const handleMapReady = async (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Load marker clustering library
    const { MarkerClusterer } = await google.maps.importLibrary("markerClustering") as any;
    
    // Create markers for all projects
    await createMarkers(map, filteredProjects, MarkerClusterer);
    
    // Create heatmap layer
    createHeatmap(map, projects);
    
    // Fit bounds to show all markers
    fitBounds(map, filteredProjects);
  };

  const createMarkers = async (
    map: google.maps.Map,
    projectsToShow: Project[],
    MarkerClusterer: any
  ) => {
    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.map = null;
    });
    markersRef.current = [];
    
    // Clear existing clusterer
    if (markerClustererRef.current) {
      markerClustererRef.current.clearMarkers();
    }

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    
    // Create new markers
    const newMarkers = projectsToShow.map(project => {
      // Create custom marker content
      const content = document.createElement('div');
      content.className = 'custom-marker';
      content.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          cursor: pointer;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <span>${project.logo}</span>
          <span style="font-size: 12px;">${project.location.city}</span>
        </div>
      `;

      const marker = new AdvancedMarkerElement({
        map: showClusters ? null : map,
        position: project.location,
        content,
        title: project.name,
      });

      // Add click listener
      marker.addListener('click', () => {
        setSelectedProject(project);
        map.panTo(project.location);
        map.setZoom(12);
      });

      return marker;
    });

    markersRef.current = newMarkers;

    // Create marker clusterer if enabled
    if (showClusters && newMarkers.length > 0) {
      markerClustererRef.current = new MarkerClusterer({
        map,
        markers: newMarkers,
        algorithm: new (google.maps as any).markerClusterer.SuperClusterAlgorithm({}),
      });
    }
  };

  const createHeatmap = (map: google.maps.Map, projectsData: Project[]) => {
    // Create heatmap data
    const heatmapData = projectsData.map(project => ({
      location: new google.maps.LatLng(project.location.lat, project.location.lng),
      weight: 1,
    }));

    // Create heatmap layer
    heatmapRef.current = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: showHeatmap ? map : null,
      radius: 50,
      opacity: 0.6,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ],
    });
  };

  const fitBounds = (map: google.maps.Map, projectsToShow: Project[]) => {
    if (projectsToShow.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    projectsToShow.forEach(project => {
      bounds.extend(project.location);
    });
    map.fitBounds(bounds);
  };

  // Update markers when filters change
  useEffect(() => {
    if (mapRef.current) {
      const updateMap = async () => {
        const { MarkerClusterer } = await google.maps.importLibrary("markerClustering") as any;
        await createMarkers(mapRef.current!, filteredProjects, MarkerClusterer);
        fitBounds(mapRef.current!, filteredProjects);
      };
      updateMap();
    }
  }, [filterProgram, filterYear, filterCity, showClusters]);

  // Toggle heatmap
  useEffect(() => {
    if (heatmapRef.current && mapRef.current) {
      heatmapRef.current.setMap(showHeatmap ? mapRef.current : null);
    }
  }, [showHeatmap]);

  const resetFilters = () => {
    setFilterProgram('all');
    setFilterYear('all');
    setFilterCity('all');
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            فلاتر الخريطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {/* Program Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">البرنامج</label>
              <Select value={filterProgram} onValueChange={setFilterProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البرنامج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  {programs.slice(1).map(program => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">السنة</label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  {years.slice(1).map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">المدينة</label>
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  {cities.slice(1).map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <Button onClick={resetFilters} variant="outline" className="w-full">
                إعادة تعيين
              </Button>
            </div>
          </div>

          {/* Visualization Options */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={showHeatmap ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <Layers className="w-4 h-4 ml-2" />
              {showHeatmap ? 'إخفاء' : 'عرض'} الخريطة الحرارية
            </Button>
            <Button
              variant={showClusters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowClusters(!showClusters)}
            >
              <TrendingUp className="w-4 h-4 ml-2" />
              {showClusters ? 'إخفاء' : 'عرض'} التجميع
            </Button>
            <Badge variant="secondary" className="py-2 px-4">
              {filteredProjects.length} مشروع
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <div className="relative">
        <MapView
          onMapReady={handleMapReady}
          className="w-full h-[600px] rounded-lg overflow-hidden border border-border"
        />

        {/* Selected Project Info */}
        {selectedProject && (
          <Card className="absolute top-4 left-4 w-80 border-border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedProject.logo}</span>
                  <div>
                    <h3 className="font-bold text-lg">{selectedProject.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProject.founder}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </Button>
              </div>
              <p className="text-sm mb-3">{selectedProject.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-accent" />
                  <span>{selectedProject.program}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{selectedProject.year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{selectedProject.location.address}, {selectedProject.location.city}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">{filteredProjects.length}</div>
              <p className="text-sm text-muted-foreground">مشروع ناجح</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {Array.from(new Set(filteredProjects.map(p => p.location.city))).length}
              </div>
              <p className="text-sm text-muted-foreground">مدينة</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">
                {Array.from(new Set(filteredProjects.map(p => p.program))).length}
              </div>
              <p className="text-sm text-muted-foreground">برنامج</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
