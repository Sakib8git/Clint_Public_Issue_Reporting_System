import useAuth from "../../../../hooks/useAuth";
import coverImg from "../../../../assets/images/cover.jpg";

const StaffProfile = () => {
  const { user } = useAuth();

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
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>User ID:</strong> {user?.uid}
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700">
                Update Image
              </button>
              <button className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700">
                Update Name
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;