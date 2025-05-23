import { Check, ExternalLink, X } from "lucide-react";
import PropTypes from "prop-types";

const renderLink = (url, text) => {
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 flex items-center"
    >
      {text || url}
      <ExternalLink className="h-4 w-4 ml-1" />
    </a>
  ) : (
    <span className="text-gray-500">N/A</span>
  );
};

const DetailRow = ({ label, value, isLink }) => (
  <div className="border-b py-3">
    <label className="text-sm text-gray-500 block">{label}</label>
    <div className="mt-1">
      {isLink ? renderLink(value, value) : value || "N/A"}
    </div>
  </div>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isLink: PropTypes.bool,
};

const DetailOverlay = ({ item, onClose, onStatusChange }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusClasses = getStatusClasses(item.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-semibold mb-4">{item.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailRow label="Organization ID" value={item.id} />
          <DetailRow label="Type" value={item.type} />
          <DetailRow label="Sector" value={item.sector} />
          <DetailRow label="Registration Number" value={item.regNo} />
          <DetailRow label="Established Date" value={item.estdate} />
          <DetailRow label="Location" value={item.location} />
          <DetailRow label="Contact Name" value={item.contactName} />
          <DetailRow label="Contact Title" value={item.title} />
          <DetailRow label="Contact Email" value={item.contactMail} />
          <DetailRow label="Parent Organization" value={item.parentOrg} />
          <DetailRow label="Website" value={item.website} isLink />
          <DetailRow label="Social Media" value={item.socialMediaLink} isLink />
          <DetailRow label="Documents" value={item.docLink} isLink />

          <div className="col-span-2">
            <DetailRow label="Mission" value={item.mission} />
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-500" htmlFor="status">
              Status
            </label>
            <p>
              <span
                id="status"
                className={`px-2 py-1 rounded-full text-xs ${statusClasses}`}
              >
                {item.status}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => {
              onStatusChange(item.id, "approved");
              onClose();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </button>
          <button
            onClick={() => {
              onStatusChange(item.id, "rejected");
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

DetailOverlay.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
    docLink: PropTypes.string,
    regNo: PropTypes.string,
    estdate: PropTypes.string,
    mission: PropTypes.string,
    contactName: PropTypes.string,
    title: PropTypes.string,
    contactMail: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    socialMediaLink: PropTypes.string,
    parentOrg: PropTypes.string,
    status: PropTypes.oneOf(["pending", "approved", "rejected"]).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default DetailOverlay;
