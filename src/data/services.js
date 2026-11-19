// Shared by the Home page service cards, the Services page service list (anchor targets),
// and the Contact form's "Service Required" dropdown, so the three can never drift apart.
// `anchor` must stay unique: Home links to /services#<anchor>.

export const SERVICES = [
  { icon: "fa-computer", title: "Network Office IT Setup", description: "Reliable IT infrastructure solutions for modern businesses.", includes: ["LAN & WiFi Setup", "Router Configuration", "Workstation Deployment", "Network Security"], anchor: "network-office-it-setup" },
  { icon: "fa-video", title: "CCTV Installation", description: "Professional surveillance systems for complete business security.", includes: ["IP & HD Cameras", "NVR/DVR Systems", "Remote Monitoring", "AMC Support"], anchor: "cctv-installation" },
  { icon: "fa-screwdriver-wrench", title: "IT Annual Maintenance", description: "Proactive maintenance to keep your systems running smoothly.", includes: ["Preventive Maintenance", "Software Updates", "Hardware Support", "Priority Assistance"], anchor: "it-annual-maintenance" },
  { icon: "fa-server", title: "Server Virtualization", description: "Optimize performance and reduce infrastructure costs.", includes: ["VMware Solutions", "Hyper-V Deployment", "Resource Optimization", "Backup & Recovery"], anchor: "server-virtualization" },
  { icon: "fa-network-wired", title: "Structured Cabling", description: "Organized cabling systems for reliable connectivity.", includes: ["Cat6 & Cat6A Cabling", "Fiber Optic Solutions", "Patch Panel Setup", "Network Testing"], anchor: "structured-cabling" },
  { icon: "fa-phone-volume", title: "Telephone Solutions", description: "Modern communication systems for growing businesses.", includes: ["IP PBX Systems", "VoIP Solutions", "Call Management", "Remote Extensions"], anchor: "telephone-solutions" },
  { icon: "fa-lightbulb", title: "Technology Consultation", description: "Expert guidance for selecting the right technology solutions.", includes: ["Product Recommendations", "Solution Planning", "Vendor Coordination", "Technical Consultation"], anchor: "technology-consultation" },
  { icon: "fa-laptop", title: "IT Hardware Services", description: "Supply, installation, and support for essential IT equipment.", includes: ["Desktop & Laptop Setup", "Server Installation", "Network Equipment", "Hardware Troubleshooting"], anchor: "it-hardware-services" },
];
