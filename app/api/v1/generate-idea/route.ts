import { NextResponse } from 'next/server';

const ideas = [
  {
    name: "Cable Management Clips",
    description: "Organize your desk cables with these sleek and functional clips that attach to any surface.",
    print_time_hours: 1,
    print_time_minutes: 30,
    filament_used_meters: 5,
    labels: {
      "label-1": "Easy",
      "label-2": "PLA",
      "label-3": "Useful",
      "label-4": "Cable Management",
    },
    multipart: false,
    needs_support: false,
  },
  {
    name: "Phone Stand",
    description: "A minimalist phone stand perfect for watching videos or video calls. Adjustable angle design.",
    print_time_hours: 3,
    print_time_minutes: 45,
    filament_used_meters: 25,
    labels: {
      "label-1": "Medium",
      "label-2": "PETG",
      "label-3": "Useful",
      "label-4": "Electronics",
    },
    multipart: false,
    needs_support: true,
  },
  {
    name: "Headphone Hook",
    description: "Mount this under your desk to keep your headphones off the surface and always within reach.",
    print_time_hours: 2,
    print_time_minutes: 15,
    filament_used_meters: 18,
    labels: {
      "label-1": "Easy",
      "label-2": "PLA",
      "label-3": "Useful",
      "label-4": "Desk Organization",
    },
    multipart: false,
    needs_support: false,
  },
  {
    name: "Flexi Rex",
    description: "A fun articulated T-Rex that prints in one piece. Great for fidgeting or as a desk toy.",
    print_time_hours: 4,
    print_time_minutes: 0,
    filament_used_meters: 30,
    labels: {
      "label-1": "Medium",
      "label-2": "PLA",
      "label-3": "Fun",
      "label-4": "Toys",
    },
    multipart: false,
    needs_support: false,
  },
  {
    name: "SD Card Holder",
    description: "Keep your SD cards organized and easy to find with this compact desktop holder.",
    print_time_hours: 1,
    print_time_minutes: 45,
    filament_used_meters: 12,
    labels: {
      "label-1": "Easy",
      "label-2": "PLA",
      "label-3": "Useful",
      "label-4": "Electronics",
    },
    multipart: false,
    needs_support: false,
  },
];

function generateSearchUrls(name: string) {
  const query = encodeURIComponent(name);
  return {
    printables: `https://www.printables.com/search/models?q=${query}`,
    makerworld: `https://makerworld.com/en/search/models?keyword=${query}`,
    thingiverse: `https://www.thingiverse.com/search?q=${query}`,
    cults3d: `https://cults3d.com/en/search?q=${query}`,
    yeggi: `https://www.yeggi.com/q/${query}/`,
    google: `https://www.google.com/search?q=${query}+STL+free+download`,
  };
}

export async function GET() {
  const randomIndex = Math.floor(Math.random() * ideas.length);
  const selectedIdea = ideas[randomIndex];
  const now = new Date().toISOString();

  const response = {
    name: "Whatoprint",
    version: "1.0.0",
    description: "Whatoprint API",
    author: "https://vojtechfal.cz",
    payload: {
      ...selectedIdea,
      findSTLs: generateSearchUrls(selectedIdea.name),
    },
    time_created: now,
    time_updated: now,
  };

  return NextResponse.json(response);
}
