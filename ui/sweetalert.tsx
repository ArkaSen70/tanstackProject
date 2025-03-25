import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface SweetAlertProps {
  confirm: () => void;
  cancle: () => void;
  title: string;
  subtitle: string;
  type?: string;
  confirmBtnText: string;
  confirmBtnBsStyle?: string;
}

const SweetAlertComponent: React.FC<SweetAlertProps> = ({
  confirm,
  cancle,
  title,
  subtitle,
  confirmBtnText,
}) => {
  return (
    <Dialog
      open
      onClose={cancle}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            color: "#ccc",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={cancle}
          variant="contained"
          sx={{
            backgroundColor: "#555",
            color: "#fff",
            "&:hover": { backgroundColor: "#777" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={confirm}
          variant="contained"
          sx={{
            backgroundColor: "#FACC15",
            color: "#000",
            ml: 2,
            "&:hover": { backgroundColor: "#FFD700" },
          }}
        >
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SweetAlertComponent;
