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
import { useParams } from "react-router-dom";
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const { getByUsername, updateProfile } = profileService();

  const { username } = useParams();

  const theme = useTheme();
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  useEffect(() => {
    if (username) loadProfile(username);
    else setErrorMessage("Profile not found");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

      {profile ? (
        <>
          <div className="profile-header">
            <IconButton>
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
                  <Button variant="outlined" onClick={handleProfileBtn}>
                    {user?.profile.id === profile.id
                      ? "Profile Configuration"
                      : profile.follow
                      ? "Following"
                      : "Follow"}
                  </Button>
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
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
            </div>
          </div>
        </>
      ) : (
        <NoItemsV1 />
      )}
      {user && (
        <ConfigModal
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
