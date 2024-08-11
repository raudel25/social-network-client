import {
  Avatar,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Profile } from "../../types/profile";
import { useNavigate } from "react-router-dom";
import { ApiResponse, Pagination } from "../../types/api";
import { displayPhoto } from "../../common/common";
import parse from "html-react-parser";
import { NoItemsV1, NoItemsV2 } from "../../common/NoItems";
import { profileService } from "../../api/profile";
import { UserContext } from "../../context/UserProvider";
import MySpin from "../../layout/MySpin";

interface ProfileItemsProps {
  load: (query: any) => Promise<ApiResponse<Pagination<Profile>>>;
  setErrorMessage: (errorMessage: string) => void;
  allWindow?: boolean;
}

const ProfileItems = forwardRef(
  ({ load, setErrorMessage, allWindow = false }: ProfileItemsProps, ref) => {
    const navigate = useNavigate();

    const { followUnFollow } = profileService();
    const { user } = useContext(UserContext);

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

    useImperativeHandle(ref, () => ({
      reload: () => loadProfiles(true),
    }));

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
          {user?.profile.id !== profile.id && (
            <div className="follow-btn">
              <Button
                variant="contained"
                onClick={() => handleFollowUnFollow(profile.id)}
              >
                {profile.follow ? "Following" : "Follow"}
              </Button>
            </div>
          )}
        </div>
        <div className="profile-items-description">
          {parse(profile.richText?.html ?? "")}
        </div>
      </div>
    );

    if (loading) {
      return allWindow ? (
        <MySpin loading={loading} />
      ) : (
        <div className="center-content">
          <CircularProgress size={30} />
        </div>
      );
    }

    return (
      <>
        {pagination.totalRows === 0 &&
          (allWindow ? <NoItemsV1 /> : <NoItemsV2 />)}
        {pagination.rows.map((p) => getItem(p))}
        <div className="center-content">
          {pagination.page < pagination.totalPages && (
            <Button onClick={() => loadProfiles(false)}>See more</Button>
          )}
        </div>
      </>
    );
  }
);

export default ProfileItems;
