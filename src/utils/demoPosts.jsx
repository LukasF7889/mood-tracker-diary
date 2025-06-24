// import { useLocalStorageContext } from "../context/LocalStorageContext";

export function demoPosts(num, saveEntry) {
  const now = new Date();
  const posts = [
    {
      id: "1",
      title: "A Quiet Start",
      content:
        "Sat with coffee in hand, watching the morning light filter through the blinds. Felt calm, almost hopeful.",
      categories: [
        { value: "selfcare", label: "Selfcare" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood4",
      createdAt: "2025-04-16T07:12:00Z",
    },
    {
      id: "2",
      title: "Overwhelmed at Work",
      content:
        "Too many meetings, not enough time to breathe. Felt like I was sinking.",
      categories: [
        { value: "work", label: "Work" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood2",
      createdAt: "2025-04-15T17:43:00Z",
    },
    {
      id: "3",
      title: "Unexpected Chat with an Old Friend",
      content:
        "Had a spontaneous call with someone I hadn’t talked to in years. Laughed like nothing had changed.",
      categories: [{ value: "social", label: "Social" }],
      mood: "mood5",
      createdAt: "2025-04-15T21:05:00Z",
    },
    {
      id: "4",
      title: "Jog in the Rain",
      content:
        "Got soaked, but it felt freeing. The rhythm of my steps matched the drizzle perfectly.",
      categories: [
        { value: "sport", label: "Sport" },
        { value: "outdoor", label: "Outdoor" },
      ],
      mood: "mood4",
      createdAt: "2025-04-14T08:30:00Z",
    },
    {
      id: "5",
      title: "Blank Page Syndrome",
      content:
        "Stared at my notebook for hours. Words wouldn't come. Frustrating.",
      categories: [
        { value: "creativity", label: "Creativity" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood2",
      createdAt: "2025-04-14T18:47:00Z",
    },
    {
      id: "6",
      title: "Midday Meltdown",
      content: "Cried in the bathroom at work. Needed a reset.",
      categories: [
        { value: "mental", label: "Mental" },
        { value: "selfcare", label: "Selfcare" },
      ],
      mood: "mood1",
      createdAt: "2025-04-13T13:12:00Z",
    },
    {
      id: "7",
      title: "Painting With Music",
      content:
        "Let myself create without judgment today. Just music and colors. Bliss.",
      categories: [
        { value: "creativity", label: "Creativity" },
        { value: "hobby", label: "Hobby" },
      ],
      mood: "mood5",
      createdAt: "2025-04-13T19:02:00Z",
    },
    {
      id: "8",
      title: "Grocery Store Anxiety",
      content:
        "Crowds, noise, overstimulation. Felt drained just picking out apples.",
      categories: [{ value: "mental", label: "Mental" }],
      mood: "mood2",
      createdAt: "2025-04-12T16:26:00Z",
    },
    {
      id: "9",
      title: "Sunset Walk",
      content:
        "Watched the sky turn to fire. Everything slowed down. I breathed deeper.",
      categories: [
        { value: "outdoor", label: "Outdoor" },
        { value: "selfcare", label: "Selfcare" },
      ],
      mood: "mood4",
      createdAt: "2025-04-12T20:41:00Z",
    },
    {
      id: "10",
      title: "Workout Win",
      content:
        "Didn’t want to go, but I did. Felt stronger afterwards—in body and mind.",
      categories: [
        { value: "sport", label: "Sport" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood4",
      createdAt: "2025-04-11T11:18:00Z",
    },
    {
      id: "11",
      title: "Deep Clean Day",
      content:
        "Scrubbed the whole apartment. Something about order calms the chaos inside me.",
      categories: [{ value: "selfcare", label: "Selfcare" }],
      mood: "mood3",
      createdAt: "2025-04-11T15:05:00Z",
    },
    {
      id: "12",
      title: "Creative Block",
      content:
        "Wanted to edit videos today, but couldn’t get into it. Brain felt foggy.",
      categories: [{ value: "creativity", label: "Creativity" }],
      mood: "mood2",
      createdAt: "2025-04-10T18:00:00Z",
    },
    {
      id: "13",
      title: "Board Game Night",
      content:
        "Played for hours with friends. Laughed until we cried. Pure joy.",
      categories: [
        { value: "social", label: "Social" },
        { value: "hobby", label: "Hobby" },
      ],
      mood: "mood5",
      createdAt: "2025-04-09T22:17:00Z",
    },
    {
      id: "14",
      title: "Sleepless Thoughts",
      content: "Couldn’t sleep. My mind was racing with worries and what-ifs.",
      categories: [{ value: "mental", label: "Mental" }],
      mood: "mood1",
      createdAt: "2025-04-09T03:45:00Z",
    },
    {
      id: "15",
      title: "A Moment in Nature",
      content:
        "Sat under a tree and listened to birds. Felt like the earth was breathing with me.",
      categories: [
        { value: "outdoor", label: "Outdoor" },
        { value: "selfcare", label: "Selfcare" },
      ],
      mood: "mood4",
      createdAt: "2025-04-08T10:28:00Z",
    },
    {
      id: "16",
      title: "Burnout Brewing",
      content: "Everything felt like too much. I didn’t even want to shower.",
      categories: [{ value: "mental", label: "Mental" }],
      mood: "mood1",
      createdAt: "2025-04-08T14:12:00Z",
    },
    {
      id: "17",
      title: "Random Compliment",
      content:
        "A stranger said they liked my shirt. It was small, but it made me smile.",
      categories: [{ value: "social", label: "Social" }],
      mood: "mood4",
      createdAt: "2025-04-07T13:59:00Z",
    },
    {
      id: "18",
      title: "Yoga Session",
      content:
        "Stretched out tension and found a bit of peace. My body thanked me.",
      categories: [
        { value: "sport", label: "Sport" },
        { value: "selfcare", label: "Selfcare" },
      ],
      mood: "mood4",
      createdAt: "2025-04-07T18:33:00Z",
    },
    {
      id: "19",
      title: "Creative Flow",
      content: "Wrote pages without stopping. Ideas came like a river.",
      categories: [
        { value: "creativity", label: "Creativity" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood5",
      createdAt: "2025-04-06T20:10:00Z",
    },
    {
      id: "20",
      title: "Lazy But Needed",
      content:
        "Stayed in bed until noon. I needed to rest and not feel guilty about it.",
      categories: [
        { value: "selfcare", label: "Selfcare" },
        { value: "mental", label: "Mental" },
      ],
      mood: "mood3",
      createdAt: "2025-04-06T13:00:00Z",
    },
  ];

  for (let i = 0; i < num; i++) {
    const post = { ...posts[i % posts.length] };

    const date = new Date();
    const monthOffset = i % 3; // 0 = aktueller Monat, 1 = -1 Monat, 2 = -2 Monate
    date.setMonth(now.getMonth() - monthOffset);
    date.setDate(Math.floor(Math.random() * 28) + 1);
    date.setHours(12);
    date.setMinutes(0);

    post.createdAt = date.toISOString();
    post.id = `${i + 1}`;

    saveEntry(post);
  }
}
