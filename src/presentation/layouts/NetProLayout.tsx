import { Container } from "@/infrastructure/components/styled/container.component";
import { Header } from "@/infrastructure/components/styled/header.component";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header>ABC Company</Header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
