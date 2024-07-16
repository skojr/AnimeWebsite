import "./Profile.css";
import {
  deleteUser,
  getCurrentUser,
  logout,
  updateUser,
} from "../../auth/AuthService";
import { useEffect, useState } from "react";
import { DeleteConfirmationModal } from "../../auth/DeletionConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "../../auth/UpdateUserModal";

export const Profile = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getCurrentUser();
        setToken(token);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleConfirmDelete = async (password) => {
    try {
      await deleteUser(password);
      toast.success("Deleted user successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateUser = async (updateData) => {
    try {
      await updateUser(updateData);
      setIsUpdateModalOpen(false);
      toast.info(
        "Your account has been updated. You will be logged out in 3 seconds. Please log in again with your new credentials."
      );
      setTimeout(() => {
        localStorage.clear();
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update.");
    }
  };

  const handleLogoutClick = () => {
    try {
      localStorage.clear();
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-overlay"></div>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card custom-card">
              <div className="card-header gradient-header">
                <div className="image-circle">
                  <img src="path/to/image1.jpg" alt="Profile 1" />
                </div>
              </div>
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title mb-4 mt-5">{token.sub}</h5>
                <button
                  type="click"
                  onClick={handleUpdateClick}
                  className="btn btn-primary custom-btn mb-3"
                >
                  UPDATE ACCOUNT
                </button>
                <button
                  type="click"
                  onClick={handleLogoutClick}
                  className="btn btn-primary custom-btn mb-3"
                >
                  LOGOUT
                </button>
                <button
                  type="click"
                  className="btn btn-danger delete-btn"
                  onClick={handleDeleteClick}
                >
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card custom-card">
              <div className="card-header gradient-header">
                <div className="image-circle">
                  <img src="path/to/image2.jpg" alt="Profile 2" />
                </div>
              </div>
              <div className="card-body profile-card-body d-flex flex-column align-items-center">
                <h5 className="card-title mb-4">Card Title 2</h5>
                <button className="btn btn-primary custom-btn mb-3">
                  Button 1
                </button>
                <button className="btn btn-secondary custom-btn mb-3">
                  Button 2
                </button>
                <button className="btn btn-info custom-btn">Button 3</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateUser}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
