"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Box, Button, Container, Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import QrReader from "@/components/QrReader";

export default function QrScannerPage() {
  const router = useRouter();

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        p: "0 !important",
      }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        sx={{ flex: 1 }}
      >
        <Grid size={12} px={2}>
          <Button
            onClick={() => {
              router.back();
            }}
            sx={{ minWidth: "initial", width: 36 }}
          >
            <ArrowBackOutlinedIcon />
          </Button>
        </Grid>
        <Grid
          size={12}
          px={2}
          sx={{
            display: "flex",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              backgroundColor: "#222222",
            }}
          >
            <QrReader />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}