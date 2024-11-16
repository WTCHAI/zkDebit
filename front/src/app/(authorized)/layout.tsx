"use client";
import {
  Avatar,
  Box,
  Button,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenQr = () => {
    router.push("/qr-scanner");
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickAddNewCard = () => {
    router.push("/add-new-card");
    handleClose();
  };

  return (
    <Stack display={"flex"} height={"100%"}>
      <Box
        my={2}
        height={50}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
        position={"relative"}
      >
        <Avatar sx={{ bgcolor: "primary" }}>
          <PersonIcon />
        </Avatar>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          Johndoe.eth
        </Typography>
        <Box display={"flex"} gap={2}>
          <Button onClick={handleOpenQr} sx={{ p: 0, minWidth: "initial" }}>
            <QrCodeScannerIcon sx={{ color: "grey" }} />
          </Button>
          <Button onClick={handleClick} sx={{ p: 0, minWidth: "initial" }}>
            <MoreHorizIcon sx={{ color: "grey" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={onClickAddNewCard}>Add Card</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Grid container sx={{ flex: 1 }}>
        <Grid size={12} display={"flex"} flex={1}>
          {children}
        </Grid>
      </Grid>
    </Stack>
  );
}