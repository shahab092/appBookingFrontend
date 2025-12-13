import {
  FileDoneOutlined,
  MessageOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "New lab results are available",
      description: "Blood Panel - Oct 23, 2024",
      icon: FileDoneOutlined,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      action: "View Results",
    },
    {
      id: 2,
      title: "Message from Dr. Evelyn Reed",
      description: "Oct 22, 2024",
      icon: MessageOutlined,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      action: "View Message",
    },
    {
      id: 3,
      title: "Prescription refill is ready",
      description: "Metformin - Ready for pickup",
      icon: MedicineBoxOutlined,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      action: "View Details",
    },
  ];

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start p-3 border border-gray-200 rounded-lg transition hover:border-blue-200"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 w-full sm:w-auto">
                <div
                  className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`${item.iconColor}`} style={{ fontSize: 20 }} />
                </div>

                <div className="text-center sm:text-left">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>

              <button className="mt-2 sm:mt-0 text-sm text-blue-600 font-medium hover:underline">
                {item.action}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;
