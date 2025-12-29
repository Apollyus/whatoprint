# Whatoprint
This is simple app for generating ideas for 3D print projects. I decided to create this project since I have some leftover filament and I want to use it. And I wanted to create something useful not just for me but for others as well. 

I intentionally overengineered this to show my skills, to make it scalable and mainly because I wanted to. 

I have many other features in mind to add in future, but their implementation depends on the demand. 

## Tech Stack
- Next.js
- Tailwind CSS
- TypeScript

## API JSON schema

```json
{
    "name": "Whatoprint",
    "version": "1.0.0",
    "description": "Whatoprint API",
    "author": "https://vojtechfal.cz",
    "payload":{
        "name": "Cable Management Clips",
        "description": "Some description",
        "print_time_hours": 4,
        "print_time_minutes": 0,
        "filament_used_meters": 10,
        "filament_used_meters": 10,
        "labels": {
            "label-1": "Some label", // Difficulty - Easy, Medium, Hard
            "label-2": "Some label", // Material - PLA, ABS, PETG, Nylon
            "label-3": "Some label", // Type - Fun, Useful, etc.
            "label-4": "Some label", // Theme - Cable Management, Electronics, etc.
        },
        "multipart": "false",
        "needs_support": "false",
        "findSTLs": {
            "printables": "https://printables.com",
            "makerworld": "https://makerworld.com",
            "thingiverse": "https://thingiverse.com",
            "cults3d": "https://cults3d.com",
            "yeggi": "https://yeggi.com",
            "google": "https://google.com",
        },
    },
    "time_created": "2025-12-29T16:12:10+01:00",
    "time_updated": "2025-12-29T16:12:10+01:00"
}

Note: Look at the findSTLs object, it contains links to different websites where you can find STL files for the idea. You may be askin why not to generate URLs on frontend. The reason is simple, move the logic to the backend and thus reduce stress on end user's device. I aim to have this app as fast and intuitive as possible. Yes, this app will probasbly never have this much features and complexity to affect performance, but I want to show my skills and make it scalable, haha.