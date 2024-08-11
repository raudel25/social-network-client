import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tabs,
  Typography,
} from "@mui/material";
import { Profile, ProfileForm } from "../../types/profile";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { profileService } from "../../api/profile";
import MessageSnackbar from "../../common/MessageSnackbar";
import MySpin from "../../layout/MySpin";
import { NoItemsV1 } from "../../common/NoItems";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../../context/UserProvider";
import Tab from "@mui/material/Tab";
import ConfigModal from "./ConfigModal";
import { displayPhoto } from "../../common/common";
import parse from "html-react-parser";
import ProfileItems from "./ProfileItems";
import { postService } from "../../api/post";
import PostItems from "../post/PostItems";
import { CustomTabPanel } from "../../common/TabPanel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const {
    getByUsername,
    updateProfile,
    getByFollower,
    getByFollowed,
    followUnFollow,
  } = profileService();

  const { getByUsername: getPostByUsername } = postService();

  const { username } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const loadProfile = async (username: string) => {
    setLoading(true);
    const response = await getByUsername(username);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setProfile(response.value);
  };

  const editProfile = async (form: ProfileForm) => {
    setLoading(true);
    const response = await updateProfile(form);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setProfile(profile ? { ...profile, ...form } : undefined);
    setUser({ ...user!, profile: { ...user!.profile, ...form } });
  };

  const handleFollowUnFollow = async () => {
    setLoading(true);
    const response = await followUnFollow(profile?.id ?? 0);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setProfile(profile ? { ...profile, follow: !profile?.follow } : undefined);
  };

  useEffect(() => {
    if (username) loadProfile(username);
    else setErrorMessage("Profile not found");
  }, [username]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "posts") setValue(0);
    else if (tab === "followers") setValue(1);
    else if (tab === "following") setValue(2);
    else setValue(0);
  }, [searchParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) setSearchParams({ tab: "posts" });
    else if (newValue === 1) setSearchParams({ tab: "followers" });
    else if (newValue === 2) setSearchParams({ tab: "following" });
  };

  const handleProfileBtn = () => {
    if (user?.profile.id === profile!.id) {
      setOpenModal(true);
      return;
    }
  };

  return (
    <>
      <MySpin loading={loading} />
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />

      {profile && username ? (
        <div className="profile-layout">
          <div className="profile-header">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <div className="ml-1">
              <Typography variant="h5">{profile.name}</Typography>
            </div>
          </div>
          <div className="profile-container">
            <div className="profile-container-child">
              <div className="profile-image-container">
                <div
                  className="profile-banner"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    backgroundImage: displayPhoto(profile.bannerPhotoId),
                  }}
                ></div>
                <Avatar
                  className="profile-avatar"
                  src={displayPhoto(profile.profilePhotoId)}
                ></Avatar>
                <div className="profile-btn">
                  {user?.profile.id === profile.id ? (
                    <Button variant="outlined" onClick={handleProfileBtn}>
                      Profile Configuration
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={handleFollowUnFollow}>
                      {profile.follow ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>
              </div>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography variant="body1" color="textSecondary">
                @{profile.username}
              </Typography>
              <div className="mt-5">{parse(profile.richText?.html ?? "")}</div>
              <div className="mt-5"></div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Posts" {...a11yProps(0)} />
                  <Tab label="Followers" {...a11yProps(1)} />
                  <Tab label="Following" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PostItems
                  load={(query: any) => getPostByUsername(username, query)}
                  setErrorMessage={setErrorMessage}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ProfileItems
                  load={(query: any) => getByFollowed(username, query)}
                  setErrorMessage={setErrorMessage}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <ProfileItems
                  load={(query: any) => getByFollower(username, query)}
                  setErrorMessage={setErrorMessage}
                />
              </CustomTabPanel>
            </div>
          </div>
        </div>
      ) : (
        <NoItemsV1 />
      )}
      {user && (
        <ConfigModal
          setErrorMessage={setErrorMessage}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleOk={(form: ProfileForm) => {
            setOpenModal(false);
            editProfile(form);
          }}
          form={{
            profilePhotoId: user.profile.profilePhotoId,
            bannerPhotoId: user.profile.bannerPhotoId,
            name: user.profile.name,
            richText: user.profile.richText,
          }}
        />
      )}
    </>
  );
};

export default ProfilePage;
