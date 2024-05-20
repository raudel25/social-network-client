import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Avatar, Button, Grid, IconButton } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import RichTextEditor from "../../common/RichTextEditor";

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
  handleClose: () => void;
}

const ConfigModal: FC<ConfigModalProps> = ({ open, handleClose }) => {
  const [step, setStep] = useState<number>(0);

  const step0 = () => (
    <div className="config-photo-container">
      <Avatar style={{ width: 250, height: 250 }} />
      <div className="config-photo">
        <IconButton>
          <AddAPhotoIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );

  const step1 = () => (
    <div className="config-photo-container">
      <img style={{ width: 500, height: 200 }} src="" alt="" />
      <div className="config-photo">
        <IconButton>
          <AddAPhotoIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );

  const step2 = () => (
    <div className="mt-10 ml-5 mr-5">
      <RichTextEditor
        onChange={(e) => {
          console.log(e);
        }}
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
        return "Describe your self";
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
            onClick={step === 2 ? () => {} : () => setStep(step + 1)}
          >
            {step === 2 ? "Save" : "Next"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
