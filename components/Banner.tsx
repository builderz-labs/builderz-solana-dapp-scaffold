import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import Alert from "@mui/material/Alert";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

export default function Banner() {
  const [open1, setOpen1] = useState<boolean>(true);

  return (
    <Box sx={{ mb: 0 }} className="w-full justify-between">
      <Collapse in={open1}>
        <Alert
          severity="warning"
          style={{ display: "flex", justifyContent: "space-between" }}          action={
            <IconButton
              size="small"
              color="inherit"
              aria-label="close"
              onClick={() => setOpen1(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <div className="w-full flex justify-between">
            <p>
              Welcome to the <strong>Builderz Solana dApp Scaffold</strong>
            </p>
          </div>
        </Alert>
      </Collapse>
    </Box>
  );
}
