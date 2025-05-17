import { FaCog, FaUserCircle, FaEnvelope } from 'react-icons/fa';

const Settings = ({ users }) => {
  const adminUsers = users?.filter(user => user.role === 'admin');

  return (
    <div className="p-4 h-full bg-[#ffffff96] rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <FaCog className="mr-2" /> Settings
      </h1>
      <p>Manage your application settings here.</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Preferences</h2>
        <p>Theme: Light</p>
        <p>Notifications: Enabled</p>
      </div>

      {adminUsers?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Admins</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminUsers.map((admin) => (
              <li key={admin.id} className="p-4 bg-gray-100 rounded shadow">
                <div className="flex items-center mb-2">
                  {admin.photoURL ? (
                    <img
                      src={admin.photoURL}
                      alt="Admin"
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <FaUserCircle className="mr-2 text-2xl" />
                  )}
                  <span className="font-semibold">{admin.name}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-600" />
                  <span>{admin.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Settings;
