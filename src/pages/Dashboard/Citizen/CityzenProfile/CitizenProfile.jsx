import useAuth from "../../../../hooks/useAuth";
import coverImg from "../../../../assets/images/cover.jpg";
import toast from "react-hot-toast";

const CitizenProfile = () => {
  const { user } = useAuth();

  const isPremium = user?.subscription === "premium";
  const isBlocked = user?.status === "blocked";

  const handleSubscribe = () => {
    toast.success("Payment of 1000tk successful! You are now a Premium user.");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Cover Image */}
        <img src={coverImg} alt="cover" className="w-full h-48 object-cover" />

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-8 gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user?.photoURL}
              alt="profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.displayName}
              </h2>
              {isPremium && (
                <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full">
                  Premium
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>User ID:</strong> {user?.uid}
            </p>

            {/* Blocked Warning */}
            {isBlocked && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mt-4">
                <p className="font-semibold">
                  ⚠ Your account has been blocked by the admin.
                </p>
                <p>Please contact the authorities for assistance.</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700">
                Update Profile
              </button>
              
              {!isPremium && !isBlocked && (
                <button
                  onClick={handleSubscribe}
                  className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700"
                >
                  Subscribe (1000tk)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;