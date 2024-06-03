import {
  Avatar,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Profile } from "../../types/profile";
import { useNavigate } from "react-router-dom";
import { ApiResponse, Pagination } from "../../types/api";
import { displayPhoto } from "../../common/common";
import parse from "html-react-parser";
import { NoItemsV2 } from "../../common/NoItems";

interface ProfileItemsProps {
  load: (query: any) => Promise<ApiResponse<Pagination<Profile>>>;
  setErrorMessage: (errorMessage: string) => void;
}

const ProfileItems: FC<ProfileItemsProps> = ({ load, setErrorMessage }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Profile>>({
    limit: 10,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  });

  const loadProfiles = async (clear: boolean) => {
    setLoading(true);
    const response = await load({
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

  const getItem = (profile: Profile) => (
    <div className="profile-items-container" key={profile.id}>
      <div className="profile-items-header">
        <div
          className="profile-item-name pointer"
          onClick={() => navigate(`../profile/${profile.username}`)}
        >
          <Avatar
            alt={profile.username}
            src={displayPhoto(profile.profilePhotoId)}
            style={{ width: 50, height: 50 }}
          />
          <div className="ml-2 mr-1 ">
            <Link
              variant="body1"
              className="mb-1 "
              style={{ fontWeight: "bold" }}
            >
              {profile.name}
            </Link>
            <Typography variant="body1" color="textSecondary">
              @{profile.username}
            </Typography>
          </div>
        </div>
        <div className="follow-btn">
          <Button variant="contained">
            {profile.follow ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
      <div className="profile-items-description">
        {parse(profile.richText?.html ?? "")}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="center-content">
        <CircularProgress size={30} />
      </div>
    );
  }

  return (
    <>
      {pagination.totalRows === 0 && <NoItemsV2 />}
      {pagination.rows.map((p) => getItem(p))}
      <div className="center-content">
        {pagination.page < pagination.totalPages && (
          <Button onClick={() => loadProfiles(false)}>See more</Button>
        )}
      </div>
    </>
  );
};

export default ProfileItems;
