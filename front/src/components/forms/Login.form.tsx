import { Button, Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const onClickConnectWeb3 = () => {
    router.replace("/cards");
  };

  return (
    <>
      <Grid size={12}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={onClickConnectWeb3}
        >
          Connect with Web3Auth
        </Button>
      </Grid>
      <Grid size={12}>
        <Button
          fullWidth
          variant="outlined"
          color="success"
          onClick={onClickConnectWeb3}
        >
          Connect with Bitkub
        </Button>
      </Grid>
      <Grid size={12}>
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          onClick={onClickConnectWeb3}
        >
          Connect with Privy
        </Button>
      </Grid>
    </>
  );
}
