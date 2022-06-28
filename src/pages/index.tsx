import { Button, Container } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Container>
      <Button variant="contained">Button</Button>
    </Container>
  );
}
