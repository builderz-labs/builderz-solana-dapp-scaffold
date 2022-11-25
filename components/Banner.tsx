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
          style={{ display: "flex", justifyContent: "space-between" }}
          className="rounded-lg m-4 bg-teal-800 mb-2 text-center text-black flex justify-between"
          action={
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
              We are live in Alpha on <strong>mainnet!</strong>
            </p>
          </div>
        </Alert>
        {/* <RequestAirdrop /> */}
      </Collapse>
    </Box>
  );
}
