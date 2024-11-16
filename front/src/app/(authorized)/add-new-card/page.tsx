"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import AddCardForm from "@/components/forms/AddCard.form";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <Container
      sx={{
        height: "100%",
        p: "0 !important",
      }}
    >
      <Grid container>
        <Grid
          size={12}
          px={2}
          display={
            window.history?.length && window.history.length > 1
              ? "flex"
              : "none"
          }
        >
          <Button
            onClick={() => {
              router.back();
            }}
            sx={{ minWidth: "initial", width: 36 }}
          >
            <ArrowBackOutlinedIcon />
          </Button>
        </Grid>
        <Grid size={12} mb={4}>
          <Box display={"flex"} justifyContent={"center"} mt={10}>
            <Image
              src="/images/logo.png"
              alt="privacy-visa-logo"
              width={148}
              height={148}
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign={"center"}
          >
            Let&apos;s generate your proof with your card details*
          </Typography>
        </Grid>
        <Grid size={12} container spacing={2} p={6}>
          <AddCardForm onSubmit={() => {}} />
        </Grid>
        <Grid size={12} mt={4}>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign={"center"}
          >
            *Rest assured, We only store your proof not your card details.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}