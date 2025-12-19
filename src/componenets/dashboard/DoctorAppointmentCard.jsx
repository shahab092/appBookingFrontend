import { Clock, Edit, MoreVertical, Users, Video, X } from "lucide-react";

function DoctorAppointmentCard({
  appointment,
  onStartVideo,
  onCancel,
  onEdit,
}) {
  const isVideo = appointment.type === "Video";
  const isPending = appointment.status === "pending";
  console.log(appointment.type, "sdfsdfjksfojel");

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer bg-white hover:shadow-sm">
      {appointment ? (
        <>
          <div className="flex items-start sm:items-center gap-4 mb-3 sm:mb-0">
            <div className="flex flex-col items-center min-w-16">
              <span className="text-sm font-semibold text-gray-900">
                {appointment.time.split(" ")[0]}
              </span>
              <span className="text-xs text-gray-400">
                {appointment.time.split(" ")[1]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-base font-semibold text-blue-700">
                {appointment.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">
                    {appointment.name}
                  </p>
                  {isPending && (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600">{appointment.info}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {appointment.duration}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                      isVideo
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {isVideo ? (
                      <Video className="w-3.5 h-3.5" />
                    ) : (
                      <Users className="w-3.5 h-3.5" />
                    )}
                    {appointment.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {isVideo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartVideo();
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Start Video
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit appointment"
            >
              <Edit className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Cancel appointment"
            >
              <X className="w-4 h-4" />
            </button>

            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <p>no appointment</p>
      )}
    </div>
  );
}

export default DoctorAppointmentCard;
