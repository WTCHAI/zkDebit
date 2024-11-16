"use client";

import {
  Box,
  Container,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ITEM = {
  name: "Card1",
  last4: "1387",
  pi3: "9308090584616674282342942539084248126853526892431147539300436350638522588197",
};

export default function ProductsPage() {
  return (
    <Container
      sx={{
        height: "100%",
        p: "0 !important",
      }}
    >
      <Grid container>
        <Grid size={12}>
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Paper
              sx={{
                backgroundColor: "white",
                padding: 2,
              }}
            >
              <Box display={"flex"}>
                <CreditCardIcon sx={{ fontSize: 48, color: "darkblue" }} />
                <Stack flex={1} ml={4}>
                  <Typography variant="subtitle1">{ITEM.name}</Typography>
                  <Typography variant="subtitle1">
                    XXXX XXXX XXXX {ITEM.last4}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ display: "flex", mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ textOverflow: "ellipsis", flex: 1 }}
                >
                  PI3: {ITEM.pi3.slice(0, 10)}...
                  {ITEM.pi3.slice(ITEM.pi3.length - 10)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid size={12} my={4} mx={2}>
          <Divider />
        </Grid>

        <Grid
          size={12}
          mb={4}
          sx={{
            px: 2,
          }}
        >
          <Typography variant="h6" color="textPrimary">
            History
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={4}
          >
            <WorkOutlineOutlinedIcon
              sx={{ color: "#00000028", fontSize: 48 }}
            />
            <Typography
              variant="subtitle2"
              color="textDisabled"
              textAlign={"center"}
            >
              You haven&apos;t generated any proof with this wallet.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
