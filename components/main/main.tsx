import Image from "next/image";

export default function MainPage() {
  const topics = [
    {
      id: 1,
      icon: "👨‍💼",
      title: "Job Interview",
      description: "Practice answering real Korean interview questions.",
    },
    {
      id: 2,
      icon: "☕",
      title: "Workplace Small Talk",
      description: "Improve casual yet polite conversations with coworkers.",
    },
    {
      id: 3,
      icon: "👥",
      title: "Team Meeting Interaction",
      description: "Practice sharing opinions, participating in discussions.",
    },
    {
      id: 4,
      icon: "🆘",
      title: "Asking for Help at Work",
      description:
        "Learn how to request assistance or clarification in a polite way.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Recommended Section */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended</h2>

        {/* Featured Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
          <div className="relative h-64">
            <Image
              src="/etc/interviewImage.png"
              alt="Job Interview"
              width={300}
              height={200}
            />

            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full  text-sm font-medium text-black">
                Career
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-2xl font-bold mb-1">
                Job Interview
              </h3>
              <p className="text-white text-sm opacity-90">
                Experience real Korean interview situations
              </p>
            </div>
          </div>
        </div>

        {/* Start Chatting Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-md">
          Start Chatting
        </button>
      </div>

      {/* Topics Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Topics</h3>
          <button className="text-gray-600 text-sm font-medium">
            View all
          </button>
        </div>

        {/* Topic Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-2 py-1 bg-gray-800 text-white rounded-full text-sm font-medium whitespace-nowrap">
            Career
          </button>
          <button className="px-2 py-1 bg-white text-gray-700 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200">
            Greeting
          </button>
          <button className="px-2 py-1 bg-white text-gray-700 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200">
            K POP
          </button>
          <button className="px-2 py-1 bg-white text-gray-700 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200">
            + Create
          </button>
        </div>

        {/* Topic List */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex-shrink-0 text-gray-400 font-bold text-lg">
                {topic.id}
              </div>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-2xl">
                  {topic.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-gray-900 mb-1">
                  {topic.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
