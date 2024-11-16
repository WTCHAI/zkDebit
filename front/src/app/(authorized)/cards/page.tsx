"use client";

import {
  Box,
  Container,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useRouter } from "next/navigation";

const ITEMS = [
  {
    name: "Card1",
    last4: "1387",
    pi3: "asdqweqwdqwsqdqwe12e21df23efwe",
  },
  {
    name: "Card2",
    last4: "2424",
    pi3: "asdqweqwdqwsqdqwe12e21df23efwe",
  },
];

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
        <Grid size={12}>
          <Stack>
            {ITEMS.map((item, index) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  py: 1,
                }}
                onClick={() => router.push(`/cards/${item.pi3}`)}
              >
                <Paper
                  sx={{
                    backgroundColor: "white",
                    padding: 2,
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  <CreditCardIcon sx={{ fontSize: 48, color: "darkblue" }} />
                  <Stack flex={1} ml={4}>
                    <Typography>{item.name}</Typography>
                    <Typography>XXXX XXXX XXXX {item.last4}</Typography>
                  </Stack>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}