"use client";

import {
  Box,
  Container,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";
import AddCardForm from "@/components/forms/AddCard.form";

const ITEMS = [
  {
    name: "Poly-L-Lactic Acid (Sculptra)",
    code: "20005753",
    latestLocation: "คลังยา 1 01-1-1",
    latestImportedDate: "2024/08/14 22:28",
    total: "3297359",
  },
  {
    name: "Calcium Hydroxylapatite",
    code: "20012965",
    latestLocation: "คลังยา 1 01-1-1",
    latestImportedDate: "2024/08/14 22:28",
    total: "3297359",
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
        <Grid size={12} mb={4}>
          <Typography variant="h6" color="textPrimary" textAlign={"center"}>
            zkDebit
          </Typography>
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
