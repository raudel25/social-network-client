import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import RichTextEditor from "../../common/RichTextEditor";
import { ProfileForm } from "../../types/profile";
import UploadPhoto, { UploadPhotoState } from "../../context/UploadPhoto";
import MessageSnackbar from "../../common/MessageSnackbar";
import MySpin from "../../layout/MySpin";
import { displayPhoto } from "../../common/common";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
};

interface ConfigModalProps {
  open: boolean;
  form: ProfileForm;
  handleOk: (form: ProfileForm) => void;
  handleClose: () => void;
}

const ConfigModal: FC<ConfigModalProps> = ({
  open,
  handleClose,
  handleOk,
  form,
}) => {
  const theme = useTheme();
  const [step, setStep] = useState<number>(0);
  const [formState, setFormState] = useState<ProfileForm>(form);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<string>("");

  const validate = () => {
    if (formState.name.length === 0) {
      setErrorForm("Name is required");
      return false;
    }

    return true;
  };

  const step0 = () => (
    <div className="config-photo-container">
      <Avatar
        style={{ width: 250, height: 250 }}
        src={displayPhoto(formState.profilePhotoId)}
      />
      <div className="config-photo">
        <IconButton component="label" role={undefined} tabIndex={-1}>
          <AddAPhotoIcon fontSize="large" />
          <UploadPhoto
            onChange={(state: UploadPhotoState) => {
              if (state.ok) {
                setFormState({ ...formState, profilePhotoId: state.id });
              } else {
                setErrorMessage(state.error || "Error uploading photo");
              }
            }}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        </IconButton>
      </div>
    </div>
  );

  const step1 = () => (
    <div className="config-photo-container">
      {formState.bannerPhotoId ? (
        <img
          style={{ width: 500, height: 200 }}
          src={displayPhoto(formState.bannerPhotoId)}
          alt="banner"
        />
      ) : (
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            width: 500,
            height: 200,
          }}
        ></div>
      )}
      <div className="config-photo">
        <IconButton component="label" role={undefined} tabIndex={-1}>
          <AddAPhotoIcon fontSize="large" />
          <UploadPhoto
            onChange={(state: UploadPhotoState) => {
              if (state.ok) {
                setFormState({ ...formState, bannerPhotoId: state.id });
              } else {
                setErrorMessage(state.error || "Error uploading photo");
              }
            }}
            setLoading={(loading: boolean) => setLoading(loading)}
          />
        </IconButton>
      </div>
    </div>
  );

  const step2 = () => (
    <div className="mt-5 ml-5 mr-5">
      <div className="mb-5">
        <TextField
          error={errorForm !== ""}
          helperText={errorForm}
          fullWidth
          placeholder="Name"
          label="Name"
          autoFocus
          value={formState.name}
          onChange={(value) =>
            setFormState({ ...formState, name: value.target.value })
          }
        />
      </div>

      <RichTextEditor
        placeholder="Describe your self"
        value={formState?.richText}
        onChange={(e) => setFormState({ ...formState, richText: e })}
      />
    </div>
  );
  const getTitle = () => {
    switch (step) {
      case 0:
        return "Select a profile photo";
      case 1:
        return "Select a banner photo";
      case 2:
        return "Personal data";
    }
  };

  const getStep = () => {
    switch (step) {
      case 0:
        return step0();
      case 1:
        return step1();
      case 2:
        return step2();
    }
  };

  useEffect(() => {
    setStep(0);
    setFormState(form);
  }, [open, form]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container alignItems={"center"}>
          <Grid xs={1} item>
            {step !== 0 && (
              <IconButton onClick={() => setStep(step - 1)}>
                <ArrowBack />
              </IconButton>
            )}
          </Grid>
          <Grid xs={10} item>
            <div className="center-content">
              <Typography variant="h5">{getTitle()}</Typography>
            </div>
          </Grid>
          <Grid xs={1} item>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        {getStep()}
        <div className="center-content" style={{ marginTop: "auto" }}>
          <Button
            variant="outlined"
            style={{ width: 300, fontSize: 16 }}
            onClick={
              step === 2
                ? () => {
                    if (validate()) handleOk(formState);
                  }
                : () => setStep(step + 1)
            }
          >
            {step === 2 ? "Save" : "Next"}
          </Button>
        </div>
        <MessageSnackbar
          open={errorMessage.length !== 0}
          handleClose={() => setErrorMessage("")}
          message={errorMessage}
        />
        <MySpin loading={loading} />
      </Box>
    </Modal>
  );
};

export default ConfigModal;
