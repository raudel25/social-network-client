import {
  Avatar,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Profile } from "../../types/profile";
import { profileService } from "../../api/profile";
import MessageSnackbar from "../../common/MessageSnackbar";
import { Pagination } from "../../types/api";
import { NoItemsV2 } from "../../common/NoItems";
import { useNavigate } from "react-router-dom";
import { displayPhoto } from "../../common/common";

const Suggestions = () => {
  const { getProfiles } = profileService();

  const { followUnFollow } = profileService();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Profile>>({
    limit: 10,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFollowUnFollow = async (id: number) => {
    setLoading(true);
    const response = await followUnFollow(id);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPagination({
      ...pagination,
      rows: pagination.rows.map((p) =>
        p.id === id ? { ...p, follow: !p.follow } : p
      ),
    });
  };

  const getProfile = (p: Profile) => {
    return (
      <div className="profile-recommendation-container" key={p.id}>
        <div
          className="profile-recommendation-name pointer"
          onClick={() => navigate(`../profile/${p.username}`)}
        >
          <Avatar alt={p.username} src={displayPhoto(p.profilePhotoId)} />
          <div className="ml-2 mr-1 ">
            <Link
              variant="body1"
              className="mb-1 "
              style={{ fontWeight: "bold" }}
            >
              {p.name}
            </Link>
            <Typography variant="body1" color="textSecondary">
              @{p.username}
            </Typography>
          </div>
        </div>
        <div className="follow-btn">
          <Button
            variant="contained"
            onClick={() => handleFollowUnFollow(p.id)}
          >
            {p.follow ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    );
  };

  const loadProfiles = async (clear: boolean) => {
    setLoading(true);
    const response = await getProfiles({
      limit: pagination.limit,
      page: clear ? 1 : pagination.page + 1,
    });
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPagination(
      clear
        ? { ...response.value!, rows: response.value!.rows ?? [] }
        : {
            ...response.value!,
            rows: [...pagination.rows, ...(response.value!.rows ?? [])],
          }
    );
  };

  useEffect(() => {
    loadProfiles(true);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="right-layout-item center-content">
        <CircularProgress size={30} />
      </div>
    );
  }

  return (
    <div className="right-layout-item">
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />
      <div className="mb-5">
        <Typography variant="body1">Suggestions</Typography>
      </div>
      {pagination.rows.map((p) => (
        <div key={p.id} className="recommendation-item">
          {getProfile(p)}
        </div>
      ))}
      {pagination.totalRows === 0 && <NoItemsV2 />}
      {pagination.page < pagination.totalPages && (
        <Button onClick={() => loadProfiles(false)}>See more</Button>
      )}
    </div>
  );
};

export default Suggestions;
