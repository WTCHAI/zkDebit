"use client";

import { Box, Grid2 as Grid, Typography } from "@mui/material";
import LoginForm from "@/components/forms/Login.form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Grid container height={"100%"}>
      <Grid
        container
        size={12}
        spacing={2}
        alignSelf={"center"}
        p={{ md: 12, sm: 4, xs: 0 }}
      >
        <Grid size={12} mb={4}>
          <Box display={"flex"} justifyContent={"center"}>
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
        </Grid>
        <Grid size={12} mb={4}>
          <Typography variant="h6" color="textPrimary" textAlign={"center"}>
            Welcome to zkDebit
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign={"center"}
          >
            You can setup your account with us here.
          </Typography>
        </Grid>
        <LoginForm />
      </Grid>
    </Grid>
  );
}